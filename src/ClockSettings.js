import React, { useState } from "react";

const ClockSettings = () => {
  const [volume, setVolume] = useState(50);
  const [selectedSound, setSelectedSound] = useState("Sparkle");

  const sounds = [
    "Sparkle", "Commuter Jingle", "Airport", "Chime", "Success", 
    "Applause", "Train Arrival", "Game Show", "Soft", "Piano", "Level Up", "No Alert"
  ];

  return (
    <div>
      <h3>Alert sound</h3>
      <input 
        type="range" min="0" max="100" value={volume} 
        onChange={(e) => setVolume(e.target.value)} 
      />
      {sounds.map((sound, index) => (
        <label key={index}>
          <input 
            type="radio" name="alert-sound" value={sound} 
            checked={selectedSound === sound} 
            onChange={() => setSelectedSound(sound)}
          />
          {sound}
        </label>
      ))}
    </div>
  );
};

export default ClockSettings;
