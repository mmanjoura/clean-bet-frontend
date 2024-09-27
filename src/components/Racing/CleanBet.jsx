"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Racing/ChartOne";
import ChartTwo from "../Racing/ChartTwo";
import CardDataStats from "../CardDataStats";
import PredictionTable from "../Racing/PredictionTable";

const CleanBet = ({ selectedDate }) => {

  return (
    <>

      <div className="mt-4 col-span-12 xl:col-span-8">
        <PredictionTable selectedDate={selectedDate} />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne  selectedDate={selectedDate} />
        <ChartTwo  selectedDate={selectedDate} />

      </div>
    </>
  );
};

export default CleanBet;
