import React from "react";
import { ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

function LeaveBalanceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow flex items-center justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold text-primary">Leave Balance</h2>
        <p className="text-gray-600">Annual: 8 days, Sick: 5 days</p>
      </div>
      <ClipboardCheck className="w-10 h-10 text-secondary" />
    </motion.div>
  );
}

export default memo(LeaveBalanceCard);