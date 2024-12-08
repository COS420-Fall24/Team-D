export interface clothingItem {
  id: string;
  name: string;
  type: string;
}

export interface outfit {
  id: string;
  name: string;
  items: clothingItem[];
}

export { createOutfit } from './outfit';
