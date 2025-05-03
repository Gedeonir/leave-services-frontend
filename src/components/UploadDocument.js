import React from "react";
import { FilePlus } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

function UploadDocument() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
        <FilePlus /> Upload Supporting Documents
      </h2>
      <div className="mt-4">
        <input type="file" className="block w-full text-sm text-gray-700" />
        <p className="text-xs text-gray-500 mt-1">
          Upload medical certificate or other required files (PDF, JPG, PNG).
        </p>
      </div>
    </motion.div>
  );
}

export default memo(UploadDocument);