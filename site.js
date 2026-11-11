
(function(){
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'}):null;
document.querySelectorAll('.content section,.facts div,.stat').forEach(function(el){if(io&&!rm){el.classList.add('reveal');io.observe(el)}});
var links=[].slice.call(document.querySelectorAll('aside.meta ol a'));
if(links.length&&'IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)so.observe(t)})}
document.querySelectorAll('.card').forEach(function(c){var v=c.querySelector('video');if(!v)return;v.muted=true;
c.addEventListener('mouseenter',function(){if(!rm)v.play().catch(function(){})});
c.addEventListener('mouseleave',function(){v.pause();v.currentTime=0});
c.addEventListener('focus',function(){if(!rm)v.play().catch(function(){})});
c.addEventListener('blur',function(){v.pause();v.currentTime=0})});



(function(){
var scene=document.querySelector('.scene');if(!scene)return;
var st=scene.querySelector('.stage0'),stm=scene.querySelector('.statement'),ps=[].slice.call(scene.querySelectorAll('.pillar'));
var N=ps.length,mob=function(){return window.innerWidth<=860};
function cl(x,a,b){return Math.max(a,Math.min(b,x))}
function ez(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
function vid(p,on){var v=p.querySelector('video');if(!v)return;v.muted=true;if(on&&!rm){v.play().catch(function(){})}else{v.pause()}}
function frame(){
 if(mob()){ps.forEach(function(p){p.style.cssText='';var v=p.querySelector('video');if(v&&!rm&&!v._o){v._o=1}});return}
 var W=window.innerWidth,H=st.clientHeight,step=H*.9;
 var y=cl(-scene.getBoundingClientRect().top+52,0,1e9);
 var P=cl(y/step,0,N);
 var unit=W*.25/N;
 var t=ps.map(function(_,i){return cl(P-i,0,1)});
 ps.forEach(function(p,i){
  var e=ez(t[i]),rl=W*.75+i*unit,rw=unit-6;
  var l=rl*(1-e),w=rw+(W-rw)*e;
  p.style.left=l+'px';p.style.width=w+'px';p.style.zIndex=i+1;
  var m=p.querySelector('.m');m.style.left=(-l)+'px';
  var nxt=i<N-1?t[i+1]:0;
  var br=(.2+.8*cl((t[i]-.55)/.45,0,1))*(1-.75*nxt);
  m.style.filter='brightness('+br.toFixed(3)+') grayscale('+(1-cl((t[i]-.55)/.45,0,1)).toFixed(3)+')';
  var cap=p.querySelector('.cap');cap.style.left=(-l)+'px';var tg=p.querySelector('.tag');if(tg)tg.style.opacity=1-cl(t[i]*5,0,1);cap.style.opacity=cl((t[i]-.8)/.2,0,1)*(1-cl(nxt*3,0,1));
  vid(p,t[i]>.9&&nxt<.3);
  p.tabIndex=0;
 });
 var f=cl(P/.7,0,1);stm.style.opacity=1-f;stm.style.transform='translateX('+(-f*60)+'px)';
}
var tick=false;function req(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;frame()})}}
window.addEventListener('scroll',req,{passive:true});window.addEventListener('resize',req);frame();
ps.forEach(function(p,i){p.addEventListener('click',function(e){if(mob())return;
 var H=st.clientHeight,step=H*.9;var y=cl(-scene.getBoundingClientRect().top+52,0,1e9);var P=y/step;
 if(P<i+.95){e.preventDefault();window.scrollTo({top:scene.offsetTop-52+(i+1)*step+4,behavior:rm?'auto':'smooth'})}})});
if(mob()&&'IntersectionObserver' in window&&!rm){ps.forEach(function(p){var v=p.querySelector('video');if(!v)return;v.muted=true;new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?v.play().catch(function(){}):v.pause()})},{threshold:.6}).observe(p)})}
document.querySelectorAll('.tcard').forEach(function(c){var v=c.querySelector('video');if(!v)return;v.muted=true;c.addEventListener('mouseenter',function(){if(!rm)v.play().catch(function(){})});c.addEventListener('mouseleave',function(){v.pause();v.currentTime=0})});
})();
})();
