import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { api } from "../api"
import { auth } from "@/app/firebase";
import { signIn, signOut } from "next-auth/react";

export const authApi = {
  async signUp(
    email: string,
    password: string,
    userName: string,
  ) {
    const doesUserExist = await this.checkUserName(userName);

    if (doesUserExist) {
      throw new Error('User with such name exist')
    }

    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseId = newUser.user.uid;

    return api.post('auth/signup', { email, userName, firebaseId })
  },

  async signIn(email: string, password: string,) {
    return signInWithEmailAndPassword(auth, email, password);
    // await signIn('credentials', {email, password, redirect: true, callbackUrl: '/'})
  },

  async logOut() {
    return auth.signOut();
    // await signOut();
  },

  async checkUserName(userName: string): Promise<boolean> {
    const response = await api.get('/auth/checkUserName', {
      params: {
        userName,
      }
    });

    return response.data;
  },
}