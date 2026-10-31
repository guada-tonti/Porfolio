'use client';

import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type EducationContent = { expand: string; collapse: string; groups: { title: string; courses: { title: string; institution: string; year: string }[] }[] };

export function AdditionalEducation({ content }: { content: EducationContent }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reducedMotion = useReducedMotion();

  return (
    <div className="mt-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(value => !value)}
        className="text-xs text-zinc-600 hover:text-zinc-950 transition-colors motion-reduce:transition-none cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-600"
      >
        {open ? content.collapse : content.expand}
      </button>
      <motion.div
        id={id}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeInOut' }}
        inert={!open}
        aria-hidden={!open}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 pt-6 pb-1">
          {content.groups.map(group => (
            <section key={group.title} className="min-w-0">
              <h3 className="text-xs font-mono text-zinc-500 mb-4">{group.title}</h3>
              <ul className="space-y-4 md:space-y-3">
                {group.courses.map(course => (
                  <li key={`${course.title}-${course.institution}`} className="text-xs leading-relaxed break-words">
                    <h4 className="font-semibold text-zinc-800">{course.title}</h4>
                    <p className="text-zinc-500">{course.institution} · {course.year}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
