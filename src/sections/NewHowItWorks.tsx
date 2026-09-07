import { motion } from 'framer-motion';
import { Users, Activity, Building } from 'lucide-react';

export default function NewHowItWorks({ content, stats }: { content: any, stats: any[] }) {
  const items = content.items || [];
  
  // Try to map icons dynamically or use fallback
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-8 h-8" />;
      case 'Activity': return <Activity className="w-8 h-8" />;
      case 'Building': return <Building className="w-8 h-8" />;
      default: return <Activity className="w-8 h-8" />;
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0f3d32] mb-4">
            {content.sectionTitle || "Here's How It Works"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {content.sectionSubtitle || "We believe healing begins with feeling heard."}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Box 1 (Tall - Left) */}
          {items[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f7faef] rounded-3xl p-8 flex flex-col md:row-span-2 relative overflow-hidden group"
            >
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center text-[#0f3d32] shadow-sm mb-6">
                {getIcon(items[0].icon)}
              </div>
              <h3 className="text-2xl font-serif text-[#0f3d32] mb-3">{items[0].title}</h3>
              <p className="text-gray-600 mb-8">{items[0].description}</p>
              
              {items[0].image && (
                <div className="mt-auto rounded-xl overflow-hidden h-48 bg-white/50 relative">
                  <img src={items[0].image} alt={items[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
            </motion.div>
          )}

          {/* Box 2 (Top Middle) */}
          {items[1] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="bg-[#f5f5f5] rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif text-[#0f3d32] mb-2">{items[1].title}</h3>
                <p className="text-sm text-gray-600">{items[1].description}</p>
              </div>
              <div className="self-end text-[#0f3d32]/20">
                {getIcon(items[1].icon)}
              </div>
            </motion.div>
          )}

          {/* Box 3 (Top Right - Stat) */}
          {stats && stats[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="bg-[#f5f5f5] rounded-3xl p-8 flex flex-col justify-center items-center text-center"
            >
              <h3 className="text-5xl font-serif text-[#0f3d32] mb-2">+{stats[0].value}</h3>
              <p className="text-sm text-gray-600">{stats[0].label}</p>
            </motion.div>
          )}

          {/* Box 4 (Bottom Middle - Multi Stats) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="bg-[#f5f5f5] rounded-3xl p-8 flex justify-around items-center"
          >
            {stats && stats.slice(1, 3).map((stat, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-3xl md:text-4xl font-serif text-[#0f3d32] mb-1">+{stat.value}</h3>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Box 5 (Bottom Right - HIMS) */}
          {items[2] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="bg-[#f5f5f5] rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif text-[#0f3d32] mb-2">{items[2].title}</h3>
                <p className="text-sm text-gray-600">{items[2].description}</p>
              </div>
              <div className="self-end text-[#0f3d32]/20">
                {getIcon(items[2].icon)}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
