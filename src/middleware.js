import { withAuth } from 'next-auth/middleware';

export default withAuth(
  (req) => {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Check if the verify field is true
        if (!token) {
          return false;
        }
        if (token.verified) {
          return true; // User is verified, allow access
        }
        return false; // User is not verified, block access
      },
    },
  },
);

export const config = {
  matcher: [
    '/profile',
    '/landing',
    '/challenges',
    '/courses',
    '/store',
  ],
};
