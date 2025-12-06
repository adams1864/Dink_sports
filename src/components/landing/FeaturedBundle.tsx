
"use client";

import { Button } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBundles, type Bundle } from "@/lib/api";

export function FeaturedBundle() {
  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    async function fetchBundles() {
      try {
        const response = await getBundles({ perPage: 10, status: "published" });
        setBundles(response.data);
      } catch (error) {
        console.error("Failed to load bundles", error);
        setBundles([]);
      }
    }

    void fetchBundles();
  }, []);

  if (bundles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-2 text-gray-900">
          Curated{" "}
          <span className="text-[#D92323]">Bundles</span>
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Save more with our specially curated bundles - everything you need in one package!
        </p>

        {/* Horizontal scrollable container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {bundles.map((bundle) => {
              const productCount = bundle.products?.length ?? 0;
              const totalValue = bundle.products?.reduce((sum, p) => sum + p.price, 0) ?? 0;
              const originalValue = Math.round(totalValue * 1.15);

              return (
                <div
                  key={bundle.id}
                  className="flex-none w-80 sm:w-96 snap-center"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] h-full">
                    {/* Bundle Image */}
                    <div className="relative h-80 bg-gray-50">
                      <Image
                        src={bundle.coverImage || bundle.bundleImage}
                        alt={bundle.title}
                        fill
                        className="object-cover"
                      />
                      {productCount > 0 && (
                        <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                          {productCount} Items
                        </div>
                      )}
                    </div>

                    {/* Bundle Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold tracking-tight mb-2 line-clamp-2">
                        {bundle.title}
                      </h3>
                      <p className="text-base text-pink-600 font-medium mb-4 line-clamp-2">
                        {bundle.description}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-center gap-3 mb-5">
                        <p className="text-3xl font-black text-[#D92323]">
                          ETB {totalValue.toFixed(0)}
                        </p>
                        {originalValue > totalValue && (
                          <p className="text-lg text-gray-400 line-through">
                            ETB {originalValue}
                          </p>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col gap-2.5">
                        <Button
                          size="md"
                          fullWidth
                          className="bg-[#D92323] hover:bg-red-700 text-white font-semibold"
                          radius="xl"
                        >
                          View Bundle
                        </Button>
                        <Button
                          size="md"
                          fullWidth
                          variant="outline"
                          className="border-2 border-[#D92323] text-[#D92323] hover:bg-[#D92323]/5 font-semibold"
                          radius="xl"
                        >
                          Customize
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Scroll hint for mobile */}
          {bundles.length > 1 && (
            <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
              ← Swipe to see more →
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
