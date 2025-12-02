"use client";

import { Target, Sparkles, Leaf, Star, Globe, Trophy, Rocket } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Trophy,
      title: 'Performance',
      description: 'Engineered for champions who demand excellence in every game.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Cutting-edge technology meets timeless athletic design.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Committed to eco-friendly materials and ethical manufacturing.',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Every detail crafted to elevate your performance on the field.',
    },
  ];

  const timeline = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'Founded with a vision to revolutionize sportswear for athletes worldwide.',
      image: 'https://picsum.photos/seed/star/320/320',
    },
    {
      year: '2015',
      title: 'Global Expansion',
      description: 'Expanded to 25 countries, becoming a trusted name in sports.',
      image: 'https://picsum.photos/seed/globe/320/320',
    },
    {
      year: '2020',
      title: 'Innovation Award',
      description: 'Recognized for groundbreaking sustainable fabric technology.',
      image: 'https://picsum.photos/seed/trophy/320/320',
    },
    {
      year: '2025',
      title: 'The Future',
      description: 'Leading the industry with cutting-edge performance gear.',
      image: 'https://picsum.photos/seed/rocket/320/320',
    },
  ];

  const team = [
    { name: 'MESFIN ABEBE', role: 'Owner / CEO', image: 'https://picsum.photos/seed/mesfin/240/240' },
    { name: 'Amanuel Tesfaye', role: 'Head of Design', image: 'https://picsum.photos/seed/amanuel/240/240' },
    { name: 'Kebede Alemu', role: 'Innovation Director', image: 'https://picsum.photos/seed/kebede/240/240' },
    { name: 'Emma Davis', role: 'Sustainability Lead', image: 'https://picsum.photos/seed/emma/240/240' },
  ];

  return (
  <div className="bg-white text-gray-900 pt-20">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-orange-50 opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center text-[20rem] opacity-10 animate-pulse">
          🦌
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-7xl md:text-9xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </h1>
          <div className="h-1 w-64 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8" />
          <p className="text-2xl text-gray-700">
            Where Passion Meets Precision
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl font-black text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-16" />

          <div className="relative">
            {/* center line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-red-600 to-orange-500 opacity-20" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                const Icon = [Star, Globe, Trophy, Rocket][index] || Star;
                return (
                  <div key={index} className="relative md:flex md:items-center md:justify-between">
                    <div className={`md:w-1/2 md:px-8 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <div className="text-4xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
                      <p className="text-lg text-gray-700">{item.description}</p>
                    </div>

                    {/* icon bubble in center */}
                    <div className="absolute md:static left-1/2 transform -translate-x-1/2 md:translate-x-0 md:mx-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-md border-2 border-white">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>

                    <div className={`md:w-1/2 md:px-8 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                      {/* empty spacer for alternating layout on larger screens */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-black text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Values
            </span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-16" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-md"
              >
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <value.icon size={48} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4">
            Meet The{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-16" />

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative"
                style={{ perspective: '1000px' }}
              >
                <div className="relative transform transition-all duration-500 group-hover:rotate-y-180" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 group-hover:border-red-500 transition-all duration-500 min-h-[300px] flex flex-col items-center justify-center shadow-sm">
                    <img src={member.image} alt={member.name} className="w-24 h-24 mb-6 rounded-full object-cover" />
                    <h3 className="text-2xl font-bold mb-2 text-center">
                      {member.name}
                    </h3>
                    <p className="text-red-500 text-center">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
