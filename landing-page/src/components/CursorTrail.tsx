import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const cursorSizeRef = useRef(10); // Tamanho fixo entre 8px e 12px

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar o canvas para ocupar toda a tela
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Rastrear a posição do mouse com suavidade
    const handleMouseMove = (e: MouseEvent) => {
      // Atualizar posição do mouse diretamente (sem criar pontos adicionais)
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    // Função de animação para o ponto LED minimalista
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar apenas um único ponto LED na posição atual do mouse
      const { x, y } = mousePositionRef.current;
      const size = cursorSizeRef.current;
      
      // Criar gradiente radial para o efeito de luz LED
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, size
      );
      
      // Gradiente suave de azul-petróleo para roxo com brilho sutil
      gradient.addColorStop(0, 'rgba(36, 99, 235, 0.7)'); // Azul-petróleo com transparência
      gradient.addColorStop(0.6, 'rgba(91, 75, 235, 0.4)'); // Tom intermediário
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)'); // Roxo com alta transparência
      
      // Desenhar o ponto LED
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Adicionar um pequeno brilho central para efeito de luz
      const innerGlow = ctx.createRadialGradient(
        x, y, 0,
        x, y, size * 0.4
      );
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Inicializar
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Limpar ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default CursorTrail;
