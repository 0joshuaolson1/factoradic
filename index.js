// var exports = {};

// inclusive bounds, increments or decrements appropriately
function loop(i, end, body, step){
  for(end += (step = i<end ? 1 : -1); i != end; i += step) body(i);
}

function P(l){return Array.apply(0, {length:l}).map(function(_, i){return i;});}

function muladdImpl(n, m, a){return n*m + a;};
function divmodImpl(n, d){return {div:Math.floor(n/d), mod:n%d}};

exports.ptoa = function(p){
  var indexof = Array(p.length);
  p.forEach(function(val, i){indexof[val] = i;});
  var a = Array(p.length-1);
  loop(a.length, 1, function(i){
    p[indexof[i]] = p[i]; // unnecessary in the last 2 loops
    indexof[p[i]] = indexof[i]; // unnecessary in the last loop
    a[i-1] = i-indexof[i];
  });
  return a;
}

// ptoa and aton combined with a fused loop and no intermediate a
exports.pton = function(p, zero, muladd){
  var n = zero || 0;
  muladd = muladd || muladdImpl;
  var indexof = Array(p.length);
  p.forEach(function(val, i){indexof[val] = i;});
  loop(p.length-1, 1, function(i){
    p[indexof[i]] = p[i];
    indexof[p[i]] = indexof[i];
    n = muladd(n, i+1, i-indexof[i]);
  });
  return n;
}

exports.atop = function(a, p){
  p = p || P(a.length+1);
  loop(1, a.length, function(i){
    var j = i-a[i-1], temp = p[i];
    p[i] = p[j];
    p[j] = temp;
  });
  return p;
}

exports.aton = function(a, zero, muladd){
  var n = zero || 0;
  muladd = muladd || muladdImpl;

  // muladd is overkill in the first loop, but starting from 0 is better in pton
  loop(a.length+1, 2, function(radix){n = muladd(n, radix, a[radix-2]);});

  return n;
}

// ntoa and atop combined with a fused loop and no intermediate a
exports.ntop = function(n, p, divmod){
  divmod = divmod || divmodImpl;
  if(!Array.isArray(p)) p = P(p);
  loop(1, p.length-1, function(i){
    var dm = divmod(n, i+1);
    var j = i-dm.mod, temp = p[i];
    p[i] = p[j];
    p[j] = temp;
    n = dm.div;
  });
  return p;
};

exports.ntoa = function(n, maxRadix, divmod){
  divmod = divmod || divmodImpl;
  var a = Array(maxRadix-1);
  loop(2, maxRadix, function(radix){
    var dm = divmod(n, radix);
    a[radix-2] = dm.mod;
    n = dm.div; // unnecessary in the last loop
  });
  return a;
}

exports.test = function(maxMaxRadix, onpass, onfail){
  var failed = false;
  var factorial = 1;
  loop(2, maxMaxRadix || 4, function(radix){
    factorial *= radix;
    loop(0, factorial-1, function(n){
      var p = exports.ntop(n, radix);
      var a = exports.ptoa(p.slice());
      var n2 = exports.aton(a);
      var a2 = exports.ntoa(n2, radix);
      var p2 = exports.atop(a2);
      var n3 = exports.pton(p.slice());
      if(!failed && (failed = n!==n3)) (onfail || console.error)(failed = {
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
  if(failed) return failed;
  (onpass || function(){console.log('pass');})();
  return 0;
}
