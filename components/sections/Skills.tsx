"use client";

import { motion, type Variants } from "framer-motion";
import skills from "@/data/skills";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="font-mono text-xs text-accent tracking-widest mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          // skills
        </motion.p>

        <div className="space-y-12">
          {skills.map((category) => (
            <div key={category.label}>
              {/* Category label */}
              <p className="font-mono text-xs text-muted tracking-widest mb-5">
                {category.label}
              </p>

              {/* Skill badges — staggered fade-in on scroll */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={badgeVariants}
                    className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:border-accent hover:text-fg transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
