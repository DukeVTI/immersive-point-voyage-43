import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  flickerSpeed: number;
  flickerPhase: number;
  layer: number; // For parallax depth
  temperature: 'hot' | 'warm' | 'cool'; // Star color temperature
}

interface ShootingStar {
  x: number;
  y: number;
  endX: number;
  endY: number;
  speed: number;
  life: number;
  maxLife: number;
}

export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate layered stars with temperature variation
    const generateStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 6000); // Refined density
      
      for (let i = 0; i < numStars; i++) {
        const layer = Math.floor(Math.random() * 3) + 1; // 3 depth layers
        const temperatures: ('hot' | 'warm' | 'cool')[] = ['hot', 'warm', 'cool'];
        const temperature = temperatures[Math.floor(Math.random() * temperatures.length)];
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (1.2 / layer) + 0.2, // Smaller for distant layers
          speed: Math.random() * (0.2 / layer) + 0.05, // Slower for distant layers
          opacity: Math.random() * (0.8 / layer) + 0.2, // Dimmer for distant layers
          flickerSpeed: Math.random() * 0.01 + 0.002,
          flickerPhase: Math.random() * Math.PI * 2,
          layer,
          temperature,
        });
      }
      
      return stars;
    };

    starsRef.current = generateStars();

    // Create shooting star
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let startX, startY, endX, endY;
      
      switch (side) {
        case 0: // From top
          startX = Math.random() * canvas.width;
          startY = -50;
          endX = startX + (Math.random() - 0.5) * 400;
          endY = canvas.height / 2 + Math.random() * 200;
          break;
        case 1: // From right
          startX = canvas.width + 50;
          startY = Math.random() * canvas.height;
          endX = canvas.width / 2 - Math.random() * 200;
          endY = startY + (Math.random() - 0.5) * 400;
          break;
        case 2: // From bottom
          startX = Math.random() * canvas.width;
          startY = canvas.height + 50;
          endX = startX + (Math.random() - 0.5) * 400;
          endY = canvas.height / 2 - Math.random() * 200;
          break;
        default: // From left
          startX = -50;
          startY = Math.random() * canvas.height;
          endX = canvas.width / 2 + Math.random() * 200;
          endY = startY + (Math.random() - 0.5) * 400;
      }
      
      return {
        x: startX,
        y: startY,
        endX,
        endY,
        speed: Math.random() * 3 + 2,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      };
    };

    // Animation loop
    const animate = (timestamp: number) => {
      // Ultra-dark cinematic background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.98)'; // Almost pure black
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Subtle deep space gradient overlay
      const spaceGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.8
      );
      spaceGradient.addColorStop(0, 'rgba(5, 5, 15, 0.3)');
      spaceGradient.addColorStop(0.5, 'rgba(10, 10, 25, 0.2)');
      spaceGradient.addColorStop(1, 'rgba(0, 0, 5, 0.4)');
      
      ctx.fillStyle = spaceGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very subtle distant galaxy
      const galaxyGradient = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.3
      );
      galaxyGradient.addColorStop(0, 'rgba(20, 15, 40, 0.08)');
      galaxyGradient.addColorStop(0.6, 'rgba(15, 10, 30, 0.04)');
      galaxyGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = galaxyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render stars by layer for parallax effect
      for (let layer = 3; layer >= 1; layer--) {
        starsRef.current
          .filter(star => star.layer === layer)
          .forEach((star) => {
            // Parallax movement based on layer
            const parallaxFactor = 1 / layer;
            star.x += Math.sin(timestamp * 0.00002 * parallaxFactor + star.flickerPhase) * star.speed * 0.03;
            star.y += Math.cos(timestamp * 0.00002 * parallaxFactor + star.flickerPhase * 0.8) * star.speed * 0.03;
            
            // Wrap around screen
            if (star.x > canvas.width) star.x = 0;
            if (star.x < 0) star.x = canvas.width;
            if (star.y > canvas.height) star.y = 0;
            if (star.y < 0) star.y = canvas.height;
            
            // Breathing effect
            const breathe = Math.sin(timestamp * star.flickerSpeed + star.flickerPhase) * 0.2 + 0.8;
            const currentOpacity = star.opacity * breathe;
            
            ctx.save();
            
            // Star colors based on temperature
            let coreColor, glowColor;
            switch (star.temperature) {
              case 'hot':
                coreColor = `rgba(200, 220, 255, ${currentOpacity})`;  // Blue-white
                glowColor = `rgba(150, 180, 255, ${currentOpacity * 0.3})`;
                break;
              case 'warm':
                coreColor = `rgba(255, 245, 230, ${currentOpacity})`;  // Warm white
                glowColor = `rgba(255, 200, 150, ${currentOpacity * 0.3})`;
                break;
              case 'cool':
                coreColor = `rgba(255, 180, 120, ${currentOpacity})`;  // Orange-red
                glowColor = `rgba(255, 150, 100, ${currentOpacity * 0.3})`;
                break;
            }
            
            // Subtle glow
            const glowSize = star.size * (2 + layer * 0.5);
            const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize);
            starGlow.addColorStop(0, coreColor);
            starGlow.addColorStop(0.5, glowColor);
            starGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = starGlow;
            ctx.beginPath();
            ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Bright core
            ctx.fillStyle = coreColor;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
          });
      }

      // Handle shooting stars
      if (Math.random() < 0.003) { // Rare occurrence
        shootingStarsRef.current.push(createShootingStar());
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(shootingStar => {
        shootingStar.life++;
        
        if (shootingStar.life > shootingStar.maxLife) {
          return false;
        }
        
        const progress = shootingStar.life / shootingStar.maxLife;
        const currentX = shootingStar.x + (shootingStar.endX - shootingStar.x) * progress;
        const currentY = shootingStar.y + (shootingStar.endY - shootingStar.y) * progress;
        
        // Draw realistic shooting star trail
        ctx.save();
        const opacity = Math.sin(progress * Math.PI) * 0.9; // Fade in and out
        
        // Calculate trail direction and length
        const deltaX = shootingStar.endX - shootingStar.x;
        const deltaY = shootingStar.endY - shootingStar.y;
        const trailLength = 60;
        const trailX = currentX - (deltaX / Math.sqrt(deltaX * deltaX + deltaY * deltaY)) * trailLength;
        const trailY = currentY - (deltaY / Math.sqrt(deltaX * deltaX + deltaY * deltaY)) * trailLength;
        
        // Create gradient trail
        const trailGradient = ctx.createLinearGradient(trailX, trailY, currentX, currentY);
        trailGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        trailGradient.addColorStop(0.3, `rgba(200, 220, 255, ${opacity * 0.3})`);
        trailGradient.addColorStop(0.7, `rgba(255, 240, 200, ${opacity * 0.6})`);
        trailGradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);
        
        // Draw main trail with varying width
        for (let i = 0; i < 5; i++) {
          const widthFactor = (5 - i) / 5;
          const trailOpacity = opacity * (0.2 + widthFactor * 0.8);
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${trailOpacity * 0.3})`;
          ctx.lineWidth = (3 - i * 0.5) * widthFactor;
          ctx.lineCap = 'round';
          
          ctx.beginPath();
          ctx.moveTo(
            trailX + (currentX - trailX) * (i * 0.1),
            trailY + (currentY - trailY) * (i * 0.1)
          );
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
        }
        
        // Draw bright core trail
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        
        // Draw glowing head
        const headSize = 3 + Math.sin(progress * Math.PI) * 1;
        const headGradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, headSize * 2);
        headGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        headGradient.addColorStop(0.3, `rgba(255, 240, 200, ${opacity * 0.8})`);
        headGradient.addColorStop(0.6, `rgba(200, 220, 255, ${opacity * 0.4})`);
        headGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, headSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright white core
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, headSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
        
        return true;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};