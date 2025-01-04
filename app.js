var zero=document.querySelector(".line #line1 #line1-p1 h5")
var cnt=0
setInterval(()=>{
    if(zero.innerHTML<100){
        zero.innerHTML=cnt++
    }
},30)

var tl=gsap.timeline()

tl.from(".line h1",{
    y:150,
    opacity:0,
    stagger:1
})
tl.to('#now',{
    animationName:"anime",
    opacity:1
})
tl.to("#loader",{
    opacity:0,
    display:"none"
})
tl.from("#p1",{
    delay:0.2,
    y:"100%",
    opacity:0,
    duration:1,
    ease:Power4
})
