
import { X, ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
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
              src={product.image}
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

            <div className="mb-8">
              <h3 className="font-bold mb-4">Performance Stats</h3>
              <div className="space-y-3">
                {product.stats && product.stats.map((stat: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{stat.name}</span>
                      <span className="font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-3xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                ${product.price}
              </span>
              <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
