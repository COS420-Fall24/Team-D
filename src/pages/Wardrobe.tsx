import React, { useState, useEffect } from 'react';
import { AddClothingItem, MakeOutfit } from '../components';
import { outfit, clothingItem} from '../models';
import { db } from "../firebase-config"


interface ClothingItem {
  id: string;
  name: string;
  type: string;
}

interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
}

const WardrobePage = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const items = await fetchClothingItems(); 
        //setClothingItems(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothingItems();
  }, []);

  const MenuBar = () => {
    return (
      <nav className="menu-bar">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search outfits..." 
            className="search-input"
          />
        </div>
        <ul className="menu-actions">
          <li>
            <button onClick={() => handleAddOutfit()}>New Outfit</button>
          </li>
          <li>
            <button>Add Item</button>
          </li>
          <li>
            <button>Filter</button>
          </li>
        </ul>
      </nav>
    );
  };
  

  const handleAddOutfit = () => {
    const newOutfit: Outfit = { 
      id: Date.now().toString(),
      name: 'New Outfit', 
      items: []
    }; 
    setOutfits([...outfits, newOutfit]);
  };

  const Header = () => {
    return (
      <header>
        <h1>StyleNest Your Wardrobe</h1>
        <p>Create and organize your outfits!</p>
        <nav>
          <ul>
            <li>All Items</li>
            <li>Outfits</li>
            <li>Categories</li>
          </ul>
        </nav>
      </header>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <h1>My Wardrobe</h1>
      <AddClothingItem />
      <MakeOutfit />
      <MenuBar />
    </div>
  );
};

export default WardrobePage; 