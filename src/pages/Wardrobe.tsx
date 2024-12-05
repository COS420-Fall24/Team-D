import React, { useState, useEffect } from 'react';
import { AddClothingItem, MakeOutfit } from '../components';
import { outfit, clothingItem} from '../models';

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

  const handleAddOutfit = () => {
    const newOutfit: Outfit = { 
      id: Date.now().toString(),
      name: 'New Outfit', 
      items: []
    }; 
    setOutfits([...outfits, newOutfit]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Wardrobe</h1>
      <AddClothingItem />
      <MakeOutfit />
      {/* Add your components here */}
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <h1>StyleNest Your Wardobe</h1>
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
const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li>
          <button>Add Item</button>
        </li>
        <li>
          <button>Create Outfit</button>
        </li>
        <li>
          <button>Filter</button>
        </li>
        <li>
          <button>Sort</button>
        </li>
      </ul>
    </nav>
  );
};


export default WardrobePage; 
