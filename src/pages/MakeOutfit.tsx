import React from 'react';
import type { clothingItem, outfit } from '../models';

interface MakeOutfitProps {
  availableItems: clothingItem[];
  onOutfitCreated: (outfit: outfit) => void;
  onCancel: () => void;
}

const MakeOutfit: React.FC<MakeOutfitProps> = ({ availableItems, onOutfitCreated, onCancel }) => {
  return (
    <div>
      <h2>Create New Outfit</h2>
    </div>
  );
};

export default MakeOutfit; 