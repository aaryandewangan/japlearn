import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import type { DefaultSession, Session, User } from 'next-auth';
import type { DefaultJWT, JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Extend the built-in types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      is_admin: boolean;
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    is_admin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    is_admin: boolean;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          const { rows } = await sql`
            SELECT * FROM users WHERE email=${credentials.email}
          `;

          const user = rows[0];

          if (!user || !user.password) {
            throw new Error('No user found');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            is_admin: user.is_admin
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (trigger === "update" && session?.user?.is_admin !== undefined) {
        token.is_admin = session.user.is_admin;
      }
      if (user) {
        token.id = user.id;
        token.is_admin = user.is_admin;
      }
      return token as JWT;
    },
    async session({ session, token }): Promise<Session> {
      if (session?.user) {
        session.user.id = token.id;
        session.user.is_admin = token.is_admin;
      }
      return session;
    }
  },
  session: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24 * 7, // 7 days
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };