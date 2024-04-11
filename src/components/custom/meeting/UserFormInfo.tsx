import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { UserDetail } from '@/types/eventstypes';

interface UserInfoProps {
  onChangeuserDetail: Function;
  userDetails: UserDetail;
}

function UserFormInfo({ onChangeuserDetail, userDetails }: UserInfoProps) {
  return (
    <div className="p-4 px-8 flex flex-col gap-3">
      <h2 className="font-bold text-xl">Enter Details</h2>
      <div>
        <h2>Name *</h2>
        <Input
          value={userDetails?.userName}
          onChange={(event) => {
            onChangeuserDetail('userName', event.target.value);
          }}
        />
      </div>
      <div>
        <h2>Email *</h2>
        <Input
          value={userDetails?.email}
          onChange={(event) => {
            onChangeuserDetail('email', event.target.value);
          }}
        />
      </div>
      <div>
        <h2>Share any Notes *</h2>
        <Input
          value={userDetails?.note}
          onChange={(event) => {
            onChangeuserDetail('note', event.target.value);
          }}
        />
      </div>
      <div>
        <h2 className="text-xs text-gray-400">
          By Proceeding, you confirm that you read and agree terms and condition{' '}
        </h2>
      </div>
    </div>
  );
}

export default UserFormInfo;
