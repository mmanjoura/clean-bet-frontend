'use client';
import { useState, useEffect, useCallback } from "react";
import UkList from "@/components/Racing/UkList";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";

export default function uk() {


  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);


  // Callback function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  return (
    <>
      <DefaultLayout
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      >
        <UkList  selectedDate={selectedDate}/>
      </DefaultLayout>
    </>
  );
}
