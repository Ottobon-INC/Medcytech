import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Gift } from 'lucide-react';

const stepDetailsMap: Record<string, { image: string; title: string; desc: string }> = {
  "build visibility": {
    image: "/solutions/build_visibility_workflow_1789037209416.jpg",
    title: "1. Build Visibility",
    desc: "Optimizing Google Business Profile & local search so your clinic ranks #1 on Google Maps and captures nearby patient searches."
  },
  "generate enquiries": {
    image: "/solutions/generate_enquiries_workflow_1789037234965.jpg",
    title: "2. Generate Enquiries",
    desc: "Deploying conversion-focused responsive websites and smart enquiry forms that turn site traffic into booked patient appointments."
  },
  "automate engagement": {
    image: "/solutions/automate_engagement_workflow_1789037250563.jpg",
    title: "3. Automate Engagement",
    desc: "Automating 24/7 patient communication on WhatsApp for instant booking confirmations, lab report delivery, and treatment updates."
  },
  "booked": {
    image: "/solutions/patient_booking_workflow_1789037263660.jpg",
    title: "1. Patient Booking",
    desc: "Patient completes online registration or telephone booking, selecting preferred doctor and OPD time slot."
  },
  "arrived": {
    image: "/solutions/reception_checkin_workflow_1789037344684.jpg",
    title: "2. Reception Check-In",
    desc: "Patient arrives at the clinic desk and receives a digital OPD token number instantly."
  },
  "waiting": {
    image: "/solutions/live_queue_tracking_workflow_1789037361298.jpg",
    title: "3. Live Queue Tracking",
    desc: "Real-time queue status updates on waiting room monitors and patient mobile screens in real time."
  },
  "called": {
    image: "/solutions/doctor_room_alert_workflow_1789037382256.jpg",
    title: "4. Doctor Room Alert",
    desc: "Doctor triggers one-click token call notifying the patient to enter the consultation room."
  },
  "in consultation": {
    image: "/solutions/digital_consultation_workflow_1789037639338.jpg",
    title: "5. Digital Consultation & Rx",
    desc: "Doctor inputs clinical notes, records patient vitals, and generates instant digital prescriptions."
  },
  "completed": {
    image: "/solutions/post_care_reports_workflow_1789037767522.jpg",
    title: "6. Post-Care & Reports",
    desc: "Consultation closes, digital prescription is sent to WhatsApp, and automated post-care follow-up begins."
  },
  "less paperwork": {
    image: "/solutions/dfo.png",
    title: "Paperless OPD Operations",
    desc: "Eliminates physical registers and paper token slips with 100% digital check-ins."
  },
  "smoother opd operations": {
    image: "/solutions/hims.png",
    title: "Streamlined Desk Workflows",
    desc: "Reduces front desk bottleneck and speeds up patient intake from minutes to seconds."
  },
  "better patient flow": {
    image: "/solutions/lims.png",
    title: "Automated OPD Queue Control",
    desc: "Prevents waiting room overcrowding through smart token queue sequencing."
  },
  "centralized patient information": {
    image: "/solutions/hims_abstract.png",
    title: "Unified EHR & Medical History",
    desc: "Stores all prescriptions, lab reports, and clinical notes in one centralized patient timeline."
  },
  "better visibility for hospital staff": {
    image: "/solutions/dfo_abstract.png",
    title: "Real-Time Clinic Analytics",
    desc: "Gives administrators live insights into patient volume, waiting times, and doctor schedules."
  },
  "better patient engagement": {
    image: "/solutions/ai_companion_engagement_workflow_1789037800618.jpg",
    title: "24/7 AI Health Companion",
    desc: "Sakhi AI offers round-the-clock guidance, answering patient queries on WhatsApp & App."
  },
  "easier healthcare discovery and booking": {
    image: "/solutions/healthcare_discovery_workflow_1789037814259.jpg",
    title: "1-Tap Doctor Booking",
    desc: "Enables patients to explore specialties, find trusted doctors, and book appointments instantly."
  },
  "structured post-care support": {
    image: "/solutions/structured_post_care_workflow_1789037867375.jpg",
    title: "Clinical Post-Op Guidance",
    desc: "Delivers post-procedure recovery instructions, symptom tracking, and dosage reminders."
  },
  "human escalation when needed": {
    image: "/solutions/human_escalation_workflow_1789037986460.jpg",
    title: "Care Coordinator Triage",
    desc: "Detects red-flag symptoms and escalates immediately to a human Care Coordinator."
  }
};

