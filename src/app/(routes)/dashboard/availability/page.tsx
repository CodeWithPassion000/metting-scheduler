'use client';
import React, { useEffect, useState } from 'react';
import DaysList from '../../../../../utils/DaysList';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { app } from '../../../../../config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';

function page() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  const [dayAvailable, setDaysAvailable] = useState<any>([
    {
      Sunday: false,
    },
    {
      Monday: false,
    },
    {
      Tuesday: false,
    },
    {
      Wednesday: false,
    },
    {
      Thursday: false,
    },
    {
      Friday: false,
    },
    {
      Saturday: false,
    },
  ]);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  useEffect(() => {
    user && getBusinessInformation();
  }, [user]);

  const getBusinessInformation = async () => {
    if (user?.email) {
      const docRef = doc(db, 'Business', user?.email);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      setDaysAvailable(result?.dayAvailable);
      setStartTime(result?.startTime);
      setEndTime(result?.endTime);
    }
  };

  const onHandleChange = (day: string, value: boolean) => {
    setDaysAvailable({
      ...dayAvailable,
      [day]: value,
    });
  };

  const handleSave = async () => {
    if (user?.email) {
      const docRef = doc(db, 'Business', user.email);
      await updateDoc(docRef, {
        dayAvailable: dayAvailable,
        startTime: startTime,
        endTime: endTime,
      }).then((respose) => {
        toast('Changes Updated !');
      });
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl"> Availability</h2>
      <hr className="my-7"></hr>
      <div>
        <h2 className="font-bold ">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, index) => {
            return (
              <div key={index}>
                <h2>
                  <Checkbox
                    checked={
                      dayAvailable[item.day] ? dayAvailable[item.day] : false
                    }
                    onCheckedChange={(e: boolean) =>
                      onHandleChange(item.day, e)
                    }
                  />
                  {item.day}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default page;
