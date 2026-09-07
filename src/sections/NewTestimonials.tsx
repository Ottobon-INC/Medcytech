import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const placeholderTestimonials = [
  {
    id: 1,
    type: 'video',
    name: 'Larry, 82',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=400',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 2,
    type: 'quote',
    quote: '"My mornings used to start in silence. Now, I look forward to a cheerful call that makes me laugh before my coffee. It feels like friendship."',
    className: 'md:col-span-1 md:row-span-1 bg-white text-[#0f3d32]'
  },
  {
    id: 3,
    type: 'video',
    name: 'Chris, 78',
    image: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&q=80&w=400',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 4,
    type: 'quote',
    quote: '"It\'s not just words. It\'s warmth, attention, and the feeling that I matter. A simple call, yet it stays with me all day."',
    className: 'md:col-span-1 md:row-span-1 bg-[#f5f0e6] text-[#0f3d32]'
  },
  {
    id: 5,
    type: 'video',
    name: 'Michael, 76',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    className: 'md:col-span-1 md:row-span-2 aspect-[3/4]'
  },
  {
    id: 6,
    type: 'quote',
    quote: '"I didn\'t even realize how much help was available to me until I talked to Medcy. It\'s like having an assistant in my pocket."',
    className: 'md:col-span-1 md:row-span-1 bg-white text-[#0f3d32]'
  }
];

export default function NewTestimonials() {
  return (
    <section className="py-24 px-6 bg-[#83b7b5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">
          Trusted By Families Like Yours
        </h2>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {placeholderTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-3xl overflow-hidden relative group shadow-sm ${item.className} ${item.type === 'video' ? 'bg-black/10' : 'p-8 flex flex-col justify-center'}`}
            >
              {item.type === 'video' ? (
                <>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                      <Play className="w-5 h-5 text-white fill-white ml-1" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white font-serif italic text-lg">{item.name}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl font-serif text-[#0f3d32]/20 mb-4">“</div>
                  <p className="text-lg md:text-xl font-serif leading-relaxed italic relative z-10">
                    {item.quote}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
