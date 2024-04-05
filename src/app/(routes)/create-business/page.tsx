'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../../../config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function page() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const [businessName, setBusinessName] = useState<string>();

  const onCreateBusiness = async () => {
    if (!user?.email) {
      console.error('User email is undefined');
      return;
    }

    await setDoc(doc(db, 'Business', user.email), {
      businessName: businessName,
      email: user.email,
      userName: user.given_name + ' ' + user.family_name,
    })
      .then((res) => {
        console.log('document created');
        toast('New Business Created !');
        router.replace('/dashboard');
      })
      .catch((error) => {
        console.error('Error creating document:', error);
      });
  };

  return (
    <div className="p-14 flex items-center flex-col gap-20 my-10">
      <Image
        src="logo.svg"
        width={100}
        height={100}
        alt="logo"
        className="w-[150px] md:w[200px]"
      />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business ?
        </h2>
        <p className="text-slate-500">
          You can always change this later from setting
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="Enter your business name"
            className="mt-2"
            onChange={(event) => setBusinessName(event.target.value)}
          />
          <Button
            className="w-full mt-4"
            disabled={!businessName}
            onClick={onCreateBusiness}
          >
            Create Business
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
