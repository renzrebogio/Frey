import { useEffect, useRef } from 'react';

export function BinaryRain({
  active = true,
  opacity = 0.05,
  color = '#e8a120',
  speed = 1,
  density = 1
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let drops = [];
    const fontSize = 14;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const columns = canvas.width / fontSize;
      // Initialize drops only if we don't have enough, or clear if we have too many
      // But for simplicity and to re-spread across whole width, just re-init based on density
      const numDrops = Math.floor(columns * density);
      drops = [];
      for (let x = 0; x < numDrops; x++) {
        // Random start position
        drops[x] = Math.random() * canvas.height;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)'; // #0a0a0a with alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Bias toward 0 and 1
        const text = Math.random() > 0.5 ? '1' : '0';
        
        // Random column position based on index to spread them out somewhat evenly
        // With density < 1, we map index to a wider column
        const columnX = (i / density) * fontSize;
        
        ctx.fillText(text, columnX, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i] += speed * (Math.random() * 0.5 + 0.5); // Add some random variation to drop speed
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
      style={{ opacity, pointerEvents: 'none' }}
      className="absolute inset-0 w-full h-full z-0 mix-blend-screen"
    />
  );
}
