/* Harbourside Dental: mobile menu, hero video, treatments carousel, opening hours and form validation */
(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu */
  var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');
  function setNav(o){n.classList.toggle('open',o);t.setAttribute('aria-expanded',o?'true':'false');t.setAttribute('aria-label',o?'Close menu':'Open menu');}
  t.addEventListener('click',function(){setNav(!n.classList.contains('open'));});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setNav(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){setNav(false);t.focus();}});

  /* Hero video */
  var hv=document.getElementById('hero-video'),vc=document.querySelector('.video-ctrl');
  function setPaused(p){if(p){hv.pause();}else{var pr=hv.play();if(pr&&pr.catch)pr.catch(function(){});}vc.setAttribute('aria-pressed',p?'true':'false');vc.setAttribute('aria-label',p?'Play background video':'Pause background video');}
  if(reduce){hv.removeAttribute('autoplay');setPaused(true);}
  vc.addEventListener('click',function(){setPaused(!hv.paused);});

  /* Lazy videos */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){var v=en.target;
      if(en.isIntersecting){if(!v.dataset.loaded){v.querySelectorAll('source[data-src]').forEach(function(s){s.src=s.dataset.src;});v.load();v.dataset.loaded='1';}if(!reduce){var p=v.play();if(p&&p.catch)p.catch(function(){});}}
      else{v.pause();}});},{rootMargin:'200px 0px'});
    document.querySelectorAll('.lazy-video').forEach(function(v){io.observe(v);});
  }

  /* Treatments carousel: continuous smooth flow, pauses on hover/focus; scrollable list with reduced motion */
  (function(){
    var car=document.querySelector('.carousel');if(!car||reduce)return;
    var track=car.querySelector('.car-track'),cards=[].slice.call(track.children);
    cards.forEach(function(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.setAttribute('inert','');track.appendChild(k);});
    car.querySelector('.car-viewport').removeAttribute('tabindex');
    car.style.setProperty('--dur',(cards.length*8)+'s');
    car.classList.add('is-running');
    b.addEventListener('click',function(){var p=car.classList.toggle('paused');b.setAttribute('aria-pressed',p?'true':'false');l.textContent=p?'Play carousel':'Pause carousel';});
  })();

  /* Open now */
  (function(){
    var hrs={0:null,1:[8,19],2:[8,19],3:[8,19],4:[8,19],5:[8,19],6:[9,13]};
    var d=new Date(),day=d.getDay(),h=d.getHours()+d.getMinutes()/60,r=hrs[day];
    var open=!!r&&h>=r[0]&&h<r[1];
    function fmt(x){var hh=Math.floor(x),mm=Math.round((x-hh)*60);return hh+':'+(mm<10?'0':'')+mm;}
    document.getElementById('open-pill').classList.toggle('is-open',open);
    document.getElementById('open-text').textContent=open?('Open now · until '+fmt(r[1])):(r&&h<r[0]?('Opens today at '+fmt(r[0])):'Closed now');
    document.querySelectorAll('.hours tr').forEach(function(tr){if(tr.dataset.days.split(',').indexOf(String(day))>-1)tr.classList.add('today');});
  })();

  /* Form validation */
  document.querySelectorAll('form.enquiry').forEach(function(form){
    var summary=document.createElement('div');summary.className='err-summary';summary.setAttribute('role','alert');summary.tabIndex=-1;summary.hidden=true;form.insertBefore(summary,form.firstChild);
    var fields=form.querySelectorAll('[required]');
    function labelFor(f){var l=form.querySelector('label[for="'+f.id+'"]');return l?l.childNodes[0].textContent.trim().toLowerCase():'this field';}
    function check(f){
      var err=document.getElementById(f.id+'-err');
      if(!err){err=document.createElement('p');err.id=f.id+'-err';err.className='field-err';f.insertAdjacentElement('afterend',err);}
      var v=f.validity,m='';
      if(v.valueMissing)m='Enter your '+labelFor(f);else if(v.typeMismatch)m='Enter a valid '+labelFor(f);
      err.textContent=m;err.hidden=!m;
      if(m){f.setAttribute('aria-invalid','true');f.setAttribute('aria-describedby',err.id);}else{f.removeAttribute('aria-invalid');f.removeAttribute('aria-describedby');}
      return m;
    }
    fields.forEach(function(f){f.addEventListener('blur',function(){if(f.value||f.getAttribute('aria-invalid'))check(f);});f.addEventListener('input',function(){if(f.getAttribute('aria-invalid'))check(f);});});
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var problems=[];fields.forEach(function(f){var m=check(f);if(m)problems.push([f,m]);});
      if(problems.length){
        summary.innerHTML='';var h=document.createElement('p');h.className='err-title';h.textContent='There is a problem';summary.appendChild(h);
        var ul=document.createElement('ul');problems.forEach(function(p){var li=document.createElement('li');var a=document.createElement('a');a.href='#'+p[0].id;a.textContent=p[1];a.addEventListener('click',function(ev){ev.preventDefault();p[0].focus();});li.appendChild(a);ul.appendChild(li);});
        summary.appendChild(ul);summary.hidden=false;summary.focus();return;
      }
      var ok=document.createElement('div');ok.className='form-ok';ok.setAttribute('role','status');ok.tabIndex=-1;
      ok.innerHTML='<svg width="84" height="90" viewBox="0 0 120 130" aria-hidden="true"><path d="M34 14c-14 0-22 11-22 25 0 16 8 27 11 43 2 14 5 32 15 32s11-22 22-22 12 22 22 22 13-18 15-32c3-16 11-27 11-43 0-14-8-25-22-25-11 0-16 5-26 5S45 14 34 14z" fill="#D7F5EE" stroke="#0F3D4C" stroke-width="4" stroke-linejoin="round"/><path d="M42 62l12 12 24-26" fill="none" stroke="#047857" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><p class="ok-title">Thank you!</p><p>We’ll be in touch within one working day. This is a sample site, so nothing was actually sent.</p>';
      form.replaceWith(ok);ok.focus();
    });
  });

})();
