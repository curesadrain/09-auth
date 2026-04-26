'use client';

import css from './Notes.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { FetchNotes } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';

interface SidebarNotesClientProps {
  initialQuery: string;
  initialPage: number;
  selectedTag?: string;
}

function SidebarNotesClient({
  initialQuery,
  initialPage,
  selectedTag,
}: SidebarNotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  // const [modalState, setModalState] = useState(false);

  // const openModal = () => {
  //   document.body.style.overflow = 'hidden';
  //   setModalState(true);
  // };
  // const closeModal = () => {
  //   document.body.style.overflow = 'auto';
  //   setModalState(false);
  // };

  // const handleClose = () => closeModal();

  const {
    data = { notes: [], totalPages: 0 },
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
  } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, selectedTag ?? ''],
    queryFn: () => FetchNotes(currentPage, searchQuery, selectedTag ?? ''),
    placeholderData: keepPreviousData,
    // refetchOnMount: false,
  });

  const handleDebouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handleInput = (value: string) => {
    setInputValue(value);
    handleDebouncedSearch(value);
  };

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong', {
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [error]);

  const showLoader = isLoading || (isFetching && !isPlaceholderData);

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        {showLoader && <Loader />}
        <SearchBox value={inputValue} onChange={handleInput} />
        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link
          href="/notes/action/create"
          className={css.button}
          // onClick={handleCreateNote}
        >
          Create note +
        </Link>
      </header>
      {data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default SidebarNotesClient;
