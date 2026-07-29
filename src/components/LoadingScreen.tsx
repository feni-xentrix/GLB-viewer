'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0f1218',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      {/* Diamond Icon */}
      <div style={{ marginBottom: '28px', position: 'relative' }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer glow */}
          <circle cx="28" cy="28" r="27" stroke="rgba(167,139,250,0.15)" strokeWidth="2" />
          {/* Diamond shape */}
          <polygon
            points="28,8 46,24 28,48 10,24"
            fill="none"
            stroke="rgba(167,139,250,0.9)"
            strokeWidth="1.5"
          />
          <polygon
            points="28,8 46,24 28,24 10,24"
            fill="rgba(167,139,250,0.12)"
            stroke="rgba(167,139,250,0.6)"
            strokeWidth="1"
          />
          {/* Center sparkle */}
          <circle cx="28" cy="24" r="1.5" fill="rgba(255,255,255,0.9)" />
        </svg>

        {/* Rotating ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'rgba(167,139,250,0.7)',
            borderRightColor: 'rgba(167,139,250,0.2)',
            animation: 'spin 1.2s linear infinite',
          }}
        />
      </div>

      {/* Text */}
      <p
        style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '15px',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.12em',
          marginBottom: '6px',
        }}
      >
        Loading 3D Model{dots}
      </p>
      <p
        style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: '11px',
          letterSpacing: '0.08em',
          fontFamily: 'sans-serif',
        }}
      >
        KNIFE EDGE SOLITAIRE
      </p>

      {/* Progress bar */}
      <div
        style={{
          marginTop: '28px',
          width: '160px',
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, rgba(167,139,250,0.8), rgba(196,181,253,1))',
            borderRadius: '9999px',
            animation: 'shimmer 1.6s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
