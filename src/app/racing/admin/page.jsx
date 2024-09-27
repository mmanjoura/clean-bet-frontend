'use client';
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";

// Transparent Loader
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

const Admin = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [delta, setDelta] = useState('1');
  const [avgPosition, setAvgPosition] = useState('2');
  const [totalRuns, setTotalRuns] = useState('10');
  const [totalBet, setTotalBet] = useState(10.0);
  const [numRunAnalysis, setNumRunAnalysis] = useState('4');
  const [selectedEventName, setSelectedEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Callback function to handle eventName change
  const handleEventNameChange = (eventName) => {
    setSelectedEventName(eventName);
  };

  // Callback function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAnalysis = async () => {
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${baseURL}/racing/analysis`, {
        event_date: selectedDate,
        bet_amount: "5",
        num_run_analysis: numRunAnalysis,
      });
    } catch (error) {
      console.error("Error fetching race statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetMeetings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/racing/meetings`, {
        event_date: selectedDate,
      });
    } catch (error) {
      console.error("Scraping Racing Market Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetForms = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/racing/forms`, {
        event_date: selectedDate,
      });
    } catch (error) {
      console.error("Scraping Racing Market Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout
      selectedEventName={selectedEventName}
      selectedDate={selectedDate}
      onEventNameChange={handleEventNameChange}
      onDateChange={handleDateChange}
    >
      {isLoading && <Loader />} {/* Show the transparent loader when loading */}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Market Data
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      1. Get Meetings
                    </label>

                    <button 
                      onClick={handleGetMeetings}
                      disabled={isLoading}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Get Meetings
                    </button>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      2. Get Forms
                    </label>

                    <button    
                      onClick={handleGetForms}
                      disabled={isLoading}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Get Forms
                    </button>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      3. Do Prediction Analysis
                    </label>
                    <button 
                      onClick={handleAnalysis}
                      disabled={isLoading}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Do Prediction Analysis
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Admin;
