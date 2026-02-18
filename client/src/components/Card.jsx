import { useState } from 'react';
import { rarityImages } from '../utils/imageMaps.js';
import '../styles/card.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const backCardUrl = `${API_URL}/assets/backCard.png`;

export const Card = ({ data, onClick, flippable = false }) => {
  const {
    name,
    image,
    rarity,
    unlocked
  } = data;

  const rarityImage = rarityImages[rarity];

  const [isFlipped, setIsFlipped] = useState(flippable); 

  const handleClick = () => {
    if (flippable && isFlipped) {
      setIsFlipped(false); 
    }
    if (onClick) onClick(); 
  };

  const cardImageUrl = image.startsWith("http") ? image : `${API_URL}/assets/${image}`;
  const shownImage = flippable && isFlipped ? backCardUrl : cardImageUrl;


  return (
    <div className="card_container" onClick={handleClick}>
      {shownImage &&  (
        <div className="card_rarity">
          <img src={rarityImage} alt={rarity} />
        </div>
      )}
      <img
        src={shownImage}
        alt={name}
        className={unlocked ? '' : 'locked'}
      />
    </div>
  );
};
