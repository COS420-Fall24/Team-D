import React, { useState, useEffect } from 'react';
import { getClothingItems } from '../firebaseService';

interface ClothingItem { // i know this is redundant but is needed in this case for typescripts safety
    id: string | null;
    name: string;
    category: string;
    tags: string[];
    color: string;
    size: string;
    brand: string;
    imageURL: string;
    createdAt: string;
    userID: string | null;
  }

const WardrobePage: React.FC = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch clothing items on component mount
  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        setLoading(true);
        const items: ClothingItem[] = await getClothingItems(); // fetch items from backend
        const sortedItems = items.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ); // sort by `createdAt`
        setClothingItems(sortedItems);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothingItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wardrobe-page">
      <h1>Wardrobe</h1>
      <div className="clothing-items">
        {clothingItems.map((item) => (
          <div key={item.id || Math.random()} className="clothing-item">
            <img src={item.imageURL} alt={item.name} />
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Color:</strong> {item.color}</p>
            <p><strong>Size:</strong> {item.size}</p>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
            <p><strong>Added:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardrobePage;
