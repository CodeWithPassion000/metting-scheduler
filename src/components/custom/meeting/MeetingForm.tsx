'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocationOption from '../../../../utils/LocationOption';
import Image from 'next/image';
import Link from 'next/link';
import ThemeOption from '../../../../utils/ThemeOption';
import { Event } from '@/types/eventstypes';
interface MeetingFormProps {
  eventDetails: Event;
  setEventDetails: React.Dispatch<React.SetStateAction<Event>>;
}

function MeetingForm({ eventDetails, setEventDetails }: MeetingFormProps) {
  const eventHandler = (name: string, value: string | number) => {
    if (name && value) {
      setEventDetails({ ...eventDetails, [name]: value });
    }
  };

  return (
    <div className="p-8">
      <Link href={'dashboard'}>
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>

      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event"
          value={eventDetails.name}
          onChange={(event) => {
            eventHandler('name', event.target.value);
          }}
        />
        <h2>Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {eventDetails.duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => eventHandler('duration', 15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => eventHandler('duration', 30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => eventHandler('duration', 45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => eventHandler('duration', 60)}>
              60 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((item, index) => {
            return (
              <div
                key={index}
                className={`border flex flex-col justify-center items-center p-3 rounded-lg hover:bg-blue-100 hover:border-primary cursor-pointer
                ${
                  eventDetails?.type == item.name
                    ? 'bg-blue-100 border-primary'
                    : ''
                }
                `}
                onClick={() => eventHandler('type', item.name)}
              >
                <Image src={item.icon} width={30} height={30} alt={item.name} />
                <h2>{item.name}</h2>
              </div>
            );
          })}
        </div>
        {eventDetails?.type && (
          <>
            <h2 className="font-bold">Add {eventDetails?.type} Url</h2>
            <Input
              placeholder="Add url"
              onChange={(event) => eventHandler('url', event.target.value)}
            />
          </>
        )}
        <h2 className="font-bold">Select Theme Color *</h2>
        <div className="flex justify-evenly">
          {ThemeOption.map((color, index) => {
            return (
              <div
                key={index}
                className={`h-7 w-7 rounded-full cursor-pointer
                ${eventDetails?.color == color ? 'border-4 border-black ' : ''}
                `}
                style={{ backgroundColor: color }}
                onClick={() => eventHandler('color', color)}
              ></div>
            );
          })}
        </div>
      </div>
      <Button
        className="w-full mt-9"
        disabled={
          !(
            eventDetails?.duration &&
            eventDetails?.name &&
            eventDetails?.type &&
            eventDetails?.url
          )
        }
      >
        Create
      </Button>
    </div>
  );
}

export default MeetingForm;
