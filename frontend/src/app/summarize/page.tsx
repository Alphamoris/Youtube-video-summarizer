'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { nhost } from '@/lib/nhost';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const SUBMIT_VIDEO = `
  mutation SubmitVideo($videoUrl: String!) {
    insert_video_summaries_one(object: {
      video_url: $videoUrl,
      status: "pending"
    }) {
      id
      video_url
      status
    }
  }
`;

export default function SummarizePage() {
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const submitVideo = async () => {
      const videoUrl = searchParams.get('url');
      if (!videoUrl) {
        setError('No video URL provided');
        return;
      }

      try {
        setIsSubmitting(true);
        const { data, error } = await nhost.graphql.request(SUBMIT_VIDEO, {
          videoUrl,
        });

        if (error) {
          throw error;
        }

        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    };

    if (isAuthenticated && !authLoading) {
      submitVideo();
    }
  }, [isAuthenticated, authLoading, searchParams]);

  if (authLoading || isSubmitting) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Video submitted successfully
              </h3>
              <div className="mt-2 text-sm text-green-700">
                Your video is being processed. You can check its status in your dashboard.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
