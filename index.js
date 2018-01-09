// var exports = {};

// inclusive bounds
function loop(i, end, body){
  for(var step = i<end ? 1 : -1; i-end != step; i += step) body(i);
}

exports.ptoa = function(p){
  var indexof = Array(p.length);
  p.forEach(function(val, i){indexof[val] = i;});
  var a = Array(p.length-1);
  loop(a.length, 1, function(i){
    p[indexof[i]] = p[i];
    indexof[p[i]] = indexof[i];
    a[i-1] = i-indexof[i];
  });
  return a;
}
exports.aton = function(a, zero, muladd){
  var n = zero || 0;
  muladd = muladd || function(n, m, a){return n*m + a;};
  loop(a.length+1, 2, function(radix){n = muladd(n, radix, a[radix-2]);});
  return n;
}
exports.ntoa = function(n, maxRadix, divmod){
  divmod = divmod || function(n, d){return {div:Math.floor(n/d), mod:n%d}};
  var a = Array(maxRadix-1);
  loop(2, maxRadix, function(radix){
    var dm = divmod(n, radix);
    a[radix-2] = dm.mod;
    n = dm.div;
  });
  return a;
}
exports.atop = function(a, p){
  p = p || Array.from(Array(a.length+1).keys());
  loop(1, a.length, function(i){
    var j = i-a[i-1], temp = p[i];
    p[i] = p[j];
    p[j] = temp;
  });
  return p;
}

exports.pton = function(p, zero, muladd){
  var n = zero || 0;
  muladd = muladd || function(n, m, a){return n*m + a;};
  var indexof = Array(p.length);
  p.forEach(function(val, i){indexof[val] = i;});
  loop(p.length-1, 1, function(i){
    p[indexof[i]] = p[i];
    indexof[p[i]] = indexof[i];
    n = muladd(n, i+1, i-indexof[i]);
  });
  return n;
}
exports.ntop = function(n, maxRadix, p, divmod){
  divmod = divmod || function(n, d){return {div:Math.floor(n/d), mod:n%d}};
  p = p || Array.from(Array(maxRadix).keys());
  loop(1, p.length-1, function(i){
    var dm = divmod(n, i+1);
    var j = i-dm.mod, temp = p[i];
    p[i] = p[j];
    p[j] = temp;
    n = dm.div;
  });
  return p;
};

exports.test = function(maxMaxRadix, onpass, onfail){
  var failed = false, factorial = 1;
  loop(2, maxMaxRadix || 4, function(radix){
    factorial *= radix;
    loop(0, factorial-1, function(n){
      var p = exports.ntop(n, radix);
      var a = exports.ptoa(p.slice());
      var n2 = exports.aton(a);
      var a2 = exports.ntoa(n2, radix);
      var p2 = exports.atop(a2);
      var n3 = exports.pton(p.slice());
      if(!failed && (failed = n!==n3)) (onfail || console.error)({
        maxRadix: radix,
        n: n,
        p: p,
        a: a,
        n2: n2,
        a2: a2,
        p2: p2,
        n3: n3
      });
    });
  });
  if(!failed) (onpass || function(){console.log('pass');})();
}
