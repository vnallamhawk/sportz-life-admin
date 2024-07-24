import type { DefaultSession } from 'next-auth';


export type TokenType={
    id:number
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    token:TokenType
  }
}