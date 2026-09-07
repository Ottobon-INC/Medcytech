import { motion } from 'framer-motion';

const NewOfferingsGrid = ({ content }: { content: any }) => {
  if (!content) return null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight max-w-2xl leading-tight mb-4"
          >
            {content.sectionTitle || "Scale personalized sales without growing your team"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-medium max-w-2xl"
          >
            {content.sectionSubtitle}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#f8f7f5] rounded-2xl p-8 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <h3 className="text-2xl font-serif text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.tagline}
                </p>
              </div>

              <div>
                {item.priceRange && (
                  <p className="text-sm font-semibold text-gray-900">
                    {item.pricePrefix} {item.priceRange}
                  </p>
                )}
                {item.features && item.features.length > 0 && (
                  <ul className="text-xs text-gray-500 mt-2 space-y-1">
                    {item.features.slice(0, 2).map((feat: string, idx: number) => (
                      <li key={idx} className="line-clamp-1">{feat}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewOfferingsGrid;
