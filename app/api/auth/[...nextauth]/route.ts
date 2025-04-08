import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await sql`
          SELECT * FROM users 
          WHERE email = ${credentials.email}
        `;

        if (!user.rows.length) {
          throw new Error('No user found');
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.rows[0].password
        );

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].name,
          is_admin: user.rows[0].is_admin,
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: any, user: any, trigger: string, session: any }) {
      if (trigger === "update" && session?.is_admin !== undefined) {
        token.is_admin = session.is_admin;
      }
      if (user) {
        token.id = user.id;
        token.is_admin = user.is_admin;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session?.user) {
        session.user.is_admin = token.is_admin;
        session.user.id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST }; 