import { NextRequest, NextResponse } from 'next/server';
import { auth } from './app/firebase';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('tokenId')
  try {
    const responseFromServer = await fetch(`http://localhost:3000/auth/is-authorized/${token?.value}`);
    // const responseFromServer = await fetch(`http://localhost:3000/auth/is-authorized/eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZDA3YmJjM2Q3NWM2OTQyNzUxMGY2MTc0ZWIyZjE2NTQ3ZDRhN2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHYtdGltZS10cmFja2VyIiwiYXVkIjoidHYtdGltZS10cmFja2VyIiwiYXV0aF90aW1lIjoxNjk3Nzk2NjE0LCJ1c2VyX2lkIjoiUWZNZWRvSlQ2SFlCTnpDZ1VEMkxDUXRyc0h4MSIsInN1YiI6IlFmTWVkb0pUNkhZQk56Q2dVRDJMQ1F0cnNIeDEiLCJpYXQiOjE2OTc3OTc5OTEsImV4cCI6MTY5NzgwMTU5MSwiZW1haWwiOiJubmF6YXI4MzZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5uYXphcjgzNkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.E55Xgjga1Kane3dUo9x1B9cyI0slTGGZPJqeCsfai0Rfr6aYiwbKLQU4cjWlDOWXM9Y8w-dOZLXRYRFz-wMADeJjA-OFYckz6H13i3omvbKhClg-YBNMYnr0y20qUP2RUkqfl6fRDV6PzGYF-UJDIoV0QO5aoW5UbEDiWEjcFCfQDB6lequVEnAKYUUHUKMWYBmAmf_bw0FNVBhonC1f9R2o4cytT5QpnYMTPIbyTrfGrX_5EvrLw31RtWATdY1SU2GqEWX6ubIWXlYMef02RgJvMfkT3g8hTea3kraGjuR7jMzgKiDVSiw3sUDhG87t8eTuyArKftknXT3al0cxKw`);
    const isAuthorized = await responseFromServer.json();

    if (!isAuthorized) {
      console.log('here');
      const url = req.nextUrl.clone()
      url.pathname = '/refresh'
      const response = NextResponse.redirect(url)
      response.cookies.set({ name: 'redirectedFrom', value: req.nextUrl.pathname });
      return response;
    }

    const response = NextResponse.next()
    
    response.cookies.delete('redirectedFrom');

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const config = {
  matcher: '/shows',
}
