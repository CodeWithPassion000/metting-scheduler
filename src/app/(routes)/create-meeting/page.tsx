'use client';
import MeetingForm from '@/components/custom/meeting/MeetingForm';
import React, { useState } from 'react';
import { Event } from '@/types/eventstypes';
import PreviewMeeting from '@/components/custom/meeting/PreviewMeeting';

function CreateMeeting() {
  const [eventDetails, setEventDetails] = useState<Event>({
    name: '',
    duration: 30,
    type: '',
    url: '',
    color: '',
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* meeting form */}
      <div className="shadow-md border h-screen">
        <MeetingForm
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
      </div>
      {/* Preview */}
      <div className="md:col-span-2">
        <PreviewMeeting eventDetails={eventDetails} />
      </div>
    </div>
  );
}

export default CreateMeeting;
