import React, { useState, useCallback,useEffect } from 'react';
import Calendar from 'react-calendar';
import getFixedHolidays from '../utils/getHolidays';
import { motion } from "framer-motion";

const HolidayCalendar = React.memo(() => {
  const [value, setValue] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearHolidays, setYearHolidays] = useState([]);

  useEffect(() => {
    const holidays = getFixedHolidays(year);
    setYearHolidays(holidays);
  }, [year]);

  const isHoliday = (date) => {
    return yearHolidays.some(holiday => new Date(holiday.date).toDateString() === date.toDateString());
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isHoliday(date)) {
      return 'holiday';
    }
  };

  const tileContent = ({ date, view }) => {
    const holiday = yearHolidays.find(h => new Date(h.date).toDateString() === date.toDateString());
    if (view === 'month' && holiday) {
      return <abbr title={holiday.name} aria-label={holiday.name}>🎉</abbr>;
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setYear(activeStartDate.getFullYear());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow mt-5"
    >
      <h2 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">Public Holidays - {year}</h2>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        tileContent={tileContent}
        onActiveStartDateChange={handleActiveStartDateChange}
      />
      <style jsx>{`
        .holiday {
          background: #ffeb3b;
        }
        :global(.react-calendar) {
          border: none;
        }
      `}</style>

      <div className='w-full flex mt-4 gap-2'>
        <div className='w-5 h-5 rounded-full bg-[#ffeb3b]'></div><div className='w-full h-10'> Holiday</div>
      </div>
    </motion.div>
  );
});

export default HolidayCalendar;
