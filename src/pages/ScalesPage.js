import React, { useState, useEffect, Suspense } from 'react';
import Card from '../components/Card';
import SelectableButton from '../components/SelectableButton';
import ChordButton from '../components/ChordButton';


const LazyImage = React.lazy(() => import('../components/LazyImage')); 

const scaleOptions = {
  "Basic Scales": [
    { name: "Major", image: () => import('../assets/images/basicscales/major.png') },
    { name: "Blues", image: () => import('../assets/images/basicscales/blues.png') },
    { name: "Harmonic Minor", image: () => import('../assets/images/basicscales/harmonicminor.png') },
    { name: "Melodic Minor", image: () => import('../assets/images/basicscales/melodicminor.png') },
  ],
  "Advanced Scales": [
    { name: "Aeolian", image: () => import('../assets/images/advancedscales/aeolian.png') },
    { name: "Dorian", image: () => import('../assets/images/advancedscales/dorian.png') },
    { name: "Mixolydian", image: () => import('../assets/images/advancedscales/mixolydian.png') },
  ],
  "Arpeggios": [
    { name: "Major Arpeggio", image: () => import('../assets/images/arpeggios/majorarpeggio.png') },
    { name: "Minor Arpeggio", image: () => import('../assets/images/arpeggios/minorarpeggio.png') },
    { name: "Minor7 Arpeggio", image: () => import('../assets/images/arpeggios/minor7arpeggio.png') },
    { name: "Minor7b5 Arpeggio", image: () => import('../assets/images/arpeggios/minor7b5arpeggio.png') },
    { name: "Major7 Arpeggio", image: () => import('../assets/images/arpeggios/major7arpeggio.png') },
    { name: "Dom7 Arpeggio", image: () => import('../assets/images/arpeggios/dom7arpeggio.png') },
  ],
};

const ScalesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Basic Scales");
  const [selectedScale, setSelectedScale] = useState("Major"); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageCache, setImageCache] = useState({});  

 
  useEffect(() => {
    const preloadImages = async () => {
      const cache = {};
      for (const category in scaleOptions) {
        for (const scale of scaleOptions[category]) {
          const imageModule = await scale.image();
          cache[scale.name] = imageModule.default;  
        }
      }
      setImageCache(cache);  
    };

    preloadImages();
  }, []);

 
  useEffect(() => {
    if (imageCache["Major"]) { 
      setSelectedImage(imageCache["Major"]);
    }
  }, [imageCache]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const defaultScale = scaleOptions[category][0];
    setSelectedScale(defaultScale.name);
    if (imageCache[defaultScale.name]) {
      setSelectedImage(imageCache[defaultScale.name]);
    }
  };

  const handleScaleChange = (scale) => {
    setSelectedScale(scale.name);
    if (imageCache[scale.name]) {
      setSelectedImage(imageCache[scale.name]);
    }
  };

  return (
    <div className="scales-page h-screen px-4 py-6 flex flex-col items-center space-y-6">
      {/* Top Category Buttons */}
      <div className="flex space-x-4 mb-6">
        <ChordButton
          onClick={() => handleCategoryChange("Basic Scales")}
          isSelected={selectedCategory === "Basic Scales"}
        >
          Basic
        </ChordButton>
        <ChordButton
          onClick={() => handleCategoryChange("Advanced Scales")}
          isSelected={selectedCategory === "Advanced Scales"}
        >
          Advanced
        </ChordButton>
        <ChordButton
          onClick={() => handleCategoryChange("Arpeggios")}
          isSelected={selectedCategory === "Arpeggios"}
        >
          Arpeggios
        </ChordButton>
      </div>

     
      <Card>
        <h1 className="text-2xl font-bold mb-4 text-center">Scale Directory</h1>
        <div className="flex justify-center mb-8">
          {selectedImage ? (
            <Suspense fallback={<p>Loading Image...</p>}>
              <LazyImage src={selectedImage} alt="Scale Diagram" />
            </Suspense>
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </Card>

     
      <div className={`grid ${selectedCategory === "Basic Scales" && scaleOptions[selectedCategory].length === 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-4 place-items-center gap-y-4`}>

        {scaleOptions[selectedCategory].map((scale, index) => (
          <SelectableButton
            key={index}
            onClick={() => handleScaleChange(scale)}
            isSelected={selectedScale === scale.name} 
          >
            {scale.name}
          </SelectableButton>
        ))}
      </div>
    </div>
  );
};

export default ScalesPage;
