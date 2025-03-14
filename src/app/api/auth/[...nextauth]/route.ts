import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
//import Auth0Provider from "next-auth/providers/auth0"

import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const adapter = PrismaAdapter(prisma);
// adapter.getUser = async (id) => {
//   const user = await prisma.user.findUnique({
//     where: { id },
//     include: { role: true }, 
//   });
//   //return user ? { ...user, emailVerified: user.emailVerified ?? null } : null;
//   return user;
// };

export const authOptions: NextAuthOptions = {
  adapter,
  // https://next-auth.js.org/configuration/providers
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     appleId: process.env.APPLE_ID,
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   },
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   // @ts-ignore
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { role: true },
           });
        
          if (!user) {
            console.log("User not found");
            return null;
          }
        
          let passwordMatch:boolean = true;

          if (user.password) {
            passwordMatch = await bcrypt.compare(credentials.password, user.password);
          }
        
          if (!passwordMatch) {
            console.log("Invalid password");
            return null; 
          }
          return user;
        }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: "read:user",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  //database: process.env.DB_URL || "",
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt'

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.JWT_SECRET,
    // Set to true to use encryption (default: false)
    //encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    //signIn: "/login"
    signIn: '/auth/login',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {

      if (account?.provider === "google") {
        const googleProfile = profile as { email_verified?: boolean; email?: string, given_name?: string, family_name?: string }; 
        console.log('googleProfile', googleProfile);
        console.log('profile', profile, 'account: ', account);
      /*if (!googleProfile.email_verified) {
        throw new Error("Google account must have a verified email.");
      }

      if (!user.email) {
        throw new Error("No email provided by Google.");
      }

      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        try {
          existingUser = await prisma.user.create({
            data: {
              email: user.email,
              firstName: googleProfile?.given_name as string,
              lastName: googleProfile?.family_name as string,
              roleId:"0f108788-7ec5-4195-8eec-b811897c8a80"
              // image: user.image ?? null,
            },
          });

        } catch (error) {
          console.error(error);
          throw new Error("Unable to create user "+error);
        }
      }*/
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
       if (url.startsWith("/")) return`${baseUrl}${url}`; return baseUrl },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.role) {
          token.role = user.role.name;
        }
        token.id = user.id;
        token.name = user.firstName +" "+ user.lastName;
        token.email = user.email;
      }
      if (trigger === "update") {
        token.email = session.email;
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }

      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    }
  },
  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enables debug messages in the console
  debug: false,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
