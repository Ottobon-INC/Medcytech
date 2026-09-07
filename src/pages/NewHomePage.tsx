import content from '../tier3-content/content.json';
import SEO from '../components/SEO';

import NewHero from '../sections/NewHero';
import CoreSolutions from '../sections/CoreSolutions';
import NewServicesSteps from '../sections/NewServicesSteps';
import NewOfferingsGrid from '../sections/NewOfferingsGrid';
import NewTestimonial from '../sections/NewTestimonial';
import NewFAQ from '../sections/NewFAQ';
import NewBottomCTA from '../sections/NewBottomCTA';

export default function NewHomePage() {
  return (
    <main className="bg-white">
      <SEO title="Home" description={content.hero.subtitle} />
      
      {/* 1. Hero Section & Stats */}
      <NewHero content={content.hero} brands={content.brands.items} />

      {/* 2. Zig Zag Solutions */}
      <CoreSolutions content={content.coreSolutions} />

      {/* 3. Steps (Sticky Image) */}
      <NewServicesSteps content={content.services} />

      {/* 4. Offerings Grid (Scale personalized sales) */}
      <NewOfferingsGrid content={content.offerings} />

      {/* 5. Large Testimonial */}
      <NewTestimonial />

      {/* 6. FAQs (Accordion) */}
      <NewFAQ />

      {/* 7. Bottom CTA */}
      <NewBottomCTA content={content.whyUsPage} />
      
    </main>
  );
}
