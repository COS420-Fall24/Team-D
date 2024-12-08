import React, { useState, useEffect } from 'react';
import { getClothingItems } from '../firebaseService';
import './Wardrobe.css'; // Update this path if needed

interface ClothingItem {
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

    useEffect(() => {
        const fetchClothingItems = async () => {
            try {
                setLoading(true);
                const items: ClothingItem[] = await getClothingItems();
                const sortedItems = items.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setClothingItems(sortedItems);
            } catch (error) {
                console.error('Error fetching clothing items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClothingItems();
    }, []);

    return (
        <div className="wardrobe-container">
            <div className="wardrobe-header">
                <h1>Your Wardrobe</h1>
                <p>Browse and organize your clothing items below</p>
            </div>

            {loading ? (
                <div className="loading-spinner">
                    <div></div>
                </div>
            ) : (
                <div className="clothing-items">
                    {clothingItems.map((item) => (
                        <div key={item.id || Math.random()} className="clothing-item">
                            <img src={item.imageURL} alt={item.name} />
                            <div className="clothing-item-info">
                                <h2>{item.name}</h2>
                                <p><strong>Category:</strong> {item.category}</p>
                                <p><strong>Color:</strong> {item.color}</p>
                                <p><strong>Size:</strong> {item.size}</p>
                                <p><strong>Brand:</strong> {item.brand}</p>
                                <p><strong>Tags:</strong> {item.tags.join(', ')}</p>
                                <p><strong>Added:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WardrobePage;


