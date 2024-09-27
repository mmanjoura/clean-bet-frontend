import React from 'react';

const SelectionAccordion = ({ selection }) => {

  console.log("Selection:", selection);
  return (
    <div className={`relative z-20 w-full p-4 mt-2 bg-transparent dark:bg-form-input flex justify-center`}>
      <div className="max-w-5xl w-full">
        <table className={`w-full border border-stroke dark:border-form-strokedark border-collapse`}>
          <thead>
            <tr>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Age:{" "}
                <span className="text-meta-3 font-normal text-sm ">
                  {selection?.age}
                </span>
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Trainer:{" "}
                <span className="text-meta-3 font-normal text-sm ">
                  {selection?.trainer}
                </span>
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Owner:{" "}
                <span className="text-meta-3 font-normal text-sm ">
                  {selection?.owner}
                </span>
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Sire:{" "}
                <span className="text-meta-3 font-normal text-sm ">
                  {selection?.sire}
                </span>
              </th>
            </tr>
            <tr>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Date
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Distance (f)
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Position
              </th>
              <th className="border border-stroke dark:border-form-strokedark p-2 text-left text-sm ">
                Event
              </th>
            </tr>
          </thead>
          <tbody>
            {selection?.trend_analysis?.BestRaces?.map((race, raceIndex) => (
              <tr key={raceIndex} className="bg-white dark:bg-form-input">
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {new Date(race.Date).toLocaleDateString("en-GB", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {race.Distance.toFixed(2)}f
                </td>
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {race.Position}
                </td>
                <td className="text-meta-5 p-2 border border-stroke dark:border-form-strokedark">
                  {race.Event}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default SelectionAccordion;
