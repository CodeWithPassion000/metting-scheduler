import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface ButtonType {
  imageurl: string;
  title: string;
  alt: string;
}
interface ImageType {
  url: string;
  alt: string;
  position: string;
}
const buttons: ButtonType[] = [
  {
    imageurl: '/google.png',
    title: 'Sign up with Google',
    alt: 'google icon',
  },
  {
    imageurl: '/facebook.png',
    title: 'Sign up with Facebook',
    alt: 'google icon',
  },
];

const profileImages: ImageType[] = [
  {
    url: 'profileOne.jpg',
    alt: 'Profile One',
    position: 'right-36',
  },
  {
    url: 'profileOne.jpg',
    alt: 'Profile One',
    position: 'right-36',
  },
];

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div></div>
      <div className="text-center max-w-3xl">
        <h2 className="font-bold text-[60px] text-slate-700">
          Easy scheduling ahead
        </h2>
        <h2 className="text-xl mt-5 text-slate-500">
          Schedule is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time-and so much more
        </h2>
        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-sm">Sign Up free with Google and Facebook</h3>
          <div className="flex justify-center gap-8">
            {buttons.map((item, index) => {
              return (
                <Button className="p-7 gap-4">
                  <Image
                    src={item.imageurl}
                    width={30}
                    height={30}
                    alt={item.alt}
                  />
                  {item.title}
                </Button>
              );
            })}
          </div>
          <hr></hr>
          <h2>
            <Link href="" className="text-primary">
              Sign up Free with Email
            </Link>
            .No Credit card required
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
