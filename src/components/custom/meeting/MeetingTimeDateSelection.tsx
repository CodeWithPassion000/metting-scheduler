import React, { useEffect, useId, useState } from 'react';
import { Event, UserDetail } from '@/types/eventstypes';
import Image from 'next/image';
import { CalendarCheck, Clock, MapPin, Timer } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import Plunk from '@plunk/node';
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Business } from '@/types/businesstypes';

import { formatDate, format } from 'date-fns';
import UserFormInfo from './UserFormInfo';
import { app } from '../../../../config/FirebaseConfig';
import { toast } from 'sonner';
import { render } from '@react-email/render';

import Email from '../../../../emails';
import { useRouter } from 'next/navigation';

interface PreviewProps {
  eventDetails: Event | DocumentData;
  businessInfo: Business | DocumentData;
}

function MeetingTimeDateSelection({
  eventDetails,
  businessInfo,
}: PreviewProps) {
  // console.log('event details', eventDetails, 'business name', businessInfo);
  const router = useRouter();
  const db = getFirestore(app);

  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>();
  const [enableTimesSlot, setEnableTimeSlot] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [step, setStep] = useState<number>(1);
  const [userDetails, setUserDetails] = useState<UserDetail>({
    userName: '',
    email: '',
    note: '',
  });
  const [previousBooking, setPreviousBooking] = useState<any>([]);

  let plunk: Plunk;
  if (process.env.NEXT_PUBLIC_PLUNK_API_KEY != undefined) {
    plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);
  }

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

  const handleDateChange = (date: Date) => {
    setDate(date);
    const day = format(date, 'EEEE');
    if (businessInfo?.dayAvailable[day]) {
      getEventBooking(date);
      setEnableTimeSlot(true);
    } else {
      setEnableTimeSlot(false);
    }
  };
  const onChangeuserDetail = (name: string, value: string) => {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const addScheduleHandler = async () => {
    if (userDetails?.email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regex.test(userDetails.email) == false) {
        toast('Enter valid email address');
        return;
      }
      const docId = Date.now().toString();

      if (docId != undefined) {
        await setDoc(doc(db, 'ScheduleMeeting', docId), {
          businessName: businessInfo.businessName,
          businessEmail: businessInfo.email,
          selectedTime: selectedTime,
          selectedDate: date,
          duration: eventDetails.duration,
          url: eventDetails.url,
          eventId: eventDetails.id,
          id: docId,
          userName: userDetails.userName,
          userEmail: userDetails.email,
          userNote: userDetails.note,
        }).then((resp) => {
          toast('Meeting Scheduled successfully !');
          sendEmail(userDetails.userName);
        });
      }
    }
  };

  const getEventBooking = async (date_: any) => {
    const q = query(
      collection(db, 'ScheduleMeeting'),
      where('selectedDate', '==', date_),
      where('eventId', '==', eventDetails.id)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log('--', doc.data());
      setPreviousBooking((prev: any) => [...prev, doc.data()]);
    });
  };

  const checkTimeSlot = (time: any) => {
    return (
      previousBooking.filter((item: any) => item.selectedTime == time).length >
      0
    );
  };

  const sendEmail = (user: string) => {
    const emailHtml = render(
      <Email
        businessName={businessInfo?.businessName}
        date={date}
        duration={eventDetails?.duration}
        mettingTime={selectedTime}
        mettingUrl={eventDetails?.url}
        userFirstName={userDetails.userName}
      />
    );

    plunk.emails
      .send({
        to: userDetails.email,
        subject: 'New meeting schedule details',
        body: emailHtml,
      })
      .then((resp) => {
        console.log(resp);
        router.replace('/confirmation');
      });
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8
       mx-10
       md:mx-26
       lg:mx-56
       "
      style={{ borderTopColor: eventDetails?.color }}
    >
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* meeting Info */}
        <div className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
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
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, 'PPP')}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}
              </h2>
            )}

            <Link href={eventDetails?.url} className="text-primary">
              {eventDetails?.url}
            </Link>
          </div>
        </div>
        {/* time and data selection */}
        {step == 1 && (
          <div className="md:col-span-2 flex px-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-lg">Select Date & Time</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  if (d != undefined) {
                    handleDateChange(d);
                  }
                }}
                className="rounded-md border mt-5"
                disabled={(date) => date <= new Date()}
              />
            </div>
            <div
              className="flex flex-col w-full overflow-auto gap-4 p-5"
              style={{ maxHeight: '400px' }}
            >
              {timeSlots?.map((time, index) => {
                return (
                  <Button
                    disabled={!enableTimesSlot || checkTimeSlot(time)}
                    onClick={() => {
                      if (time != undefined) {
                        setSelectedTime(time);
                      }
                    }}
                    key={index}
                    variant="outline"
                    className={`border-primary text-primary
                    ${time == selectedTime ? 'bg-primary text-white' : ''}
                    `}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        {step == 2 && (
          <UserFormInfo
            onChangeuserDetail={onChangeuserDetail}
            userDetails={userDetails}
          />
        )}
      </div>

      <div className="flex gap-3 justify-end">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}

        {step == 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userDetails?.email || !userDetails.userName}
            onClick={addScheduleHandler}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
