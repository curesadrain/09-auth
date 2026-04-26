import type { Note } from '@/types/note';
import type { NoteFormValues } from '@/components/NoteForm/NoteForm';
import { FetchNotesResponse, NextServer } from './api';
import { User } from '@/types/user';

export const FetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await NextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      search,
      tag: tag === '' || tag === 'all' ? undefined : tag,
    },
  });
  return response.data;
};

export const FetchNoteById = async (id: string): Promise<Note> => {
  const response = await NextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const CreateNote = async (newTask: NoteFormValues): Promise<Note> => {
  const result = await NextServer.post<Note>('/notes', newTask);
  return result.data;
};

export const DeleteNote = async (id: string): Promise<Note> => {
  const res = await NextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export const Register = async (data: AuthRequest) => {
  const res = await NextServer.post<User>('/auth/register', data);
  return res.data;
};

export const Login = async (data: AuthRequest) => {
  const res = await NextServer.post<User>('/auth/login', data);
  return res.data;
};

export const Logout = async (): Promise<void> => {
  await NextServer.post('/auth/logout');
};

export type CheckSessionRequest = {
  success: boolean;
};
export const CheckSession = async () => {
  const res = await NextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const GetMe = async () => {
  const { data } = await NextServer.get<User>('/users/me');
  return data;
};

export type UpdateRequest = {
  email: string;
  username: string;
};
export const UpdateMe = async (data: UpdateRequest) => {
  const res = await NextServer.patch<User>('/users/me', data);
  return res.data.username;
};
