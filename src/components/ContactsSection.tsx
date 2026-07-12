import * as React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Radio } from 'lucide-react';
import { contacts } from '@/data/Contacts';

const ContactsSection: React.FC = () => {
  return (
      <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6 font-mono"
      >
        <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-widest text-emerald-500">
          Get in Touch
        </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Contacts
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          {contacts.map(({ icon: Icon, label, display, href}, i) => (
              <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                  <Card className="p-3 rounded-none border border-slate-800 bg-[#0d0e15] flex items-center justify-between hover:border-emerald-500/40 transition-all duration-150 group cursor-pointer">
                    <div className="flex items-center gap-4">
                  <span className="text-slate-500 group-hover:text-emerald-400 transition-colors text-base shrink-0">
                    <Icon />
                  </span>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold tracking-wider">{label}</p>
                        <p className="text-xs text-slate-200 group-hover:text-emerald-400 transition-colors font-mono">{display}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-right">
                      <Radio size={10} className="text-emerald-500 animate-pulse hidden sm:inline" />
                    </div>
                  </Card>
                </a>
              </motion.div>
          ))}
        </div>
      </motion.section>
  );
};

export default ContactsSection;