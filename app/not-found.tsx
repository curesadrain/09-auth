import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://08-zustand-wheat-kappa.vercel.app/404',
    images: [
      {
        url: 'https://media.istockphoto.com/id/1705779494/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D0%BC%D0%B8%D0%BB%D0%BA%D0%B0-404-%D1%81%D1%82%D0%BE%D1%80%D1%96%D0%BD%D0%BA%D0%B0-%D0%BD%D0%B5-%D0%BB%D1%8E%D0%B1%D0%B8%D1%82%D1%8C-%D1%84%D1%83%D1%82%D1%83%D1%80%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%BD%D0%B8%D0%B9-%D1%81%D1%83%D1%87%D0%B0%D1%81%D0%BD%D0%B8%D0%B9-3d-%D1%84%D0%BE%D0%BD.jpg?s=1024x1024&w=is&k=20&c=2iyd74MD4zmL0aucBACCkBzI7n63rchOTiGePO28u0c=',
        width: 1200,
        height: 630,
        alt: 'Error 404',
      },
    ],
  },
};

export function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
