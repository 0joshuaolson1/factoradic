//TODO docs,module,async,in-place bignum ops,no/min alloc

const ntoa=(n,o,d)=>{
  const a=Array(o-1)
  for(let i=2;i<=o;){
    const m=d(n,i)
    a[i++-2]=m.m
    n=m.d//TODO wasteful last loop
  }
  return a
}
const aton=(a,c,f)=>{
  let i=a.length-1,n=c(a[i])
  while(i)n=f(n,--i+2,a[i])
  return n
}
const atop=(a,p)=>{
  {
    let i=a.length
    if(!p)p=Array.from(Array(i+1),(v,k)=>{return k})
    {
      const l=i-1
      while(i){
        const t=p[l+1-(--i)],j=l+1-i-a[l-i]
        p[l+1-i]=p[j]
        p[j]=t
      }
    }
  }
  return p
}
const ptoa=p=>{
  const l=p.length,q=Array(l),m=l-1,a=Array(m),o=m-1
  {
    let i=l
    while(i)q[p[--i]]=i
    while(i<m)a[o-i]=m-(q[p[q[m-i]]=p[m-i]]=q[m-i])-i++
  }
  return a
}
const test=o=>{
  for(let n=2,f=2;n<8;f*=++n)for(let i=0;i<f;++i)
    if(aton(
      ptoa(atop(ntoa(i,n,(n,d)=>{return{d:Math.trunc(n/d),m:n%d}})))
      ,n=>{return n}
      ,(n,m,a)=>{return n*m+a}
    )!==i)
      return o(i+' (n='+n+')')
  o('pass')
}
