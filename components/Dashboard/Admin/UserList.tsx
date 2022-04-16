import React from "react";
import { IUser } from "../../../types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { randomBetween } from "../../../utils/Number";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserList = ({ users }: { users: IUser[] }) => {
  const cities = users
    .map((u) => u.city)
    .filter((v, i, s) => s.map((s) => s.id).indexOf(v.id) == i);
  const generateColors = (n: number) => {
    let bgColors: string[] = [];
    let borderColors: string[] = [];
    [...Array(n).keys()].forEach(() => {
      const r = randomBetween(0, 255);
      const g = randomBetween(0, 255);
      const b = randomBetween(0, 255);
      bgColors.push(`rgba(${r},${g},${b},0.3)`);
      borderColors.push(`rgba(${r},${g},${b},1)`);
    });
    return { bgColors, borderColors };
  };
  const data = {
    labels: cities.map((c) => `${c.name}, ${c.country}`),
    datasets: [
      {
        label: "# of People in City",
        data: cities.map((c) => users.filter((u) => u.city_id == c.id).length),
        backgroundColor: generateColors(cities.length).bgColors,
        borderColor: generateColors(cities.length).borderColors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="max-w-[500px] mx-auto">
        <Pie
          options={{
            plugins: {
              title: { text: "Number of people in cities", display: true },
            },
          }}
          data={data}
        />
      </div>
      <div></div>
    </div>
  );
};

export default UserList;
