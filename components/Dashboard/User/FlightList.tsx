import Link from "next/link";
import React from "react";
import { IFlight } from "../../../types";
import { formatTime } from "../../../utils/String";

const FlightList = ({ flights }: { flights: IFlight[] }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="p-2 border-2">Transport</th>
            <th className="p-2 border-2">From</th>
            <th className="p-2 border-2">To</th>
            <th className="p-2 border-2">Time</th>
            <th className="p-2 border-2">Date</th>
            <th className="p-2 border-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.id}>
              <td className="p-2 border-2">{f.transport.name}</td>
              <td className="p-2 border-2">
                <span>{f.fromstopage.name}</span>
                <br />
                <span>
                  {f.fromstopage.city.name}, {f.fromstopage.city.country}
                </span>
              </td>
              <td className="p-2 border-2">
                <span>{f.tostopage.name}</span>
                <br />
                <span>
                  {f.tostopage.city.name}, {f.tostopage.city.country}
                </span>
              </td>
              <td className="p-2 border-2">{formatTime(f.time)}</td>
              <td className="p-2 border-2">{f.date}</td>
              <td className="p-2 border-2">
                <div className="flex justify-center">
                  <Link passHref href={`?tab=booking`}>
                    <button className="bg-blue-500 rounded p-1 text-white hover:bg-blue-700 transition-colors">
                      Book
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightList;
