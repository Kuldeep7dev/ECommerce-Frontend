import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Copyright } from 'lucide-react';
import { RiFacebookFill, RiInstagramFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react';
import toast from 'react-hot-toast';
// Facebook, Twitter, Instagram, Youtube,

const Footer = () => {
  const brands = [
    { title: "Nike", link: 'https://www.nike.in/' },
    { title: "Adidas", link: "https://www.adidas.co.in/" },
    { title: "Puma", link: "https://in.puma.com/" },
    { title: "Reebok", link: "https://reebok.in/" }
  ];

  const categories = [
    { title: "Men", link: "/men" },
    { title: "Women", link: "/women" },
    { title: "Children", link: "/children" },
  ];

  const help = [
    { title: "About Us", link: "/about-us" },
    { title: "Contact Us", link: "/contact-us" },
    { title: "Return Policy", link: "/return-policy" },
    { title: "FAQ", link: "/faq" }
  ];

  const phoneNumber = '919137706176'
  const email = 'kushallaxkar9@gmail.com'
  const openWhatsapp = () => {
    window.open(`https://wa.me/${phoneNumber}`)
  }

  const handleMessage = async () => {
    toast("Coming soon")
  }

  return (
    <footer className="bg-secondary text-primary pt-16 pb-8 border-t border-primary/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 tracking-wide" style={{ fontFamily: "Dancing Script" }}>Bravima</h2>
            <p className="opacity-70 mb-6 text-sm leading-relaxed">
              Your one-stop destination for the latest trends in fashion and apparel. Quality products, fast shipping, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <RiFacebookFill size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <RiTwitterXFill size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <RiInstagramFill size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <RiYoutubeFill size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-4">
              {categories.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link} className="opacity-70 hover:opacity-100 hover:underline transition-all duration-300 text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Help */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-4">
              {help.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.link} className="opacity-70 hover:opacity-100 hover:underline transition-all duration-300 text-sm">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Brands */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start space-x-3 opacity-70 text-sm">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>Near Civil Hospital, Ahmedabad, Gujarat - 382345</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone size={18} className="flex-shrink-0 opacity-70" />
                <span
                  className='opacity-70 hover:opacity-100 hover:underline cursor-pointer transition-all duration-300'
                  onClick={openWhatsapp}
                >
                  +91 {phoneNumber.slice(2, 7)}-{phoneNumber.slice(7)}
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail size={18} className="flex-shrink-0 opacity-70" />
                <a
                  href={`mailto:${email}`}
                  target='_blank'
                  className="opacity-70 hover:opacity-100 hover:underline transition-all duration-300"
                >
                  {email}
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4 mt-8">Top Brands</h3>
            <div className="flex flex-wrap gap-2">
              {brands.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-secondary px-3 py-1 rounded-full text-xs font-bold hover:scale-105 transition-transform duration-300"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-primary/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70 text-sm text-center md:text-left flex gap-2 items-center">
            <Copyright size={15} /> {new Date().getFullYear()} <span style={{ fontFamily: "Dancing Script" }}>Bravima</span>. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button onClick={handleMessage} to="/terms" className="opacity-70 hover:opacity-100 hover:underline text-sm transition-opacity duration-300">Terms of Service</button>
            <button onClick={handleMessage} to="/privacy" className="opacity-70 hover:opacity-100 hover:underline text-sm transition-opacity duration-300">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;