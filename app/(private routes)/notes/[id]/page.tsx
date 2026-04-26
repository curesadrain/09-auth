import { FetchNoteByIdServer } from '@/lib/api/serverApi';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

export type NoteDetailsProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await FetchNoteByIdServer(id);
  return {
    title: `${note.title} - Note`,
    description: `Note description: ${note.content.slice(0, 30)}`,
    openGraph: {
      title: `${note.title} - Note`,
      description: `Note description: ${note.content.slice(0, 30)}`,
      url: `https://09-auth-six-mauve.vercel.app//notes/${id}`,
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

async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => FetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;
