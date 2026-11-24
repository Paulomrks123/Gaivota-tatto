import { useEffect } from "react";

/**
 * One rAF loop for the whole page:
 * - [data-parallax="speed"]  scroll parallax
 * - [data-mouse="depth"]     cursor parallax (desktop only)
 * - .reveal* / .split        one-shot reveals on view
 * - .tilt                    3D tilt + glare following pointer
 */
export function useScrollFx() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-blur, .mask-reveal, .iris-reveal, .split");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const scrollLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const mouseLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-mouse]"));
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;

    const tick = () => {
      const y = window.scrollY;
      const k = window.innerWidth < 768 ? 0.55 : 1;
      cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
      scrollLayers.forEach((l) => {
        const s = Number(l.dataset["parallax"]) * k;
        const d = Number(l.dataset["mouse"] ?? 0);
        l.style.transform = `translate3d(${cx * d}px, ${y * s + cy * d}px, 0)`;
      });
      mouseLayers.forEach((l) => {
        if (l.dataset["parallax"]) return;
        const d = Number(l.dataset["mouse"]);
        l.style.transform = `translate3d(${cx * d}px, ${cy * d}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tilts = Array.from(document.querySelectorAll<HTMLElement>(".tilt"));
    const tiltMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 9}deg) rotateY(${(px - 0.5) * 11}deg) translateZ(0)`;
      el.style.setProperty("--gx", `${px * 100}%`); el.style.setProperty("--gy", `${py * 100}%`);
    };
    const tiltLeave = (e: PointerEvent) => { (e.currentTarget as HTMLElement).style.transform = ""; };

    if (!reduce) {
      raf = requestAnimationFrame(tick);
      if (fine) {
        window.addEventListener("pointermove", onMove, { passive: true });
        tilts.forEach((t) => { t.addEventListener("pointermove", tiltMove); t.addEventListener("pointerleave", tiltLeave); });
      }
    }
    return () => {
      io.disconnect(); cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      tilts.forEach((t) => { t.removeEventListener("pointermove", tiltMove); t.removeEventListener("pointerleave", tiltLeave); });
    };
  }, []);
}
