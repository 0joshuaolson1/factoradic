// var exports = {};
(function(){//IIFE to keep these 3 functions local
function P(l){for(var a = Array(l); a[--l] = l;); return a;}
function muladdImpl(n, m, a){return n*m + a;};
function divmodImpl(n, d){return {div:Math.floor(n/d), mod:n%d}};

exports.ptoa = function(p){
  var indexof = Array(p.length);
  p.forEach(function(val, i){indexof[val] = i;});
  var a = Array(p.length-1);
  for(var i = a.length; i > 0; i--){
    p[indexof[i]] = p[i]; // unnecessary in the last 2 loops
    indexof[p[i]] = indexof[i]; // unnecessary in the last loop
    a[i-1] = i-indexof[i];
  }
  return a;
}

// ptoa and aton combined with a fused loop and no intermediate a
exports.pton = function(p, zero, muladd){
  var n = zero || 0;
  muladd = muladd || muladdImpl;
  var indexof = Array(p.length);
  p.forEach(function(val, i){indexof[val] = i;});
  for(var i = p.length-1; i > 0; i--){
    p[indexof[i]] = p[i];
    indexof[p[i]] = indexof[i];
    n = muladd(n, i+1, i-indexof[i]);
  }
  return n;
}

exports.atop = function(a, p){
  p = p || P(a.length+1);
  for(var i = 1; i <= a.length; i++){
    var j = i-a[i-1], temp = p[i];
    p[i] = p[j];
    p[j] = temp;
  }
  return p;
}

exports.aton = function(a, zero, muladd){
  var n = zero || 0;
  muladd = muladd || muladdImpl;
  // muladd is overkill in the first loop, but starting from 0 is better in pton
  for(var radix = a.length+1; radix > 1; radix--){
    n = muladd(n, radix, a[radix-2]);
  }
  return n;
}

// ntoa and atop combined with a fused loop and no intermediate a
exports.ntop = function(n, p, divmod){
  divmod = divmod || divmodImpl;
  if(!Array.isArray(p)) p = P(p);
  for(var i = 1; i < p.length; i++){
    var dm = divmod(n, i+1);
    var j = i-dm.mod, temp = p[i];
    p[i] = p[j];
    p[j] = temp;
    n = dm.div;
  }
  return p;
};

exports.ntoa = function(n, maxRadix, divmod){
  divmod = divmod || divmodImpl;
  var a = Array(maxRadix-1);
  for(var radix = 2; radix <= maxRadix; radix++){
    var dm = divmod(n, radix);
    a[radix-2] = dm.mod;
    n = dm.div; // unnecessary in the last loop
  }
  return a;
}

exports.test = function(maxMaxRadix, onpass, onfail){
  maxMaxRadix = maxMaxRadix || 4;
  var failed = false;
  var factorial = 1;
  for(var radix = 2; radix <= maxMaxRadix, radix++){
    factorial *= radix;
    for(var n = 0; n < factorial; n++){
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
    }
  }
  if(failed) return failed;
  (onpass || function(){console.log('pass');})();
  return 0;
}
})()//IIFE
