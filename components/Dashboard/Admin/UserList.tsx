import React, { useState } from "react";
import { ICity, IUser } from "../../../types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { randomBetween } from "../../../utils/Number";
import { useRouter } from "next/router";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserList = ({
  users,
  cities: allCities,
}: {
  users: IUser[];
  cities: ICity[];
}) => {
  const router = useRouter();
  const [pageNo, setPageNo] = useState(
    typeof router.query.page == "string" ? parseInt(router.query.page) : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    typeof router.query.show == "string" ? parseInt(router.query.show) : 10
  );

  const handlePageNoChange = (page: number) => {
    setPageNo(page);
    router.push({ query: { ...router.query, page } });
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setPageNo(1);
    router.push({
      query: { ...router.query, show: e.target.value, page: 1 },
    });
  };

  const cities = users
    .map((user) => user.city)
    .filter((city) => city != null)
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

  const cityStoppageBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Stoppages in cities",
      },
    },
  };

  const cityStoppageBarData = {
    labels: allCities.map((c) => c.name),
    datasets: [
      {
        label: "Number of stoppages in Cities",
        data: allCities.map((c) => c.stopages.length),
        backgroundColor: "rgba(115, 199, 132, 0.5)",
      },
    ],
  };

  const cityPieOptions = {
    plugins: {
      title: { text: "Number of people in cities", display: true },
    },
  };
  const rolePieOptions = {
    plugins: {
      title: { text: "Number of role based users", display: true },
    },
  };
  const verifiedPieOptions = {
    plugins: {
      title: { text: "Number of role based users", display: true },
    },
  };
  const cityPieData = {
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

  const verifiedPieData = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        label: "# of Verified Users",
        data: [
          users.filter((u) => u.verified).length,
          users.filter((u) => !u.verified).length,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const ROLES = ["Admin", "User", "Manager", "FlightManager"];
  const rolePieData = {
    labels: ROLES,
    datasets: [
      {
        label: "# of role based users",
        data: ROLES.map((role) => users.filter((u) => u.role == role).length),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="flex flex-wrap gap-20 justify-center">
        <div className="min-w-[400px] mx-auto mb-20">
          <Pie options={cityPieOptions} data={cityPieData} />
        </div>
        <div className="min-w-[400px] mx-auto mb-20">
          <Pie options={rolePieOptions} data={rolePieData} />
        </div>
        <div className="min-w-[400px] mx-auto mb-20">
          <Pie options={verifiedPieOptions} data={verifiedPieData} />
        </div>
        <div className="min-w-[1000px] mx-auto mb-20">
          <Bar options={cityStoppageBarOptions} data={cityStoppageBarData} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-[900px] justify-between items-center">
          <h1 className="text-5xl font-bold m-3" id="users">
            Users
          </h1>
          <div>
            <label>Items per page : </label>
            <select
              className="focus:outline-none w-20 text-center border-2 p-1 rounded"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <table className="border-2 text-center">
          <thead>
            <tr>
              <th className="p-2 border-2">Id</th>
              <th className="p-2 border-2">Name</th>
              <th className="p-2 border-2">Username</th>
              <th className="p-2 border-2">Email</th>
              <th className="p-2 border-2">Phone</th>
              <th className="p-2 border-2">Date Of Birth</th>
              <th className="p-2 border-2">Address</th>
              <th className="p-2 border-2">City</th>
              <th className="p-2 border-2">Role</th>
              <th className="p-2 border-2">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (_, index) =>
                  index > (pageNo - 1) * itemsPerPage &&
                  index <= pageNo * itemsPerPage
              )
              .map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border-2">{user.id}</td>
                  <td className="p-2 border-2">{user.name}</td>
                  <td className="p-2 border-2">{user.username}</td>
                  <td className="p-2 border-2">{user.email}</td>
                  <td className="p-2 border-2">{user.phone}</td>
                  <td className="p-2 border-2">{user.date_of_birth}</td>
                  <td className="p-2 border-2">{user.address}</td>
                  <td className="p-2 border-2">
                    {user.city != null && (
                      <>
                        {user.city.name}, {user.city.country}
                      </>
                    )}
                  </td>
                  <td className="p-2 border-2">{user.role}</td>
                  <td className="p-2 border-2">
                    {user.verified ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div id="pagination" className="m-4 flex">
          {[...Array(Math.ceil(users.length / itemsPerPage)).keys()].map(
            (n) =>
              users.filter(
                (_, i) => i > n * itemsPerPage && i <= (n + 1) * itemsPerPage
              ).length > 0 && (
                <div
                  key={n}
                  onClick={() => handlePageNoChange(n + 1)}
                  className={`w-10 text-center m-2 rounded text-white hover:bg-sky-700 transition-colors cursor-pointer p-2 ${
                    pageNo == n + 1 ? "bg-sky-600" : "bg-sky-500"
                  }`}
                >
                  {n + 1}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
