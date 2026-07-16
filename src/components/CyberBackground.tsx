import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const LINK_DISTANCE = 150;
const PARTICLE_DENSITY = 18000; // px^2 per particle

// A live network-of-nodes canvas — reads as "security/network monitoring",
// not a generic decorative gradient. Colors are pulled from the current
// theme's --accent at start, so it stays in step with light/dark mode.
export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2a4e99";
    const [r, g, b] = hexToRgb(accent);

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame: number;

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx!.scale(devicePixelRatio, devicePixelRatio);

      const count = Math.max(24, Math.floor((width * height) / PARTICLE_DENSITY));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},0.6)`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(${r},${g},${b},${0.14 * (1 - dist / LINK_DISTANCE)})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      if (!reduceMotion) {
        animationFrame = requestAnimationFrame(drawFrame);
      }
    }

    resize();
    drawFrame();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
