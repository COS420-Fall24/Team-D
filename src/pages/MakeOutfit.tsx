import React from 'react';
import { clothingItem } from '../models';

interface MakeOutfitProps {
  availableItems: clothingItem[];
  onOutfitCreated: (outfit: any) => void;
  onCancel: () => void;
}

const MakeOutfit: React.FC<MakeOutfitProps> = ({ availableItems, onOutfitCreated, onCancel }) => {
  return (
    <div>
      <h2>Create New Outfit</h2>
      <ul>
        {availableItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MakeOutfit; 