import React, { useState } from 'react';
import { outfit } from '../models';
import { db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

const MakeOutfit = ({ availableItems, onOutfitCreated, onCancel }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  
  const handleItemSelect = (item) => {
    if (!selectedItems.some(i => i.id === item.id) && selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    } else {
      alert('Maximum 4 items allowed or item already selected');
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleCreateOutfit = async () => {
    if (selectedItems.length < 1) {
      alert('Please select at least one item');
      return;
    }

    if (!outfitName.trim()) {
      alert('Please enter an outfit name');
      return;
    }

    // Create the outfit object
    const newOutfit = Outfit.create(outfitName, selectedItems);

    try {
      // Save the new outfit to Firestore
      await newOutfit.saveToFirestore();
      onOutfitCreated(newOutfit); // Notify the parent component of the new outfit
      onCancel(); // Close the form or reset state
    } catch (error) {
      console.error('Error creating outfit:', error);
      alert('Failed to create outfit');
    }
  };

  return (
    <div className="make-outfit-container">
      <button onClick={onCancel}>Cancel</button>

      <input 
        type="text" 
        placeholder="Outfit Name" 
        value={outfitName} 
        onChange={(e) => setOutfitName(e.target.value)} 
      />

      <div className="selected-items">
        <h3>Selected Items ({selectedItems.length}/4):</h3>
        {selectedItems.map((item) => (
          <div key={item.id} className="selected-item">
            <span>{item.name}</span>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="available-items">
        <h3>Available Items:</h3>
        <div className="items-grid">
          {availableItems.map((item) => (
            <div key={item.id} className="item-card" onClick={() => handleItemSelect(item)}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={handleCreateOutfit}
        disabled={selectedItems.length < 1 || !outfitName.trim()}
      >
        Create Outfit
      </button>
    </div>
  );
};

export default MakeOutfit;
