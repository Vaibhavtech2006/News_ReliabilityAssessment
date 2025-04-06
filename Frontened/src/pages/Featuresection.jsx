// components/FeaturesSection.jsx (or .tsx if using TypeScript)
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Analysis",
    desc: "Instantly assess the content or URL using cutting-edge AI to ensure credibility.",
  },
  {
    title: "Easy to Use",
    desc: "A user-friendly interface designed to offer a seamless experience for all.",
  },
  {
    title: "Reliable Results",
    desc: "Powered by AI models that ensure high accuracy for every analysis.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function FeaturesSection() {
  return (
    <div className="py-20 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-600">
      <div className="container mx-auto text-center text-gray-800 dark:text-white">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
