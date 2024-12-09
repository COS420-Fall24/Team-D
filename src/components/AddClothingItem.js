import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../firebase-config"
import ClothingItem from "../models/clothingItem";

const AddClothingItem = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        tags: "",
        color: "",
        size: "",
        brand: "",
    });
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!file){
            alert("Please upload an image");
            return;
        }

        setIsSubmitting(true);

        try{
            //uploading a photo to firebase
            const storage = getStorage();
            const storageRef = ref(storage, `clothing/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setProgress(prog);
                },
                (error) => {
                    console.error("Image upload failed:", error);
                    setIsSubmitting(false);
                },
                async () => {
                    const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

                    const newClothingItem = new ClothingItem({
                        ...formData,
                        tags: formData.tags.split(",").map((tag) => tag.trim()),
                        imageURL,
                        createdAt: new Date().toISOString(),
                    });

                    await db.collection("ClothingItems").add(newClothingItem);
                    alert("Clothing item added successfully");
                    setIsSubmitting(false);

                    setFormData({
                        name: "",
                        category: "",
                        tags: "",
                        color: "",
                        size: "",
                        brand: "",
                    });
                    setFile(null);
                    setProgress(0);
                }
            );
        } catch (error){
            console.error("Error saving clothing item:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <div>
          <h2>Add a New Clothing Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
            />
            <input
              type="text"
              name="size"
              placeholder="Size"
              value={formData.size}
              onChange={handleChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
            />
            <label htmlFor="file-upload">Upload Image</label>
            <input id="file-upload" type="file" onChange={handleFileChange} required />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Clothing Item"}
            </button>
          </form>
          {progress > 0 && <p>Upload Progress: {progress.toFixed(2)}%</p>}
        </div>
      );
    };
    
export default AddClothingItem;