'use client';
import { useEffect, useState, useCallback } from "react";
import Loader from "@/components/common/Loader";  // Import Loader component
import SelectionAccordion from "@/components/Racing/SelectionAccordion";
import axios from "axios";
import MeetingEvents from "@/components/Racing/MeetingEvents";

const SlectionsList = ({ selectedDate }) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [meetings, setMeetings] = useState([]);
  const [runners, setRunners] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [expandedSelection, setExpandedSelection] = useState(null); // State for expanded selection
  const [loading, setLoading] = useState(true);  // Loading state

  // Get Events Meetings
  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);  // Start loading before fetching
      try {
        const response = await axios.get(`${baseURL}/racing/events`, {
          params: {
            date: selectedDate,
            event_name: selectedMeeting
          }
        });
        const meetingsData = response?.data || [];
        setMeetings(meetingsData);
        if (meetingsData.length > 0) {
          setSelectedMeeting(meetingsData[0].event_name);
          const times = [...new Set(meetingsData[0].event_time.split(','))];
          if (times.length > 0) {
            setSelectedMeetingTime(meetingsData[0].event_time);
            setSelectedTime(times[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);  // Stop loading after fetching
      }
    };
    fetchMeetings();
  }, [selectedDate, baseURL]);

  useEffect(() => {
    if (selectedMeeting && selectedTime) {
      const fetchRunners = async () => {
        setLoading(true);  // Start loading before fetching
        try {
          const response = await axios.get(`${baseURL}/racing/selections`, {
            params: {
              meeting_name: selectedMeeting,
              event_time: selectedTime,
              event_date: selectedDate,
              event_name: selectedMeeting
            }
          });
          setRunners(response?.data?.analysisDataResponse || []);
        } catch (error) {
          console.error("Error fetching runners:", error);
        } finally {
          setLoading(false);  // Stop loading after fetching
        }
      };

      fetchRunners();
    }
  }, [selectedDate, selectedTime, baseURL, selectedMeeting]);

  const handleEventSelectChange = useCallback((event) => {
    const selectedMeeting = event.target.value;
    setSelectedMeeting(selectedMeeting);
    const selectedMeetingDetails = meetings.find(meeting => meeting.event_name === selectedMeeting);
    const times = [...new Set(selectedMeetingDetails?.event_time.split(','))];
    setSelectedMeetingTime(selectedMeetingDetails?.event_time || '');
    if (times.length > 0) {
      setSelectedTime(times[0]);
    } else {
      setSelectedTime('');
    }
  }, [meetings]);

  const handleTimeClickInternal = (time) => {
    setSelectedTime(time);
  };

  const toggleExpand = (index) => {
    setExpandedSelection(expandedSelection === index ? null : index); // Toggle expand/collapse
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">

        {/* Show Loader when loading is true */}
        {loading ? (
          <Loader />
        ) : (
          <table>
            <tbody>
              <tr>
                <td className="px-2 py-2">
                  <MeetingEvents
                    meetings={meetings}
                    handleEventSelectChange={handleEventSelectChange}
                  />
                </td>
              </tr>
              <tr className="flex flex-wrap">
                {[...new Set(selectedMeetingTime.split(','))].map((time, index) => (
                  <td key={index} className="px-1 py-1 w-full sm:w-auto">
                    <a
                      href="#"
                      className={`block px-3 py-1 rounded whitespace-normal mt-2 ${time === selectedTime
                        ? 'bg-[#2b96f0] text-white'
                        : 'bg-blue-100 text-[#2b96f0] hover:bg-blue-200'
                        }`}
                      onClick={() => handleTimeClickInternal(time)}
                    >
                      {time}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {!loading && (
        <>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 bg-gray-800 text-white dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium text-meta-5">Selection Name</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium text-meta-5">No Runs</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-meta-5">Days SLR</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-meta-5">Avg Distance</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-meta-5">Avg Position</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-meta-5">Avg Rating</p>
            </div>
          </div>

          {runners?.selections?.map((selection, key) => (
            <div key={key}>
              <div
                className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 cursor-pointer"
              >
                <div className="col-span-3 flex items-center h-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="h-5.5 w-15 rounded-md text-lg text-meta-5" onClick={() => toggleExpand(key)} >
                      {expandedSelection === key ? "-" : "+"}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-black dark:text-white">
                        {selection?.selection_name}
                        <span className="ml-4 text-sm text-meta-10">
                          {selection?.age[0]}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {selection?.num_runs}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {selection?.recovery_days}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {selection?.avg_distance_furlongs.toFixed(2)}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-meta-3">{selection?.avg_position.toFixed(2)}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-meta-3">{selection?.avg_rating.toFixed(2)}</p>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedSelection === key && (
                <SelectionAccordion selection={selection} />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SlectionsList;
