// components/Snowfall.js
export default function Snowfall() {
  return (
    <div className="snow-container fixed inset-0 pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="snowflake text-white opacity-70">❄</div>
      ))}
      <style jsx global>{`
        .snowflake {
          position: fixed;
          top: -10%;
          animation: fall linear infinite;
        }
        @keyframes fall {
          to { transform: translateY(110vh) rotate(360deg); }
        }
        ${[...Array(20)].map((_, i) => `
          .snowflake:nth-child(${i+1}) {
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 10 + 5}s;
            animation-delay: ${Math.random() * 5}s;
            font-size: ${Math.random() * 20 + 10}px;
          }
        `).join('')}
      `}</style>
    </div>
  );
}
