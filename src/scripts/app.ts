const root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scroll reveal */
const revealed = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealed.forEach((el) => el.classList.add("is-inview"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  revealed.forEach((el) => observer.observe(el));
}

/* Count-up numbers */
const counters = document.querySelectorAll<HTMLElement>("[data-count]");
if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      countObserver.unobserve(el);
      const target = Number(el.dataset.count);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-US");
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  });
  counters.forEach((el) => countObserver.observe(el));
}

/* Ink Mode */
const toggles = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");
const syncToggles = () =>
  toggles.forEach((btn) =>
    btn.setAttribute("aria-pressed", String(root.dataset.theme === "ink")),
  );
syncToggles();

toggles.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const next = root.dataset.theme === "ink" ? "paper" : "ink";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("dropshoes-theme", next);
      } catch {
        /* ignore */
      }
      syncToggles();
    };

    if (reduceMotion || !document.startViewTransition) return apply();

    // Ink spreads out from wherever the button was pressed.
    const rect = btn.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    root.classList.add("is-theming");
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(.6,0,.3,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() => root.classList.remove("is-theming"));
  }),
);

/* The tape says "do not scroll" — so it speeds up when you do. */
if (!reduceMotion) {
  const tracks = document.querySelectorAll<HTMLElement>("[data-marquee]");
  let boost = 1;
  let frame = 0;
  const settle = () => {
    boost += (1 - boost) * 0.06;
    if (boost < 1.02) boost = 1;
    tracks.forEach((track) =>
      track.getAnimations().forEach((anim) => (anim.playbackRate = boost)),
    );
    frame = boost === 1 ? 0 : requestAnimationFrame(settle);
  };
  if (tracks.length) {
    addEventListener(
      "scroll",
      () => {
        boost = 5;
        if (!frame) frame = requestAnimationFrame(settle);
      },
      { passive: true },
    );
  }
}
