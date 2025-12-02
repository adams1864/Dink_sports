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
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

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
                background: `radial-gradient(circle, rgba(217, 35, 35, ${Math.random() * 0.3}) 0%, transparent 70%)`,
                animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

          <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-black text-center mb-6 text-gray-900">
            <span className="text-[#D92323]">
              Let's Connect
            </span>
          </h1>
          <div className="h-1 w-64 bg-[#D92323] mx-auto mb-8" />
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
              <span className="text-[#D92323]">
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
                  className="flex items-start gap-6 group p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100"
                >
                  <div className="w-16 h-16 rounded-full bg-[#D92323]/10 flex items-center justify-center group-hover:bg-[#D92323] transition-colors duration-300">
                    <info.icon size={28} className="text-[#D92323] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                    <div className="text-gray-600 leading-relaxed">{info.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D92323]/5 rounded-bl-full" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-gray-50 border-2 outline-none transition-all duration-300 ${
                    focusedField === 'name' ? 'border-[#D92323] bg-white shadow-lg' : 'border-gray-100'
                  }`}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-gray-50 border-2 outline-none transition-all duration-300 ${
                    focusedField === 'email' ? 'border-[#D92323] bg-white shadow-lg' : 'border-gray-100'
                  }`}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className={`w-full px-6 py-4 rounded-xl bg-gray-50 border-2 outline-none transition-all duration-300 ${
                    focusedField === 'message' ? 'border-[#D92323] bg-white shadow-lg' : 'border-gray-100'
                  }`}
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D92323] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#b91c1c] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
              >
                {submitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
