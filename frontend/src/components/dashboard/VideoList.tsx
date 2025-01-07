'use client';

import { useQuery } from '@tanstack/react-query';
import { nhost } from '@/lib/nhost';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { VideoCard } from './VideoCard';

const GET_USER_VIDEOS = `
  query GetUserVideos {
    video_summaries(order_by: {created_at: desc}) {
      id
      video_url
      video_id
      title
      status
      created_at
    }
  }
`;

interface VideoSummary {
  id: string;
  video_url: string;
  video_id: string;
  title: string;
  status: string;
  created_at: string;
}

export function VideoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userVideos'],
    queryFn: async () => {
      const { data, error } = await nhost.graphql.request(GET_USER_VIDEOS);
      if (error) throw error;
      return data.video_summaries as VideoSummary[];
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading videos</h3>
            <div className="mt-2 text-sm text-red-700">
              {error.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-center">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No videos</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by summarizing your first YouTube video.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
