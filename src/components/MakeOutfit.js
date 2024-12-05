import React, { useState } from 'react';
import { outfit, clothingItem } from '../models';
import { db } from "../firebase-config"


const MakeOutfit = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleItemSelect = (item) => {
    if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    } else {
      alert('Maximum 4 items allowed per outfit');
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

    const newOutfit = {
      id: Date.now().toString(),
      name: outfitName,
      items: selectedItems
    };

    try {
      const outfitRef = await db.collection('outfits').add(newOutfit);
      console.log('Outfit saved with ID:', outfitRef.id);
    } catch (error) {
      console.error('Error saving outfit:', error);
      alert('Failed to save outfit. Please try again.');
    }
    
    // Reset form
    setSelectedItems([]);
    setOutfitName('');
    setShowForm(false);
  };

  return (
    <div className="make-outfit-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Make New Outfit'}
      </button>

      {showForm && (
        <div className="outfit-form">
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
            {/* Here you would map through your available clothing items */}
            {/* This is a placeholder for demonstration */}
            <div className="items-grid">
              {/* Add your clothing items here */}
            </div>
          </div>

          <button 
            onClick={handleCreateOutfit}
            disabled={selectedItems.length < 1 || !outfitName.trim()}
          >
            Create Outfit
          </button>
        </div>
      )}
    </div>
  );
};

export default MakeOutfit;
