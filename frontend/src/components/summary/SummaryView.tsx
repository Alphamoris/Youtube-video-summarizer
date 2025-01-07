'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

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

interface SummaryViewProps {
  summary: VideoSummary;
}

export function SummaryView({ summary }: SummaryViewProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Summary', content: summary.summary },
    { name: 'Key Points', content: summary.key_points },
    { name: 'Action Items', content: summary.action_items },
    { name: 'Chapters', content: summary.chapters },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${summary.video_id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{summary.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          Summarized on {new Date(summary.created_at).toLocaleDateString()}
        </p>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-indigo-700 shadow'
                    : 'text-indigo-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={clsx(
                'rounded-xl bg-white p-6',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2'
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {Array.isArray(tab.content) ? (
                  <ul className="list-disc space-y-2 pl-4">
                    {tab.content.map((item: any, index: number) => (
                      <li key={index} className="text-gray-700">
                        {typeof item === 'string' ? item : JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {tab.content}
                  </p>
                )}
              </motion.div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
