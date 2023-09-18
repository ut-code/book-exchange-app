import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Container, Box } from '@mui/material';
import BookProfile from './book';
import { useUserQuery } from './user/query.generated';
import ShareLinkButton from '../organisms/ShareLink/ShareLinkButton';

export default function Home() {
  const router = useRouter();
  const query = useUserQuery();
  const user = query.data?.user;

  return (
    <>
      <BookProfile></BookProfile>
    </>
  );
}
