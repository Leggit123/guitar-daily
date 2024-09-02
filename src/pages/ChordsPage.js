import React, { useState, useEffect, Suspense } from 'react';
import ChordButton from '../components/ChordButton';
import SelectableButton from '../components/SelectableButton';
import WideCard from '../components/WideCard';
import LazyImage from '../components/LazyImage'; // Ensure this import is at the top


const chordOptions = {
    "Basic Chords": [
        { name: "A Major", image: () => import('../assets/images/basicchords/AMajor.png') },
        { name: "A Minor", image: () => import('../assets/images/basicchords/AMinor.png') },
        { name: "B Major", image: () => import('../assets/images/basicchords/BMajor.png') },
        { name: "B Minor", image: () => import('../assets/images/basicchords/BMinor.png') },
        { name: "C Major", image: () => import('../assets/images/basicchords/CMajor.png') },
        { name: "C Minor", image: () => import('../assets/images/basicchords/CMinor.png') },
        { name: "D Major", image: () => import('../assets/images/basicchords/DMajor.png') },
        { name: "D Minor", image: () => import('../assets/images/basicchords/DMinor.png') },
        { name: "E Major", image: () => import('../assets/images/basicchords/EMajor.png') },
        { name: "E Minor", image: () => import('../assets/images/basicchords/EMinor.png') },
        { name: "F Major", image: () => import('../assets/images/basicchords/FMajor.png') },
        { name: "F Minor", image: () => import('../assets/images/basicchords/FMinor.png') },
        { name: "G Major", image: () => import('../assets/images/basicchords/GMajor.png') },
        { name: "G Minor", image: () => import('../assets/images/basicchords/GMinor.png') },
    ],
    "Advanced Chords": [
        { name: "A7", image: () => import('../assets/images/advancedchords/A7.png') },
        { name: "A#(Bb) Major", image: () => import('../assets/images/advancedchords/AshBbMajor.png') },
        { name: "A#(Bb) Minor", image: () => import('../assets/images/advancedchords/AshBbMinor.png') },
        { name: "B7", image: () => import('../assets/images/advancedchords/B7.png') },
        { name: "C7", image: () => import('../assets/images/advancedchords/C7.png') },
        { name: "C#(Db) Major", image: () => import('../assets/images/advancedchords/CshDbMajor.png') },
        { name: "C#(Db) Minor", image: () => import('../assets/images/advancedchords/CshDbMinor.png') },
        { name: "D7", image: () => import('../assets/images/advancedchords/D7.png') },
        { name: "D#(Eb) Major", image: () => import('../assets/images/advancedchords/DshEbMajor.png') },
        { name: "D#(Eb) Minor", image: () => import('../assets/images/advancedchords/DshEbMinor.png') },
        { name: "E7", image: () => import('../assets/images/advancedchords/E7.png') },
        { name: "F7", image: () => import('../assets/images/advancedchords/F7.png') },
        { name: "F# Major", image: () => import('../assets/images/advancedchords/FshMajor.png') },
        { name: "F# Minor", image: () => import('../assets/images/advancedchords/FshMinor.png') },
        { name: "G7", image: () => import('../assets/images/advancedchords/G7.png') },
        { name: "G#(Ab) Major", image: () => import('../assets/images/advancedchords/GshAbMajor.png') },
        { name: "G#(Ab) Minor", image: () => import('../assets/images/advancedchords/GshAbMinor.png') },
    ],
    "4th String": [
        { name: "C7", image: () => import('../assets/images/4thstring/C7.png') },
        { name: "C7sus4", image: () => import('../assets/images/4thstring/C7sus4.png') },
        { name: "C Aug", image: () => import('../assets/images/4thstring/Caug.png') },
        { name: "Cdim7", image: () => import('../assets/images/4thstring/Cdim7.png') },
        { name: "Cm7", image: () => import('../assets/images/4thstring/Cm7.png') },
        { name: "Cmaj7", image: () => import('../assets/images/4thstring/Cmaj7.png') },
        { name: "C Major", image: () => import('../assets/images/4thstring/CMajor.png') },
        { name: "C Minor", image: () => import('../assets/images/4thstring/CMinor.png') },
        { name: "Csus2", image: () => import('../assets/images/4thstring/Csus2.png') },
        { name: "Csus4", image: () => import('../assets/images/4thstring/Csus4.png') },
    ],
    "5th String": [
        { name: "C7", image: () => import('../assets/images/5thstring/C7.png') },
        { name: "C7sus4", image: () => import('../assets/images/5thstring/C7sus4.png') },
        { name: "Cdim7", image: () => import('../assets/images/5thstring/Cdim7.png') },
        { name: "Cm7", image: () => import('../assets/images/5thstring/Cm7.png') },
        { name: "Cmaj7", image: () => import('../assets/images/5thstring/Cmaj7.png') },
        { name: "C Major", image: () => import('../assets/images/5thstring/CMajor.png') },
        { name: "C Minor", image: () => import('../assets/images/5thstring/CMinor.png') },
        { name: "Csus2", image: () => import('../assets/images/5thstring/Csus2.png') },
        { name: "Csus4", image: () => import('../assets/images/5thstring/Csus4.png') },
    ],
    "6th String": [
        { name: "C7", image: () => import('../assets/images/6thstring/C7.png') },
        { name: "C7sus4", image: () => import('../assets/images/6thstring/C7sus4.png') },
        { name: "Cdim7", image: () => import('../assets/images/6thstring/Cdim7.png') },
        { name: "C Aug", image: () => import('../assets/images/6thstring/Caug.png') },
        { name: "Cm7", image: () => import('../assets/images/6thstring/Cm7.png') },
        { name: "Cmaj7", image: () => import('../assets/images/6thstring/CMaj7.png') },
        { name: "C Major", image: () => import('../assets/images/6thstring/CMajor.png') },
        { name: "C Minor", image: () => import('../assets/images/6thstring/CMinor.png') },
        { name: "Csus4", image: () => import('../assets/images/6thstring/Csus4.png') },
    ],
};

const ChordsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Basic Chords");
  const [selectedChord, setSelectedChord] = useState("A Major");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      const imageModule = await chordOptions["Basic Chords"][0].image();
      setSelectedImage(imageModule.default);
      setLoading(false);
    };

    loadImage();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const defaultChord = chordOptions[category][0];
    handleChordChange(defaultChord);
  };

  const handleChordChange = async (chord) => {
    setSelectedChord(chord.name);
    setLoading(true);
    const imageModule = await chord.image();
    setSelectedImage(imageModule.default);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white p-4">
      {/* Set a fixed width and max-width to ensure the card size is controlled */}
      <WideCard>
        <h1 className="text-3xl font-bold mb-4 text-center">Chord Directory</h1>

        {/* Image Display */}
        <div className="flex justify-center items-center mb-8" style={{ height: '300px' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Suspense fallback={<p>Loading Image...</p>}>
              <LazyImage src={selectedImage} alt="Chord Diagram" className="w-full max-w-4xl rounded-lg" />
            </Suspense>
          )}
        </div>
      </WideCard>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center mb-4">
        <div className="flex space-x-4 mb-4 justify-center w-full">
          <ChordButton
            onClick={() => handleCategoryChange("Basic Chords")}
            isSelected={selectedCategory === "Basic Chords"}
          >
            Basic Chords
          </ChordButton>
          <ChordButton
            onClick={() => handleCategoryChange("Advanced Chords")}
            isSelected={selectedCategory === "Advanced Chords"}
          >
            Advanced Chords
          </ChordButton>
        </div>

        {/* Second Row for Other Categories */}
        <div className="flex space-x-4 justify-center w-full">
          {Object.keys(chordOptions)
            .filter((category) => category !== "Basic Chords" && category !== "Advanced Chords")
            .map((category) => (
              <ChordButton
                key={category}
                onClick={() => handleCategoryChange(category)}
                isSelected={selectedCategory === category}
              >
                {category}
              </ChordButton>
            ))}
        </div>
      </div>

      {/* Chord Selector */}
      <div className="flex flex-wrap justify-center">
        {chordOptions[selectedCategory].map((chord, index) => (
          <div key={index} style={{ margin: '4px' }}>
            <SelectableButton
              onClick={() => handleChordChange(chord)}
              isSelected={selectedChord === chord.name}
            >
              {chord.name}
            </SelectableButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordsPage;