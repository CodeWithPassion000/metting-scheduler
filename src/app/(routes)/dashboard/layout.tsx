import React from 'react';
import SideNavBar from '@/components/custom/dashboard/SideNavBar';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="hidden md:block md:w-64 bg-slate-50 h-screen fixed">
        <SideNavBar />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default DashboardLayout;
