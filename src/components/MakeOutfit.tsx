import React, { useState } from 'react';
import { clothingItem, outfit, createOutfit } from '../models';

interface MakeOutfitProps {
  onOutfitCreated: (newOutfit: outfit) => void;
  onCancel: () => void;
  availableItems: clothingItem[];
}

export const MakeOutfit: React.FC<MakeOutfitProps> = ({ onOutfitCreated, onCancel, availableItems }) => {
  const [outfitName, setOutfitName] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<clothingItem[]>([]);

  const handleAddItem = (item: clothingItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleCreateOutfit = () => {
    const newOutfit = createOutfit(outfitName, selectedItems);
    onOutfitCreated(newOutfit); // Pass the new outfit back to parent
  };

  return (
    <div className="make-outfit">
      <h2>Create New Outfit</h2>
      <input
        type="text"
        placeholder="Outfit Name"
        value={outfitName}
        onChange={(e) => setOutfitName(e.target.value)}
      />
      <div className="available-items">
        <h3>Available Clothing Items</h3>
        {availableItems.map((item) => (
          <div key={item.id} className="item" onClick={() => handleAddItem(item)}>
            <p>{item.name}</p>
            <p>{item.type}</p>
          </div>
        ))}
      </div>
      <div className="selected-items">
        <h3>Selected Items</h3>
        {selectedItems.map((item) => (
          <div key={item.id} className="item">
            <p>{item.name}</p>
            <p>{item.type}</p>
          </div>
        ))}
      </div>
      <button onClick={handleCreateOutfit}>Create Outfit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default MakeOutfit;
