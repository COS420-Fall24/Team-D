import { clothingItem } from './index';

class Outfit {
  constructor(id, name, items) {
    this.id = id;
    this.name = name;
    this.items = items || [];
  }

  addItem(item) {
    if (this.items.length >= 4) {
      throw new Error('Maximum 4 items allowed per outfit');
    }
    this.items.push(item);
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      items: this.items
    };
  }

  static fromJSON(json) {
    return new Outfit(json.id, json.name, json.items);
  }

  static create(name, items = []) {
    const id = Date.now().toString();
    return new Outfit(id, name, items);
  }
}

export default Outfit;
