import { api } from '@/app/api/api';
import { FetchNotesResponse, NextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { cookies } from 'next/headers';
import { CheckSessionRequest } from './clientApi';

export const FetchNotesServer = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search,
      tag: tag === '' || tag === 'all' ? undefined : tag,
    },
    headers: {
      Cookie: allCookies,
    },
  });
  return response.data;
};

export const FetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: allCookies,
    },
  });
  return response.data;
};

export const CheckSessionServer = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const res = await NextServer.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: allCookies,
    },
  });
  return res;
};

export const GetMeServer = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const { data } = await NextServer.get<User>('/users/me', {
    headers: {
      Cookie: allCookies,
    },
  });
  return data;
};
