import React, { useEffect, useState } from 'react';
import { IT_sprite_animation_walk_version_2, Slime_sprite_Animation_version_3 } from '../assets/imgs';
import '../css/CommingSoon.css';

const ComingSoon = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 10); // Quick reset
    }, 16700); // Replay every 16.5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className='comming_soon'>
      <img src={IT_sprite_animation_walk_version_2} alt="Coming Soon" className={animate ? 'animate-walk' : ''} />

      <img src={Slime_sprite_Animation_version_3} alt="" className={animate ? 'animate-slime' : ''} />

      <p className={animate ? 'animate-bounce' : ''}>
        <span>
          <span className={animate ? 'animate-wave w1' : ''}>C</span>
          <span className={animate ? 'animate-wave w2' : ''}>O</span>
          <span className={animate ? 'animate-wave w3' : ''}>M</span>
          <span className={animate ? 'animate-wave w4' : ''}>I</span>
          <span className={animate ? 'animate-wave w4' : ''}>N</span>
          <span className={animate ? 'animate-wave w5' : ''}>G</span>
        </span>
        <span>
          <span className={animate ? 'animate-wave w6' : ''}>S</span>
          <span className={animate ? 'animate-wave w7' : ''}>O</span>
          <span className={animate ? 'animate-wave w8' : ''}>O</span>
          <span className={animate ? 'animate-wave w9' : ''}>N</span>
        </span>
      </p>  
    </div>
  );
};

export default ComingSoon;
