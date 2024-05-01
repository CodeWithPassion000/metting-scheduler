import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CalendarCheck, Clock, Timer } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ScheduledMeetingList({ meetingList }: any) {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting: any, index: number) => {
          return (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {new Intl.DateTimeFormat('en', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  }).format(meeting.selectedDate)}
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="mt-5 flex flex-col gap-4">
                      <h2 className="flex gap-2">
                        <Clock />
                        {meeting?.duration} Min
                      </h2>

                      <h2 className="flex gap-2">
                        <CalendarCheck />
                        {new Intl.DateTimeFormat('en', {
                          dateStyle: 'long',
                          timeStyle: 'short',
                        }).format(meeting.selectedDate)}
                      </h2>
                      {meeting.selectedTime && (
                        <h2 className="flex gap-2">
                          <Timer />
                          {meeting.selectedTime}
                        </h2>
                      )}

                      <Link href={meeting?.url} className="text-primary">
                        {meeting?.url}
                      </Link>
                    </div>
                    <Link href={meeting.url}>
                      <Button className="mt-5">Join Now</Button>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
    </div>
  );
}

export default ScheduledMeetingList;
