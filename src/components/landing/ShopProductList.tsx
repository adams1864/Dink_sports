"use client";

import { useState, useEffect } from 'react';
import { Filter, ShoppingBag, X } from 'lucide-react';
import { Product } from '@/lib/api';
import { ProductBuyModal } from '@/components/ProductBuyModal';
import { useDisclosure } from '@mantine/hooks';

interface ShopProductListProps {
  initialProducts: Product[];
}

// Internal Modal Component to avoid prop drilling issues if ProductModal expects different props
function ProductDetailModal({ product, onClose, onBuy }: { product: Product; onClose: () => void; onBuy: () => void }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96 md:h-full bg-gray-50">
            <img
              src={product.coverImage || product.images?.[0] || '/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <span className="text-red-500 font-bold mb-2">{product.category}</span>
            <h2 className="text-4xl font-black mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description || "Experience premium quality and performance with this top-tier sportswear item. Designed for athletes who demand the best."}
            </p>

            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
              <span className="text-4xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <button 
                onClick={onBuy}
                disabled={product.stock <= 0}
                className={`px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-3 ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ShoppingBag size={24} />
                {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopProductList({ initialProducts }: ShopProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [buyProduct, setBuyProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isMd, setIsMd] = useState<boolean>(false);
  const [buyModalOpened, { open: openBuyModal, close: closeBuyModal }] = useDisclosure(false);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleBuyClick = (product: Product) => {
    setBuyProduct(product);
    openBuyModal();
    // Close detail modal if open
    setSelectedProduct(null);
  };

  // Extract categories from products
  const categories = ['All', ...Array.from(new Set(initialProducts.map(p => p.category)))];

  const filteredProducts =
    selectedCategory === 'All'
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white text-gray-900 pt-20 min-h-screen">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-7xl font-black text-center mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Collection
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600 text-center mb-12">
            Premium sportswear for every athlete
          </p>

          <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="text-red-500" size={24} />
              <h3 className="text-xl font-bold">Filter by Category</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setSelectedProduct(product)}
                className="group relative cursor-pointer"
                style={{
                  transform:
                    hoveredProduct === product.id
                      ? 'rotateY(15deg) rotateX(5deg) scale(1.05)'
                      : 'rotateY(0deg) rotateX(0deg) scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  ...(isMd ? { animation: 'float 3s ease-in-out infinite', animationDelay: `${index * 0.08}s` } : {}),
                }}
              >
                <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-red-500 transition-all duration-500 shadow-md hover:shadow-lg">
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                          animation: hoveredProduct === product.id ? `float ${2 + i}s ease-in-out infinite` : 'none',
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                    ))}

                    <div
                      className="transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 overflow-hidden w-full h-full"
                      style={{
                        transform:
                          hoveredProduct === product.id
                            ? 'rotateY(30deg)'
                            : 'rotateY(0deg)',
                      }}
                    >
                      <img 
                        src={product.coverImage || product.images?.[0] || '/placeholder.png'} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="col-span-4 text-center py-20">
                <p className="text-xl text-gray-600 mb-4">No products found.</p>
                <p className="text-gray-500">Please check back later or try refreshing the page.</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
                >
                    Refresh Page
                </button>
              </div>
            )}
          </div>
      </div>
    </section>

    {selectedProduct && (
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuy={() => handleBuyClick(selectedProduct)}
      />
    )}

    {buyProduct && (
      <ProductBuyModal
        product={buyProduct}
        opened={buyModalOpened}
        close={() => {
          closeBuyModal();
          setBuyProduct(null);
        }}
      />
    )}
  </div>
  );
}
