(function(){
  const sandstorm = document.getElementById('sandstorm');
  if (sandstorm && !sandstorm.dataset.ready) {
    sandstorm.dataset.ready = '1';
    for(let i=0;i<18;i++){
      const s = document.createElement('span');
      s.style.top = `${8 + Math.random()*84}%`;
      s.style.left = `${-20 - Math.random()*40}%`;
      s.style.animationDuration = `${8 + Math.random()*12}s`;
      s.style.animationDelay = `${Math.random()*-20}s`;
      s.style.opacity = (0.15 + Math.random()*0.28).toFixed(2);
      s.style.width = `${120 + Math.random()*180}px`;
      sandstorm.appendChild(s);
    }
  }

  const navList = document.querySelector('header nav ul');
  const navContainer = document.querySelector('.nav nav');
  if (navList && navContainer && !document.querySelector('.mobile-nav-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-nav-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
    navContainer.appendChild(toggle);

    const closeMenu = () => {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    };
    const openMenu = () => {
      document.body.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    };
    const syncMenu = () => {
      if (window.innerWidth > 980) closeMenu();
    };

    toggle.addEventListener('click', () => {
      if (document.body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    navList.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', syncMenu);
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const socialLinks = Array.from(document.querySelectorAll('a[href*="linkedin.com"], a[href*="instagram.com"]'));
  const linkedIn = socialLinks.find(link => link.href.includes('linkedin.com'));
  const instagram = socialLinks.find(link => link.href.includes('instagram.com'));
  if ((linkedIn || instagram) && !document.querySelector('.social-floater')) {
    const floater = document.createElement('div');
    floater.className = 'social-floater';

    const makeIcon = (label, href, platform) => {
      const a = document.createElement('a');
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = platform;
      a.setAttribute('aria-label', label);
      a.innerHTML = platform === 'linkedin'
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.01 2.01 0 0 0 3.25 5c0 1.1.9 2 2 2s2-.9 2-2c0-1.11-.89-2-2-2Zm6.96 5.5H8.95V20h3.26v-5.67c0-1.49.28-2.93 2.13-2.93 1.82 0 1.84 1.7 1.84 3.03V20h3.27v-6.24c0-3.07-.66-5.43-4.24-5.43-1.72 0-2.87.94-3.34 1.84h-.05V8.5Z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.3" cy="6.7" r="1"></circle></svg>';
      return a;
    };

    if (linkedIn) floater.appendChild(makeIcon('LinkedIn profile', linkedIn.href, 'linkedin'));
    if (instagram) floater.appendChild(makeIcon('Instagram profile', instagram.href, 'instagram'));
    document.body.appendChild(floater);
  }

  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let animationFrame;

  function resize(){
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    const density = innerWidth < 640 ? 55 : innerWidth < 980 ? 80 : Math.min(120, Math.floor(innerWidth/10));
    stars = Array.from({length: density}, () => ({
      x: Math.random()*innerWidth,
      y: Math.random()*innerHeight,
      r: Math.random()*(innerWidth < 640 ? 1.1 : 1.6),
      a: .2 + Math.random()*.7,
      v: .08 + Math.random()*.18
    }));
  }

  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for(const star of stars){
      star.y += star.v;
      if(star.y > innerHeight + 5){ star.y = -5; star.x = Math.random()*innerWidth; }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(219,230,255,${star.a})`;
      ctx.fill();
    }
    animationFrame = requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationFrame);
    else draw();
  });

  addEventListener('resize', resize);
  resize();
  draw();
})();
