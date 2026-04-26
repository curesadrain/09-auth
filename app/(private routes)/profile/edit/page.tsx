'use client';

import Image from 'next/image';

import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { UpdateMe } from '@/lib/api/clientApi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function EditProfilePage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as { username: string };
      const newUsername = formValues.username;
      if (user && newUsername.trim() !== '') {
        const updatedUser = await UpdateMe({
          username: newUsername,
          email: user?.email,
        });
        setUser(updatedUser);
        router.push('/profile');
      } else {
        toast.error('Input your new username');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'Oops... some error',
        );
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfilePage;
