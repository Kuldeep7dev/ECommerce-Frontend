import React, { useState } from "react";
import { Package, Layers, Upload, IndianRupee, AtSign } from "lucide-react";
import BreadCrumb from "../../Component/BreadCrumb";
import { showError } from "../../Utils/toaster";
import axiosInstance from "../../Config/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const navigate = useNavigate();
  const [colour, setColour] = useState("#000000");
  const [images, setImages] = useState([null, null, null, null, null]);

  const [data, setData] = useState({
    productName: "",
    stock: "",
    price: "",
    category: "",
    brand: "",
    colour: [],
  });

  // 🔹 input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 add colour
  const addColour = () => {
    if (data.colour.includes(colour)) return;
    setData((prev) => ({
      ...prev,
      colour: [...prev.colour, colour],
    }));
  };

  // 🔹 remove colour
  const removeColour = (c) => {
    setData((prev) => ({
      ...prev,
      colour: prev.colour.filter((col) => col !== c),
    }));
  };

  // 🔹 image change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      console.log(file.name);

      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  // 🔹 submit
  const handlePostData = async (e) => {
    e.preventDefault();

    // validations
    if (!data.productName.trim()) {
      return showError("Product name is required");
    }
    if (!data.stock) {
      return showError("Stock is required");
    }
    if (!data.price) {
      return showError("Price is required");
    }
    if (!data.category) {
      return showError("Please select a category");
    }
    if (!data.brand) {
      return showError("please add the brand name");
    }
    if (data.colour.length === 0) {
      return showError("Please add at least one colour");
    }

    try {

      const res = await axiosInstance.post("/product", data);

      console.log(res.data);
      navigate("/Products");
    } catch (error) {
      console.log(error);
      showError("Server error while uploading product");
    }
  };

  const breadcrumbItems = [{ title: "Upload" }];

  return (
    <div>
      <div className="mt-2">
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div className="flex flex-col items-center justify-center p-4 border mt-5 rounded-xl">
        <div className="w-full rounded-2xl">
          <h2 className="text-2xl font-bold mb-8">Upload Product</h2>

          <form
            onSubmit={handlePostData}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                <Package size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="productName"
                  value={data.productName}
                  onChange={handleChange}
                  className="w-full outline-none"
                  placeholder="Enter product name"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Stock</label>
              <div className="flex items-center border rounded-md px-3 py-2 mt-1">
                <Layers size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  className="w-full outline-none"
                  placeholder="Enter stock"
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
                  value={data.price}
                  onChange={handleChange}
                  className="w-full outline-none"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={data.category}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1 outline-none"
              >
                <option value="">Select category</option>
                <option value="men">MEN</option>
                <option value="woman">WOMEN</option>
                <option value="children">CHILDREN</option>
              </select>
            </div>

            <div className="text-sm font-medium">
              <label>Brand</label>
              <div className="flex items-center border rounded-md px-3 py-2 mt-1 w-[74rem]">
                <span>
                  <AtSign size={18} className="text-gray-500 mr-2" />
                </span>
                <input
                  type="text"
                  name="brand"
                  value={data.brand}
                  onChange={handleChange}
                  className="w-full outline-none"
                  placeholder="Enter brand"
                />
              </div>
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
                {data.colour.map((c) => (
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
                {images.map((_, i) => (
                  <div key={i}>
                    <label
                      htmlFor={`product-upload-${i}`}
                      className="flex flex-col items-center w-50 text-center justify-center gap-2 p-8 border border-dashed rounded-lg cursor-pointer hover:bg-secondary hover:text-primary transition-all"
                    >
                      <Upload size={28} />
                      <span className="text-sm ">
                        {images[i]
                          ? images[i].name
                          : "Upload product image"}
                      </span>
                    </label>
                    <input
                      onChange={(e) => handleImageChange(e, i)}
                      id={`product-upload-${i}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
              >
                Upload Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;