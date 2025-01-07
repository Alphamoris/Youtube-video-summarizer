'use client';

import { useQuery } from '@tanstack/react-query';
import { nhost } from '@/lib/nhost';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SummaryView } from '@/components/summary/SummaryView';

const GET_VIDEO_SUMMARY = `
  query GetVideoSummary($id: uuid!) {
    video_summaries_by_pk(id: $id) {
      id
      video_url
      video_id
      title
      summary
      chapters
      key_points
      action_items
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
  summary: string;
  chapters: any[];
  key_points: string[];
  action_items: string[];
  status: string;
  created_at: string;
}

export default function VideoDetailsPage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['videoSummary', params.id],
    queryFn: async () => {
      const { data, error } = await nhost.graphql.request(GET_VIDEO_SUMMARY, {
        id: params.id,
      });
      if (error) throw error;
      return data.video_summaries_by_pk as VideoSummary;
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
            <h3 className="text-sm font-medium text-red-800">Error loading summary</h3>
            <div className="mt-2 text-sm text-red-700">
              {error instanceof Error ? error.message : 'An error occurred'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          Summary not found
        </h3>
      </div>
    );
  }

  return <SummaryView summary={data} />;
}
