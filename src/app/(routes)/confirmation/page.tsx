import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

function page() {
  return (
    <div className="flex flex-col items-center justify-center p-20 gap-5">
      <CheckCircle className="h-9 w-9 text-green-500" />
      <h2 className="font-bold text-3xl">Your meeting scheduled succesfully</h2>
      <h2 className="text-lg text-gray-500">Confirmation sent to mail</h2>
      <Link href={'/'}>
        <Button>Thank you</Button>
      </Link>
    </div>
  );
}

export default page;
