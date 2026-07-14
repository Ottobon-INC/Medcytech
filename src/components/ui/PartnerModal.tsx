import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "../../services/leadService";

interface PartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
            organization: formData.clinicName,
            message: `Specialty: ${formData.specialty} | ${formData.message}`,
            role: "Partner"
        }, {
            // Uppercase (Exact Match)
            Name: formData.name,
            Phone: formData.phone,
            Email: formData.email,
            "Clinic Name": formData.clinicName,
            Specality: formData.specialty,
            Message: formData.message,
            // Lowercase
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
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
                onClose();
                setIsSuccess(false);
                setFormData({ name: "", email: "", phone: "", clinicName: "", specialty: "", message: "" });
            }, 3000);
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[8px]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 60 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-6xl bg-white rounded-[32px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row pointer-events-auto my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Left Column: Vision & Branding */}
                        <div className="flex-1 p-8 md:p-16 lg:p-20 bg-[#f0f9f8] relative overflow-hidden flex flex-col justify-center">
                            {/* Large Subtle Logo Pattern Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                                backgroundImage: 'url("/lotus_icon_transparent.png")',
                                backgroundSize: '400px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'left center'
                            }} />

                            <div className="relative z-10 max-w-md">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#2f8f83]/20 text-[#2f8f83] text-sm font-semibold mb-8">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f8f83]" />
                                    Contact us
                                </div>

                                <h2 className="text-5xl md:text-7xl font-light text-[#13443e] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Partner with us
                                </h2>

                                <p className="text-[#5b6e68] text-lg md:text-xl leading-relaxed font-light">
                                    Join the mission to transform IVF clinical care. schedule a call with our medical experts to explore partnership opportunities.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Interaction Form Card Section */}
                        <div className="flex-1 bg-[#13443e] relative flex items-center justify-center overflow-hidden">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="w-full h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 relative"
                                style={{
                                    background: 'linear-gradient(180deg, #2f8f83, #13443e)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)'
                                }}
                            >
                                {/* Decorative Pattern Layer */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                                    backgroundImage: 'url("/lotus_icon_transparent.png")',
                                    backgroundPosition: 'center',
                                    backgroundSize: '200px',
                                    backgroundRepeat: 'no-repeat'
                                }} />

                                <div className="relative z-10">
                                    {!isSuccess ? (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-white/70 mb-1.5 px-1 uppercase tracking-widest">Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Your Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/10 focus:border-[#44dbc9] focus:ring-4 focus:ring-[#44dbc9]/20 outline-none transition-all text-white text-sm placeholder:text-white/30 shadow-inner"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-white/70 mb-1.5 px-1 uppercase tracking-widest">Clinic Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Organization"
                                                        value={formData.clinicName}
                                                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                                                        className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/10 focus:border-[#44dbc9] focus:ring-4 focus:ring-[#44dbc9]/20 outline-none transition-all text-white text-sm placeholder:text-white/30 shadow-inner"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-white/70 mb-1.5 px-1 uppercase tracking-widest">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="gitika@medcytech.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/10 focus:border-[#44dbc9] focus:ring-4 focus:ring-[#44dbc9]/20 outline-none transition-all text-white text-sm placeholder:text-white/30 shadow-inner"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-white/70 mb-1.5 px-1 uppercase tracking-widest">Phone</label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="Contact No."
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/10 focus:border-[#44dbc9] focus:ring-4 focus:ring-[#44dbc9]/20 outline-none transition-all text-white text-sm placeholder:text-white/30 shadow-inner"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-white/70 mb-1.5 px-1 uppercase tracking-widest">Specialty</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="IVF / OBGYN"
                                                        value={formData.specialty}
                                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                                        className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/10 focus:border-[#44dbc9] focus:ring-4 focus:ring-[#44dbc9]/20 outline-none transition-all text-white text-sm placeholder:text-white/30 shadow-inner"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-white/70 mb-1.5 px-1 uppercase tracking-widest">Message</label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Additional details..."
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/10 focus:border-[#44dbc9] focus:ring-4 focus:ring-[#44dbc9]/20 outline-none transition-all text-white text-sm placeholder:text-white/30 resize-none shadow-inner"
                                                />
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={isSubmitting}
                                                type="submit"
                                                className="w-full py-5 rounded-full bg-[#13443e] text-white font-bold text-lg hover:bg-[#1a5c54] transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-[0_8px_20px_rgba(0,0,0,0.2)] mt-2 border border-white/10"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="animate-spin" />
                                                ) : (
                                                    "Submit Partnership Request"
                                                )}
                                            </motion.button>
                                        </form>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-12 text-center"
                                        >
                                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#44dbc9] shadow-[0_0_30px_rgba(68,219,201,0.3)]">
                                                <CheckCircle2 size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                Registered Successfully
                                            </h3>
                                            <p className="text-white/70 font-light text-base mx-auto">
                                                We'll reach out to you within 24 hours.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white z-30"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
