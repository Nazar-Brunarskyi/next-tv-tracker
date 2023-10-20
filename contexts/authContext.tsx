'use client'
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { app, auth } from '../app/firebase';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter, usePathname } from 'next/navigation';
const MyContext = createContext(null);


export function AuthPtovider({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname()
  const publicRoutes = ['/signin', '/signup'];

  const getToken = async (user: User) => {
    // console.log('User:', user);

    // console.log(await user.getIdToken());
  }

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!publicRoutes.includes(pathname as string) && !user) {
      router.push('/signin');
    }

    if(user) {
      getToken(user);
    }
  }, [user, loading]);

  return (
    <MyContext.Provider value={null}>
      {children}
    </MyContext.Provider>
  );
}
