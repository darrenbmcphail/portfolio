
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
var gEl=scene.querySelector('.g'),gCells=gEl?[].slice.call(gEl.children):[],gRun=false,gDone=false,gTm=[];
// each pattern: 10 letters per axis; w=white 60, k=charcoal 30, a=accent 10; by column (c) or row (r)
var GP=[['c','wwwwwwkkka'],['c','akkkwwwwww'],['r','wwwwwwkkka'],['r','akkkwwwwww'],['c','kwwkwwkwwa']],GS=[[0,0],[1,1],[2,2],[3,0],[4,1],[0,0]];
function gPaint(pi,pal){var P=GP[pi];gEl.setAttribute('data-p',pal);gCells.forEach(function(el,n){var r=Math.floor(n/10),c=n%10,ch=P[1].charAt(P[0]==='c'?c:r);el.className=ch==='w'?'':ch;el.style.transitionDelay=((r+c)*30)+'ms'})}
function gridCtl(t){if(!gEl)return;
 if(t<.5){gTm.forEach(clearTimeout);gTm=[];gRun=false;gDone=false;gPaint(0,0);return}
 if(t>.9&&!gRun&&!gDone&&!rm){gRun=true;
  GS.slice(1).forEach(function(s,k){gTm.push(setTimeout(function(){gPaint(s[0],s[1]);if(k===GS.length-2){gDone=true;gRun=false}},2300*(k+1)))})}}
if(gEl)gPaint(0,0);
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
  var cap=p.querySelector('.cap');cap.style.left=(-l)+'px';var tg=p.querySelector('.tag');if(tg)tg.style.opacity=1-cl(t[i]*5,0,1);cap.style.opacity=cl((t[i]-.6)/.4,0,1)*(1-cl(nxt*3,0,1));
  vid(p,t[i]>.9&&nxt<.3);p.classList.toggle('on',t[i]>.9&&nxt<.3);if(i===N-1)gridCtl(t[i]);
  p.tabIndex=0;
 });
 var f=cl(P/.7,0,1);stm.style.opacity=1-f;stm.style.transform='translateX('+(-f*60)+'px)';
}
var tick=false;function req(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;frame()})}}
window.addEventListener('scroll',req,{passive:true});window.addEventListener('resize',req);frame();

var lock=false,lastW=0;
function base(){return scene.offsetTop-52}
function go(target){
 if(rm){window.scrollTo(0,target);return}
 var from=window.scrollY,d=target-from,t0=performance.now(),D=1250;lock=true;
 (function s(n){var k=cl((n-t0)/D,0,1),e=-(Math.cos(Math.PI*k)-1)/2;window.scrollTo(0,from+d*e);if(k<1)requestAnimationFrame(s);else setTimeout(function(){lock=false},120)})(t0);
}
function nav(dir){
 var step=st.clientHeight*.9,rel=window.scrollY-base(),eps=step*.02;
 if(rel<-2)return false;
 if(dir>0){if(rel>=N*step-eps)return false;go(base()+(Math.floor(rel/step+eps/step)+1)*step);return true}
 if(rel<=eps||rel>N*step+eps)return false;
 go(base()+(Math.ceil(rel/step-eps/step)-1)*step);return true;
}
window.addEventListener('wheel',function(e){
 if(mob()||rm||e.ctrlKey)return;
 var now=Date.now(),quiet=now-lastW>110;lastW=now;
 if(lock){e.preventDefault();return}
 if(Math.abs(e.deltaY)<4)return;
 var rel=window.scrollY-base();
 if(rel<-2)return;
 if(!quiet&&rel<=N*st.clientHeight*.9+2){e.preventDefault();return}
 if(nav(e.deltaY>0?1:-1))e.preventDefault();
},{passive:false});
window.addEventListener('keydown',function(e){
 if(mob()||rm||e.metaKey||e.ctrlKey||e.altKey)return;
 var tg=e.target&&e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA')return;
 var k=e.key,dir=(k==='ArrowDown'||k==='PageDown'||(k===' '&&!e.shiftKey))?1:(k==='ArrowUp'||k==='PageUp'||(k===' '&&e.shiftKey))?-1:0;
 if(!dir)return;if(lock){e.preventDefault();return}if(nav(dir))e.preventDefault();
});
ps.forEach(function(p,i){p.addEventListener('click',function(e){if(mob())return;
 var step=st.clientHeight*.9,P=(window.scrollY-base())/step;
 if(P<i+.95){e.preventDefault();if(!lock)go(base()+(i+1)*step)}})});
if(mob()&&'IntersectionObserver' in window&&!rm){ps.forEach(function(p){var v=p.querySelector('video');if(!v)return;v.muted=true;new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?v.play().catch(function(){}):v.pause()})},{threshold:.6}).observe(p)})}
document.querySelectorAll('.tcard').forEach(function(c){var v=c.querySelector('video');if(!v)return;v.muted=true;c.addEventListener('mouseenter',function(){if(!rm)v.play().catch(function(){})});c.addEventListener('mouseleave',function(){v.pause();v.currentTime=0})});
})();
})();
