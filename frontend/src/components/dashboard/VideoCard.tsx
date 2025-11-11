
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface VideoSummary {
  id: string;
  video_url: string;
  video_id: string;
  title: string;
  status: string;
  created_at: string;
}

interface VideoCardProps {
  video: VideoSummary;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`;
  const formattedDate = new Date(video.created_at).toLocaleDateString();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-lg bg-white shadow"
    >
      <Link href={`/dashboard/videos/${video.id}`}>
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={thumbnailUrl}
            alt={video.title}
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {video.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">{formattedDate}</span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                statusColors[video.status as keyof typeof statusColors]
              }`}
            >
              {video.status}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
