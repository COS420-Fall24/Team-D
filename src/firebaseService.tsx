import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { ClothingItem } from './models/clothingItem'; 

export const getClothingItems = async (): Promise<ClothingItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'clothingItems'));
    const items: ClothingItem[] = querySnapshot.docs.map(doc => {
      const docData = doc.data();

      // defaults for missing properties
      return new ClothingItem({
        id: doc.id,
        name: docData.name || "Unnamed Item",         
        category: docData.category || "Uncategorized", 
        tags: docData.tags || [],                     
        color: docData.color || "Unknown",            
        size: docData.size || "Unknown",              
        brand: docData.brand || "Unknown",            
        imageURL: docData.imageURL || "",              
        createdAt: docData.createdAt || new Date().toISOString(),  
        userID: docData.userID || "",               
      });
    });

    return items;
  } catch (error) {
    console.error('Error fetching clothing items:', error);
    throw error;
  }
};
