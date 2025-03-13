import React, { useEffect, useState } from "react";
import { IT_sprite_animation_walk_version_2, Slime_sprite_Animation_version_3 } from "../assets/imgs";
import CostumeCusor from "./CostumeCusor";
import { clip } from "../assets/vids";

const LoadingScreen = ({ showProceed, setIsLoaded }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 5; // Increase progress
            });
        }, 200); // Update every 200ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-screen">
            <CostumeCusor />
            <div className="loading_screen_wrapper">
                <div className="loading">
                    <img src={Slime_sprite_Animation_version_3} alt="Slime animation" className="slime_1" />
                    <img src={Slime_sprite_Animation_version_3} alt="Slime animation" className="slime_2" />
                    <img src={IT_sprite_animation_walk_version_2} alt="IT sprite animation" className="character" />
                    <h1>Wait a moment</h1>

                    {/* Loading Bar */}
                    <div className="loading-bar-container">
                        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {showProceed && (
                    <div className="proceed">
                        <div className="proceed_container">
                            {/* Video Background */}
                            <video autoPlay loop muted className="proceed-bg-video">
                                <source src={clip} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Proceed Content */}
                            <div className="proceed-content">
                                <h1>Course Overload</h1>
                                <p>This is a Tesseract || Game Development Project</p>
                                <button onClick={() => setIsLoaded(true)}>Proceed</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoadingScreen;
