import React, { useState, useEffect, useRef } from 'react';
import metroSound from '../assets/sounds/metro.wav';
import pick1 from '../assets/images/pick1.png';
import pick2 from '../assets/images/pick2.png';
import Card from '../components/Card';
import WideButton from '../components/WideButton';

const Metronome = () => {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalId = useRef(null);
  const tick = useRef(null);
  const [currentBeat, setCurrentBeat] = useState(0); 

  useEffect(() => {
    tick.current = new Audio(metroSound);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalId.current = setInterval(() => {
        if (tick.current) {
          tick.current.currentTime = 0;
          tick.current.play();
        }
        setCurrentBeat((prevBeat) => (prevBeat + 1) % 4); 
      }, (60 / bpm) * 1000);
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      setCurrentBeat(0); 
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [bpm, isPlaying]);

  const handleBpmChange = (event) => {
    setBpm(Number(event.target.value));
  };

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#212121] text-white p-4">
      <Card className="mt-[120px]">
  <h1 className="text-white block text-2xl font-bold my-4 text-center">Metronome</h1> 
  <div className="text-4xl mb-4 text-center">{bpm} BPM</div> 
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setBpm((prev) => Math.max(40, prev - 1))} 
            className="bg-custom-cyan text-black text-3xl px-4 py-2 rounded-md mx-2"
          >
            -
          </button>
          <input
            type="range"
            min="40"
            max="220"
            value={bpm}
            onChange={handleBpmChange}
            className="w-full"
          />
          <button 
            onClick={() => setBpm((prev) => Math.min(220, prev + 1))} 
            className="bg-custom-cyan text-black text-3xl px-4 py-2 rounded-md mx-2"
          >
            +
          </button>
        </div>
        <div className="mb-6 w-full">
          <WideButton onClick={togglePlay}>
            {isPlaying ? 'Stop' : 'Start'}
          </WideButton>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          {[0, 1, 2, 3].map((beatIndex) => (
            <img
              key={beatIndex}
              src={currentBeat === beatIndex ? pick2 : pick1}
              alt={`Pick ${beatIndex + 1}`}
              className="w-16 h-16"
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Metronome;
