import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SignJWT } from 'jose';
import User from '../../../../../models/user';
import connectMongoDB from '../../../../../libs/mongodb';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',

  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectMongoDB();
      console.log('Sign in here');
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
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.rank = token.rank;
      session.user.badges = token.badges;
      session.user.courses = token.courses;
      session.user.verified = token.verified;
      session.user.verifyExpires = token.verifyExpires;
      console.log('session', session);
      return session;
    },
    async jwt({ token, account, profile }) {
      console.log('jwt');
      if (account?.provider === 'google' && profile?.email_verified) {
        console.log('jwt google');
        await connectMongoDB();
        const existingUser = await
        User.findOne({ email: profile.email });
        token.id = existingUser.id;
        token.userName = existingUser.userName;
        token.email = existingUser.email;
        token.firstName = existingUser.firstName;
        token.lastName = existingUser.lastName;
        token.rank = existingUser.rank;
        token.badges = existingUser.badges;
        token.courses = existingUser.courses;
        token.verified = existingUser.verified;
        token.verifyExpires = existingUser.verifyExpires;
      }
      console.log('token', token);
      return Promise.resolve(token);
    },

  },

  debug: true,

};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
