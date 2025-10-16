import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A] py-20 overflow-hidden">
      {/* Grid overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[12rem] font-black text-white/[0.02] whitespace-nowrap pointer-events-none">
        SHOPBOLT
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-4">
              ShopBolt.com
            </h3>
            <p className="text-[#A0A0A0] mb-6 leading-relaxed">
              Your go-to online store for curated quality products.
            </p>
            <button className="group px-6 py-3 bg-white text-[#0E0E0E] rounded-xl hover:bg-[#A0A0A0] transition-colors font-medium flex items-center gap-2">
              Start Shopping
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-bold mb-4">Customer Care</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#A0A0A0] hover:text-white transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-[#A0A0A0]">
          <p>&copy; 2025 ShopBolt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
