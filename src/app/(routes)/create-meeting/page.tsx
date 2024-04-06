import MeetingForm from '@/components/custom/meeting/MeetingForm';
import React from 'react';

function CreateMeeting() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* meeting form */}
      <div className="shadow-md border h-screen">
        <MeetingForm />
      </div>
      {/* Preview */}
      <div className="md:col-span-2"></div>
    </div>
  );
}

export default CreateMeeting;
