'use client';

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
import MeetingTimeDateSelection from '@/components/custom/meeting/MeetingTimeDateSelection';
import { Business } from '@/types/businesstypes';
import { Event, initialEvent } from '@/types/eventstypes';
import { DocumentData } from 'firebase/firestore';

function SharedMeetingEvent({ params }: any) {
  const db = getFirestore(app);
  const [businessInfo, setBusinessInfo] = useState<Business | DocumentData>();
  const [eventInfo, setEventInfo] = useState<Event | DocumentData | undefined>(
    initialEvent
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log(
      'params',
      params,
      'businessName',
      params.business.replace(/%20/g, '')
    );
    params && getMeetingBusinessEventDetails();
  }, [params]);

  const getMeetingBusinessEventDetails = async () => {
    setLoading(true);
    let businessName = params.business.replace(/%20/g, ' ');
    const q = query(
      collection(db, 'Business'),
      where('businessName', '==', businessName)
    );

    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      console.log('businessinfo data', doc.data());

      setBusinessInfo(doc.data());
    });

    const docRef = doc(db, 'MeetingEvent', params.meetingEventId);
    const result = await getDoc(docRef);
    console.log(result.data());

    setEventInfo(result.data());

    setLoading(false);
  };

  return (
    <div>
      {!!eventInfo && !!businessInfo && (
        <MeetingTimeDateSelection
          eventDetails={eventInfo}
          businessInfo={businessInfo}
        />
      )}
    </div>
  );
}

export default SharedMeetingEvent;
