export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b0b0b',
      zIndex: 9999,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        <img 
          src="/seconds-logo.svg" 
          alt="Seconds" 
          style={{
            height: '48px',
            width: 'auto',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <div style={{
          width: '200px',
          height: '2px',
          background: 'rgba(217, 255, 91, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '40%',
            height: '100%',
            background: '#d9ff5b',
            borderRadius: '2px',
            animation: 'loading 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(250%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}

