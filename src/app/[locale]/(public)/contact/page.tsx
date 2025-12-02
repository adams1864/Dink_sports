"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '4kilo Around Arda Subcity In The Buliding Amroge Chicken 3rd Floor',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'dinksport145@gmail.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: (
        <>
          <div>+251 984 888 877</div>
          <div>+251 904 39 15 87</div>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white text-gray-900 pt-20 min-h-screen">
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-orange-50" />

        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                background: `radial-gradient(circle, rgba(239, 68, 68, ${Math.random() * 0.3}) 0%, transparent 70%)`,
                animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

          <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-black text-center mb-6 text-gray-900">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          <div className="h-1 w-64 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8" />
          <p className="text-2xl text-gray-700 text-center">
            & Collaborate
          </p>
        </div>
      </section>

  <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-black mb-8 text-gray-900">
              Get In{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Have a question or want to work together? We'd love to hear from you.
            </p>

            <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-6 p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-md"
                >
                  <div className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <info.icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors text-gray-900">
                      {info.title}
                    </h3>
                    <p className="text-gray-700">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-100 shadow-lg">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-8xl mb-6 animate-bounce">✓</div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
                  ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                        focusedField === 'name'
                            ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.12)]'
                            : 'border-gray-200'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                        focusedField === 'email'
                          ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.12)]'
                          : 'border-gray-200'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={6}
                      className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none resize-none ${
                        focusedField === 'message'
                          ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.12)]'
                          : 'border-gray-200'
                      }`}
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transform hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Send Message
                      <Send
                        size={20}
                        className="transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

  <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black mb-6 text-gray-900">
            Ready to{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Elevate
            </span>{' '}
            Your Game?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of athletes who trust Dink Sports Wear for performance and style.
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold text-xl hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transform hover:scale-105 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}
