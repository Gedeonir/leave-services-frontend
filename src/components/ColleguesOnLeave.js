import React from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

function ColleaguesOnLeave({ colleagues }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow mt-5"
    >
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
        <Users /> Colleagues on Leave
      </h2>
      <div className="flex space-x-4 overflow-x-auto">
        {colleagues.length === 0 && (
          <div className="text-center flex-shrink-0">
            <p className="text-sm mt-1">No colleagues on leave</p>
          </div>
        )}
        {colleagues.map((c, i) => (
          <div key={i} className="text-center flex-shrink-0">
            <img
              src={c.img}
              className="w-14 h-14 rounded-full mx-auto object-cover"
              alt={c.name}
              title={`On leave until ${c.until}`}
              loading="lazy"
            />
            <p className="text-sm mt-1">{c.name}</p>
            <p className="text-xs text-gray-400">Until {c.until}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default memo(ColleaguesOnLeave);