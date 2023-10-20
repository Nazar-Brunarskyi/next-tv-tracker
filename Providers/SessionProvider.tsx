'use client'
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

export default function CustomSessionProvider({ children }: Props) {
  return (
    <Provider>
      {children}
    </Provider>
  );
};
