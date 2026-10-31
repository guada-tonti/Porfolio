'use client';

import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Experience = { role: string; company: string; period: string; progression?: string; description: string };

function ExperienceItem({ experience: exp }: { experience: Experience }) {
  return (
    <div className="border-l-2 border-zinc-200 pl-4 space-y-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
        <h3 className="font-bold text-zinc-950">{exp.role}</h3>
        <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
      </div>
      <p className="text-xs font-medium text-zinc-600">{exp.company}</p>
      {exp.progression && <p className="text-xs text-zinc-500 leading-relaxed">{exp.progression}</p>}
      <p className="text-sm text-zinc-600 pt-1 leading-relaxed">{exp.description}</p>
    </div>
  );
}

export function WorkExperience({ experiences, expand, collapse }: { experiences: Experience[]; expand: string; collapse: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reducedMotion = useReducedMotion();
  return (
    <>
      <div className="space-y-8">
        {experiences.slice(0, 3).map(exp => <ExperienceItem key={`${exp.company}-${exp.period}`} experience={exp} />)}
      </div>
      <div className="mt-6">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}
          className="text-xs text-zinc-600 hover:text-zinc-950 transition-colors motion-reduce:transition-none cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-600">
          {open ? collapse : expand}
        </button>
        <motion.div id={id} initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeInOut' }} inert={!open} aria-hidden={!open} className="overflow-hidden">
          <div className="space-y-8 pt-6">
            {experiences.slice(3).map(exp => <ExperienceItem key={`${exp.company}-${exp.period}`} experience={exp} />)}
          </div>
        </motion.div>
      </div>
    </>
  );
}
