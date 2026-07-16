import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { submitLead } from '../services/leadService';
import { CheckCircle2, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    clinicName: "",
    specialty: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await submitLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: "Website Contact Form",
      message: `Reason: ${formData.reason} | ${formData.message}`,
      role: formData.reason === 'partnership' ? 'Partner' : 'Clinic Owner'
    }, {
      // Uppercase (Exact Match)
      Name: formData.name,
      Phone: formData.phone,
      Email: formData.email,
      "Reason for Contact": formData.reason,
      "Clinic Name": formData.clinicName,
      Specality: formData.specialty,
      Message: formData.message,
      // Lowercase
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      "reason for contact": formData.reason,
      "clinic name": formData.clinicName,
      specialty: formData.specialty,
      message: formData.message,
      // Just in case they added trailing spaces in Google Sheets
      "Name ": formData.name,
      "Phone ": formData.phone,
      "Email ": formData.email
    });

    setIsSubmitting(false);
    if (!error) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "", reason: "", clinicName: "", specialty: "", message: "" });
      }, 4000);
    } else {
      console.error("Supabase Submission Error:", error);
      alert(`Error: ${error?.message || error?.toString() || 'Missing Environment Variables. Please restart your dev server.'}`);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden bg-[#d6f2f0]">
      <SEO title="Contact Us" description="Book an appointment with Medcytech to schedule a call with our medical experts." />
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-brand-emerald/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-teal/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center justify-between"
        >
          {/* Left Side - Text */}
          <motion.div variants={itemVariants} className="md:w-[45%] flex flex-col items-start text-left">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#0f3d32]/60 mb-6 bg-white/50 border border-[#0f3d32]/10 px-6 py-2 rounded-full shadow-sm">
              Contact us
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0f3d32] mb-6 leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Book Appointment
            </h1>
            <p className="text-lg md:text-xl text-[#2a6a5a] font-light leading-relaxed max-w-md">
              Submit the form to schedule a call with our medical experts. We'll respond within a few hours.
            </p>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div variants={itemVariants} className="md:w-[50%] w-full max-w-xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02, boxShadow: "0 30px 60px -12px rgba(15, 61, 50, 0.3)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-br from-[#2a5d51] to-[#1C4E43] p-6 md:p-10 lg:p-12 rounded-[24px] shadow-2xl relative overflow-hidden border border-[#4ABFB0]/20 min-h-[550px] flex items-center justify-center"
            >
              {/* Medcy Lotus Logo Background */}
              <div 
                className="absolute inset-0 opacity-[0.25] pointer-events-none" 
                style={{ 
                  backgroundImage: "url('/lotus_icon_transparent.png')",
                  backgroundSize: "120%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }} 
              />
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSubmit} 
                    className="relative z-10 flex flex-col gap-4 w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-white/90 text-[13px] font-medium tracking-wide">Name</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your Full Name"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all backdrop-blur-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-white/90 text-[13px] font-medium tracking-wide">Phone</label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="Contact Number"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all backdrop-blur-sm"
                          />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/90 text-[13px] font-medium tracking-wide">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="gitika@medcytech.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all backdrop-blur-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/90 text-[13px] font-medium tracking-wide">Reason For Contact</label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.reason}
                          onChange={(e) => setFormData({...formData, reason: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white/80 appearance-none focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all backdrop-blur-sm [&>option]:text-black"
                        >
                          <option value="" disabled className="text-gray-500">Select..</option>
                          <option value="consultation">General Consultation</option>
                          <option value="partnership">Partnership</option>
                          <option value="support">Support</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-white/90 text-[13px] font-medium tracking-wide">Clinic Name</label>
                          <input
                            type="text"
                            value={formData.clinicName}
                            onChange={(e) => setFormData({...formData, clinicName: e.target.value})}
                            placeholder="Optional"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all backdrop-blur-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-white/90 text-[13px] font-medium tracking-wide">Specialty</label>
                          <input
                            type="text"
                            value={formData.specialty}
                            onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                            placeholder="Optional"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all backdrop-blur-sm"
                          />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/90 text-[13px] font-medium tracking-wide">Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Message here..."
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#4ABFB0] focus:border-[#4ABFB0] transition-all resize-none backdrop-blur-sm"
                      ></textarea>
                    </div>

                    <motion.button
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, backgroundColor: "#08241e" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full mt-2 group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0f3d32] text-white text-sm font-semibold transition-all shadow-[0_15px_30px_rgba(15, 61, 50, 0.35)] border border-white/5 disabled:opacity-70"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Request Callback"}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center w-full"
                  >
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,191,176,0.3)] text-[#4ABFB0]">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Thank You
                    </h3>
                    <p className="text-white/80 font-light text-[15px] leading-relaxed max-w-[280px]">
                      Your request has been received. Our team will contact you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
