'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScheduledMeetingList from '@/components/custom/meeting/ScheduledMeetingList';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { app } from '../../../../../config/FirebaseConfig';
function page() {
  const db = getFirestore(app);

  const { user } = useKindeBrowserClient();
  const [meetingList, setMeetingList] = useState<any>([]);

  useEffect(() => {
    user && getScheduledMeetings();
  }, [user]);

  const getScheduledMeetings = async () => {
    const q = query(
      collection(db, 'ScheduleMeeting'),
      where('businessEmail', '==', user?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setMeetingList((prev: any) => [...prev, doc.data()]);
    });
  };

  const filterMeetingList = (type: string) => {
    // fixing needed
    // if (type == 'upcomming') {
    //   return meetingList.filter((item: any) => {
    //     console.log(
    //       'selecteddate',
    //       new Intl.DateTimeFormat('en', {
    //         dateStyle: 'long',
    //         timeStyle: 'short',
    //       }).format(item.selectedDate),
    //       'presentdate',
    //       new Date()
    //     );
    //     item.selectedDate >= Date.now();
    //   });
    // }
    return meetingList;
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Schedule Meetings</h2>
      <hr className="my-5"></hr>
      <Tabs defaultValue="upcomming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcomming">Upcomming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcomming">
          <ScheduledMeetingList meetingList={filterMeetingList('upcomming')} />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduledMeetingList meetingList={filterMeetingList('expired')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
