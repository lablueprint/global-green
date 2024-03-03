import { NextResponse } from 'next/server';
import { isUserVerified } from '@helpers/getDataFromToken';

const protectedRoutes = ['/profile', '/courses', '/badges', '/verifyemail'];

export async function middleware(req) {
  // const { pathname } = req.nextUrl;
  // const url = req.nextUrl.clone();

  // // Skip middleware for non-protected routes
  // if (!protectedRoutes.includes(pathname)) {
  //   return NextResponse.next();
  // }

  // const token = req.cookies.get('token');

  // // Redirect logic for protected and unprotected routes with a token
  // if (token) {
  //   if (pathname === '/login' || pathname === '/signup') {
  //     // Redirect from /login or /signup to /profile if user is verified
  //     const verified = await isUserVerified(req);
  //     if (verified) {
  //       url.pathname = '/profile';
  //       return NextResponse.redirect(url);
  //     }
  //     return NextResponse.next();
  //   }
  //   const verified = await isUserVerified(req);
  //   console.log('verified', verified);

  //   if (verified) {
  //     if (pathname === '/verifyemail') {
  //       // Redirect from /verifyemail to /profile if user is verified
  //       url.pathname = '/profile';
  //       return NextResponse.redirect(url);
  //     }

  //     // Redirect from /login or /signup to /profile if user is verified
  //     if (pathname === '/login' || pathname === '/signup') {
  //       url.pathname = '/profile';
  //       return NextResponse.redirect(url);
  //     }
  //     return NextResponse.next();
  //   } if (pathname !== '/verifyemail') {
  //     // Redirect to /verifyemail if the user is not verified and not already on that page
  //     url.pathname = '/verifyemail';
  //     return NextResponse.redirect(url);
  //   }
  // } else if (protectedRoutes.includes(pathname)) {
  //   // Redirect to /login if trying to access a protected route without a token
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  // return NextResponse.next();
}
