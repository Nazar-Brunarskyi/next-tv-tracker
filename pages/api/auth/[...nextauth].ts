// import { auth } from '../../../app/firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import NextAuth from 'next-auth/next';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { AuthOptions } from 'next-auth';

// export const authOptions: AuthOptions = {
//   pages: {
//     signIn: '/signin'
//   },
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {},
//       async authorize(credentials): Promise<any> {
//         try {
//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             (credentials as any).email || '', (credentials as any).password || ''
//           );

//           const idToken = auth.currentUser?.getIdToken();

//           if (userCredential.user) {
//             return userCredential.user;
//           }

//           return null;
//         } catch (error) {
//           console.log(error);
//           return null;
//         }
//       }

//     })
//   ],
//   callbacks: {
//     async jwt({ user, token, session, profile }) {
//       const tokenId = await auth.currentUser?.getIdToken();
//       const _user = auth.currentUser?.email;
//       console.log('user', _user);
//       return { user, token, session };
//     },

//     async session({ session, token, user }) {
//       // console.log(2);

//       // console.log(session);
//       return session;
//     },
//   }
// }

// export default NextAuth(authOptions)