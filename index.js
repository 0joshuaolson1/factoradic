exports.ntoa=(n,amax,divmod)=>{
  const a=Array(amax-1)
  for(let divisor=2;divisor<=amax;++divisor){
    const dm=divmod(n,divisor)
    a[divisor-2]=dm.mod
    n=dm.div
  }
  return a
}
exports.aton=(a,nctor,muladd)=>{
  let i=a.length-1,n=nctor(a[i])
  while(i--)n=muladd(n,i+2,a[i])
  return n
}
exports.atop=(a,p)=>{
  const alen=a.length
  if(!p)p=Array.from(Array(alen+1),(_,i)=>{return i})
  for(let i=1;i<=alen;++i){
    const j=i-a[i-1],t=p[i]
    p[i]=p[j]
    p[j]=t
  }
  return p
}
exports.ptoa=p=>{
  const plen=p.length,indexof=Array(plen),alen=plen-1,a=Array(alen)
  for(let i=0;i<plen;++i)indexof[p[i]]=i
  for(let i=alen;i;--i)a[i-1]=i-(indexof[p[indexof[i]]=p[i]]=indexof[i])
  return a
}
exports.test=(max,onpass,onfail)=>{
  for(let n=2,factorial=2;n<=max;factorial*=++n)
    for(let val=0;val<factorial;++val)
      if(val!==exports.aton(
        exports.ptoa(exports.atop(exports.ntoa(val,n,
          (n,d)=>{return{
              div:Math.trunc(n/d),
              mod:n%d
          }}
        ))),
        n=>{return n},
        (n,m,a)=>{return n*m+a}
      ))
        return onfail({val,n})
  onpass()
}
