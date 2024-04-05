import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

interface HeaderType {
  name: string;
}

const headers: HeaderType[] = [
  {
    name: 'Product',
  },
  {
    name: 'Pricing',
  },
  {
    name: 'Contact Us',
  },
  {
    name: ' About Us',
  },
];

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-sm">
        <Image
          src="logo.svg"
          width={100}
          height={100}
          alt="logo"
          className="w-[150px] md:w[200px]"
        />
        <ul className="hidden md:flex gap-14 font-medium text-lg">
          {headers.map((item, index) => {
            return (
              <li className="hover:text-primary transition-all duration-300 cursor-pointer">
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-5">
          <LoginLink>
            <Button variant="ghost">Login</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
