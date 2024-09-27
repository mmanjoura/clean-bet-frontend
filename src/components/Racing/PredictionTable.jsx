'use client';
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";

const PredictionTable = ({ selectedDate }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [predictions, setPredictions] = useState([]);
  const [delta, setDelta] = useState("1");
  const [avgPosition, setAvgPosition] = useState("2");
  const [totalRuns, setTotalRuns] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const [totalBet, setTotalBet] = useState(10.0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [status, setStatus] = useState("");

  // Fetch predictions function
  const fetchPredictions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/racing/predictions`, {
        event_date: selectedDate,
        delta,
        avg_position: avgPosition,
        total_runs: totalRuns,
        stake: totalBet,
      });

      setPredictions(response?.data?.predictions?.selections || []);
      setTotalBet(response?.data?.predictions?.total_bet || 0);
      setTotalReturn(response?.data?.predictions?.total_return || 0);
      setStatus(response?.data?.predictions?.status || "");
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, delta, avgPosition, totalRuns, totalBet]);

  // Call fetchPredictions when selectedDate changes
  useEffect(() => {
    fetchPredictions();
  }, [selectedDate, fetchPredictions]);

  // Handle fetching result
  const handleGetResult = debounce(async (date, selectionId) => {
    setIsLoading(true);
    try {
      await axios.post(`${baseURL}/racing/results`, {
        event_date: date,
        selection_id: selectionId,
      });
      // Once result is fetched, re-fetch predictions to refresh data
      fetchPredictions();
    } catch (error) {
      console.error("Scraping Racing Market Data", error);
    } finally {
      setIsLoading(false);
    }
  }, 300); // Wait 300ms between calls


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] px-4 py-3 font-medium text-black dark:text-white xl:pl-11">
                Selection
              </th>
              <th className="min-w-[150px] px-4 py-3 font-medium text-black dark:text-white">
                Score
              </th>
   
              <th className="min-w-[120px] px-4 py-3 font-medium text-black dark:text-white">
              Postion
              </th>
              <th className="px-4 py-3 font-medium text-black dark:text-white">
              Odds
              </th>
              <th className="px-4 py-3 font-medium text-black dark:text-white">
              CheckResult
              </th>
            </tr>
          </thead>
          <tbody>
            {predictions?.map((prediction, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-3 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black text-meta-3">
                    {prediction?.selection_name}
                  </h5>
                  <p className="text-sm text-meta-5">{prediction?.event_name} - {prediction?.event_time}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-warning text-warning`}
                  >
                    {prediction?.clean_bet_score}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-warning text-warning`}
                  >
                    {prediction?.current_event_position}
                  </p>
                </td>
           
        
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      status !== "Result"
                        ? "bg-warning text-warning"
                        : status === "Declared"
                          ? "bg-danger text-danger"
                          : "bg-success text-success"
                    }`}
                  >
                      {prediction?.current_event_price}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-10 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary"
                     onClick={() => handleGetResult(prediction?.event_date, prediction?.selection_id)}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictionTable;
