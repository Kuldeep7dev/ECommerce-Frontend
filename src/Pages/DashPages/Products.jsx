import React, { useEffect, useState } from 'react'
import { Eye, Pencil, Plus, Trash, Search as Mg } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Config/AxiosInstance';
import BreadCrumb from '../../Component/BreadCrumb';
import ConfirmationModal from '../../Component/ConfirmationModel';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConfirmationModelOpen, SetIsConfirmationModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/product');
      setProducts(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch searched products
  const fetchSearchItem = async (term) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/product?q=${term}`);
      setProducts(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Debounced search
  useEffect(() => {
    document.title = "Bravima || Admin Product"
    const delay = setTimeout(() => {
      if (searchTerm.trim() === "") {
        fetchProducts(); // show all
      } else {
        fetchSearchItem(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Delete failed: ", error);
    }
  };

  const breadcrumbItems = [
    { title: "Product" }
  ];


  const handleDeleteAction = (product) => {
    SetIsConfirmationModelOpen(true)
    setSelectedProduct(product)
  }




  return (
    <div className='py-6 px-2'>
      <div className='flex justify-between px-5'>
        <BreadCrumb items={breadcrumbItems} />
        <Link
          to='/upload'
          className='flex border items-center p-2 rounded-xl gap-2 font-bold hover:bg-primary hover:text-secondary hover:border transition-all'
        >
          <Plus size={20} /> Upload
        </Link>
      </div>

      {/* 🔍 Search bar */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex items-center gap-2 border shadow-md rounded-full px-5 py-3 w-full md:w-[500px] bg-primary">
          <Mg className="text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none text-sm bg-transparent text-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🔹 Table */}
      <div className="p-10">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">Product not available</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-primary text-secondary">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className='p-2 border'>Catgory</th>
                <th className="p-2 border">Stock</th>
                <th className='p-2 border'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="p-3 border">
                    <img
                      src={`https://bravimaserver.vercel.app/${item.image[0]}`}
                      alt={item.productName}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>

                  <td className="p-3 border">{item.productName}</td>
                  <td className="p-3 border">₹{item.price}.00</td>
                  <td className='p-3 border'>{item.category}</td>
                  <td className="p-3 border">{item.stock}</td>

                  <td className='p-3 border'>
                    <div className='flex justify-center items-center gap-2'>
                      <Link to={`/products/${item.slug}/view`} className='p-2 rounded-xl border-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-all'>
                        <Eye size={20} />
                      </Link>

                      <Link
                        to={`/products/${item.slug}/update`}
                        className='p-2 rounded-xl border-2 bg-accent text-white hover:bg-white hover:text-accent hover:border-accent transition-all'
                      >
                        <Pencil size={20} />
                      </Link>

                      <button
                        onClick={() => handleDeleteAction(item)}
                        className='border-2 p-2 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500 transition-all'
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>




      <ConfirmationModal
        isOpen={isConfirmationModelOpen}
        type='danger'
        title='Delete Product'
        message={`Are you sure you want to delete this product?  ${selectedProduct?.productName}`}
        onClose={() => {
          SetIsConfirmationModelOpen(false)
          setSelectedProduct(null)
        }}
        actionButton={
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer'
            onClick={async () => {
              await deleteProduct(selectedProduct._id)
              SetIsConfirmationModelOpen(false)
              setSelectedProduct(null)
            }}
          >
            Delete
          </button>
        }
      />
    </div>
  )
}

export default Products;