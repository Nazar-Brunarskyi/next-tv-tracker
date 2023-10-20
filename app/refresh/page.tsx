'use client'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { authApi } from '@/API/auth/authApi';
import { useSession } from 'next-auth/react';
import { CircularProgress, makeStyles } from '@mui/material';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Refresh() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const getCookie = (name: string) => {
    const cookieArray = document.cookie.split('; ');

    for (let i = 0; i < cookieArray.length; i++) {
      const cookiePair = cookieArray[i].split('=');

      if (name === decodeURIComponent(cookiePair[0])) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return null;
  }

  const refreshToken = async () => {
    const token = await auth.currentUser?.getIdToken();
    // console.log(token);

    if (!token) {
      router.push('/signin');
    }

    document.cookie = `tokenId=${token}`;
    const redirectedFrom = getCookie('redirectedFrom');

    if(!redirectedFrom) {
      router.push('/signin');
    } else {
      console.log('redirectedFrom', redirectedFrom);
      
      router.push(redirectedFrom);
      // redirect(redirectedFrom)
      // console.log(2);
    }

  }

  useEffect(
    () => {
      if (loading) {
        return;
      }

      if (user) {
        refreshToken();
      }
    },
    [user, loading]
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <CircularProgress />
    </div>
  )
}