import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0f3d32] text-white overflow-hidden border-t border-[#4ABFB0]/20">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[150px] bg-[#4ABFB0]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-8 left-10 w-[260px] h-[150px] bg-[#2a8a7a]/15 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6 pb-4 md:pt-7 md:pb-5 relative z-10">
        {/* Main Grid: Reduced by ~50% in height while preserving 100% of details and exact visual design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 pb-4 md:pb-5 border-b border-white/10 items-start">
          
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-2">
                <img
                  src="/.png/Group 97.png"
                  alt="Medcy Logo"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </Link>
              <p className="text-xs text-[#CFE8E5]/80 font-normal leading-relaxed mb-3 max-w-sm">
                Empowering specialty clinics and healthcare practitioners with automated patient onboarding, intelligent OP desk queues, and outcome-focused digital care infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#CFE8E5]/70">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                <ShieldCheck className="w-3 h-3 text-[#4ABFB0]" />
                30-Day Free Pilot
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                <Clock className="w-3 h-3 text-[#4ABFB0]" />
                Rapid Deployment
              </span>
            </div>
          </div>

          {/* Column 2: Solutions (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4ABFB0] mb-2">
              Solutions
            </h4>
            <ul className="space-y-1 text-xs font-medium">
              <li>
                <a href="/#pricing" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Full Digital Package
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Patient Care Suite
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Staff Geotagging
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  OP Desk Only
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/#core-solutions" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Core Solutions
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4ABFB0] mb-2">
              Company
            </h4>
            <ul className="space-y-1 text-xs font-medium">
              <li>
                <Link to="/why-us" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Why Us
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a href="/#our-founders" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Our Founders
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/#partners" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Client Clinics
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link to="/challenges" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Challenges
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-[#4ABFB0] transition-colors flex items-center gap-1 group py-0.5">
                  Book Consultation
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Registered Office (4 cols, 50% reduced card) */}
          <div className="lg:col-span-4">
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5 md:p-4 backdrop-blur-sm shadow-md flex flex-col gap-2.5">
              <div>
                <span className="inline-block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#4ABFB0] bg-[#4ABFB0]/15 px-2 py-0.5 rounded-full mb-1">
                  Head Office & Inquiries
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Visit or Reach Out
                </h4>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#4ABFB0]/15 border border-[#4ABFB0]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#4ABFB0]">
                  <MapPin className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#4ABFB0] leading-none mb-0.5">
                    Registered Office
                  </span>
                  <p className="text-[11px] text-white/90 font-medium leading-snug">
                    PLOT NO. 9A, HEALTH CITY, CHINNI GADHILI, ARILOVA, VISAKHAPATNAM, 530040
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#4ABFB0]/15 border border-[#4ABFB0]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#4ABFB0]">
                  <Phone className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#4ABFB0] leading-none mb-0.5">
                    Phone Contact
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <a
                      href="tel:9281011683"
                      className="text-xs font-bold text-white hover:text-[#4ABFB0] transition-colors leading-tight"
                    >
                      9281011683
                    </a>
                    <span className="text-[10px] text-[#CFE8E5]/70 leading-tight">Mon–Fri · 9AM–6PM</span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#4ABFB0]/15 border border-[#4ABFB0]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#4ABFB0]">
                  <Mail className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#4ABFB0] leading-none mb-0.5">
                    Email Support
                  </span>
                  <a
                    href="mailto:gitika@medcytech.com"
                    className="text-[11px] font-semibold text-white/90 hover:text-[#4ABFB0] transition-colors block leading-tight truncate"
                  >
                    gitika@medcytech.com
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:9281011683"
                  className="py-1.5 px-2.5 rounded-lg bg-[#4ABFB0] text-[#0f3d32] font-bold text-[11px] text-center hover:bg-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3 h-3" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919281011683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] text-center transition-colors border border-white/15 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3 h-3 text-[#4ABFB0]" />
                  WhatsApp
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Compact */}
        <div className="pt-3 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] md:text-[11px] text-[#CFE8E5]/70 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ABFB0] animate-pulse" />
            <p>© {currentYear} Medcy Health Tech. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

          <p className="text-white/40 text-[10px]">
            PLOT NO. 9A, HEALTH CITY, VISAKHAPATNAM - 530040
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
