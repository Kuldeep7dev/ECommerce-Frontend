import React, { useState } from "react";
import { Package, Layers, Upload, IndianRupee } from "lucide-react";
import axiosInstance from "../../Config/AxiosInstance";
import toast from "react-hot-toast";

import { uploadFile } from "../../Utils/uploadFile";

const CATEGORY = {
  MEN: "MEN",
  WOMEN: "WOMEN",
  CHILDREN: "CHILDREN",
};

const toastTheme = {
  position: "top-right",
  style: {
    background: "#fefce8",
    color: "#10100e",
    border: "1px solid #eab308",
    padding: "14px",
    fontWeight: "500",
  },
  iconTheme: {
    primary: "#eab308",
    secondary: "#fefce8",
  },
};

const toastSuccess = (msg) => toast.success(msg, toastTheme);
const toastError = (msg) => toast.error(msg, toastTheme);

const ProductUpload = () => {
  const [colour, setColour] = useState("#000000");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    productName: "",
    stock: "",
    price: "",
    category: "",
    colour: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const addColour = () => {
    if (product.colour.includes(colour)) {
      return toastError("Colour already added");
    }

    setProduct((prev) => ({
      ...prev,
      colour: [...prev.colour, colour],
    }));
  };

  const removeColour = (c) => {
    setProduct((prev) => ({
      ...prev,
      colour: prev.colour.filter((col) => col !== c),
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!product.productName.trim()) return toastError("Product name required");
    if (!product.stock) return toastError("Stock required");
    if (!product.price) return toastError("Price required");
    if (!product.category) return toastError("Category required");

    const validImages = images.filter((img) => img !== null);
    if (validImages.length === 0)
      return toastError("At least one image required");

    if (product.colour.length === 0) {
      return toastError("Add at least one colour");
    }

    setLoading(true);

    try {
      let uploadedImages = [];

      for (let i = 0; i < validImages.length; i++) {
        const res = await uploadFile(
          validImages[i],
          "products",
          product.productName + "-" + i,
        );

        if (!res.success) {
          setLoading(false);
          return toastError(`Image ${i + 1} upload failed`);
        }

        uploadedImages.push(res.fileName);
      }

      await axiosInstance.post("/product", {
        productName: product.productName,
        stock: product.stock,
        price: product.price,
        image: uploadedImages,
        colour: product.colour,
        category: product.category,
      });

      toastSuccess("Product uploaded successfully");

      setProduct({
        productName: "",
        stock: "",
        price: "",
        category: "",
        colour: [],
      });

      setImages([null, null, null, null, null]);
      setColour("#000000");
    } catch (error) {
      console.log(error);
      toastError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center p-6 h-[85vh]">
      <div className="w-full rounded-2xl p-">
        <h2 className="text-2xl font-bold mb-8">Upload Product</h2>

        <form
          onSubmit={postData}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1">
              <Package size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="Product name"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Stock</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1">
              <Layers size={18} className="text-gray-500 mr-2" />
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <div className="flex items-center border rounded-md px-3 py-2 mt-1">
              <IndianRupee size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 outline-none"
            >
              <option value="">Select category</option>

              {Object.values(CATEGORY).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Colour</label>

            <div className="flex items-center gap-4 border rounded-lg px-4 py-3 mt-1">
              <div
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: colour }}
              />

              <input
                type="color"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="w-10 h-10 cursor-pointer"
              />

              <button
                type="button"
                onClick={addColour}
                className="text-sm border px-4 py-1 rounded hover:bg-black hover:text-white"
              >
                Add Colour
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              {product.colour.map((c) => (
                <div
                  key={c}
                  onClick={() => removeColour(c)}
                  className="w-7 h-7 rounded-full border cursor-pointer"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label>Image</label>

            <div className="flex gap-10 flex-wrap">
              {images.map((img, index) => (
                <div key={index}>
                  <label
                    htmlFor={`product-upload-${index}`}
                    className="flex flex-col items-center w-50 text-center justify-center gap-2 p-8 border border-dashed rounded-lg cursor-pointer hover:bg-primary hover:text-secondary transition-all "
                  >
                    <Upload size={28} />
                    <span className="text-sm">
                      {img ? img.name : "Upload product images"}
                    </span>
                  </label>

                  <input
                    id={`product-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 cursor-pointer bg-accent text-white rounded-lg font-semibold hover:bg-dark transition"
            >
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
