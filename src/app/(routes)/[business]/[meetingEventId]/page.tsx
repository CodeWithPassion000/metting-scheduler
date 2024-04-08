'use client';

import MeetingTimeDateSelection from '@/components/custom/meeting/meetingTimeDateSelection';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../../config/FirebaseConfig';

function SharedMeetingEvent({ params }: any) {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState<any>();
  const [eventInfo, setEventInfo] = useState<any>();
  useEffect(() => {
    console.log(params);
    params && getMeetingBusinessEventDetails();
  }, [params]);

  const getMeetingBusinessEventDetails = async () => {
    const q = query(
      collection(db, 'Business'),
      where('businessName', '==', params.business)
    );

    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      console.log(doc.data());
      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, 'MeetingEvent', params.meetingEventId);
    const result = await getDoc(docRef);
    console.log(result.data());
    setEventInfo(result.data());
  };

  return (
    <div>
      <MeetingTimeDateSelection />
    </div>
  );
}

export default SharedMeetingEvent;
