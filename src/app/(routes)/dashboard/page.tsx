'use client';

import {
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../config/FirebaseConfig';
import { useRouter } from 'next/navigation';

function page() {
  const db = getFirestore(app);

  const { user } = useKindeBrowserClient();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);

  const isBusinessRegistered = async () => {
    if (user && user.email) {
      const docRef = doc(db, 'Business', user?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setLoading(false);
      } else {
        console.log('No such document!');
        setLoading(false);
        router.replace('/create-business');
      }
    } else {
      setLoading(false);
      console.log('Use getting undefiend !');
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <LogoutLink>page</LogoutLink>
    </div>
  );
}

export default page;
