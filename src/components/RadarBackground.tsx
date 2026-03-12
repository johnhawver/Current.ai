"use client";

import { useEffect, useRef } from "react";

export default function RadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rings: { born: number }[] = [];
    let lastSpawn = 0;
    let animId: number;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      canvas!.width = r.width * dpr;
      canvas!.height = r.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resize);
    resize();

    function draw(time: number) {
      const r = canvas!.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.max(w, h) / 2;

      ctx!.clearRect(0, 0, w, h);

      if (time - lastSpawn > 3500 || rings.length === 0) {
        rings.push({ born: time });
        lastSpawn = time;
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const age = time - rings[i].born;
        const p = age / 7000;
        if (p > 1) {
          rings.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(cx, cy, p * maxR, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(79,209,197,${0.12 * (1 - p)})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      ctx!.beginPath();
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(79,209,197,0.25)";
      ctx!.fill();

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
