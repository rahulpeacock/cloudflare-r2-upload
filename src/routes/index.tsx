import { UploadMediaForm } from '@/components/upload-media/base-upload-media';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <section>
      <div className='p-2 max-w-5xl mx-auto'>
        <UploadMediaForm />
        <Component />
      </div>
    </section>
  );
}

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createNoise = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() < 0.5 ? 170 : 255; // High contrast noise
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 25; // Opacity
      }

      ctx.putImageData(imgData, 0, 0);
    };

    createNoise();

    const handleResize = () => {
      createNoise();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='relative min-h-screen'>
      <canvas ref={canvasRef} className='absolute inset-0 w-full h-full opacity-100 mix-blend-multiply pointer-events-none' />
      <div className='relative z-10 flex items-center justify-center min-h-screen text-gray-800'>
        <h1 className='text-4xl font-bold'>Welcome to My Site</h1>
      </div>
    </div>
  );
}
