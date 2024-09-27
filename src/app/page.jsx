'use client';
import CleanBet from "@/components/Racing/CleanBet";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";

export default function Home() {
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

  return (
    <>
      <DefaultLayout
        selectedEventName={selectedEventName}
        selectedDate={selectedDate}
        onEventNameChange={handleEventNameChange}
        onDateChange={handleDateChange}
      >
        <CleanBet selectedEventName={selectedEventName} selectedDate={selectedDate} />
      </DefaultLayout>
    </>
  );
}
