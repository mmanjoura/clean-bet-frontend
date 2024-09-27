'use client';
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import axios from "axios";


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

  console.log("Selected Date:", selectedDate)


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
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/racing/meetings`, {
        event_date: selectedDate,  // Add your parameter(s) here
      });

      // Handle the response further here if needed
    } catch (error) {
      console.error("Scraping Racing Market Data", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleGetForms = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseURL}/racing/forms`, {
        event_date: selectedDate,  // Add your parameter(s) here
      });

      // Handle the response further here if needed
    } catch (error) {
      console.error("Scraping Racing Market Data", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false); // Stop loading
    }
  };





  return (
    <DefaultLayout
    selectedEventName={selectedEventName}
    selectedDate={selectedDate}
    onEventNameChange={handleEventNameChange}
    onDateChange={handleDateChange}
    >

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Analysis
              </h3>
            </div>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      &Delta; Prefered D & Current D
                    </label>

                    <select
                      id="delta_analysis"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      // onChange={handleEventDeltaChanged}
                      aria-label="Select a meeting"
                    >
                      <option defaultValue = "1">1f</option>
                      <option value="2">2f</option>
                      <option value="3">3f</option>
                      <option value="4">4f</option>
                      <option value="5">5f</option>
                      <option value="6">6f</option>
                      <option value="7">7f</option>
                      <option value="8">8f</option>
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Average Positon
                    </label>

                    <select
                      id="position_analysis"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      // onChange={handleEventAvgPositionChanged}
                      aria-label="Select a meeting"
                    >
                      <option value="1">1st</option>
                      <option defaultValue = "2">2nd</option>
                      <option value="3">3rd</option>
                      <option value="4">4th</option>
                      <option value="5">5th</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Total Runs
                    </label>

                    <select
                      id="delta_analysis"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      // onChange={handleEventTotalRunsChanged}
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
                      <option defaultValue = "10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Perform Analysis
                    </label>
                    <button 
                    // onClick={handleAnalysis}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                      Submit
                    </button>
                  </div>
                </div>

              </div>
          </div>
        </div>

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
                  
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
