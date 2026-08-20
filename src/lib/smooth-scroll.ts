/** Durée du défilement, en ms. Le `smooth` natif tourne autour de 400ms. */
const SCROLL_DURATION = 1600;
/** Hauteur du header collant, à retrancher pour ne pas passer dessous. */
const HEADER_OFFSET = 80;

/** Départ et arrivée lents, cœur rapide. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Fait défiler la page jusqu'à une ancre, en douceur et sur une durée réglable.
 *
 * Écrit à la main plutôt qu'avec `behavior: "smooth"` : le natif ne permet pas
 * de régler sa durée, et il est bien trop rapide pour un site où chaque section
 * fait un écran. Le moindre geste de l'utilisateur reprend la main.
 */
export function smoothScrollTo(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;
  animateScrollTo(target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
}

/** Retour en haut de page, même durée et même courbe. */
export function smoothScrollToTop() {
  animateScrollTo(0);
}

function animateScrollTo(end: number) {
  const start = window.scrollY;
  const distance = end - start;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, end);
    return;
  }

  let frame = 0;
  let startTime: number | null = null;

  const removeListeners = () => {
    window.removeEventListener("wheel", abort);
    window.removeEventListener("touchstart", abort);
    window.removeEventListener("keydown", abort);
  };
  const abort = () => {
    cancelAnimationFrame(frame);
    removeListeners();
  };

  window.addEventListener("wheel", abort, { passive: true });
  window.addEventListener("touchstart", abort, { passive: true });
  window.addEventListener("keydown", abort);

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / SCROLL_DURATION, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      frame = requestAnimationFrame(step);
    } else {
      removeListeners();
    }
  };

  frame = requestAnimationFrame(step);
}
