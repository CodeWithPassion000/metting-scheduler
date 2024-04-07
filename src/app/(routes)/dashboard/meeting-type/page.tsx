'use client';

import { Input } from '@/components/ui/input';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { app } from '../../../../../config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { where } from 'firebase/firestore/lite';

function page() {
  const db = getFirestore(app);

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getEventList();
  }, []);

  const getEventList = async () => {
    const q = query(
      collection(db, 'MeetingEvent'),
      where('createdBy', '==', user?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event type</h2>
        <Input placeholder="Search" className="max-w-xs" />
        <hr></hr>
      </div>
    </div>
  );
}

export default page;
