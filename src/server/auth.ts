import type { AuthOptions, User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id.toString(), // Convert id to string
            email: user.email,
            academyId: user.academyId.toString(), // Convert academyId to string
          } as User; // Cast to User type
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.academyId = user.academyId;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.academyId = token.academyId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/Login",
  },
};

export default NextAuth(authOptions);
