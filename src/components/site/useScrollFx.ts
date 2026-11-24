import { useEffect } from "react";

/** Reveals .reveal/.mask-reveal on view and drives [data-parallax] by scroll. */
export function useScrollFx() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .mask-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const mobile = window.innerWidth < 768;
      layers.forEach((l) => {
        const speed = Number(l.dataset["parallax"]) * (mobile ? 0.5 : 1);
        l.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (!reduce) { window.addEventListener("scroll", onScroll, { passive: true }); tick(); }
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
}
