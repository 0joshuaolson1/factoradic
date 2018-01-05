// exports={}

exports.ntoa=(n,amax,divmod=(n,d)=>({div:Math.floor(n/d),mod:n%d}))=>{
  const a=Array(amax-1)
  for(let divisor=2;divisor<=amax;++divisor){
    const dm=divmod(n,divisor)
    a[divisor-2]=dm.mod
    n=dm.div
  }
  return a
}
exports.aton=(a,nctor=n=>n,muladd=(n,m,a)=>n*m+a)=>{
  let i=a.length-1,n=nctor(a[i])
  while(i--)n=muladd(n,i+2,a[i])
  return n
}
exports.atop=(a,p)=>{
  const plen=a.length+1
  p=p||Array.from(Array(plen).keys())
  for(let i=1;i<plen;++i){
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

exports.test=(max,onpass=console.log('pass'),onfail=console.error)=>{
  for(let n=2,factorial=2;n<=max;factorial*=++n)
    for(let val=0;val<factorial;++val)
      if(val!==exports.aton(exports.ptoa(exports.atop(exports.ntoa(val,n)))))
        return onfail({val,n})
  onpass()
}
