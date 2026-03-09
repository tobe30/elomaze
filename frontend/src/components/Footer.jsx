import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#050f1a] text-white pt-12 pb-6 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Elomaze</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
           Helps you find comfortable homes, trusted agents, and local insights starting from your campus and growing across cities.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2 - Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
            
          </ul>
        </div>

        {/* Column 3 - Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/properties" className="hover:text-white transition">Find Homes</Link></li>
            <li><Link to="/agents" className="hover:text-white transition">List your space</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Post a Service</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Community</Link></li>

          </ul>
        </div>

        {/* Column 4 - Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link to="/help" className="hover:text-white transition">Saftey Tips</Link></li>

          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Elomaze. All rights reserved.</p>
        <p>Built by Marizu Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
