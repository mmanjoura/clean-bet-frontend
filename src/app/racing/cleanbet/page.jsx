'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MeetingsDate from "@/components/Horses/MeetingsDate";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";  // Importing icons for check and cross
import { useRouter } from 'next/router';

const CleanBet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [predictions, setPredictions] = useState([]);

  // const [totalBet, setTotalBet] = useState('10');
  // const [totalProfit, setTotalProfit] = useState('0');
  const [delta, setDelta] = useState('1');
  const [avgPosition, setAvgPosition] = useState('2');
  const [totalRuns, setTotalRuns] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [totalBet, setTotalBet] = useState(10.0);
  const [totalReturn, setTotalReturn] = useState(0);



  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.post(`${baseURL}/preparation/GetPredictions`, {
          event_date: selectedDate,
          delta: delta,
          avg_position: avgPosition,
          total_runs: totalRuns,
          stake: totalBet,

        });

        setIsLoading(true);

        const predictionsData = response?.data?.predictions?.selections;
        const ctotalBet = response?.data?.predictions?.total_bet;
        const ctotalReturn = response?.data?.predictions?.total_return;

        setTotalBet(ctotalBet);
        setTotalReturn(ctotalReturn);

        if (Array.isArray(predictionsData)) {
          setPredictions(predictionsData);
        } else {
          console.error("Predictions data is not an array:", predictionsData);
          setPredictions([]);
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [selectedDate, baseURL, delta, avgPosition, totalRuns]);

  // Group predictions by event name
  const groupedPredictions = predictions.reduce((acc, prediction) => {
    if (!acc[prediction.event_name]) {
      acc[prediction.event_name] = [];
    }
    acc[prediction.event_name].push(prediction);
    return acc;
  }, {});

  const handleEventDeltaChanged = (event) => {
    const selectedValue = event.target.value;
    setDelta(selectedValue);

    // Add any other logic you want to handle when the event changes
    console.log('Selected num run Analysis:', selectedValue);
  };

  const handleEventAvgPositionChanged = (event) => {
    const selectedValue = event.target.value;
    setAvgPosition(selectedValue);

    // Add any other logic you want to handle when the event changes
    console.log('Selected num run Analysis:', selectedValue);
  };

  const handleEventTotalRunsChanged = (event) => {
    const selectedValue = event.target.value;
    setTotalRuns(selectedValue);

    // Add any other logic you want to handle when the event changes
    console.log('Selected num run Analysis:', selectedValue);
  };

  const handlePredictionWinners = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}/preparation/PredictionWinners`, {
        event_date: selectedDate,
        delta: delta,
        avg_position: avgPosition,
        total_runs: totalRuns,
        stake: totalBet

      });

    } catch (error) {
      console.error("Error fetching race picks:", error);
    } finally {
      setIsLoading(false);

    }
  };


  console.log("Predictions data:", predictions);




  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clean Bets" totalBet={totalBet} totalReturn={totalReturn} />

      <div className="flex mb-6">

        <div className="flex-grow xl:w-1/2">
          <MeetingsDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>


        <div className="flex-grow xl:w-1/4">
          <div>
            <label>
              <div className="font-medium text-black dark:text-white ml-2 py-1">
                Delta PD & CD
              </div>
            </label>
            <select
              id="delta_analysis"
              className={`relative z-20 w-1/2 appearance-none rounded border border-stroke bg-transparent px-1 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
              onChange={handleEventDeltaChanged}
              aria-label="Select a meeting"
            >
              <option selected value="1">1f</option>
              <option value="2">2f</option>
              <option value="3">3f</option>
              <option value="4">4f</option>
              <option value="5">5f</option>
              <option value="6">6f</option>
              <option value="7">7f</option>
              <option value="8">8f</option>
            </select>
          </div>
        </div>

        <div className="flex-grow xl:w-1/4">
          <div>
            <label>
              <div className="font-medium text-black dark:text-white ml-2 py-1">
                Avg positon
              </div>
            </label>
            <select
              id="position_analysis"
              className={`relative z-20 w-1/2 appearance-none rounded border border-stroke bg-transparent px-1 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
              onChange={handleEventAvgPositionChanged}
              aria-label="Select a meeting"
            >
              <option value="1">1st</option>
              <option selected value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
            </select>
          </div>
        </div>
        <div className="flex-grow xl:w-1/4">
          <div>
            <label>
              <div className="font-medium text-black dark:text-white ml-2 py-1">
                Total Runs
              </div>
            </label>
            <select
              id="total_run_analysis"
              className={`relative z-20 w-1/2 appearance-none rounded border border-stroke bg-transparent px-1 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
              onChange={handleEventTotalRunsChanged}
              aria-label="Select a meeting"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option selected value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>

        <Link
          href="#"
          className="inline-flex items-center justify-center rounded-md border border-green-500 px-10 py-4 text-center font-medium text-green-500 hover:bg-opacity-90 lg:px-8 xl:px-10 mr-4"
          onClick={handlePredictionWinners}

        >
          {isLoading ? (
            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-orange-500 rounded-full"></div>

          ) : (
            "Get Winners"
          )}
        </Link>

      </div>

      {/* Render grouped predictions */}
      {Object.entries(groupedPredictions).map(([eventName, eventPredictions]) => (
        <div key={eventName}>
          {/* Event Name Header */}
          <h2 className="text-2xl font-bold mb-4 mt-6">{eventName}</h2>

          {/* Grid Container with Three Columns on Large Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventPredictions.map((prediction, index) => {
              // Determine if the selection is a win (e.g., position "1") or loss
              const isWin = prediction.current_event_position[0] === "1";



              return (
                <div
                  key={index}
                  className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
                >
                  {/* Time or Date Header (Red for loss, Green for win) */}
                  <div className="flex justify-between mb-4">
                    <span
                      className={`flex items-center ${isWin ? "text-green-500" : "text-meta-1"
                        }`}
                    >
                      {isWin ? (
                        <>
                          <span className="mr-1">{prediction?.event_time}</span>
                          <FaCheck /> {/* Checkmark icon for win */}
                        </>
                      ) : (
                        <>
                          <span className="mr-1">{prediction?.event_time}</span>
                          <FaTimes /> {/* Cross icon for loss */}
                        </>
                      )}
                    </span>
                  </div>

                  {/* Table Header for Selections */}
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <span className="text-meta-6 w-1/4 text-left">Selection</span>
                    <span className="text-meta-6 w-1/4 text-left">Score</span>
                    <span className="text-meta-6 w-1/4 text-left">Odds</span>
                    <span className="text-meta-6 w-1/4 text-left">Position</span>
                  </div>

                  {/* Render selection details */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      {/* Align each item to match the header alignment */}
                      <span className="text-blue-500 w-1/4 text-left font-bold">
                        {prediction?.selection_name.slice(0, 7)}
                      </span>
                      <span className="text-blue-500 w-1/4 text-left font-bold">
                        {prediction?.clean_bet_score}
                      </span>
                      <span className="text-green-500 w-1/4 text-left font-bold text-sm">
                        {prediction?.current_event_price}
                      </span>
                      <span
                        className={`w-1/4 text-left font-bold text-sm ${prediction?.current_event_position.split("/")[0] === "1" ? "text-green-500" : "text-meta-1"
                          }`}
                      >
                        {prediction?.current_event_position}
                      </span>

                    </div>
                  </div>

                  <div className="border-t border-stroke"></div>
                  {/* Calculate the P&L */}
                  P&L for €10 bet in this event:&nbsp;
                  <span className={isWin && prediction?.current_event_price.split("/")[0] > 0 ? 'text-green-500' : 'text-red-500'}>
                    {isWin ? `€${((Number(prediction?.current_event_price.split("/")[0]) / Number(prediction?.current_event_price.split("/")[1])) * 10 + 10).toFixed(2)}` : "€0.00"}
                  </span>
                </div>


              );
            })}
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default CleanBet;
