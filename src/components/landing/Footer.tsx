import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Youtube, label: 'Youtube' },
  ];

  const quickLinks = [
    ['Shop', 'New Arrivals', 'Best Sellers', 'Sale'],
    ['About', 'Our Story', 'Team', 'Careers'],
    ['Support', 'Contact', 'FAQ', 'Shipping'],
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="h-16 w-auto mb-6 flex items-center">
               <span className="text-2xl font-black text-[#D92323]">
                DINK
               </span>
            </div>
            <p className="text-gray-700 mb-6">
              Premium sportswear for champions. Elevate your game with Dink.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  className="p-3 bg-gray-100 rounded-lg hover:bg-[#D92323] transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_20px_rgba(217,35,35,0.12)] group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-gray-700 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {quickLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="text-xl font-bold mb-6 text-[#D92323]">
                {column[0]}
              </h3>
              <ul className="space-y-3">
                {column.slice(1).map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-600 hover:text-[#D92323] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Dink Sports Wear. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[#D92323] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D92323] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
