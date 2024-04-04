import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
function Header() {
  return (
    <div>
      <div className="flex items-center justify-between ">
        <Image
          src="logo.svg"
          width={100}
          height={100}
          alt="logo"
          className="w-[150px] md:w[200px]"
        />
        <ul className="flex gap-14">
          <li>Product</li>
          <li>Pricing</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
        <div>
          <Button variant="ghost">Login</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
