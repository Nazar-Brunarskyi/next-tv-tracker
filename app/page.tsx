'use client';
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Button } from "@mui/material";
import { showsApi } from "@/API/shows/showApi";
import { authApi } from "@/API/auth/authApi";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";


export default function Home() {
  const [text, setText] = useState('');
  const logOut = async () => {
    await authApi.logOut();
  }

  const getText = async () => {
    const text = await showsApi.test();
    setText(text)
  }
  // const getCookie = (name: string) => {
  //   const cookieArray = document.cookie.split('; ');
  
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     const cookiePair = cookieArray[i].split('=');
  
  //     if (name === decodeURIComponent(cookiePair[0])) {
  //       return decodeURIComponent(cookiePair[1]);
  //     }
  //   }
  
  //   return null;
  // }

  // useEffect(() => {
  //   console.log(getCookie('redirectedFrom'));
  // },[])
  
  return (
    <>
      <h1>you are loged in</h1>
      <Button onClick={logOut}>
        log Out
      </Button>
      <h2>{text}</h2>

      <Button onClick={getText}>
        get text
      </Button>

      <Link href={'/shows'}>
        Shows
      </Link>
    </>
  )
}

Home.requireAuth = true;
