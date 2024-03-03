import React from "react";
import { FaMinus } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const CustomTooltip = ({ active, payload, coordinate, data }: any) => {
  console.log("active:", active);
  console.log("payload:", payload);
  console.log("data:", data);

  if (active && payload && payload.length && data && data.length >= 2) {
    const tooltipStyle = {
      left: coordinate.x,
      top: coordinate.y,
    };

    const currentMonthData = payload[0].payload;
    const currentDate = currentMonthData.date;
    const currentYear = parseInt(currentDate.split(" ")[1]); // Extract current year
    console.log("currentYear:", currentYear);
    const currentMonth = currentDate.split(" ")[0]; // Extract current month
    console.log("currentMonth:", currentMonth);

    // Find previous month data of the same year
    const previousMonthData = data.find(
      (item: any) => item.date === `${currentMonth} ${currentYear - 1}`
    );

    // Find same month data of the previous year
    const previousYearData = data.find(
      (item: any) => item.date === `${currentMonth} ${currentYear - 1}`
    );
    console.log("previousMonthData:", previousMonthData);
    console.log("previousYearData:", previousYearData);

    if (previousMonthData && previousYearData) {
      const percentageChange: number =
        ((currentMonthData.sale_cost - previousMonthData.sale_cost) /
          previousMonthData.sale_cost) *
        100;
      const absPercentageChange = Math.abs(Math.round(percentageChange));

      return (
        <div
          className="p-1 py-2 px-4 flex flex-col shadow-lg bg-white justify-center items-start rounded-lg"
          style={tooltipStyle}
        >
          <p className="Previous text-xs py-1 flex items-center gap-2">
            <FaMinus className="text-teal-400" />
            {`${currentMonthData.date} `}
            <span className="p-1 flex flex-row gap-3 font-semibold">
              {currentMonthData.production_cost}
              <span className="flex flex-row gap-2">
                {previousMonthData.sale_cost > previousMonthData.sale_cost ? (
                  <FaArrowTrendDown className="text-lg font-bold text-[#676767]" />
                ) : (
                  <FaArrowTrendUp className="text-lg font-bold text-[#676767]" />
                )}
                {absPercentageChange}%
              </span>
            </span>
          </p>

          <p className="text-xs py-1 flex items-center gap-2">
            {`${previousMonthData.date} `}
            <span className="p-1 font-semibold">
              {previousMonthData.production_cost}
            </span>
          </p>
        </div>
      );
    }
  }

  return null;
};

export default CustomTooltip;
