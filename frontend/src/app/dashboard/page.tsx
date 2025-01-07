'use client';

import { useAuthenticationStatus } from '@nhost/nextjs';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { VideoList } from '@/components/dashboard/VideoList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <VideoList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
