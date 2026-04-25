'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { CreateNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { NoteTag } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
// import * as Yup from 'yup';
// import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

// const initialValues: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'At least 3 characters')
//     .max(50, "Can't be longer 50 characters")
//     .required('Title is required'),
//   content: Yup.string().max(500, 'Max task length - 500 characters'),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'InvalidTag')
//     .required('Choose tag'),
// });

function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const onCancel = () => {
    router.push('/notes/filter/all');
  };

  const formSubmitM = useMutation({
    mutationFn: CreateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onCancel();
      toast.success('Note created', {
        duration: 2000,
        position: 'top-center',
      });
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
    formSubmitM.mutate(values);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          placeholder="Enter title"
          defaultValue={draft?.title}
          onChange={handleChange}
        />
        {/* <ErrorMessage component="span" name="title" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          placeholder="Optional description"
          defaultValue={draft?.content}
          onChange={handleChange}
        />
        {/* <ErrorMessage component="span" name="content" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage component="span" name="tag" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={formSubmitM.isPending}
        >
          {formSubmitM.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
