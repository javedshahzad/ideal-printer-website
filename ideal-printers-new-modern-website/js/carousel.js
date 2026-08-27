(() => {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const track = root.querySelector('.carousel-track');
  const prev = root.querySelector('[data-prev]');
  const next = root.querySelector('[data-next]');
  if (!track) return;

  const cards = [...track.querySelectorAll('.carousel-card')];
  let index = 0;
  let timer;
  let paused = false;

  const gap = () => {
    const styles = getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap || '20') || 20;
  };

  const cardStep = () => {
    const card = cards[0];
    if (!card) return 320;
    return card.getBoundingClientRect().width + gap();
  };

  const goTo = (i, smooth = true) => {
    if (!cards.length) return;
    index = (i + cards.length) % cards.length;
    track.scrollTo({ left: index * cardStep(), behavior: smooth ? 'smooth' : 'auto' });
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!paused) goTo(index + 1);
    }, 4200);
  };

  prev?.addEventListener('click', () => {
    goTo(index - 1);
    start();
  });

  next?.addEventListener('click', () => {
    goTo(index + 1);
    start();
  });

  track.addEventListener('pointerenter', () => {
    paused = true;
  });
  track.addEventListener('pointerleave', () => {
    paused = false;
  });

  let touchStartX = 0;
  track.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      paused = true;
    },
    { passive: true }
  );
  track.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 40) goTo(dx < 0 ? index + 1 : index - 1);
      paused = false;
      start();
    },
    { passive: true }
  );

  window.addEventListener('resize', () => goTo(index, false));

  // Keep index in sync when user scrolls manually
  let syncTimer;
  track.addEventListener(
    'scroll',
    () => {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        const step = cardStep();
        index = Math.round(track.scrollLeft / step) % cards.length;
      }, 80);
    },
    { passive: true }
  );

  goTo(0, false);
  start();
})();
