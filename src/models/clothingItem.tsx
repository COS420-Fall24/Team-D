interface ClothingItemProps {
  id?: string | null;
  name?: string;
  category?: string;
  tags?: string[];
  color?: string;
  size?: string;
  brand?: string;
  imageURL?: string;
  createdAt?: string;
  userID?: string | null;
}

class ClothingItem {
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

    constructor(props: ClothingItemProps = {}) {
        this.id = props.id || null;
        this.name = props.name || "Unnamed Item";
        this.category = props.category || "Uncategorized";
        this.tags = props.tags || [];
        this.color = props.color || "Unknown";
        this.size = props.size || "Unknown";
        this.brand = props.brand || "Unknown";
        this.imageURL = props.imageURL || "";
        this.createdAt = props.createdAt || new Date().toISOString();
        this.userID = props.userID || null;
    }
}

export { ClothingItem }; 