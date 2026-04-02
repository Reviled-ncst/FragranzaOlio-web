'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plan } from '@/app/lib/planService';

interface PlanCardProps {
  plan: Plan;
  index?: number;
}

export function PlanCard({ plan, index = 0 }: PlanCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'DRAFT':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'COMPLETED':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ARCHIVED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <Link href={`/internship/plans/${plan.id}`}>
      <motion.div
        className="h-full p-6 rounded-xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/40 cursor-pointer transition-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -4,
          boxShadow: '0 20px 40px rgba(169, 153, 104, 0.15)',
        }}
        transition={{ delay: index * 0.05 }}
        viewport={{ once: true }}
      >
        {/* Status Badge */}
        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(plan.status)}`}>
            {plan.status}
          </span>
          <span className="text-xs text-gray-500">{plan.duration_weeks} weeks</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{plan.title}</h3>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-3 mb-4">{plan.description}</p>

        {/* Skills*/}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Key Skills:</p>
          <div className="flex flex-wrap gap-1">
            {plan.skills_to_develop
              .split(',')
              .slice(0, 3)
              .map((skill, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  {skill.trim()}
                </span>
              ))}
            {plan.skills_to_develop.split(',').length > 3 && (
              <span className="text-xs px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                +{plan.skills_to_develop.split(',').length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Tools & Tech:</p>
          <p className="text-xs text-gray-400 line-clamp-1">{plan.tools_technologies}</p>
        </div>

        {/* Footer */}
        <motion.div
          className="pt-4 border-t border-yellow-500/10 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.05 + 0.2 }}
        >
          <div>
            <p className="text-xs text-gray-500">Learning Objectives</p>
            <p className="text-sm text-white font-medium line-clamp-1">{plan.learning_objectives.split(';')[0]}</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-400/50 group-hover:text-yellow-400 transition-colors">
            <span>→</span>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
