import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';

import { app } from '../../../../config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { where } from 'firebase/firestore/lite';
import { Event } from '@/types/eventstypes';
import { Clock, Copy, MapPin, Pen, Settings, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
function MeetingEventList() {
  const db = getFirestore(app);

  const { user } = useKindeBrowserClient();

  const [eventList, setEventlist] = useState<any>([]);

  useEffect(() => {
    user && getEventList();
  }, [user]);

  const getEventList = async () => {
    setEventlist([]);
    const q = query(
      collection(db, 'MeetingEvent'),
      where('createdBy', '==', user?.email),
      orderBy('id', 'desc')
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setEventlist((prevEvent: Event[]) => [...prevEvent, doc.data()]);
    });
  };

  const onDeleteEventHandler = async (event: Event) => {
    console.log(event);

    event?.id &&
      (await deleteDoc(doc(db, 'MeetingEvent', event?.id)).then((res) => {
        toast('Meeting Event Deleted !');
        getEventList();
      }));
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 gap-7">
      {!!eventList ? (
        eventList.map((event: Event, index: number) => {
          return (
            <div
              key={index}
              className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
              style={{ borderTopColor: event?.color }}
            >
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {' '}
                    <Settings className="text-gray-500 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-2">
                      <Pen />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => {
                        onDeleteEventHandler(event);
                      }}
                    >
                      <Trash /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h2 className="font-medium text-2xl">{event?.name}</h2>
              <div className="flex justify-between">
                <h2 className="flex gap-2 text-gray-500">
                  <Clock />
                  {event.duration} Min
                </h2>
                <h2 className="flex gap-2 text-gray-500">
                  <MapPin />
                  {event.type}
                </h2>
              </div>
              <hr></hr>
              <div className="flex justify-between">
                <h2
                  className="flex gap-2 text-sm items-center text-primary cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(event.url);
                    toast('Copied to Clicboard');
                  }}
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </h2>
                <Button
                  variant="outline"
                  className="border-primary rounded-full text-primary"
                >
                  Share
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default MeetingEventList;
