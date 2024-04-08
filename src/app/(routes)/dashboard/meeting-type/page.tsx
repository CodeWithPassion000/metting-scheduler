'use client';

import MeetingEventList from '@/components/custom/meeting/MeetingEventList';
import { Input } from '@/components/ui/input';

function page() {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event type</h2>
        <Input placeholder="Search" className="max-w-xs" />
        <hr></hr>
      </div>
      <MeetingEventList />
    </div>
  );
}

export default page;
