import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../Config/AxiosInstance'
import Pages from '../../Component/Global/Pages'
import BreadCrumb from '../../Component/BreadCrumb'

const ViewProduct = () => {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/product/${slug}`)
      setData(res.data.product)
      setSelectedImage(res.data.product.image?.[0] || null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
    document.title = `Bravima || Admin ${data.productName} View`
  }, [slug]);

  if (!data) return null


  const breadcrumbItems = [
    { title: "Products", link: '/products' },
    { title: slug },

  ]

  return (
    <Pages>
      <div>
        <div className='flex justify-start items-start mt-5 ms-3'>
          <BreadCrumb items={breadcrumbItems} />
        </div>
        <div className="mx-auto p-6 grid md:grid-cols-2 gap-10">

          <div>
            {selectedImage && (
              <img
                src={`https://bravimaserver.vercel.app/${selectedImage}`}
                alt={data.productName}
                className="w-full h-[420px] object-cover rounded-lg border"
              />
            )}

            <div className="flex gap-3 mt-4">
              {data.image?.map((img, index) => (
                <img
                  key={index}
                  src={`https://bravimaserver.vercel.app/${img}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border ${selectedImage === img ? 'border-black' : 'border-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">{data.productName}</h1>

            <p className="text-xl">Price: <b>₹{data.price}</b></p>

            <div className="flex items-center gap-2">
              <p className='font-bold'>Colour: </p>
              {data.colour?.map((c, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <div className="space-y-1 text-sm">
              <p className='font-bold'><span className="text-gray-400">Stock:</span> {data.stock}</p>
              <p className='font-bold'><span className="text-gray-400">Brand:</span> {data.brand}</p>
            </div>
          </div>

        </div>
      </div>
    </Pages>
  )
}

export default ViewProduct