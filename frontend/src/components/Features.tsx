'use client';

import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  TranslateIcon,
  BookmarkIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Save Time',
    description: 'Get the key points from long videos in minutes',
    icon: ClockIcon,
  },
  {
    name: 'Smart Summaries',
    description: 'AI-powered summaries that capture the essential content',
    icon: DocumentTextIcon,
  },
  {
    name: 'Key Insights',
    description: 'Extract actionable insights and main takeaways',
    icon: ChartBarIcon,
  },
  {
    name: 'Multiple Languages',
    description: 'Support for summaries in various languages',
    icon: TranslateIcon,
  },
  {
    name: 'Save Summaries',
    description: 'Store and organize your video summaries',
    icon: BookmarkIcon,
  },
  {
    name: 'Easy Sharing',
    description: 'Share summaries with your team or friends',
    icon: ShareIcon,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Faster Understanding
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to extract value from YouTube videos
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our AI-powered platform helps you save time and gain insights from YouTube content quickly and efficiently.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
