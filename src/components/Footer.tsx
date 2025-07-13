
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = ({ setCurrentStep }) => {
  const quickLinks = [
    { label: 'Home', step: 'home' },
    { label: 'Health Assessment', step: 'patient-form' },
    { label: 'Health Tips', step: 'health-tips' },
  ];

  const healthResources = [
    { label: 'About Diabetes', step: 'health-tips' },
    { label: 'Prevention Tips', step: 'health-tips' },
    { label: 'Nutrition Guide', step: 'health-tips' },
    { label: 'Exercise Plans', step: 'health-tips' },
  ];

  const support = [
    { label: 'Contact Us', href: 'mailto:support@diabetesai.com' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'FAQ', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">DiabetesAI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Advanced AI-powered diabetes prediction and health assessment platform. 
              Take control of your health with personalized insights.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentStep(link.step)}
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Health Resources</h3>
            <ul className="space-y-2">
              {healthResources.map((resource, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentStep(resource.step)}
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors cursor-pointer"
                  >
                    {resource.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">support@diabetesai.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">New York, USA</span>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              {support.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-blue-400 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DiabetesAI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Powered by Advanced Machine Learning Technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
