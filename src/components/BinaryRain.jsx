import { useEffect, useRef } from 'react';

export function BinaryRain({
  active = true,
  opacity = 0.05,
  color = '#e8a120',
  speed = 0.15,
  density = 0.45
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let columns = [];
    let lastScrollY = window.scrollY;
    const fontSize = 18;
    const columnSpacing = fontSize / density;

    const makeColumn = (x) => ({
      x,
      y: Math.random() * 60 - 30,
      speedMult: 0.5 + Math.random() * 0.6,
      char: Math.random() > 0.5 ? '1' : '0',
    });

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const numCols = Math.floor(canvas.width / columnSpacing);
      columns = [];
      for (let i = 0; i < numCols; i++) {
        columns.push(makeColumn(i * columnSpacing));
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ── Initial entrance: seed the canvas with rain scattered across
    //    the full height so it looks populated from frame one ──────────
    const seedInitial = () => {
      ctx.font      = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.fillStyle = color;

      // Paint each column at 4–6 random y positions spanning the full height
      for (const col of columns) {
        const passes = 4 + Math.floor(Math.random() * 3);
        for (let p = 0; p < passes; p++) {
          const randomY = Math.random() * canvas.height;
          const char    = Math.random() > 0.5 ? '1' : '0';
          ctx.globalAlpha = 0.15 + Math.random() * 0.55; // varied intensity
          ctx.fillText(char, col.x, randomY);
        }
      }
      ctx.globalAlpha = 1;
    };

    seedInitial();

    const draw = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) > 0.5) {
        lastScrollY = currentScrollY;

        ctx.fillStyle = 'rgba(10, 10, 10, 0.10)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font      = `bold ${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = color;

        for (const col of columns) {
          ctx.fillText(col.char, col.x, col.y * fontSize);

          col.y += (delta * speed * col.speedMult) / fontSize;

          if (col.y * fontSize > canvas.height) {
            col.y  = -1;
            col.char = Math.random() > 0.5 ? '1' : '0';
          } else if (col.y * fontSize < -fontSize) {
            col.y  = canvas.height / fontSize;
            col.char = Math.random() > 0.5 ? '1' : '0';
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, color, speed, density]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        opacity,
        pointerEvents: 'none',
        filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 2px ${color})`
      }}
      className="absolute inset-0 w-full h-full z-0 mix-blend-screen"
    />
  );
}
