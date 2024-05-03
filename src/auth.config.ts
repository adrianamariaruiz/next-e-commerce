import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import bcryptjs from 'bcryptjs';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod'  /**Validator schema */
import { prisma } from './lib/prisma';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/sign-up'
  },
  providers: [

    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          console.log('credentials: ', parsedCredentials.success)

          if(parsedCredentials.success){
            const {email, password} = parsedCredentials.data
            console.log({email, password})

            const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}})
            if (!user) return null

            if(!bcryptjs.compareSync(password, user.password)) return null

            // regresa el usuario sin el password
            const { password: _, ...rest } = user
            console.log('resto del usuario: ', rest)
            return rest
          }

          return null;
      },
    }),

  ]
};

export const { signIn, signOut, auth } = NextAuth(authConfig)