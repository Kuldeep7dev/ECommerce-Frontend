import React, { useState, useEffect } from "react";
import { Package, Layers, Upload, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Config/AxiosInstance";
import BreadCrumb from "../../Component/BreadCrumb";
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
};

const toastSuccess = (msg) => toast.success(msg, toastTheme);
const toastError = (msg) => toast.error(msg, toastTheme);

const UpdateProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [colour, setColour] = useState("#000000");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalProduct, setOriginalProduct] = useState(null);

  const [product, setProduct] = useState({
    productName: "",
    stock: "",
    price: "",
    category: "",
    colour: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${slug}`);
        const data = res.data.product || res.data;

        setProduct({
          productName: data.productName ?? "",
          stock: data.stock ?? "",
          price: data.price ?? "",
          category:
            typeof data.category === "object"
              ? data.category?.name || ""
              : (data.category ?? ""),
          colour: data.colour ?? [],
        });
        setOriginalProduct({
          productName: data.productName ?? "",
          stock: data.stock ?? "",
          price: data.price ?? "",
          category:
            typeof data.category === "object"
              ? data.category?.name || ""
              : (data.category ?? ""),
          colour: data.colour ?? [],
          image: data.image ?? [],
        });

        setExistingImages(data.image ?? []);
      } catch (error) {
        toastError("Failed to load product");
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

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
    if (product.colour.includes(colour))
      return toastError("Colour already added");

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

  const isUnchanged = () => {
    if (!originalProduct) return true;

    const basicSame =
      product.productName === originalProduct.productName &&
      String(product.stock) === String(originalProduct.stock) &&
      String(product.price) === String(originalProduct.price) &&
      product.category === originalProduct.category;

    const colourSame =
      JSON.stringify(product.colour) === JSON.stringify(originalProduct.colour);

    const newImageAdded = images.some((img) => img !== null);

    return basicSame && colourSame && !newImageAdded;
  };

  const postData = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!product.productName.trim()) return toastError("Product name required");
    if (!product.stock) return toastError("Stock required");
    if (!product.price) return toastError("Price required");
    if (!product.category) return toastError("Category required");
    if (product.colour.length === 0)
      return toastError("Add at least one colour");

    setLoading(true);

    try {
      let uploadedImages = [...existingImages];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        if (file) {
          const res = await uploadFile(
            file,
            "products",
            product.productName + "-" + i
          );

          if (!res.success) {
            setLoading(false);
            return toastError(`Image ${i + 1} upload failed`);
          }

          uploadedImages[i] = res.fileName;
        }
      }

      uploadedImages = uploadedImages.filter(Boolean);

      await axiosInstance.put(`/product/${slug}`, {
        productName: product.productName,
        stock: product.stock,
        price: product.price,
        category: product.category,
        colour: product.colour,
        image: uploadedImages,
      });
      navigate("/products");
      toastSuccess("Product updated successfully");
    } catch (error) {
      toastError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { title: "Dashboard", link: '/dashboard' },
    { title: "Products", link: '/products' },
    { title: slug, link: `/products/${slug}/view` },
    {title: 'Update'}
  ]

  return (
    <div>
      <div className="flex justify-start items-start mt-5 ms-3">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <div className="flex flex-col items-center justify-center p-4 border mt-5 rounded-xl">
        <div className="w-full rounded-2xl">
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
                      className="flex flex-col items-center w-50 text-center justify-center gap-2 p-8 border border-dashed rounded-lg cursor-pointer hover:bg-primary hover:text-secondary transition-all"
                    >
                      <Upload size={28} />
                      <span className="text-sm">
                        {img
                          ? img.name
                          : existingImages[index] || "Upload product images"}
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
                disabled={loading || isUnchanged()}
                className="w-full py-3 cursor-pointer bg-accent text-white rounded-lg font-semibold hover:bg-dark transition"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
