
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
})();
