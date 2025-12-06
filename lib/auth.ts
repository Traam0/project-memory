import crypto from "crypto";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
    async signIn({ user, account }) {
      if (!account || account.type !== "oauth") return true;

      let existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        // If no user exists, create one
        existingUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email!,
            image: user.image,
          },
        });
      }
      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        create: {
          userId: existingUser.id,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type, // now works

          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
        },
        update: {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
        },
      });

      return true; // create a new user normally
    },
  },

  pages: {
    signIn: "/login",
  },
  useSecureCookies: true,
  debug: process.env.NODE_ENV === "development",
});
