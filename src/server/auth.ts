import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    Providers({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.admin.findUnique({
          where: { email: credentials?.email },
        });
        if (
          user &&
          bcrypt.compareSync(credentials?.password || "", user.password)
        ) {
          return {
            id: user.id,
            email: user.email,
            academyId: user.academyId,
          };
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
    jwt(token) {
      const obj = { ...token?.token };
      if (!obj.id && token?.user?.id) {
        obj.id = token?.user?.id;
        obj.academyId = token?.user?.academyId;
      }
      return obj;
    },
    session(
      session: { user: { id: number } },
      token: {
        academyId: number;
        id: number;
      }
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      session.user = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: token?.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        academyId: token?.academyId,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
