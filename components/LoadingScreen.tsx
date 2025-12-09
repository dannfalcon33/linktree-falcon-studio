import React, { useEffect, useState } from 'react';
import { BRAND_NAME } from '../constants';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Iniciar la barra de progreso
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Desvanecer el componente antes de desmontar
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 2200);

    // Completar la carga
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Extraer iniciales para el Isotipo
  const initials = BRAND_NAME.split(' ').map(n => n[0]).join('');

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-fashion-cream transition-opacity duration-500 ease-in-out"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center">
        {/* Isotipo */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 border-2 border-fashion-black flex items-center justify-center rounded-full p-1">
             <div className="w-full h-full border border-fashion-gold rounded-full flex items-center justify-center bg-fashion-black">
                <span className="text-4xl text-fashion-gold font-serif tracking-widest font-bold">
                  {initials}
                </span>
             </div>
          </div>
        </div>

        {/* Título (Opcional, pequeño debajo del logo) */}
        <h2 className="text-fashion-black font-serif tracking-[0.3em] text-sm mb-8 uppercase opacity-80">
          {BRAND_NAME}
        </h2>

        {/* Barra de estado */}
        <div className="w-48 h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-fashion-gold transition-all duration-[2000ms] ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-3 text-[10px] text-gray-400 font-sans tracking-widest uppercase animate-pulse">
          Cargando Colección
        </p>
      </div>
    </div>
  );
};