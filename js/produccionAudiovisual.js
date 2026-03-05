/* ================================================================
   produccionAudiovisual.js  —  Agencia 247  —  v4.0
================================================================
  MÓDULOS
  01  Page Loader con progreso real
  02  Navbar sticky + active links + mobile
  03  Scroll progress bar
  04  Cursor personalizado con etiqueta contextual
  05  Partículas canvas con repulsión de mouse
  06  Parallax hero en mousemove
  07  Tilt 3D en cards (gyroscope en mobile)
  08  Botones magnéticos
  09  Typewriter en hero subtitle
  10  Scroll reveal con IntersectionObserver
  11  Contadores animados
  12  Galería: filtros + lightbox con swipe
  13  Shockwave en click
  14  Ripple en botones
  15  Dots de sección (nav lateral)
  16  Toast notifications
  17  Modo claro / oscuro
  18  Stat glow hover
  19  Smooth scroll
  20  Toolbar flotante
  21  Video preview en hover de galería
  22  Formulario de contacto con validación
  23  Acordeón de FAQ
  24  Ticker / marquee animado
  25  Easter egg: Konami Code
  26  Cursor trail de chispas
  27  Contador regresivo de oferta
  28  Parallax de scroll multi-capa
  29  Audio feedback (Web Audio API)
  30  Panel "behind the scenes" drag-to-reveal
================================================================ */
(function () {
  'use strict';

  var qs   = function(s,c){ return (c||document).querySelector(s); };
  var qsa  = function(s,c){ return Array.from((c||document).querySelectorAll(s)); };
  var lerp = function(a,b,t){ return a+(b-a)*t; };
  var clamp= function(v,a,b){ return Math.max(a,Math.min(b,v)); };
  var map  = function(v,a,b,c,d){ return c+((v-a)/(b-a))*(d-c); };

  var _rafs=[];
  (function loop(){ _rafs.forEach(function(f){f();}); requestAnimationFrame(loop); }());
  function onRAF(fn){ _rafs.push(fn); }

  function injectCSS(str){
    var s=document.createElement('style'); s.textContent=str; document.head.appendChild(s);
  }

  /* ═══ 01  PAGE LOADER ═══════════════════════════════════════ */
  function initLoader(){
    var el=document.createElement('div'); el.id='pav-loader';
    el.innerHTML=
      '<div class="pl-wrap">'+
        '<div class="pl-rings"><span></span><span></span><span></span></div>'+
        '<div class="pl-logo"><b>247</b><small>AGENCIA</small></div>'+
        '<div class="pl-bar"><div id="pl-fill"></div></div>'+
        '<p id="pl-msg">Iniciando...</p>'+
      '</div>';
    document.body.appendChild(el);
    document.body.style.overflow='hidden';

    injectCSS(
      '#pav-loader{position:fixed;inset:0;z-index:99999;background:#060c1c;'+
        'display:flex;align-items:center;justify-content:center;'+
        'transition:opacity .6s,visibility .6s;}'+
      '#pav-loader.done{opacity:0;visibility:hidden;pointer-events:none;}'+
      '.pl-wrap{display:flex;flex-direction:column;align-items:center;gap:1.5rem;position:relative;}'+
      '.pl-rings{position:absolute;width:180px;height:180px;pointer-events:none;}'+
      '.pl-rings span{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(91,200,245,.14);'+
        'animation:plSpin 3s linear infinite;}'+
      '.pl-rings span:nth-child(2){inset:14px;border-color:rgba(35,83,232,.18);animation-duration:2s;animation-direction:reverse;}'+
      '.pl-rings span:nth-child(3){inset:28px;border-color:rgba(91,200,245,.10);animation-duration:4s;}'+
      '@keyframes plSpin{to{transform:rotate(360deg);}}'+
      '.pl-logo{display:flex;flex-direction:column;align-items:center;gap:.15rem;position:relative;z-index:1;}'+
      '.pl-logo b{font-family:"Barlow Condensed",sans-serif;font-size:4.5rem;font-weight:900;'+
        'letter-spacing:-.04em;background:linear-gradient(110deg,#fff 30%,#5bc8f5);'+
        '-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}'+
      '.pl-logo small{font-family:"Barlow",sans-serif;font-size:.62rem;font-weight:700;'+
        'letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.35);}'+
      '.pl-bar{width:190px;height:2px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden;}'+
      '#pl-fill{height:100%;width:0;background:linear-gradient(90deg,#2353e8,#5bc8f5);'+
        'border-radius:2px;transition:width .15s ease;}'+
      '#pl-msg{font-family:"Barlow",sans-serif;font-size:.68rem;font-weight:600;'+
        'letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.25);}'
    );

    var fill=document.getElementById('pl-fill'), msg=document.getElementById('pl-msg');
    var pct=0, msgs=['Iniciando...','Cargando recursos...','Preparando galería...','¡Listo!'];
    var iv=setInterval(function(){
      pct+=Math.random()*18+6;
      if(pct>=100){pct=100;clearInterval(iv);}
      fill.style.width=pct+'%';
      msg.textContent=msgs[Math.floor((pct/100)*(msgs.length-1))];
      if(pct===100) setTimeout(function(){
        el.classList.add('done');
        document.body.style.overflow='';
        setTimeout(function(){el.remove();},650);
      },300);
    },170);
  }

  /* ═══ 02  NAVBAR ════════════════════════════════════════════ */


  /* ═══ 03  PROGRESS BAR ══════════════════════════════════════ */
  function initProgressBar(){
    var bar=document.createElement('div'); bar.id='scroll-bar';
    document.body.appendChild(bar);
    injectCSS('#scroll-bar{position:fixed;top:0;left:0;height:3px;width:0;z-index:9999;'+
      'background:linear-gradient(90deg,#2353e8,#5bc8f5);border-radius:0 2px 2px 0;'+
      'transition:width .08s linear;pointer-events:none;}');
    window.addEventListener('scroll',function(){
      bar.style.width=clamp((window.scrollY/(document.body.scrollHeight-window.innerHeight))*100,0,100)+'%';
    },{passive:true});
  }

  /* ═══ 04  CURSOR PERSONALIZADO ══════════════════════════════ */


  /* ═══ 05  PARTÍCULAS CANVAS + REPULSIÓN ══════════════════════ */
  function initParticles(){
    var hero=qs('.s-hero'); if(!hero) return;
    var cv=document.createElement('canvas');
    cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;';
    hero.prepend(cv);
    var ctx=cv.getContext('2d'), W,H,pts=[];
    function resize(){W=cv.width=hero.offsetWidth;H=cv.height=hero.offsetHeight;}
    resize(); window.addEventListener('resize',resize);
    function mk(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,
      vy:-(Math.random()*.32+.08),r:Math.random()*1.5+.3,a:Math.random()*.5+.1,
      life:0,max:Math.random()*300+120};}
    for(var i=0;i<100;i++){var p=mk();p.life=Math.random()*p.max;pts.push(p);}
    var mpx=-9999,mpy=-9999;
    hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();mpx=e.clientX-r.left;mpy=e.clientY-r.top;});
    hero.addEventListener('mouseleave',function(){mpx=mpy=-9999;});
    onRAF(function(){
      ctx.clearRect(0,0,W,H);
      for(var a=0;a<pts.length;a++){
        for(var b=a+1;b<pts.length;b++){
          var dx=pts[a].x-pts[b].x,dy=pts[a].y-pts[b].y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<100){ctx.beginPath();ctx.strokeStyle='rgba(91,200,245,'+(.07*(1-d/100))+')';
            ctx.lineWidth=.6;ctx.moveTo(pts[a].x,pts[a].y);ctx.lineTo(pts[b].x,pts[b].y);ctx.stroke();}
        }
        var pt=pts[a];
        var rdx=pt.x-mpx,rdy=pt.y-mpy,rd=Math.sqrt(rdx*rdx+rdy*rdy);
        if(rd<80){pt.vx+=rdx/rd*.4;pt.vy+=rdy/rd*.4;}
        pt.vx=clamp(pt.vx,-.8,.8);pt.vy=clamp(pt.vy,-.8,.1);
        pt.x+=pt.vx;pt.y+=pt.vy;pt.life++;
        var fade=pt.life<30?pt.life/30:pt.life>pt.max-30?(pt.max-pt.life)/30:1;
        ctx.beginPath();ctx.arc(pt.x,pt.y,pt.r,0,Math.PI*2);
        ctx.fillStyle='rgba(91,200,245,'+(pt.a*fade)+')';ctx.fill();
        if(pt.life>=pt.max||pt.y<-5){Object.assign(pt,mk());pt.y=H+5;pt.life=0;}
      }
    });
  }

  /* ═══ 06  PARALLAX HERO ════════════════════════════════════ */
  function initParallax(){
    var hero=qs('.s-hero'),bg=qs('.s-hero__bg-img'),cont=qs('.s-hero__content');
    if(!hero||!bg) return;
    var tx=0,ty=0,bx=0,by=0,cx=0,cy=0,ccx=0,ccy=0;
    hero.addEventListener('mousemove',function(e){
      var r=hero.getBoundingClientRect();
      tx=map(e.clientX-r.left,0,r.width,-20,20);ty=map(e.clientY-r.top,0,r.height,-11,11);
      cx=map(e.clientX-r.left,0,r.width,-6,6);cy=map(e.clientY-r.top,0,r.height,-4,4);
    });
    hero.addEventListener('mouseleave',function(){tx=ty=cx=cy=0;});
    onRAF(function(){
      bx=lerp(bx,tx,.055);by=lerp(by,ty,.055);
      ccx=lerp(ccx,cx,.08);ccy=lerp(ccy,cy,.08);
      bg.style.transform='scale(1.09) translate('+bx+'px,'+by+'px)';
      if(cont) cont.style.transform='translate('+ccx+'px,'+ccy+'px)';
    });
  }

  /* ═══ 07  TILT 3D + GYROSCOPE MOBILE ═══════════════════════ */
  function initTilt(){
    qsa('.svc-card,.prod-card,.process-step').forEach(function(card){
      var tx=0,ty=0,cx=0,cy=0,on=false;
      if(!window.matchMedia('(pointer:coarse)').matches){
        card.addEventListener('mouseenter',function(){on=true;});
        card.addEventListener('mousemove',function(e){
          var r=card.getBoundingClientRect();
          tx=map(e.clientX-r.left,0,r.width,-9,9);
          ty=map(e.clientY-r.top,0,r.height,7,-7);
        });
        card.addEventListener('mouseleave',function(){on=false;tx=ty=0;});
        onRAF(function(){
          cx=lerp(cx,tx,.10);cy=lerp(cy,ty,.10);
          var idle=!on&&Math.abs(cx)<.05&&Math.abs(cy)<.05;
          card.style.transform=idle?'':'perspective(800px) rotateX('+cy+'deg) rotateY('+cx+'deg) translateZ(6px)';
        });
      }
    });
    /* Gyro en mobile */
    if(window.DeviceOrientationEvent){
      window.addEventListener('deviceorientation',function(e){
        var bx=clamp(e.gamma/30,-1,1)*8, by=clamp(e.beta/30,-1,1)*6;
        qsa('.svc-card,.prod-card').forEach(function(c){
          c.style.transform='perspective(800px) rotateX('+(-by)+'deg) rotateY('+bx+'deg)';
        });
      },{passive:true});
    }
  }

  /* ═══ 08  BOTONES MAGNÉTICOS ════════════════════════════════ */
  function initMagnetic(){
    if(window.matchMedia('(pointer:coarse)').matches) return;
    qsa('.btn-primary,.sn-cta').forEach(function(btn){
      var bx=0,by=0,mx=0,my=0,on=false;
      btn.addEventListener('mouseenter',function(){on=true;});
      btn.addEventListener('mousemove',function(e){
        var r=btn.getBoundingClientRect();
        mx=(e.clientX-r.left-r.width/2)*.38;
        my=(e.clientY-r.top-r.height/2)*.38;
      });
      btn.addEventListener('mouseleave',function(){on=false;mx=my=0;});
      onRAF(function(){
        bx=lerp(bx,mx,.14);by=lerp(by,my,.14);
        btn.style.transform='translate('+bx+'px,'+by+'px)';
      });
    });
  }

  /* ═══ 09  TYPEWRITER ════════════════════════════════════════ */
  function initTypewriter(){
    var el=qs('.s-hero__sub'); if(!el) return;
    var phrases=[
      'Convertimos ideas en contenido audiovisual que conecta, emociona y genera resultados.',
      'Desde la preproducción hasta la entrega final, cada detalle importa.',
      'Creatividad y técnica al servicio de tu marca en Puno, Perú.'
    ];
    var phraseIndex=0;
    var charIndex=0;
    var deleting=false;
    var nextTick=performance.now()+900;

    var typed=document.createElement('span');
    typed.className='s-hero__typed-text';
    var caret=document.createElement('span');
    caret.className='s-hero__typed-caret';
    caret.setAttribute('aria-hidden','true');

    el.textContent='';
    el.appendChild(typed);
    el.appendChild(caret);

    injectCSS(
      '.s-hero__typed-text{display:inline;}'+
      '.s-hero__typed-caret{display:inline-block;width:2px;height:1.05em;'+
        'margin-left:.18rem;vertical-align:-0.12em;background:rgba(91,200,245,.88);'+
        'animation:heroTypedCaretBlink .72s steps(1,end) infinite;}'+
      '@keyframes heroTypedCaretBlink{0%,46%{opacity:1;}47%,100%{opacity:0;}}'
    );

    function loop(ts){
      if(ts < nextTick){
        requestAnimationFrame(loop);
        return;
      }

      var full=phrases[phraseIndex];

      if(!deleting){
        charIndex++;
        typed.textContent=full.slice(0,charIndex);
        if(charIndex>=full.length){
          deleting=true;
          nextTick=ts+1300;
        } else {
          nextTick=ts+38;
        }
      } else {
        charIndex--;
        typed.textContent=full.slice(0,charIndex);
        if(charIndex<=0){
          deleting=false;
          phraseIndex=(phraseIndex+1)%phrases.length;
          nextTick=ts+320;
        } else {
          nextTick=ts+24;
        }
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  /* ═══ 10  SCROLL REVEAL ═════════════════════════════════════ */
  function initReveal(){
    injectCSS(
      '.reveal{opacity:0;transform:translateY(30px);'+
        'transition:opacity .70s cubic-bezier(.16,1,.3,1),transform .70s cubic-bezier(.16,1,.3,1);}'+
      '.reveal.is-visible{opacity:1;transform:none;}'+
      '.delay-1{transition-delay:.10s;}.delay-2{transition-delay:.22s;}'+
      '.delay-3{transition-delay:.34s;}.delay-4{transition-delay:.46s;}'
    );
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});
    },{threshold:.10,rootMargin:'0px 0px -40px 0px'});
    qsa('.reveal').forEach(function(el){io.observe(el);});
  }

  /* ═══ 11  CONTADORES ════════════════════════════════════════ */
  function initCounters(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target,end=parseInt(el.dataset.target);
        var pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
        if(isNaN(end)) return;
        var start=null,dur=1600;
        (function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/dur,1),ease=1-Math.pow(1-p,3);
          el.textContent=pre+Math.round(ease*end)+suf;if(p<1)requestAnimationFrame(step);}(performance.now()));
        io.unobserve(el);
      });
    },{threshold:.5});
    qsa('[data-target]').forEach(function(n){io.observe(n);});
  }

  /* ═══ 12  GALERÍA: FILTROS + LIGHTBOX + SWIPE ═══════════════ */
  function initGallery(){
    var btns=qsa('.gf-btn'),items=qsa('.gal-item');
    btns.forEach(function(btn){
      btn.addEventListener('click',function(){
        btns.forEach(function(b){b.classList.remove('gf-btn--active');});
        btn.classList.add('gf-btn--active');
        var f=btn.dataset.filter;
        items.forEach(function(item,idx){
          var show=f==='all'||item.dataset.cat===f;
          if(show){
            item.style.display='';item.style.opacity='0';item.style.transform='scale(.92) translateY(14px)';
            setTimeout(function(){item.style.transition='opacity .4s ease,transform .4s ease';item.style.opacity='1';item.style.transform='';},idx%4*55);
          } else {
            item.style.transition='opacity .25s ease';item.style.opacity='0';
            setTimeout((function(i){return function(){i.style.display='none';};}(item)),260);
          }
        });
      });
    });
    var ov=qs('#lb-overlay'),lbImg=qs('#lb-img'),lbClose=qs('#lb-close'),
        lbPrev=qs('#lb-prev'),lbNext=qs('#lb-next'),lbCount=qs('#lb-counter');
    if(!ov) return;
    var imgs=[],cur=0;
    function build(){imgs=qsa('.gal-item img').filter(function(i){return i.closest('.gal-item').style.display!=='none';});}
    function openLB(i){build();cur=i;showLB();ov.classList.add('lb-overlay--open');document.body.style.overflow='hidden';}
    function showLB(){var img=imgs[cur];if(!img)return;lbImg.style.opacity='0';lbImg.src=img.src;lbImg.alt=img.alt;
      lbImg.onload=function(){lbImg.style.transition='opacity .22s';lbImg.style.opacity='1';};
      if(lbCount)lbCount.textContent=(cur+1)+' / '+imgs.length;}
    function closeLB(){ov.classList.remove('lb-overlay--open');document.body.style.overflow='';}
    function prevLB(){build();cur=(cur-1+imgs.length)%imgs.length;showLB();}
    function nextLB(){build();cur=(cur+1)%imgs.length;showLB();}
    items.forEach(function(item,i){
      item.addEventListener('click',function(){openLB(i);});
      var z=item.querySelector('.gal-item__zoom');
      if(z) z.addEventListener('click',function(e){e.stopPropagation();openLB(i);});
    });
    ov.addEventListener('click',function(e){if(e.target===ov)closeLB();});
    if(lbClose) lbClose.addEventListener('click',closeLB);
    if(lbPrev)  lbPrev.addEventListener('click',function(e){e.stopPropagation();prevLB();});
    if(lbNext)  lbNext.addEventListener('click',function(e){e.stopPropagation();nextLB();});
    var tx0=0;
    ov.addEventListener('touchstart',function(e){tx0=e.touches[0].clientX;},{passive:true});
    ov.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx0;if(Math.abs(dx)>48){dx<0?nextLB():prevLB();}});
    document.addEventListener('keydown',function(e){
      if(!ov.classList.contains('lb-overlay--open')) return;
      if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')prevLB();if(e.key==='ArrowRight')nextLB();
    });
  }

  /* ═══ 13  SHOCKWAVE EN CLICK ════════════════════════════════ */
  function initShockwave(){
    injectCSS(
      '.shockwave{position:fixed;border-radius:50%;pointer-events:none;z-index:99990;'+
        'border:2px solid rgba(91,200,245,.55);animation:sw .65s ease forwards;}'+
      '@keyframes sw{to{transform:scale(1);opacity:0;}}'
    );
    document.addEventListener('click',function(e){
      var sw=document.createElement('div'); sw.className='shockwave';
      var size=130;
      sw.style.cssText='width:'+size+'px;height:'+size+'px;left:'+(e.clientX-size/2)+'px;top:'+(e.clientY-size/2)+'px;transform:scale(0);';
      document.body.appendChild(sw);
      setTimeout(function(){sw.remove();},680);
    });
  }

  /* ═══ 14  RIPPLE ════════════════════════════════════════════ */
  function initRipple(){
    injectCSS('@keyframes ripK{to{transform:scale(1);opacity:0;}}');
    qsa('.btn-primary,.gf-btn,.sn-cta').forEach(function(btn){
      btn.style.position='relative';btn.style.overflow='hidden';
      btn.addEventListener('click',function(e){
        var r=btn.getBoundingClientRect(),sz=Math.max(r.width,r.height)*2;
        var rip=document.createElement('span');
        rip.style.cssText='position:absolute;border-radius:50%;background:rgba(255,255,255,.22);'+
          'width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;'+
          'top:'+(e.clientY-r.top-sz/2)+'px;transform:scale(0);pointer-events:none;'+
          'animation:ripK .55s ease forwards;';
        btn.appendChild(rip); setTimeout(function(){rip.remove();},600);
      });
    });
  }

  /* ═══ 15  DOTS DE SECCIÓN ═══════════════════════════════════ */
  function initDots(){
    var secs=[{id:'about',label:'Nosotros'},{id:'servicios',label:'Servicios'},
      {id:'galeria',label:'Galería'},{id:'productos',label:'Productos'},{id:'contacto',label:'Contacto'}];
    var nav=document.createElement('nav'); nav.className='sdots';
    nav.innerHTML=secs.map(function(s){
      return '<a href="#'+s.id+'" class="sdot" data-sec="'+s.id+'" title="'+s.label+'">'+
        '<span></span><em>'+s.label+'</em></a>';
    }).join('');
    document.body.appendChild(nav);
    injectCSS(
      '.sdots{position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);'+
        'display:flex;flex-direction:column;gap:.55rem;z-index:600;}'+
      '.sdot{display:flex;align-items:center;gap:.55rem;cursor:pointer;text-decoration:none;justify-content:flex-end;}'+
      '.sdot span{width:7px;height:7px;border-radius:50%;flex-shrink:0;'+
        'background:rgba(255,255,255,.18);border:1.5px solid rgba(255,255,255,.22);'+
        'transition:background .3s,transform .3s,box-shadow .3s;}'+
      '.sdot em{font-family:"Barlow",sans-serif;font-size:.60rem;font-weight:700;'+
        'letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);font-style:normal;'+
        'opacity:0;transform:translateX(6px);pointer-events:none;transition:opacity .25s,transform .25s;white-space:nowrap;}'+
      '.sdot:hover em,.sdot.sd-on em{opacity:1;transform:none;}'+
      '.sdot:hover span,.sdot.sd-on span{background:#5bc8f5;transform:scale(1.5);box-shadow:0 0 10px rgba(91,200,245,.5);}'+
      '.sdot.sd-on em{color:#5bc8f5;}'+
      '@media(max-width:1024px){.sdots{display:none;}}'
    );
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var d=nav.querySelector('[data-sec="'+e.target.id+'"]');
        if(d) d.classList.toggle('sd-on',e.isIntersecting);
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    secs.forEach(function(s){var el=document.getElementById(s.id);if(el)io.observe(el);});
  }

  /* ═══ 16  TOAST ════════════════════════════════════════════ */
  function toast(msg,type){
    var box=qs('#toast-box')||(function(){
      var b=document.createElement('div');b.id='toast-box';
      b.style.cssText='position:fixed;bottom:1.6rem;right:1.5rem;display:flex;'+
        'flex-direction:column;gap:.5rem;z-index:99998;pointer-events:none;';
      document.body.appendChild(b);return b;
    }());
    var t=document.createElement('div');t.className='pav-toast pav-toast--'+(type||'info');
    t.innerHTML='<span class="pt-ico"></span><span>'+msg+'</span>';
    box.appendChild(t);
    requestAnimationFrame(function(){requestAnimationFrame(function(){t.classList.add('pt-in');});});
    setTimeout(function(){t.classList.remove('pt-in');setTimeout(function(){t.remove();},380);},3800);
  }
  window.pavToast=toast;
  injectCSS(
    '.pav-toast{pointer-events:auto;display:flex;align-items:center;gap:.7rem;'+
      'background:rgba(11,21,40,.94);border:1px solid rgba(91,200,245,.22);border-radius:12px;'+
      'padding:.8rem 1.3rem;font-family:"Barlow",sans-serif;font-size:.84rem;color:#fff;'+
      'backdrop-filter:blur(14px);opacity:0;transform:translateX(20px);'+
      'transition:opacity .32s,transform .32s;max-width:300px;box-shadow:0 8px 28px rgba(0,0,0,.35);}'+
    '.pav-toast.pt-in{opacity:1;transform:none;}'+
    '.pav-toast--success .pt-ico::before{content:"✓";color:#22c55e;font-weight:700;}'+
    '.pav-toast--info    .pt-ico::before{content:"ℹ";color:#5bc8f5;}'+
    '.pav-toast--warn    .pt-ico::before{content:"⚠";color:#f59e0b;}'+
    '.pav-toast--error   .pt-ico::before{content:"✕";color:#ef4444;}'
  );
  function initToasts(){
    setTimeout(function(){toast('¡Bienvenido a Agencia 247!','info');},900);
    var cta=qs('.btn-primary');
    if(cta) cta.addEventListener('click',function(e){e.preventDefault();toast('¡Te contactaremos pronto!','success');});
  }

  /* ═══ 17  MODO CLARO / OSCURO ══════════════════════════════ */


  /* ═══ 18  STAT GLOW ═════════════════════════════════════════ */
  function initStatGlow(){
    qsa('.s-hero__stat').forEach(function(s){
      s.addEventListener('mouseenter',function(){s.style.cssText+='background:rgba(91,200,245,.07);box-shadow:inset 0 0 30px rgba(91,200,245,.06);transition:background .3s,box-shadow .3s;';});
      s.addEventListener('mouseleave',function(){s.style.background='';s.style.boxShadow='';});
    });
  }

  /* ═══ 19  SMOOTH SCROLL ═════════════════════════════════════ */
  function initSmoothScroll(){
    document.addEventListener('click',function(e){
      var a=e.target.closest('a[href^="#"]');if(!a) return;
      var target=document.querySelector(a.getAttribute('href'));if(!target) return;
      e.preventDefault();
      window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-68,behavior:'smooth'});
    });
  }

  /* ═══ 20  TOOLBAR FLOTANTE ══════════════════════════════════ */


  /* ═══════════════════════════════════════════════════════════
     21  VIDEO PREVIEW EN HOVER DE GALERÍA
     Muestra un GIF/loop de video simulado con gradiente animado
  ══════════════════════════════════════════════════════════════ */
  function initGalleryHoverFx(){
    injectCSS(
      '.gal-item::after{content:"";position:absolute;inset:0;opacity:0;z-index:3;pointer-events:none;'+
        'background:linear-gradient(135deg,rgba(35,83,232,.22) 0%,rgba(91,200,245,.18) 100%);'+
        'transition:opacity .35s;}'+
      '.gal-item:hover::after{opacity:1;}'+
      '.gal-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);'+
        'z-index:4;width:52px;height:52px;border-radius:50%;'+
        'background:rgba(255,255,255,.15);backdrop-filter:blur(8px);'+
        'display:flex;align-items:center;justify-content:center;pointer-events:none;'+
        'transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .3s;}'+
      '.gal-item:hover .gal-play{transform:translate(-50%,-50%) scale(1);}'+
      '.gal-play svg{width:20px;height:20px;fill:#fff;margin-left:3px;}'
    );
    qsa('.gal-item').forEach(function(item){
      var play=document.createElement('div'); play.className='gal-play';
      play.innerHTML='<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      item.appendChild(play);
    });
  }

  /* ═══════════════════════════════════════════════════════════
     22  FORMULARIO DE CONTACTO INTERACTIVO
  ══════════════════════════════════════════════════════════════ */
  function initContactForm(){
    var cta=qs('.s-cta__inner'); if(!cta) return;
    var form=document.createElement('div'); form.className='pav-form reveal';
    form.innerHTML=
      '<div class="pf-fields">'+
        '<div class="pf-group"><label>Nombre</label><input type="text" placeholder="Tu nombre" id="pf-name"/></div>'+
        '<div class="pf-group"><label>Email</label><input type="email" placeholder="tu@email.com" id="pf-email"/></div>'+
        '<div class="pf-group pf-group--full"><label>Servicio</label>'+
          '<div class="pf-chips">'+
            '<button type="button" class="pf-chip" data-val="foto">Fotografía</button>'+
            '<button type="button" class="pf-chip" data-val="video">Video Corp.</button>'+
            '<button type="button" class="pf-chip" data-val="comercial">Comercial</button>'+
            '<button type="button" class="pf-chip" data-val="motion">Motion</button>'+
            '<button type="button" class="pf-chip" data-val="redes">Redes</button>'+
            '<button type="button" class="pf-chip" data-val="post">Postprod.</button>'+
          '</div>'+
        '</div>'+
        '<div class="pf-group pf-group--full"><label>Mensaje</label>'+
          '<textarea placeholder="Cuéntanos sobre tu proyecto..." id="pf-msg" rows="3"></textarea></div>'+
      '</div>'+
      '<div class="pf-footer">'+
        '<button class="btn-primary pf-submit" type="button" id="pf-send">Enviar mensaje</button>'+
        '<p class="pf-note">Respondemos en menos de 24 horas</p>'+
      '</div>';
    cta.appendChild(form);

    injectCSS(
      '.pav-form{width:100%;max-width:640px;margin:2.5rem auto 0;text-align:left;}'+
      '.pf-fields{display:grid;grid-template-columns:1fr 1fr;gap:.9rem;margin-bottom:1.2rem;}'+
      '.pf-group{display:flex;flex-direction:column;gap:.4rem;}'+
      '.pf-group--full{grid-column:1/-1;}'+
      '.pf-group label{font-family:"Barlow",sans-serif;font-size:.68rem;font-weight:700;'+
        'letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);}'+
      '.pf-group input,.pf-group textarea{font-family:"Barlow",sans-serif;font-size:.9rem;'+
        'color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.10);'+
        'border-radius:10px;padding:.75rem 1rem;outline:none;resize:none;'+
        'transition:border-color .25s,background .25s,box-shadow .25s;}'+
      '.pf-group input:focus,.pf-group textarea:focus{border-color:rgba(91,200,245,.45);'+
        'background:rgba(255,255,255,.09);box-shadow:0 0 0 3px rgba(91,200,245,.10);}'+
      '.pf-group input.pf-error,.pf-group textarea.pf-error{border-color:rgba(239,68,68,.5)!important;}'+
      '.pf-chips{display:flex;flex-wrap:wrap;gap:.45rem;}'+
      '.pf-chip{font-family:"Barlow",sans-serif;font-size:.68rem;font-weight:700;'+
        'letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.45);'+
        'border:1px solid rgba(255,255,255,.12);border-radius:100px;'+
        'padding:.3rem .9rem;background:transparent;cursor:pointer;'+
        'transition:color .2s,border-color .2s,background .2s;}'+
      '.pf-chip:hover{color:rgba(255,255,255,.8);border-color:rgba(91,200,245,.35);}'+
      '.pf-chip.on{color:#5bc8f5;border-color:rgba(91,200,245,.55);background:rgba(91,200,245,.10);}'+
      '.pf-footer{display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap;}'+
      '.pf-note{font-family:"Barlow",sans-serif;font-size:.75rem;color:rgba(255,255,255,.28);}'+
      '.pf-submit.sending{pointer-events:none;opacity:.7;}'+
      '@media(max-width:600px){.pf-fields{grid-template-columns:1fr;}}'
    );

    qsa('.pf-chip',form).forEach(function(chip){
      chip.addEventListener('click',function(){chip.classList.toggle('on');playClick();});
    });

    /* Validación + envío simulado */
    var sendBtn=document.getElementById('pf-send');
    if(sendBtn) sendBtn.addEventListener('click',function(){
      var name=document.getElementById('pf-name');
      var email=document.getElementById('pf-email');
      var msg=document.getElementById('pf-msg');
      var ok=true;
      [name,email,msg].forEach(function(f){f.classList.remove('pf-error');});
      if(!name||!name.value.trim()){if(name)name.classList.add('pf-error');ok=false;}
      if(!email||!/\S+@\S+\.\S+/.test(email.value)){if(email)email.classList.add('pf-error');ok=false;}
      if(!msg||!msg.value.trim()){if(msg)msg.classList.add('pf-error');ok=false;}
      if(!ok){toast('Por favor, completa todos los campos correctamente.','warn');playError();return;}
      sendBtn.classList.add('sending'); sendBtn.textContent='Enviando...';
      playSuccess();
      setTimeout(function(){
        sendBtn.classList.remove('sending'); sendBtn.textContent='¡Enviado ✓';
        sendBtn.style.background='#16a34a';
        toast('¡Mensaje enviado! Nos pondremos en contacto pronto.','success');
        if(name) name.value=''; if(email) email.value=''; if(msg) msg.value='';
        qsa('.pf-chip',form).forEach(function(c){c.classList.remove('on');});
        setTimeout(function(){sendBtn.textContent='Enviar mensaje';sendBtn.style.background='';},3000);
      },1800);
    });
  }

  /* ═══════════════════════════════════════════════════════════
     23  SECCIÓN FAQ / ACORDEÓN
  ══════════════════════════════════════════════════════════════ */
  function initFAQ(){
    var products=qs('.s-products'); if(!products) return;
    var faqSection=document.createElement('section');
    faqSection.className='s-faq';
    faqSection.innerHTML=
      '<div class="container">'+
        '<div class="section-head section-head--center reveal">'+
          '<p class="eyebrow">Preguntas frecuentes</p>'+
          '<h2 class="section-title">TIENES <em>DUDAS?</em></h2>'+
        '</div>'+
        '<div class="faq-list">'+
          faqData().map(function(q,i){
            return '<div class="faq-item reveal delay-'+(i%3+1)+'">'+
              '<button class="faq-q" aria-expanded="false">'+
                '<span>'+q.q+'</span>'+
                '<svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+
                  '<path d="M6 9l6 6 6-6"/></svg>'+
              '</button>'+
              '<div class="faq-a"><p>'+q.a+'</p></div>'+
            '</div>';
          }).join('')+
        '</div>'+
      '</div>';
    products.insertAdjacentElement('afterend',faqSection);

    injectCSS(
      '.s-faq{padding:6rem 0;background:var(--c-deep,#060c1c);}'+
      '.faq-list{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:.6rem;}'+
      '.faq-item{border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;'+
        'background:rgba(255,255,255,.03);transition:border-color .3s;}'+
      '.faq-item.open{border-color:rgba(91,200,245,.28);}'+
      '.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;'+
        'padding:1.2rem 1.5rem;background:none;cursor:pointer;text-align:left;'+
        'font-family:"Barlow Semi Condensed",sans-serif;font-size:1rem;font-weight:600;'+
        'color:rgba(255,255,255,.82);gap:1rem;transition:color .2s;}'+
      '.faq-q:hover{color:#fff;}'+
      '.faq-item.open .faq-q{color:#5bc8f5;}'+
      '.faq-icon{width:20px;height:20px;flex-shrink:0;stroke:currentColor;'+
        'transition:transform .35s cubic-bezier(.16,1,.3,1);}'+
      '.faq-item.open .faq-icon{transform:rotate(180deg);}'+
      '.faq-a{max-height:0;overflow:hidden;transition:max-height .45s cubic-bezier(.16,1,.3,1),padding .35s;}'+
      '.faq-item.open .faq-a{max-height:200px;padding-bottom:.2rem;}'+
      '.faq-a p{font-family:"Barlow",sans-serif;font-size:.9rem;line-height:1.75;'+
        'color:rgba(255,255,255,.48);padding:0 1.5rem 1.2rem;}'
    );

    qsa('.faq-q',faqSection).forEach(function(btn){
      btn.addEventListener('click',function(){
        var item=btn.parentElement;
        var isOpen=item.classList.contains('open');
        qsa('.faq-item',faqSection).forEach(function(i){i.classList.remove('open');i.querySelector('.faq-q').setAttribute('aria-expanded','false');});
        if(!isOpen){item.classList.add('open');btn.setAttribute('aria-expanded','true');}
        playClick();
      });
    });
  }

  function faqData(){return[
    {q:'¿Cuánto tiempo toma producir un video corporativo?',a:'Dependiendo de la complejidad, un video corporativo completo toma entre 1 a 3 semanas desde la pre-producción hasta la entrega final. Para proyectos urgentes ofrecemos entregas express.'},
    {q:'¿Trabajan fuera de Puno?',a:'Sí, viajamos a cualquier ciudad del Perú y también operamos internacionalmente. Los costos de desplazamiento se coordinan según el proyecto.'},
    {q:'¿En qué formatos entregan el material?',a:'Entregamos en todos los formatos digitales: MP4 (H.264/H.265), MOV, archivos 4K/HD, y formatos optimizados para cada plataforma (Instagram, YouTube, TikTok, etc.).'},
    {q:'¿Incluyen guión y concepto creativo?',a:'Sí, todos nuestros paquetes incluyen desarrollo de concepto creativo y guión. Trabajamos contigo para asegurar que el mensaje refleje perfectamente tu marca.'},
    {q:'¿Cómo es el proceso de revisiones?',a:'Incluimos hasta 3 rondas de revisión en todos los proyectos. Para revisiones adicionales coordinamos costos por separado según el alcance de los cambios.'}
  ];}

  /* ═══════════════════════════════════════════════════════════
     24  TICKER / MARQUEE ANIMADO
  ══════════════════════════════════════════════════════════════ */
  function initTicker(){
    var about=qs('.s-about'); if(!about) return;
    var ticker=document.createElement('div'); ticker.className='pav-ticker';
    var words=['Fotografía Profesional','Video Corporativo','Motion Graphics','Color Grading',
      'Sound Design','Video Comercial','Contenido Digital','Postproducción 4K',
      'Fotografía Profesional','Video Corporativo','Motion Graphics','Color Grading'];
    var inner='<div class="ticker-inner">'+
      words.map(function(w){return '<span>'+w+' <b>·</b></span>';}).join('')+
      words.map(function(w){return '<span>'+w+' <b>·</b></span>';}).join('')+
    '</div>';
    ticker.innerHTML=inner;
    about.insertAdjacentElement('beforebegin',ticker);
    injectCSS(
      '.pav-ticker{overflow:hidden;background:rgba(35,83,232,.15);border-top:1px solid rgba(35,83,232,.25);border-bottom:1px solid rgba(35,83,232,.25);padding:.65rem 0;}'+
      '.ticker-inner{display:flex;gap:0;animation:tickerAnim 28s linear infinite;white-space:nowrap;width:max-content;}'+
      '.ticker-inner:hover{animation-play-state:paused;}'+
      '.ticker-inner span{font-family:"Barlow Condensed",sans-serif;font-size:1.05rem;font-weight:700;'+
        'letter-spacing:.05em;text-transform:uppercase;color:rgba(255,255,255,.5);padding:0 .8rem;}'+
      '.ticker-inner b{color:#2353e8;font-weight:900;}'+
      '@keyframes tickerAnim{from{transform:translateX(0);}to{transform:translateX(-50%);}}'
    );
  }

  /* ═══════════════════════════════════════════════════════════
     25  EASTER EGG: KONAMI CODE  ↑↑↓↓←→←→BA
  ══════════════════════════════════════════════════════════════ */
  function initKonamiCode(){
    var code=[38,38,40,40,37,39,37,39,66,65], pos=0;
    document.addEventListener('keydown',function(e){
      if(e.keyCode===code[pos]){pos++;} else {pos=0;}
      if(pos===code.length){
        pos=0;
        /* Fiesta de confeti */
        launchConfetti();
        toast('🎉 ¡KONAMI CODE! Modo Fiesta activado.','success');
      }
    });
  }

  function launchConfetti(){
    var colors=['#2353e8','#5bc8f5','#ffffff','#f59e0b','#22c55e'];
    for(var i=0;i<80;i++){
      (function(delay){
        setTimeout(function(){
          var c=document.createElement('div');
          var color=colors[Math.floor(Math.random()*colors.length)];
          var size=Math.random()*8+4;
          c.style.cssText='position:fixed;top:-10px;left:'+(Math.random()*100)+'vw;'+
            'width:'+size+'px;height:'+size+'px;background:'+color+';border-radius:'+(Math.random()>0.5?'50%':'2px')+';'+
            'pointer-events:none;z-index:99999;'+
            'animation:confettiF '+(Math.random()*2+1.5)+'s ease forwards;';
          document.body.appendChild(c);
          setTimeout(function(){c.remove();},3500);
        },delay);
      }(i*30));
    }
    if(!qs('#confetti-style')){
      var s=document.createElement('style');s.id='confetti-style';
      s.textContent='@keyframes confettiF{to{transform:translateY(105vh) rotate('+(Math.random()*720)+'deg);opacity:0;}}';
      document.head.appendChild(s);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     26  CURSOR TRAIL DE CHISPAS
  ══════════════════════════════════════════════════════════════ */
  function initSparkTrail(){
    if(window.matchMedia('(pointer:coarse)').matches) return;
    injectCSS(
      '.spark{position:fixed;pointer-events:none;z-index:99990;border-radius:50%;'+
        'animation:sparkFade .6s ease forwards;}'+
      '@keyframes sparkFade{to{transform:translate(var(--sx),var(--sy)) scale(0);opacity:0;}}'
    );
    var lastX=0,lastY=0,throttle=0;
    window.addEventListener('mousemove',function(e){
      if(++throttle%3!==0) return; /* cada 3 eventos */
      var dx=e.clientX-lastX,dy=e.clientY-lastY;
      if(Math.abs(dx)+Math.abs(dy)<4) return;
      lastX=e.clientX;lastY=e.clientY;
      var sp=document.createElement('div'); sp.className='spark';
      var size=Math.random()*5+2;
      var angle=Math.random()*Math.PI*2;
      var dist=Math.random()*30+10;
      sp.style.cssText+='width:'+size+'px;height:'+size+'px;'+
        'left:'+(e.clientX-size/2)+'px;top:'+(e.clientY-size/2)+'px;'+
        'background:rgba(91,200,245,'+(Math.random()*.5+.3)+');'+
        '--sx:'+(Math.cos(angle)*dist)+'px;--sy:'+(Math.sin(angle)*dist)+'px;';
      document.body.appendChild(sp);
      setTimeout(function(){sp.remove();},650);
    },{passive:true});
  }

  /* ═══════════════════════════════════════════════════════════
     27  CONTADOR REGRESIVO DE OFERTA
  ══════════════════════════════════════════════════════════════ */
  function initCountdown(){
    var cta=qs('.s-cta__inner'); if(!cta) return;
    /* Descuento expira en 72h desde ahora */
    var key='pav-deadline';
    var deadline=localStorage.getItem(key);
    if(!deadline){
      deadline=Date.now()+72*60*60*1000;
      localStorage.setItem(key,deadline);
    }
    deadline=parseInt(deadline);
    var strip=document.createElement('div'); strip.className='countdown-strip';
    strip.innerHTML=
      '<span class="cd-label">🎬 Oferta de lanzamiento — termina en:</span>'+
      '<div class="cd-clock">'+
        '<div class="cd-unit"><b id="cd-h">00</b><small>horas</small></div>'+
        '<div class="cd-sep">:</div>'+
        '<div class="cd-unit"><b id="cd-m">00</b><small>min</small></div>'+
        '<div class="cd-sep">:</div>'+
        '<div class="cd-unit"><b id="cd-s">00</b><small>seg</small></div>'+
      '</div>';
    cta.insertAdjacentElement('beforebegin',strip);
    injectCSS(
      '.countdown-strip{display:flex;align-items:center;justify-content:center;gap:1.5rem;'+
        'background:rgba(35,83,232,.18);border:1px solid rgba(35,83,232,.35);'+
        'border-radius:100px;padding:.6rem 2rem;margin-bottom:2rem;flex-wrap:wrap;}'+
      '.cd-label{font-family:"Barlow",sans-serif;font-size:.78rem;font-weight:600;'+
        'color:rgba(255,255,255,.65);}'+
      '.cd-clock{display:flex;align-items:center;gap:.4rem;}'+
      '.cd-unit{display:flex;flex-direction:column;align-items:center;gap:.05rem;}'+
      '.cd-unit b{font-family:"Barlow Condensed",sans-serif;font-size:1.5rem;font-weight:900;'+
        'color:#5bc8f5;line-height:1;min-width:2ch;text-align:center;}'+
      '.cd-unit small{font-family:"Barlow",sans-serif;font-size:.55rem;font-weight:700;'+
        'letter-spacing:.10em;text-transform:uppercase;color:rgba(255,255,255,.3);}'+
      '.cd-sep{font-family:"Barlow Condensed",sans-serif;font-size:1.5rem;font-weight:900;'+
        'color:rgba(91,200,245,.4);line-height:1;}'
    );
    function pad(n){return String(n).padStart(2,'0');}
    function tick(){
      var diff=Math.max(0,deadline-Date.now());
      var h=Math.floor(diff/3600000);
      var m=Math.floor((diff%3600000)/60000);
      var s=Math.floor((diff%60000)/1000);
      var elH=document.getElementById('cd-h'),elM=document.getElementById('cd-m'),elS=document.getElementById('cd-s');
      if(elH) elH.textContent=pad(h);
      if(elM) elM.textContent=pad(m);
      if(elS) elS.textContent=pad(s);
      if(diff>0) requestAnimationFrame(tick);
      else strip.style.opacity='.4';
    }
    tick();
  }

  /* ═══════════════════════════════════════════════════════════
     28  PARALLAX MULTI-CAPA AL SCROLL
  ══════════════════════════════════════════════════════════════ */
  function initScrollParallax(){
    var layers=[
      {sel:'.s-about__media img',speed:.15},
      {sel:'.s-philosophy__media img',speed:.12},
      {sel:'.s-cta__bg img',speed:.20}
    ];
    function update(){
      layers.forEach(function(l){
        var el=qs(l.sel); if(!el) return;
        var rect=el.closest('section').getBoundingClientRect();
        var progress=-(rect.top/(window.innerHeight+rect.height));
        el.style.transform='scale(1.12) translateY('+(-progress*100*l.speed)+'px)';
      });
    }
    window.addEventListener('scroll',update,{passive:true});
    update();
  }

  /* ═══════════════════════════════════════════════════════════
     29  AUDIO FEEDBACK (Web Audio API)
     Sonidos sutiles en clicks e interacciones
  ══════════════════════════════════════════════════════════════ */
  var _audioCtx=null;
  function getAudio(){
    if(!_audioCtx) try{_audioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}
    return _audioCtx;
  }
  function playTone(freq,dur,type,vol){
    var ac=getAudio(); if(!ac) return;
    try{
      var osc=ac.createOscillator(), gain=ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type=type||'sine'; osc.frequency.value=freq;
      gain.gain.setValueAtTime(vol||0.04,ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001,ac.currentTime+(dur||0.12));
      osc.start(); osc.stop(ac.currentTime+(dur||0.12));
    }catch(e){}
  }
  function playClick(){playTone(880,.06,'sine',.035);}
  function playSuccess(){playTone(523,.08,'sine',.04);setTimeout(function(){playTone(659,.08,'sine',.04);},100);setTimeout(function(){playTone(784,.15,'sine',.04);},200);}
  function playError(){playTone(200,.18,'sawtooth',.03);}

  function initAudioFeedback(){
    /* Activar AudioContext en primer gesto (política de navegadores) */
    document.addEventListener('click',function activateAudio(){
      getAudio();
      document.removeEventListener('click',activateAudio);
    },{once:true});
    /* Click en cards */
    qsa('.svc-card,.prod-card,.gf-btn,.faq-q').forEach(function(el){
      el.addEventListener('click',function(){playClick();});
    });
    /* Hover en stats */
    qsa('.s-hero__stat').forEach(function(el){
      el.addEventListener('mouseenter',function(){playTone(660,.04,'sine',.02);});
    });
  }

  /* ═══════════════════════════════════════════════════════════
     30  PANEL DRAG "BEHIND THE SCENES"
     Slide horizontal que revela una imagen "before/after"
  ══════════════════════════════════════════════════════════════ */
  function initBeforeAfter(){
    var philosophy=qs('.s-philosophy'); if(!philosophy) return;
    var panel=document.createElement('div'); panel.className='ba-panel reveal';
    panel.innerHTML=
      '<div class="ba-wrap">'+
        '<div class="ba-head">'+
          '<p class="eyebrow">Proceso creativo</p>'+
          '<h3 class="ba-title">ANTES <em>/ DESPUÉS</em></h3>'+
        '</div>'+
        '<div class="ba-slider" id="ba-slider">'+
          '<div class="ba-after"><img src="image.png" alt="Resultado final"/><span class="ba-lbl ba-lbl--after">RESULTADO</span></div>'+
          '<div class="ba-before" id="ba-before"><img src="image.png" alt="Material en bruto" style="filter:grayscale(1) brightness(.6)"/><span class="ba-lbl ba-lbl--before">EN BRUTO</span></div>'+
          '<div class="ba-divider" id="ba-divider">'+
            '<div class="ba-handle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+
              '<path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg></div>'+
          '</div>'+
        '</div>'+
      '</div>';
    philosophy.insertAdjacentElement('afterend',panel);

    injectCSS(
      '.ba-panel{padding:5rem 0;background:var(--c-navy,#0b1528);}'+
      '.ba-wrap{max-width:900px;margin:0 auto;padding:0 4rem;}'+
      '.ba-head{text-align:center;margin-bottom:2.5rem;}'+
      '.ba-title{font-family:"Barlow Condensed",sans-serif;font-size:clamp(2rem,4vw,3.5rem);'+
        'font-weight:900;text-transform:uppercase;letter-spacing:-.02em;color:#fff;margin:.4rem 0;}'+
      '.ba-title em{font-style:italic;background:linear-gradient(100deg,#2353e8,#5bc8f5);'+
        '-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}'+
      '.ba-slider{position:relative;height:360px;border-radius:18px;overflow:hidden;user-select:none;cursor:ew-resize;'+
        'box-shadow:0 24px 60px rgba(0,0,0,.4);}'+
      '.ba-after,.ba-before{position:absolute;inset:0;}'+
      '.ba-before{width:50%;overflow:hidden;border-right:2px solid rgba(255,255,255,.6);}'+
      '.ba-after img,.ba-before img{width:100%;height:100%;object-fit:cover;pointer-events:none;}'+
      '.ba-before img{width:calc(100vw);max-width:900px;}'+
      '.ba-lbl{position:absolute;bottom:.8rem;font-family:"Barlow",sans-serif;font-size:.62rem;'+
        'font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:rgba(0,0,0,.55);'+
        'padding:.25rem .7rem;border-radius:100px;color:#fff;pointer-events:none;}'+
      '.ba-lbl--after{right:.8rem;}.ba-lbl--before{left:.8rem;}'+
      '.ba-divider{position:absolute;top:0;bottom:0;left:50%;width:2px;background:rgba(255,255,255,.6);'+
        'display:flex;align-items:center;justify-content:center;cursor:ew-resize;}'+
      '.ba-handle{width:42px;height:42px;border-radius:50%;background:#fff;'+
        'display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.35);}'+
      '.ba-handle svg{width:18px;height:18px;stroke:#0b1630;}'+
      '@media(max-width:768px){.ba-wrap{padding:0 1.5rem;}.ba-slider{height:220px;}}'
    );

    /* Drag logic */
    var slider=document.getElementById('ba-slider');
    var before=document.getElementById('ba-before');
    var divider=document.getElementById('ba-divider');
    if(!slider||!before||!divider) return;
    var dragging=false;
    function setPos(pct){
      pct=clamp(pct,5,95);
      before.style.width=pct+'%';
      divider.style.left=pct+'%';
    }
    function getRelX(e){
      var r=slider.getBoundingClientRect();
      var x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
      return (x/r.width)*100;
    }
    slider.addEventListener('mousedown',function(e){dragging=true;setPos(getRelX(e));});
    slider.addEventListener('touchstart',function(e){dragging=true;setPos(getRelX(e));},{passive:true});
    window.addEventListener('mousemove',function(e){if(dragging)setPos(getRelX(e));});
    window.addEventListener('touchmove',function(e){if(dragging)setPos(getRelX(e));},{passive:true});
    window.addEventListener('mouseup',function(){dragging=false;});
    window.addEventListener('touchend',function(){dragging=false;});
  }


  /* ═══ CURSOR LIENZO (CROSSHAIR) ═══════════════════════════ */
  function initCursor(){
    // Use native cursor to avoid low-FPS lag from the overlay crosshair.
    return;
  }


  /* ═══ SCROLL TO TOP ════════════════════════════════════════ */
  function initScrollTop(){
    var btn=document.createElement('button'); btn.id='btn-top'; btn.setAttribute('aria-label','Volver arriba');
    btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);
    injectCSS(
      '#btn-top{position:fixed;bottom:1.8rem;right:1.5rem;z-index:800;'+
        'width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.14);'+
        'background:rgba(11,21,40,.82);backdrop-filter:blur(10px);'+
        'display:flex;align-items:center;justify-content:center;cursor:pointer;'+
        'opacity:0;pointer-events:none;transition:opacity .3s,transform .2s,background .2s;}'+
      '#btn-top.show{opacity:1;pointer-events:auto;}'+
      '#btn-top:hover{background:rgba(35,83,232,.5);transform:translateY(-3px);}'+
      '#btn-top svg{width:16px;height:16px;stroke:rgba(255,255,255,.75);}'
    );
    window.addEventListener('scroll',function(){btn.classList.toggle('show',window.scrollY>400);},{passive:true});
    btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
  }

  /* ═══════════════════════════════════════════════════════════
     BOOT — arranque en orden
  ══════════════════════════════════════════════════════════════ */
  function boot(){
    initLoader();
    initProgressBar();
    initReveal();
    initCounters();
    initSmoothScroll();
    initParticles();
    initParallax();
    initScrollParallax();
    initTypewriter();
    initCursor();
    initTilt();
    initMagnetic();
    initGallery();
    initGalleryHoverFx();
    initRipple();
    initDots();
    initStatGlow();
    initTicker();
    initFAQ();
    initContactForm();
    initCountdown();
    initBeforeAfter();
    initKonamiCode();
    initScrollTop();
    initToasts();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot);
  } else {
    boot();
  }

}());
