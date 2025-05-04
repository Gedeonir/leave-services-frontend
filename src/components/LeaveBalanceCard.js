import React, { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

function LeaveBalanceCard(props) {
  const [balances, setBalances] = useState([]);
  const [errorBalance, setErrorBalance] = useState(null);

  const fetchBalances = async (id) => {

    setErrorBalance(null);
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/balance/${id}`); // Update this to match your route prefix
      if (!res.ok) throw new Error("Failed to fetch balances");

      const data = await res.json();

      setBalances(data);
    } catch (err) {
      setErrorBalance(err.message);
      setBalances([]);
    }
  };

  useEffect(() => {
    setTimeout(()=>fetchBalances(props?.userData?.loggedInUser),500)
  }, [props?.userData?.loggedInUser])


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow flex items-center justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold text-primary">Leave Balance</h2>
        <div className="flex flex-wrap justify-start gap-4">
          {balances.length <= 0 ?
            <p>No records found!</p>
            :
            balances.map((item) => (
              <p key={item._id} className="text-darkGray"><span>{item?.leaveType?.name}:</span>(<span className=" text-success">Unused:</span>{item.balance} <span className=" text-error">Used:</span>{item.used})</p>
            ))
          }
        </div>
      </div>
      <ClipboardCheck className="w-10 h-10 text-secondary" />
    </motion.div>
  );
}

export default memo(LeaveBalanceCard);