//TODO async,in-place bignum ops,no/min alloc

const ntoa=(n/*[0,_!)*/,l,d,m/*%2*/)=>{
  const a=Array(l-1)
  while(l>2){
    const m=d(n,l)
    a[l---2]=m.m
    n=m.d
  }
  a[0]=m(n) 
  return a
}
const aton=(a,c/*from 0|1*/,f/**x+[0,x)*/)=>{
  let n=c(a[0])
  {
    const l=a.length
    for(let i=1;i<l;)n=f(n,i+2,a[i++])
  }
  return n
}
const atop=a=>{
  let i=a.length-1
  const p=Array.from(Array(i),(v,k)=>{return k}),l=i-1
  while(i){
    const t=p[--i],j=i+a[l-i]
    p[i]=p[j]
    p[j]=t
  }
  return p
}
const ptoa=p=>{
  const l=p.length,q=Array(l),m=l-1,a=Array(m),o=m-1
  {
    let i=l
    while(i)q[p[--i]]=i
    while(i<m)a[o-i]=(p[q[p[i]]=q[i]]=p[i])-i
  }
  return a
}
const tests=o=>{
  
}
