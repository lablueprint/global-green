import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../../../models/user';
import connectMongoDB from '../../../../../libs/mongodb';

let isConnected = false;
const ensureDbConnection = async () => {
  if (!isConnected) {
    try {
      await connectMongoDB();
      isConnected = true;
      console.log('MongoDB connected in NextAuth');
    } catch (error) {
      console.log('Failed to connect to MongoDB in NextAuth:', error);
      throw error;
    }
  }
  return isConnected;
};

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('trying to authorize credentials for:', credentials);
          await ensureDbConnection();

          const user = await User.findOne({
            $or: [
              { email: credentials.username },
              { userName: credentials.username },
            ],
          });
          if (!user) {
            console.log('User not found for:', credentials);
            return null;
          }
          // sometimes the input password is already hashed
          console.log('during credentials authorize', user);
          const isValid =
            (await bcryptjs.compare(credentials.password, user.password)) ||
            credentials.password === user.password;
          console.log('isValid', isValid);
          return isValid ? user : null;
        } catch (error) {
          console.error('Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await ensureDbConnection();
      console.log('Sign in attempt');
      if (account.provider === 'credentials') {
        return true;
        // console.log('credentials');
        // const existingUser = await User.findOne({ email: user.email });
        // if (!existingUser) {
        //   // error user not found
        //   console.log('User not found');
        //   return false;
        // }
        // console.log('User exists');
        // console.log(existingUser);
        // console.log('User object', user);
        // return true;
      }

      if (account.provider === 'google' && profile.email_verified) {
        const existingUser = await User.findOne({ email: profile.email });
        if (!existingUser) {
          console.log('Creating user');
          await User.create({
            email: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name,
            userName: profile.email.split('@')[0],
            verified: true,
            verifyExpires: null,
          })
            .then(() => {
              console.log('New user created');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('User exists');
          console.log(existingUser);
        }

        return true;
      }

      return false;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.userName = token.userName;
      session.user.email = token.email;
      session.user.verified = token.verified;
      console.log('session', session);
      return session;
    },
    async jwt({ token, account, profile, user }) {
      console.log('jwt');
      const email = '';
      if (account?.provider === 'google') {
        try {
          const existingUser = await User.findOne({ email: profile.email });
          if (existingUser) {
            token.id = existingUser.id;
            token.userName = existingUser.userName;
            token.email = existingUser.email;
            token.verified = existingUser.verified;
            console.log('token', token);
          } else {
            console.log('user not found in JWT callback');
          }
        } catch (error) {
          console.log('error in JWT Google provider:', error);
        }
      }
      if (account?.provider === 'credentials') {
        token.id = user.id;
        token.userName = user.userName;
        token.email = user.email;
        token.verified = user.verified;
        console.log('token', token);
      }
      // await ensureDbConnection();

      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/signup',
  },

  debug: true,
};

console.log('Environment check:', {
  hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
});

const handler = NextAuth(options);

export { handler as GET, handler as POST };

// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// // log env variables at runtime
// console.log('Runtime environment check:', {
//   NODE_ENV: process.env.NODE_ENV,
//   NEXTAUTH_SECRET_AVAILABLE: !!process.env.NEXTAUTH_SECRET,
//   NEXTAUTH_URL_AVAILABLE: !!process.env.NEXTAUTH_URL,
// });

// // hardcoded fallback secret for testing
// const SECRET =
//   process.env.NEXTAUTH_SECRET ||
//   'THIS_IS_A_FALLBACK_SECRET_DO_NOT_USE_IN_PRODUCTION';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID || 'placeholder-id',
//       clientSecret: process.env.GOOGLE_SECRET || 'placeholder-secret',
//     }),
//   ],
//   secret: SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   // no callbacks for now to simplify
//   debug: true,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
