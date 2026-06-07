import React, { useEffect, useRef } from 'react';

export const BackgroundGlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);
      const colors = ['#00c8c8', '#3b82f6', '#6366f1'];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Add subtle radial glow to particles
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Glow Blobs */}
      <div className="absolute top-[10%] left-[20%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-cyan-brand/8 blur-[100px] sm:blur-[140px] animate-blob-1 pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[15%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-indigo-accent/8 blur-[100px] sm:blur-[140px] animate-blob-2 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[30%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-blue-accent/6 blur-[90px] sm:blur-[130px] animate-blob-1 pointer-events-none"></div>

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-75" />
    </div>
  );
};
