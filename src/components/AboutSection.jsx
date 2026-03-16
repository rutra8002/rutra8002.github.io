import { motion } from "framer-motion";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const skills = ["Python", "JavaScript", "C", "HTML", "CSS"];

function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-violet-400">
          Profile
        </span>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-slate-300 text-base leading-relaxed max-w-lg">
          Jeff goes brr. I use Arch btw.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="border-violet-500/20">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-300 mb-4">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
                >
                  <Badge>{skill}</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}

export default AboutSection;
