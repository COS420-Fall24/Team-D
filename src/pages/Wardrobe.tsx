import React, { useState, useEffect } from 'react';
import 
import { AddClothingItem, clothingItem, MakeOutfit} from 

//^import appropriate components for add/delete/edit clothItems/outfits

const WardrobePage = () => {
    const [clothingItems, setClothingItems] = useState([]);
    const [outfits, setOutfits] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch data
    useEffect(()) => {
        const fetchclothingItems = async () => {
            const items = await getClothingItems();
                setClothingItems(items);
        }

        fetchclothingItems();

    }

    const handleAddOutfit = () => {
        const newOutfit = { name: 'New Outfit', items: []}; 
        addOutfit(newOutfit);
        setOutfits([...oufits, newOutfit])
    }


}

export default Wardrobe 
