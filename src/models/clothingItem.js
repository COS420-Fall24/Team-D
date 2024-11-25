class ClothingItem {
    constructor ({id, name, category, tags, color, size, brand, imageURL, createdAt, userID})
    { this.id = id || null;
        this.name = name || "Unnamed Item";
        this.category = category || "Uncategorized";
        this.tags = tags || [];
        this.color = color || "Unknown";
        this.size = size || "Unknown";
        this.brand = brand || "Unknown";
        this.imageURL = imageURL || "";
        this.createdAt = createdAt || new Date().toISOString();
        this.userID = userID || null;
    }
}

export default ClothingItem;