const InteractiveWorkflowSteps = ({ rawSteps, label }: { rawSteps: string; label: string }) => {
  const steps = rawSteps.replace(/\.$/, '').split(' → ');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const getStepData = (stepText: string, index: number) => {
    const key = stepText.toLowerCase().trim();
    if (stepDetailsMap[key]) {
      return stepDetailsMap[key];
    }
    return {
      image: "/solutions/dfo.png",
      title: `Step ${index + 1}: ${stepText}`,
      desc: `Visual process breakdown for ${stepText}.`
    };
  };

  if (steps.length === 1) {
    return (
      <div className="mt-4 pt-5 border-t border-[#0f3d32]/10">
        <strong className="block text-xs uppercase tracking-wider text-[#0f3d32]/70 font-bold mb-2">{label}</strong>
        <p className="text-[#0f3d32] font-bold text-sm sm:text-base leading-relaxed">{steps[0]}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-5 border-t border-[#0f3d32]/10" onMouseLeave={() => setActiveIdx(null)}>
      <div className="flex items-center justify-between mb-8">
        <strong className="block text-xs uppercase tracking-wider text-[#0f3d32]/70 font-bold">{label}</strong>
        <span className="text-[10px] sm:text-xs text-[#0f3d32] font-bold bg-[#4ABFB0]/20 border border-[#4ABFB0]/40 px-2.5 py-1 rounded-full shadow-xs">
          Tap a step to view details
        </span>
      </div>

      {/* Steps Line */}
      <div className="relative mb-2">
        {/* Desktop Horizontal Line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#4ABFB0]/40 hidden sm:block" />
        {/* Mobile Vertical Line */}
        <div className="absolute top-4 bottom-4 left-4 w-0.5 bg-[#4ABFB0]/40 sm:hidden" />

        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-2 relative z-10">
          {steps.map((step: string, i: number) => {
            const isActive = activeIdx === i;
            const stepData = getStepData(step, i);

            return (
              <div 
                key={i} 
                className="relative flex-1 group"
                onMouseEnter={() => setActiveIdx(i)}
              >
                <button
                  type="button"
                  onClick={() => setActiveIdx(isActive ? null : i)}
                  className="flex sm:flex-col items-center gap-4 sm:gap-3 w-full cursor-pointer text-left sm:text-center focus:outline-none"
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-extrabold shadow-md transition-all duration-300 shrink-0 relative z-10 ${
                      isActive
                        ? 'bg-[#0f3d32] border-[#4ABFB0] text-white scale-110 ring-4 ring-[#4ABFB0]/30 shadow-lg'
                        : 'bg-white border-[#4ABFB0] text-[#0f3d32] hover:bg-[#4ABFB0] hover:text-white hover:scale-105'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[11px] uppercase tracking-wider font-extrabold transition-colors leading-tight ${
                      isActive ? 'text-[#0f3d32] scale-105' : 'text-[#0f3d32]/70 group-hover:text-[#0f3d32]'
                    }`}
                  >
                    {step}
                  </span>
                </button>

                {/* Desktop Tooltip */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`hidden sm:block absolute bottom-full mb-4 w-[280px] bg-white border border-[#0f3d32]/10 rounded-2xl p-3 shadow-2xl z-[100] pointer-events-none ${
                        i === 0 ? 'left-0' : i === steps.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                      }`}
                    >
                      <div className="w-full h-36 rounded-lg overflow-hidden border border-[#0f3d32]/5 mb-3 bg-slate-50 relative">
                        <img src={stepData.image} alt={stepData.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold text-[#0f3d32] uppercase tracking-wider shadow-sm">
                          Step {i + 1} of {steps.length}
                        </div>
                      </div>
                      <div className="text-left px-1">
                        <h5 className="font-bold text-[#0f3d32] text-sm mb-1 leading-snug">{stepData.title}</h5>
                        <p className="text-[11px] text-[#0f3d32]/80 leading-relaxed font-medium">{stepData.desc}</p>
                      </div>
                      {/* Triangle Pointer */}
                      <div className={`absolute top-full -mt-[1px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white drop-shadow-sm ${
                        i === 0 ? 'left-8' : i === steps.length - 1 ? 'right-8' : 'left-1/2 -translate-x-1/2'
                      }`} />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Mobile Inline Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="sm:hidden overflow-hidden w-full pl-[52px]"
                    >
                      <div className="bg-white border border-[#0f3d32]/10 rounded-xl p-3 shadow-md mt-2 mb-4 flex flex-col gap-3 relative">
                         <div className="w-full h-40 rounded-lg overflow-hidden border border-[#0f3d32]/5 bg-slate-50 relative">
                           <img src={stepData.image} alt={stepData.title} className="w-full h-full object-cover" />
                           <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-[#0f3d32] uppercase tracking-wider shadow-sm">
                             Step {i + 1} of {steps.length}
                           </div>
                         </div>
                         <div>
                           <h5 className="font-bold text-[#0f3d32] text-sm mb-1">{stepData.title}</h5>
                           <p className="text-xs text-[#0f3d32]/80 leading-relaxed font-medium">{stepData.desc}</p>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const renderBackContent = (offering: any) => {
  return (
    <div className="space-y-6 text-[#0f3d32]">
      {offering.specialOffer && (
        <motion.div 
          layout
          className="relative mb-8 w-fit max-w-full mx-auto cursor-pointer group"
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ layout: { duration: 0.8, type: "spring", bounce: 0.2 }, type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
        >
          {/* Outer glowing aura */}
          <motion.div 
            layout
            className="absolute -inset-2 bg-gradient-to-r from-[#0f3d32] via-[#4ABFB0] to-[#0f3d32] rounded-full blur-md opacity-30 group-hover:opacity-50 transition duration-500"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
          />

          {/* Outer Border Ring */}
          <motion.div layout className="relative p-[2px] rounded-full bg-gradient-to-b from-[#4ABFB0]/60 to-[#2a9d8f]/30 shadow-lg shadow-[#0f3d32]/20">
            {/* Inner Dark Gap */}
            <motion.div layout className="bg-[#0a2921] rounded-full p-[2px]">
              {/* Main Button Body */}
              <motion.div layout className="relative overflow-hidden bg-gradient-to-b from-[#155444] to-[#0f3d32] rounded-full px-4 py-3 sm:px-6 sm:py-4 flex flex-row items-center justify-center shadow-[inset_0_2px_8px_rgba(74,191,176,0.15)]">
                
                {/* Shine effect sweeping across the emerald background */}
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut", delay: 1 }}
                  className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 z-0 pointer-events-none"
                />

                {/* Gold Gift Icon in Round Badge */}
                <motion.div 
                  layout
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  className="relative z-10 shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#b38f20] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-white/20"
                >
                  <Gift className="w-5 h-5 text-[#0f3d32]" strokeWidth={2.5} />
                </motion.div>

                {/* Text Content */}
                <motion.div 
                  layout
                  className="relative z-10 text-left overflow-hidden"
                  initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                  animate={{ width: "auto", opacity: 1, marginLeft: 16 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                >
                  <p className="font-bold text-white text-[12.5px] sm:text-[14.5px] leading-snug tracking-wider drop-shadow-sm w-max max-w-[calc(100vw-8rem)] sm:max-w-xl whitespace-normal">
                    {offering.specialOffer.replace('Special Bonus: ', '').toUpperCase()}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-4">Core Idea</h4>
        <div className="mb-6">
          {Array.isArray(offering.description) ? (
            <ul className="space-y-3">
              {offering.description.map((point: string, i: number) => (
                <li key={i} className="group/item flex items-start gap-3 text-sm sm:text-base font-normal text-[#0f3d32]/90 leading-relaxed cursor-pointer">
                  <CheckCircle2 className="w-5 h-5 text-[#4ABFB0]/70 shrink-0 mt-0.5 transition-all duration-300 group-hover/item:text-[#0f3d32] group-hover/item:scale-125 group-hover/item:drop-shadow-[0_0_8px_rgba(74,191,176,0.8)]" />
                  <span className="group-hover/item:text-[#0f3d32] transition-colors">{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#0f3d32]/90 leading-relaxed text-sm sm:text-base font-normal">{offering.description}</p>
          )}
        </div>
        {offering.coreIdea && offering.coreIdea.includes('→') ? (
          <InteractiveWorkflowSteps rawSteps={offering.coreIdea} label="Core Idea Process" />
        ) : offering.coreIdea ? (
          <p className="text-[#0f3d32]/90 font-normal text-sm sm:text-base leading-relaxed">{offering.coreIdea}</p>
        ) : null}
      </div>

      {offering.subsections && (
        <div className="mt-6">
          <h4 className="text-base font-bold mb-4 text-[#0f3d32]">Key Capabilities</h4>
          <div className="flex flex-col gap-5">
            {offering.subsections.map((sub: any, i: number) => (
              <div key={i} className="group/item flex gap-4 items-start py-2 cursor-pointer">
                <CheckCircle2 className="w-5 h-5 text-[#4ABFB0]/70 shrink-0 mt-0.5 transition-all duration-300 group-hover/item:text-[#0f3d32] group-hover/item:scale-125 group-hover/item:drop-shadow-[0_0_8px_rgba(74,191,176,0.8)]" />
                <div className="flex-1">
                  <h5 className="font-bold text-[#0f3d32] text-sm md:text-base mb-1 group-hover/item:text-[#0f3d32] transition-colors">{sub.title}</h5>
                  {sub.whatItIs && (
                    <p className="text-xs sm:text-sm text-[#0f3d32]/80 leading-relaxed font-normal">
                      {sub.whatItIs}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {offering.preCare && offering.postCare && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-6 rounded-2xl border border-[#0f3d32]/10 shadow-sm flex flex-col group hover:bg-[#CFE8E5]/40 transition-colors duration-300 cursor-pointer">
            <div className="mb-4">
              <h4 className="text-base uppercase tracking-widest font-bold text-[#0f3d32]">Pre-Care</h4>
              <p className="text-sm text-[#0f3d32]/80 font-medium mt-1">Guidance & Discovery</p>
            </div>
            <ul className="space-y-3 flex-1">
              {offering.preCare.slice(0, 4).map((item: string, i: number) => (
                <li key={i} className="group/item flex items-start gap-2.5 text-sm font-medium text-[#0f3d32]/90 cursor-pointer">
                  <CheckCircle2 className="w-4 h-4 text-[#4ABFB0]/70 shrink-0 mt-0.5 transition-all duration-300 group-hover/item:text-[#0f3d32] group-hover/item:scale-125 group-hover/item:drop-shadow-[0_0_8px_rgba(74,191,176,0.8)]" />
                  <span className="group-hover/item:text-[#0f3d32] transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-[#0f3d32]/10 shadow-sm flex flex-col group hover:bg-[#CFE8E5]/40 transition-colors duration-300 cursor-pointer">
            <div className="mb-4">
              <h4 className="text-base uppercase tracking-widest font-bold text-[#0f3d32]">Post-Care</h4>
              <p className="text-sm text-[#0f3d32]/80 font-medium mt-1">Recovery & Tracking</p>
            </div>
            <ul className="space-y-3 flex-1">
              {offering.postCare.slice(0, 4).map((item: string, i: number) => (
                <li key={i} className="group/item flex items-start gap-2.5 text-sm font-medium text-[#0f3d32]/90 cursor-pointer">
                  <CheckCircle2 className="w-4 h-4 text-[#4ABFB0]/70 shrink-0 mt-0.5 transition-all duration-300 group-hover/item:text-[#0f3d32] group-hover/item:scale-125 group-hover/item:drop-shadow-[0_0_8px_rgba(74,191,176,0.8)]" />
                  <span className="group-hover/item:text-[#0f3d32] transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {offering.workflow && (
        <InteractiveWorkflowSteps rawSteps={offering.workflow} label="Patient Workflow" />
      )}

      {offering.mainValue && (
        <InteractiveWorkflowSteps rawSteps={offering.mainValue} label="The Bottom Line" />
      )}
    </div>
  );
};

const FrontCardContent = ({ solution, isActive }: { solution: any; isActive?: boolean }) => (
  <div className={`w-full h-full bg-gradient-to-b from-[#F0F9F8] to-[#CFE8E5] rounded-[24px] border transition-all duration-300 flex flex-col overflow-hidden relative group ${
    isActive
      ? 'border-2 border-[#0f3d32] ring-2 ring-[#0f3d32] shadow-[0_20px_45px_rgba(15,61,50,0.25)]'
      : 'border-[#0f3d32]/10 hover:border-[#0f3d32]'
  }`}>
    <div className="p-6 md:p-8 flex flex-col relative z-10 h-full pointer-events-none">
      <h3 className="text-2xl md:text-[26px] font-bold text-[#0f3d32] tracking-tight mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
        {solution.title}
      </h3>
    </div>

    {solution.image && (
      <div 
        className="absolute bottom-0 left-0 right-0 h-[270px] z-0 pointer-events-none"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)' }}
      >
        <img 
          src={solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />
        {/* Dark Green Gradient from below */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d32] via-[#0f3d32]/60 to-transparent opacity-90"></div>
      </div>
    )}

    {/* Bottom Action Area */}
    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex items-center justify-between pointer-events-none">
      <span className="text-white font-bold text-sm md:text-base drop-shadow-sm">Read Full Details</span>
      <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-2">
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

const CoreSolutions = ({ content }: { content: any }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    if (activeCardId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeCardId]);

  if (!content) return null;

  const activeSolution = content.items.find((i: any) => i.id === activeCardId);

  return (
    <section id="core-solutions" className="pt-10 pb-12 md:pt-16 relative bg-[#CFE8E5]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-4 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full"
          >
            {content.sectionTag}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium mb-4 text-[#0f3d32] mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {content.sectionTitle}
          </motion.h2>
          
          <p className="text-[#0f3d32]/80 max-w-2xl mx-auto font-medium leading-relaxed">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 xl:gap-6 w-full mx-auto">
          {content.items.map((item: any, index: number) => (
            <div key={item.id} className="relative w-full h-[340px] xl:h-[360px]">
              {/* Always show the grid card, even when modal is active */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full cursor-pointer shadow-[0_15px_40px_rgba(15,61,50,0.08)] hover:shadow-[0_25px_50px_rgba(15,61,50,0.15)] hover:-translate-y-2 rounded-[24px] transition-transform duration-300 z-10"
                onClick={() => setActiveCardId(item.id)}
              >
                <FrontCardContent solution={item} isActive={activeCardId === item.id} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#CFE8E5]/10 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[#4ABFB0]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Flipped Modal Overlay */}
      {createPortal(
        <AnimatePresence>
          {activeSolution && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 pointer-events-auto">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCardId(null)}
                className="absolute inset-0 bg-[#0f3d32]/60 backdrop-blur-sm cursor-pointer"
              />
              
              {/* Centered Modal Container */}
              <div
                className="relative w-full max-w-4xl h-[85vh] z-10"
              >
                {/* Normal Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full relative shadow-2xl rounded-[32px] bg-[#f8fcfb] flex flex-col overflow-hidden"
                >
                  {/* Back Side (The massive modal content) */}
                  <div className="absolute inset-0 w-full h-full flex flex-col overflow-hidden shadow-inner pointer-events-auto">
                    {/* Header on back */}
                    <div className="p-6 md:p-8 bg-white border-b border-[#0f3d32]/5 shrink-0 shadow-sm flex items-center justify-between z-20 relative">
                      <h3 className="text-xl md:text-3xl font-bold text-[#0f3d32] tracking-tight pr-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {activeSolution.title}
                      </h3>
                      <button
                        className="absolute top-6 md:top-8 right-6 md:right-8 p-2 bg-black/5 hover:bg-black/10 rounded-full text-[#0f3d32] transition-colors z-50 cursor-pointer pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardId(null);
                        }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Scrollable details */}
                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative bg-white [transform:translateZ(1px)]">
                      {renderBackContent(activeSolution)}
                    </div>
                  </div>

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
};

export default CoreSolutions;
