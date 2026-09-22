import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Gift } from 'lucide-react';
import content from '../tier3-content/content.json';

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
    desc: "Admin offers round-the-clock guidance, answering patient queries on WhatsApp & App."
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

const SolutionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSubsectionIdx, setActiveSubsectionIdx] = useState(0);

  const offering: any = (content as any).coreSolutions.items.find((item: any) => item.id === id);

  useEffect(() => {
    setActiveSubsectionIdx(0);
  }, [offering]);

  useEffect(() => {
    if (!offering) {
      navigate('/');
    }
  }, [offering, navigate]);

  useEffect(() => {
    document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!offering) return null;

  return (
    <div className="min-h-screen bg-[#CFE8E5] pt-24 pb-16 relative">
      <button
        onClick={() => navigate('/#core-solutions')}
        className="absolute top-6 md:top-8 left-4 md:left-6 lg:left-8 inline-flex items-center gap-2 text-[#0f3d32]/80 hover:text-[#0f3d32] font-bold text-base md:text-lg transition-all duration-300 z-50 bg-[#CFE8E5]/80 hover:bg-[#CFE8E5] backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-[0_4px_12px_rgba(15,61,50,0.08)] border border-[#0f3d32]/5 hover:-translate-x-1"
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        Back
      </button>

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10 pt-8 md:pt-4">

        <div className="rounded-[32px] overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 md:px-10 md:py-6 border-b border-[#0f3d32]/10 bg-transparent">
            <h1 className="text-2xl md:text-4xl font-bold text-[#0f3d32] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {offering.title}
            </h1>
          </div>

          {/* Content */}
          <div className="px-6 py-4 md:px-10 md:py-6">
            <div className="space-y-4 md:space-y-6 text-[#0f3d32]">
              {offering.specialOffer && (
                <motion.div 
                  layout
                  className="relative mb-8 w-fit max-w-full mx-auto cursor-pointer group"
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ layout: { duration: 0.8, type: "spring", bounce: 0.2 }, type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                >
                  <motion.div 
                    layout
                    className="absolute -inset-2 bg-gradient-to-r from-[#0f3d32] via-[#4ABFB0] to-[#0f3d32] rounded-full blur-md opacity-30 group-hover:opacity-50 transition duration-500"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 200%' }}
                  />

                  <motion.div layout className="relative p-[2px] rounded-full bg-gradient-to-b from-[#4ABFB0]/60 to-[#2a9d8f]/30 shadow-lg shadow-[#0f3d32]/20">
                    <motion.div layout className="bg-[#0a2921] rounded-full p-[2px]">
                      <motion.div layout className="relative overflow-hidden bg-gradient-to-b from-[#155444] to-[#0f3d32] rounded-full px-4 py-3 sm:px-6 sm:py-4 flex flex-row items-center justify-center shadow-[inset_0_2px_8px_rgba(74,191,176,0.15)]">
                        
                        <motion.div
                          initial={{ left: '-100%' }}
                          animate={{ left: ['-100%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut", delay: 1 }}
                          className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 z-0 pointer-events-none"
                        />

                        <motion.div 
                          layout
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                          className="relative z-10 shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#b38f20] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-white/20"
                        >
                          <Gift className="w-5 h-5 text-[#0f3d32]" strokeWidth={2.5} />
                        </motion.div>

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
              <div className="mb-4 md:mb-6">
                <h4 className="text-xl md:text-2xl font-bold mb-3">Core Idea</h4>
                <div className="mb-4">
                  {Array.isArray(offering.description) ? (
                    <ul className="space-y-3">
                      {offering.description.map((point: string, i: number) => (
                        <li key={i} className="group/item flex items-start gap-4 text-base md:text-lg font-normal text-[#0f3d32]/90 leading-relaxed cursor-pointer">
                          <CheckCircle2 className="w-6 h-6 text-[#4ABFB0]/70 shrink-0 mt-0.5 transition-all duration-300 group-hover/item:text-[#0f3d32] group-hover/item:scale-125 group-hover/item:drop-shadow-[0_0_8px_rgba(74,191,176,0.8)]" />
                          <span className="group-hover/item:text-[#0f3d32] transition-colors">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#0f3d32]/90 leading-relaxed text-base md:text-lg font-normal">{offering.description}</p>
                  )}
                </div>
                {offering.coreIdea && offering.coreIdea.includes('→') ? (
                  <InteractiveWorkflowSteps rawSteps={offering.coreIdea} label="Core Idea Process" />
                ) : offering.coreIdea ? (
                  <p className="text-[#0f3d32]/90 font-normal text-base md:text-lg leading-relaxed">{offering.coreIdea}</p>
                ) : null}
              </div>

              {offering.subsections && (
                <div className="mt-6 pt-6 border-t border-[#0f3d32]/10">
                  <h4 className="text-xl md:text-2xl font-bold mb-5 text-[#0f3d32]">We Deliver</h4>
                  <div className="flex flex-col gap-3 w-full items-stretch">
                    
                    {/* Top Side: Tabs */}
                    <div className="w-full flex flex-row flex-wrap gap-3 relative pb-2 md:pb-4">
                      {offering.subsections.map((sub: any, i: number) => {
                        const isActive = activeSubsectionIdx === i;
                        return (
                          <button
                            key={i}
                            onClick={() => setActiveSubsectionIdx(i)}
                            onMouseEnter={() => setActiveSubsectionIdx(i)}
                            className={`group relative text-left p-4 md:px-5 md:py-4 rounded-xl transition-all duration-300 border overflow-hidden shrink-0 flex-1 min-w-[180px] md:min-w-[200px] ${
                              isActive 
                                ? 'border-[#0f3d32] -translate-y-1 shadow-lg shadow-[#0f3d32]/10' 
                                : 'bg-white/40 backdrop-blur-sm border-[#0f3d32]/10 hover:bg-white/70 hover:border-[#4ABFB0]/50 hover:-translate-y-1'
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeSubsectionTabBackground"
                                className="absolute inset-0 bg-[#0f3d32]"
                                initial={false}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              />
                            )}
                            {!isActive && (
                              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            <div className="relative z-10 flex items-center gap-3">
                              <CheckCircle2 className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#4ABFB0]' : 'text-[#4ABFB0]/70'}`} />
                              <h5 className={`font-bold text-sm md:text-base transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0f3d32]'}`}>
                                {sub.title}
                              </h5>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom Side: Content */}
                    <div className="w-full bg-white/40 backdrop-blur-sm rounded-[24px] p-6 md:p-8 xl:p-10 border border-[#0f3d32]/10 shadow-[0_8px_40px_rgba(15,61,50,0.08)] relative overflow-hidden flex flex-col min-h-[320px]">
                      {/* Decorative top line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0f3d32] to-[#4ABFB0]" />

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSubsectionIdx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col h-full flex-1 relative z-10"
                        >
                          <div className="flex flex-col xl:flex-row gap-6 md:gap-8 mb-4 flex-1">
                            <div className="flex-1">
                              <h4 className="text-2xl md:text-3xl font-bold text-[#0f3d32] mb-6">{offering.subsections[activeSubsectionIdx].title}</h4>
                              {offering.subsections[activeSubsectionIdx].whatItIs && (
                                Array.isArray(offering.subsections[activeSubsectionIdx].whatItIs) ? (
                                  <ul className="space-y-4">
                                    {offering.subsections[activeSubsectionIdx].whatItIs.map((point: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-[#0f3d32]/90 leading-relaxed font-normal">
                                        <span className="text-[#4ABFB0] mt-1 text-xl leading-none">•</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-base md:text-lg text-[#0f3d32]/90 leading-relaxed font-normal">
                                    {offering.subsections[activeSubsectionIdx].whatItIs}
                                  </p>
                                )
                              )}
                            </div>
                            
                            {offering.subsections[activeSubsectionIdx].image && (
                              <div className="w-full md:w-64 xl:w-80 shrink-0 rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(15,61,50,0.08)] border border-[#0f3d32]/5 bg-slate-50 aspect-[4/3] flex items-center justify-center p-1 self-start mt-2">
                                <img src={offering.subsections[activeSubsectionIdx].image} alt={offering.subsections[activeSubsectionIdx].title} className="w-full h-full object-cover rounded-[12px]" />
                              </div>
                            )}
                          </div>

                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
              )}

              {offering.sBloom && (
                <div className="mt-8 pt-8 border-t border-[#0f3d32]/10">
                  <h4 className="text-xl md:text-2xl font-bold mb-4 text-[#0f3d32]">{offering.sBloom.title}</h4>
                  {offering.sBloom.description && (
                    Array.isArray(offering.sBloom.description) ? (
                      <ul className="space-y-3">
                        {offering.sBloom.description.map((point: string, idx: number) => (
                          <li key={idx} className="group/item flex items-start gap-4 text-base md:text-lg text-[#0f3d32]/90 leading-relaxed font-normal cursor-pointer">
                            <CheckCircle2 className="w-6 h-6 text-[#4ABFB0]/70 shrink-0 mt-0.5 transition-all duration-300 group-hover/item:text-[#0f3d32] group-hover/item:scale-125 group-hover/item:drop-shadow-[0_0_8px_rgba(74,191,176,0.8)]" />
                            <span className="group-hover/item:text-[#0f3d32] transition-colors">{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[#0f3d32]/90 leading-relaxed text-base md:text-lg font-normal">
                        {offering.sBloom.description}
                      </p>
                    )
                  )}
                </div>
              )}

              {offering.workflow && (
                <InteractiveWorkflowSteps rawSteps={offering.workflow} label="Patient Workflow" />
              )}

              {offering.mainValue && (
                <InteractiveWorkflowSteps rawSteps={offering.mainValue} label="The Bottom Line" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#CFE8E5]/10 to-transparent pointer-events-none z-0" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[#4ABFB0]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </div>
  );
};

export default SolutionDetailsPage;

