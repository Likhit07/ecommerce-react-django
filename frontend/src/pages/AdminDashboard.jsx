import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch subcategories for dropdown
  useEffect(() => {
    axios.get("subcategories/1/") // change if needed
      .then(res => setSubcategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async () => {
    if (!name || !price || !subcategory) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("subcategory", subcategory);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("product/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully ✅");

      // Reset form
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setSubcategory("");
      setImage(null);

    } catch (err) {
      console.error(err);
      alert("Only Admin can add product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Dashboard
        </h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded mb-3"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded mb-3"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* Subcategory Dropdown */}
        <select
          className="w-full border p-2 rounded mb-3"
          value={subcategory}
          onChange={e => setSubcategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map(sub => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          type="file"
          className="w-full mb-4"
          onChange={e => setImage(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}