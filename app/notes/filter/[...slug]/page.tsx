import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { FetchNotes } from '@/lib/api';
import SidebarNotesClient from './Notes.client';
import { Metadata } from 'next';

interface SidebarNotesServerProps {
  searchParams: Promise<{
    searchQuery: string;
    currentPage: number;
  }>;
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: SidebarNotesServerProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `Category: ${category}`,
    description: `Your organized list of notes by "${category}" category`,
    openGraph: {
      title: `Category: ${category}`,
      description: `Your organized list of notes by "${category}" category`,
      url: `https://08-zustand-wheat-kappa.vercel.app/notes/filter/${slug}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHUB at GoIT',
        },
      ],
    },
  };
}

async function SidebarNotesServer({
  searchParams,
  params,
}: SidebarNotesServerProps) {
  const search = await searchParams;
  const { slug } = await params;
  const searchQuery = search.searchQuery || '';
  const currentPage = Number(search.currentPage) || 1;

  const selectedTag = slug && slug[0] !== 'all' ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', searchQuery, currentPage, selectedTag],
    queryFn: () => FetchNotes(currentPage, searchQuery, selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarNotesClient
        initialQuery={searchQuery}
        initialPage={currentPage}
        selectedTag={selectedTag}
      />
    </HydrationBoundary>
  );
}

export default SidebarNotesServer;
