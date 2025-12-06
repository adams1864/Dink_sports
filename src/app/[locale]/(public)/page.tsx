"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import ProductModal from '@/components/ProductModal';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/api';
import { FeaturedBundle } from '@/components/landing/FeaturedBundle';

// Constants for color consistency
const RED_COLOR = '#D92323';
const TEXT_GRAY = '#6B7280';

// Faint Wing-Shaped Line Art Graphic (Bottom Right)
const WingLineArt = () => (
    <svg viewBox="0 0 100 100" stroke={RED_COLOR} strokeWidth="1" fill="none">
        <path d="M10,90 Q50,80 90,10 M20,95 Q55,85 85,25" />
    </svg>
);

// Helper component for the product collage grid item
const ProductItem = ({ label, size = 'w-full h-full' }: { label: string, size?: string }) => (
    <div className={`bg-gray-900 border border-gray-700/50 rounded-lg shadow-inner flex items-center justify-center text-xs text-white/50 ${size}`}>
        {/* Placeholder for the black garment image */}
        {label}
    </div>
);

// Placeholder images
const soccerball = "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=1000&auto=format&fit=crop";
const jersey = "https://images.unsplash.com/photo-1577212017184-80cc0da11395?q=80&w=1000&auto=format&fit=crop";
const cleats = "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMd, setIsMd] = useState<boolean>(false);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    
    // Fetch new arrivals
    setIsLoading(true);
    getProducts({ perPage: 4, sort: 'createdAt', order: 'desc', status: 'published' })
      .then((res) => {
        setNewArrivals(res.data);
        setError(false);
      })
      .catch((err) => {
        console.error('Failed to fetch new arrivals', err);
        setError(true);
      })
      .finally(() => setIsLoading(false));

    return () => window.removeEventListener('resize', check);
  }, []);

  const categories = [
    { name: 'Footballs', image: soccerball, color: 'from-[#D92323] to-[#b91c1c]' },
    { name: 'Jerseys', image: jersey, color: 'from-[#b91c1c] to-[#D92323]' },
    { name: 'Cleats', image: cleats, color: 'from-[#D92323] to-[#991b1b]' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden relative">
      
      {/* 2. Main Hero Section Layout */}
      <main className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-80px)] items-start md:items-center relative">
          
          {/* LEFT SIDE: Curved Product Area */}
          <div className="w-full md:w-[50%] h-[550px] md:h-full relative z-10">
             <div 
               className="absolute inset-0 bg-gray-100 overflow-hidden shadow-2xl curved-frame"
             >
               {/* Inner content container to hold the product collage and model */}
               <div className="relative w-full h-full flex p-4 sm:p-10 gap-4">
                   
                   {/* Product Collage Panel (Slightly transparent dark background) */}
                   <div className="w-[60%] p-3 bg-black/70 rounded-lg shadow-2xl border border-red-600/30">
                       <div className="grid grid-cols-2 gap-2 h-full">
                          <ProductItem label="Hoodie" />
                          <ProductItem label="Shorts" />
                          <ProductItem label="Compression L/S" />
                          <ProductItem label="Compression Shorts" />
                          <ProductItem label="Compression S/S" />
                          <ProductItem label="Tights" />
                       </div>
                   </div>
                   
                   {/* Athlete Image Placeholder (Cropped) */}
                   <div className="w-[40%] h-full relative overflow-hidden rounded-lg">
                       <img 
                           src="https://images.unsplash.com/photo-1605389657077-8d01d4a0f443?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                           alt="Model wearing activewear" 
                           className="w-full h-full object-cover object-[0%_5%]" /* Crop to show upper torso and head */
                           onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x800/222/fff?text=Athlete+Model"; }}
                       />
                   </div>

                   {/* Shadow gradient on the curve to deepen the effect */}
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/50"></div>
               </div>
             </div>
          </div>

          {/* RIGHT SIDE: Branding and Tagline (No Large Antelope) */}
          <div className="w-full md:w-[50%] flex flex-col justify-center px-8 md:px-16 lg:px-24 relative pt-12 pb-20 md:pt-0">
              
              {/* Text Content */}
              <div className="relative z-30 text-center md:text-right max-w-lg mx-auto md:ml-auto">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#D92323] leading-tight tracking-tight mb-6 animate-pulse-once">
                      GEAR UP.<br />
                      STAND OUT.<br />
                      GO BEYOND.
                  </h2>
                  
                  {/* Sub-headline */}
                  <p className={`text-[${TEXT_GRAY}] text-base md:text-lg leading-relaxed mb-10 mx-auto md:ml-auto max-w-md`}>
                      From the grind to the spotlight — <br />
                      DINK Sports Wear is built for those who move with purpose.
                  </p>

                  {/* Buy Now Button (Red, Pill-shaped) */}
                  <button className="bg-[#D92323] text-white px-10 py-3 rounded-full font-bold shadow-xl md:shadow-2xl transition-all duration-300 transform hover:bg-red-700 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-300">
                      BUY NOW
                  </button>
              </div>

              {/* Faint Wing-Shaped Line Art Graphic (Bottom Right) */}
              <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                  <WingLineArt />
              </div>

          </div>
      </main>

      {/* New Arrivals Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#D92323] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-black text-center mb-4 text-gray-900">
            New{' '}
            <span className="text-[#D92323]">
              Arrivals
            </span>
          </h2>
          <div className="h-1 w-32 bg-[#D92323] mx-auto mb-16" />

          <div className="grid md:grid-cols-4 gap-8">
            {isLoading ? (
              <div className="col-span-4 text-center text-gray-500 py-10">
                Loading new arrivals...
              </div>
            ) : error || newArrivals.length === 0 ? (
              <div className="col-span-4 text-center py-10">
                <p className="text-xl text-gray-600 mb-4">Our latest collection is arriving soon.</p>
                <p className="text-gray-500">Please check back later for new products.</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
                >
                    Refresh Page
                </button>
              </div>
            ) : (
              newArrivals.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-[0_0_20px_rgba(217,35,35,0.12)] transition-all duration-500 transform hover:scale-105 border border-gray-100"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img 
                      src={product.coverImage || product.images?.[0] || '/placeholder.png'} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#D92323] transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#D92323]">
                        ${product.price}
                      </span>
                      <button className="p-3 bg-[#D92323] text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D92323] rounded-2xl transition-all duration-500" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Bundles Section */}
      <FeaturedBundle />

      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4 text-gray-900">
            Featured{' '}
            <span className="text-[#D92323]">
              Categories
            </span>
          </h2>
          <div className="h-1 w-32 bg-[#D92323] mx-auto mb-16" />

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative h-96 rounded-2xl overflow-hidden cursor-pointer group transform-gpu"
                style={{
                  transform:
                    hoveredCategory === category.name
                      ? 'rotateY(5deg) rotateX(5deg) scale(1.03)'
                      : 'rotateY(0deg) rotateX(0deg)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...(isMd ? { animation: 'float 3s ease-in-out infinite', animationDelay: `${index * 0.12}s` } : {}),
                }}
              >
                {/* background image fills the card */}
                <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover rounded-2xl" />

                {/* subtle gradient overlay that appears on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-30 transition-opacity duration-500 z-10 rounded-2xl`}
                />

                {/* content on top of the image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-gray-900 px-6">
                  <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {/* decorative small image/icon retained if needed */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-black/30 flex items-center justify-center backdrop-blur-sm">
                      <img src={category.image} alt={`${category.name} icon`} className="w-full h-full object-cover rounded-lg opacity-90" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2 drop-shadow-md">
                    {category.name}
                  </h3>
                  <div className="h-1 w-16 bg-[#D92323] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>

                {/* border outline on top */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D92323] rounded-2xl transition-all duration-500 z-30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <img src={soccerball} alt="decor" className="w-3/4 h-3/4 object-cover opacity-20 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-black mb-6">
              Where{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Passion
              </span>{' '}
              Meets{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Precision
              </span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              At Dink Sports Wear, we believe that every athlete deserves gear
              that performs as hard as they do. Our collection combines
              cutting-edge technology with timeless design.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              From the field to the streets, we empower athletes to push their
              limits and redefine what's possible.
            </p>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
