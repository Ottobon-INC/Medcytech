const fs = require('fs');
const content = JSON.parse(fs.readFileSync('src/tier3-content/content.json', 'utf8'));

content.brandsPage = {
  headerTag: 'The Medcy Ecosystem',
  headerTitle: 'Unifying Care Across <br className="hidden md:block"/> Every Specialty',
  headerSubtitle: 'Discover our comprehensive suite of specialized clinical environments. Each brand is meticulously designed to bridge the gap between advanced medical technology and compassionate patient care, ensuring seamless workflows and enhanced outcomes.',
  deepDives: [
    {
      title: 'Janma Sethu',
      subtitle: 'The Path to Parenthood, Perfected.',
      description: 'Fertility journeys are deeply personal and medically complex. Janma Sethu is engineered specifically for IVF clinics and maternity hospitals to provide absolute clarity across the entire patient lifecycle.',
      highlights: [
        'Automated cycle tracking and stimulation protocols.',
        'Embryology lab management and cryopreservation tracking.',
        'Integrated patient portals for real-time updates and anxiety reduction.',
        'Seamless handover from fertility success to neonatal care.'
      ],
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      colorDot: 'bg-brand-teal'
    },
    {
      title: 'Kalpa Sethu',
      subtitle: 'Data-Backed Transformation.',
      description: 'In dermatology, aesthetics, and wellness, results are visual and longitudinal. Kalpa Sethu empowers clinics with advanced imaging integration, lifestyle tracking, and highly personalized treatment roadmaps.',
      highlights: [
        'High-resolution before/after progression timelines.',
        'Integrated inventory management for clinical products.',
        'Smart appointment scheduling for multi-session treatments.',
        'Dietary and lifestyle adherence monitoring algorithms.'
      ],
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      colorDot: 'bg-[#0f3d32]'
    },
    {
      title: 'Akshaya Sethu',
      subtitle: 'Proactive Care for Longevity.',
      description: 'Chronic care and geriatric management require vigilance. Akshaya Sethu shifts the clinical paradigm from reactive treatments to proactive health maintenance through continuous monitoring and predictive alerts.',
      highlights: [
        'Remote patient monitoring (RPM) dashboard integration.',
        'Automated flag alerts for critical biometric changes.',
        'Caregiver access portals for family coordination.',
        'Medication adherence tracking and refill automation.'
      ],
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      colorDot: 'bg-brand-emerald'
    }
  ]
};

content.challengesPage = {
  headerTitle: 'Overcoming Clinical Hurdles',
  headerSubtitle: 'Independent clinics face immense pressure from large corporate hospital chains, disconnected technological systems, and overwhelmed administrative staff. We have identified these exact pain points through years of hands-on experience and have engineered Medcy Tech to solve them at their core.',
  footerTitle: 'From Overwhelmed to Optimized',
  footerSubtitle: 'By consolidating your digital front office, we eliminate the friction of managing multiple fragmented tools. This allows your clinical staff to transition from administrative firefighters to patient care specialists.',
  footerImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
};

content.offeringsPage = {
  headerTitle: 'Comprehensive Solutions',
  headerSubtitle: "Our offerings are designed to cover every aspect of the patient journey and clinic management. We don't just provide software; we provide a complete growth partnership that integrates seamlessly into your existing operations.",
  footerTitle: 'End-to-End Clinic Automation',
  footerSubtitle: 'From the moment a patient discovers your clinic online to their post-treatment follow-ups, our systems automate communication, scheduling, and billing. This drastically reduces drop-off rates and ensures a premium experience for every patient.',
  footerImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
};

content.whyUsPage = {
  headerTitle: 'The Medcy Difference',
  headerSubtitle: 'We are not just a software vendor. We are an operational partner embedded in the daily reality of modern medical practice. Our systems are built by clinical leaders, for clinical leaders.',
  ctaTitle: "Ready to transform your <br className=\"hidden md:block\"/> clinic's operations?",
  ctaButtonText: 'Partner With Us'
};

content.foundersPage = {
  headerTitle: 'Clinical & Engineering Leadership',
  headerSubtitle: 'Medcy Tech was born from the unique intersection of decades of frontline medical expertise and world-class enterprise architecture. Discover the minds driving the future of health tech infrastructure.'
};

content.digitalIdentityPage = {
  hero: {
    tag: 'Professional Excellence',
    titleLine1: 'Your Digital Identity,',
    titleLine2: 'Defined by Medcy.',
    subtitle: 'In the modern clinical landscape, your digital presence is your strongest referral tool. We build high-performance digital identities that reflect your clinical expertise and build patient trust.',
    cta1: 'Claim Your Profile',
    cta2: 'View Demo'
  },
  features: [
    {
      icon: 'Globe',
      title: 'SEO-Optimized Presence',
      description: 'Be found by patients when they need you most. Our profiles are built with search-first architecture.'
    },
    {
      icon: 'Shield',
      title: 'Trust & Credibility',
      description: 'Showcase your credentials, patient reviews, and clinical outcomes in a verified professional environment.'
    },
    {
      icon: 'Zap',
      title: 'Seamless Booking',
      description: 'Convert visitors into patients with integrated appointment scheduling and WhatsApp automation.'
    }
  ],
  showcase: {
    titleLine1: 'A Patient Experience',
    titleLine2: 'Designed for Trust.',
    description: "We don't just build websites; we design patient journeys. Every pixel is optimized to convey professionalism and facilitate the first step towards care.",
    points: [
      'Mobile-first responsive design',
      'High-speed performance & accessibility',
      'Integrated patient testimonials',
      'Direct clinical outcome showcases'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    floatingCard: {
      tag: 'Live Profile',
      name: 'Dr. Sarah Mitchell',
      role: 'Senior Fertility Specialist'
    }
  },
  cta: {
    title: 'Ready to secure your clinical legacy?',
    subtitle: 'Join the elite network of specialists who are redefining healthcare delivery through a premium digital identity.',
    buttonText: 'Start Your Journey'
  }
};

fs.writeFileSync('src/tier3-content/content.json', JSON.stringify(content, null, 2));
console.log('content.json updated successfully.');
