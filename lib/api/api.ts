import { Note } from '@/types/note';
import axios from 'axios';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  tag?: string;
}

export const NextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL + '/api'}`,
  params: {
    perPage: 12,
  },
  headers: {
    accept: 'application/json',
  },
  withCredentials: true,
});
