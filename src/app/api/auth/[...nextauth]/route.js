import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../../../models/user';
import connectMongoDB from '../../../../../libs/mongodb';

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
        console.log('trying to authorize');
        try {
          console.log('credentials', credentials);
          await connectMongoDB();
          const user = await User.findOne({
            $or: [
              { email: credentials.username },
              { userName: credentials.username },
            ],
          });
          if (!user) {
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
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongoDB();
      console.log('Sign in here');
      if (account.provider === 'credentials') {
        console.log('credentials');
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // error user not found
          console.log('User not found');
          return false;
        }
        console.log('User exists');
        console.log(existingUser);
        console.log('User object', user);
        return true;
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
        const existingUser = await User.findOne({ email: profile.email });
        token.id = existingUser.id;
        token.userName = existingUser.userName;
        token.email = existingUser.email;
        token.verified = existingUser.verified;
        console.log('token', token);
      }
      if (account?.provider === 'credentials') {
        token.id = user.id;
        token.userName = user.userName;
        token.email = user.email;
        token.verified = user.verified;
        console.log('token', token);
      }
      await connectMongoDB();

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
