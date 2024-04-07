import React, { useEffect, useState } from 'react';
import { Event } from '@/types/eventstypes';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

interface PreviewProps {
  eventDetails: Event;
}

function PreviewMeeting({ eventDetails }: PreviewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>();

  useEffect(() => {
    eventDetails?.duration && createTimeSolt(eventDetails?.duration);
  }, [eventDetails?.duration]);

  const createTimeSolt = (interval: number) => {
    const startTime = 8 * 60;
    const endTime = 22 * 60;
    const totalSlots = (endTime - startTime) / interval;

    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? 'PM' : 'AM';

      return `${String(formattedHours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')} ${period}`;
    });
    console.log(slots);
    setTimeSlots(slots);
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8"
      style={{ borderTopColor: eventDetails?.color }}
    >
      <Image src="logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* meeting Info */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-2xl">
            {eventDetails?.name.trim().length > 0
              ? eventDetails?.name
              : 'Meeting Name'}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventDetails?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventDetails?.type} Meeting
            </h2>
            <Link href={eventDetails?.url} className="text-primary">
              {eventDetails?.url}
            </Link>
          </div>
        </div>
        {/* time and data selection */}
        <div className="md:col-span-2 flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
            />
          </div>
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: '400px' }}
          >
            {timeSlots?.map((time, index) => {
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {time}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;
