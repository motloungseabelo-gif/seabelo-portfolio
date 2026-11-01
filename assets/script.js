(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('span').textContent = 'Menu';
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    const smallScreen = matchMedia('(max-width: 760px)');
    smallScreen.addEventListener('change', closeMenu);
  }

  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const cursor = document.createElement('div');
  cursor.className = 'sbm-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2v22l6-6 5 10 5-3-5-10 8-1Z"/></svg><span>SBM</span>';
  document.body.append(cursor);
  let cursorFrame = 0;
  let cursorX = 0;
  let cursorY = 0;
  const hideCursor = () => {
    if (cursorFrame) cancelAnimationFrame(cursorFrame);
    cursorFrame = 0;
    cursor.classList.remove('visible');
    document.body.classList.remove('sbm-cursor-active');
  };
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType !== 'mouse') return;
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursor.classList.toggle('over-link', Boolean(event.target.closest('a,button')));
    if (!cursorFrame) cursorFrame = requestAnimationFrame(() => {
      cursorFrame = 0;
      cursor.style.transform = `translate3d(${cursorX - 2}px,${cursorY - 2}px,0)`;
      cursor.classList.add('visible');
      document.body.classList.add('sbm-cursor-active');
    });
  }, { passive: true });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) hideCursor(); });
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hideCursor(); });
  addEventListener('blur', hideCursor);
  finePointer.addEventListener('change', hideCursor);

  const scene = document.querySelector('.portrait-scene');
  if (!scene) return;
  const motion = matchMedia('(min-width: 981px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let frame = 0;
  let rotationX = 0;
  let rotationY = 0;
  const render = () => {
    frame = 0;
    if (!motion.matches) {
      scene.style.removeProperty('--rx');
      scene.style.removeProperty('--ry');
      scene.style.removeProperty('--depth');
      return;
    }
    const bounds = scene.getBoundingClientRect();
    scene.style.setProperty('--rx', `${rotationX.toFixed(2)}deg`);
    scene.style.setProperty('--ry', `${rotationY.toFixed(2)}deg`);
    const depth = bounds.bottom > 0 && bounds.top < innerHeight ? Math.max(-10, Math.min(10, scrollY * .035)) : 0;
    scene.style.setProperty('--depth', `${depth.toFixed(1)}px`);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  scene.addEventListener('pointermove', event => {
    if (!motion.matches) return;
    const bounds = scene.getBoundingClientRect();
    rotationX = (.5 - (event.clientY - bounds.top) / bounds.height) * 4;
    rotationY = ((event.clientX - bounds.left) / bounds.width - .5) * 4;
    schedule();
  }, { passive: true });
  scene.addEventListener('pointerleave', () => {
    rotationX = 0;
    rotationY = 0;
    schedule();
  });
  addEventListener('scroll', () => { if (motion.matches) schedule(); }, { passive: true });
  motion.addEventListener('change', schedule);
})();
