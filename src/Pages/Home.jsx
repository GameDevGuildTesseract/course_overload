import React, { useRef, useEffect, useState } from 'react';
import { Abby, AndrewEarl, bg_paralax, CA_paralax, cards_paralax, Cheese, CS_paralax, IS_paralax, IT_paralax, JohnHeri, light_paralax, mugshot_demo, Robert, table_paralax } from '../assets/imgs';
import "../css/Home.css";
import { hoverSound } from '../assets/sound';

const Home = () => {

  return (
    <>
      <ParalaxImage />
      <Member Member />
    </>
  );
};

const ParalaxImage = () => {

  const paralaxRef = useRef(null);
  const titleRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const scrollY = useRef(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHidden) return; // Stop processing if hidden
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.current = e.clientX - centerX;
      mouseY.current = e.clientY - centerY;
      updateTransforms();
    };

    if (!isHidden) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHidden]); // Depend on isHidden to remove listener when hidden

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      updateTransforms();

      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - scrollY.current / (windowHeight * 1));

      if (paralaxRef.current) {
        paralaxRef.current.style.opacity = opacity;
        setIsHidden(opacity <= 0);
      }

      if (titleRef.current) {
        const newSize = Math.min(2 + scrollY.current / 50, 15);
        titleRef.current.style.fontSize = `${newSize}vw`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateTransforms = () => {
    if (isHidden) return;

    const images = paralaxRef.current?.children;
    if (!images) return;

    const mouseSpeeds = [0.15, 0.075, 0.12, 0.09, 0.008, 0.06, 0.035, 0.012, 0.012];
    const scrollSpeeds = [-2.15, 0.5, 1.7, 1.7, -1.15, 1.25, 1.0, 0.75, 0.75];

    Array.from(images).forEach((img, index) => {
      const mouseSpeed = mouseSpeeds[index];
      const x = (mouseX.current * -mouseSpeed).toFixed(2);
      const yMouse = (mouseY.current * -mouseSpeed).toFixed(2);
      const yScroll = scrollY.current * scrollSpeeds[index];
      img.style.transform = `translate3d(${x}px, ${parseFloat(yMouse) + yScroll}px, 0)`;
    });
  };
  return (
    <section>
      <div className="paralax_header_container">
        <div className={`paralax_header ${isHidden ? 'hidden' : ''}`} ref={paralaxRef}>
          <div className="bg"></div>
          <div className="title_container">
            <div className="title">
              <h1 ref={titleRef}>COURSE <br /> OVERLOAD</h1>
            </div>
          </div>
          <img src={CS_paralax} alt="" />
          <img src={CA_paralax} alt="" />
          <img src={light_paralax} alt="" />
          <img src={table_paralax} alt="" />
          <img src={cards_paralax} alt="" />
          <img src={IS_paralax} alt="" />
          <img src={IT_paralax} alt="" />
        </div>
      </div>

      <div className="about">
        <h1>Game Play</h1>
        <div>
          <p>Choose a character and survive waves of enemies by using auto-attacking weapons and special skills. Gain experience from defeated enemies to level up and upgrade weapons/skills. Survive for a set duration or defeat a final boss to win.</p>
          <br /><br />
          <a href="">Read More</a>
        </div>
      </div>
    </section>
  );
}

const GameFeatures = () => {
  
}

const Member = () => {
  const members = [
    {
      name: "Robert Bamba",
      role: "Game Director",
      img: Robert,
      mudshot: mugshot_demo,
    },
    {
      name: "John Heri",
      role: "Lead in Game Development",
      img: JohnHeri,
      mudshot: mugshot_demo,
    },
    {
      name: "Andrew Earl",
      role: "Game Developer",
      img: AndrewEarl,
      mudshot: mugshot_demo,
    },
    {
      name: "🧀",
      role: "Co-lead in Art, Lead in SFX and Music Design Production",
      img: Cheese,
      mudshot: mugshot_demo,
    },
    {
      name: "Abigail Garcia",
      role: "Co-lead in Art Direction and Game Design",
      img: Abby,
      mudshot: mugshot_demo,
    }
  ];

  const playSound = () => {
    const audio = new Audio(hoverSound); // Create a new audio instance for each hover
    audio.play().catch((error) => console.error("Audio play error:", error));
  };

  return (
    <section className='members_section'>
      <h1>BOUNTY BOARD</h1>

      <div className="card_container">
        {members.map((member, index) => (
          <div className="card" key={index} onMouseEnter={playSound}>
            <div className="state_1">
              <div className="state_1_wrapper">
                <img src={member.mudshot} alt="" />
              </div>
            </div>

            <div className="state_2">
              <div className="state_2_wrapper">
                <h1 className='tba'>
                  <span>W</span>
                  <span>A</span>
                  <span>N</span>
                  <span>T</span>
                  <span>E</span>
                  <span>D</span>
                </h1>
                <h3 className='tba'>ALIVE (OPTIONAL)</h3>
                <div className="img_container">
                  <img src={member.img} alt="" />
                </div>
                <h3 className='tba'>ARMED AND VERY DANGEROUS</h3>
                <h1 className='tba'>{member.name}</h1>
                <p>{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



export default Home;
