import type { DefaultSession } from 'next-auth';
import NextAuth from "next-auth";


export type TokenType={
    id:number
    academyId:number
}

declare module "next-auth" {
  interface User {
    id: string;
    academyId: string;
  }

  interface Session extends DefaultSession {
    user: User;
    token:TokenType

  }

  interface JWT {
    id: string;
    academyId: string;
  }
}
