import type ClothingItem from './clothingItem';

export interface outfit {
  id: string;
  name: string;
  items: ClothingItem[];
}

export function createOutfit(name: string, items: ClothingItem[]): outfit; 