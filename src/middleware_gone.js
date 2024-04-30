import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  // (req) => {
  //   console.log(req.nextauth.token);
  // },
  // {
  //   callbacks: {
  //     // authorized: ({ token }) => token?.verified,
  //     authorized: ({ token }) => token,
  //   },
  // },
);

export const config = { matcher: ['/profile'] };
