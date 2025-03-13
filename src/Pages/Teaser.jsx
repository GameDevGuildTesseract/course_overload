import React, { useEffect, useRef, useState } from 'react';
import ComingSoon from '../components/ComingSoon';
import { coming_soon } from '../assets/sound';

const Teaser = () => {
  const [showProceed, setShowProceed] = useState(false);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    // Set up audio visualizer
    const setupAudio = async () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const audioElement = new Audio(coming_soon);
      audioElement.loop = true;
      
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      audioElement.play();
      drawVisualizer(dataArray, bufferLength);

      // Show proceed button after audio starts
      setTimeout(() => setShowProceed(true), 5000);
    };

    const drawVisualizer = (dataArray, bufferLength) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const animate = () => {
        requestAnimationFrame(animate);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = 'rgb(1, 3, 20)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Custom visualization
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height;
          const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
          gradient.addColorStop(0, '#00ff88');
          gradient.addColorStop(1, '#0066ff');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      animate();
    };

    setupAudio();

    return () => {
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="teaser-container">
      <canvas 
        ref={canvasRef} 
        className="audio-visualizer" 
        width={window.innerWidth}
        height={window.innerHeight}
      />
      
      <ComingSoon />
      
      {showProceed && (
        <button 
          className="proceed-btn"
          onClick={() => window.location.href = '/home'}
        >
          Proceed →
        </button>
      )}
    </div>
  );
};

export default Teaser;