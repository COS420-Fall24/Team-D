import React, { useState, useEffect } from 'react';
import { AddClothingItem, MakeOutfit } from '../components';
import { clothingItem, outfit } from '../models';
import { db } from "../firebase-config";
import './Collections.css';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const CollectionsPage = () => {
  const [clothingItems, setClothingItems] = useState<clothingItem[]>([]);
  const [outfits, setOutfits] = useState<outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMakeOutfit, setShowMakeOutfit] = useState(false);

  // Fetching Clothing Items
  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clothingItems'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as clothingItem[];
        setClothingItems(items);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothingItems();
  }, []);

  // Fetching Outfits
  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'outfits'));
        const outfits = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as outfit[];
        setOutfits(outfits);
      } catch (error) {
        console.error('Error fetching outfits:', error);
      }
    };

    fetchOutfits();
  }, []);

  const handleAddOutfit = () => {
    setShowMakeOutfit(true);
  };

  const handleOutfitCreated = (newOutfit: outfit) => {
    setOutfits([...outfits, newOutfit]);
    setShowMakeOutfit(false);

    // Save the new outfit to Firestore
    const saveOutfitToFirestore = async () => {
      try {
        const outfitRef = doc(db, 'outfits', newOutfit.id);
        await setDoc(outfitRef, newOutfit);
        console.log('Outfit saved to Firestore');
      } catch (error) {
        console.error('Error saving outfit to Firestore:', error);
      }
    };

    saveOutfitToFirestore();
  };

  const Header = () => (
    <header className="page-header">
      <div className="header-content">
        <h1>StyleNest</h1>
        <div className="header-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search outfits..." 
              className="search-input"
            />
          </div>
          <div className="action-buttons">
            <button>New Outfit</button>
            <button>Add Item</button>
          </div>
        </div>
        <nav className="navigation-container">
          <ul>
            <li><a href="#outfits">Outfits</a></li>
            <li><a href="#all">All Items</a></li>
            <li><a href="#categories">Categories</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <Header />
      <div className="wardrobe-header-container">
        <h1 className="wardrobe-header">My Wardrobe</h1>
      </div>
      <AddClothingItem />
      {showMakeOutfit && (
        <MakeOutfit 
        availableItems={clothingItems} // Pass the clothing items
        onOutfitCreated={handleOutfitCreated} // Callback for outfit creation
        onCancel={() => setShowMakeOutfit(false)} // Close the modal
        />
      )}
      <div className="outfits-container">
        {outfits.length > 0 ? (
          outfits.map(outfit => (
            <div key={outfit.id} className="outfit-card">
              <h3>{outfit.name}</h3>
              <div className="outfit-items">
                {outfit.items.map(item => (
                  <div key={item.id} className="outfit-item">
                    <p>{item.name}</p>
                    <p>{item.type}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No outfits available.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;
