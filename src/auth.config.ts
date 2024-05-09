import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import bcryptjs from 'bcryptjs';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod'  /**Validator schema */
import { prisma } from './lib/prisma';

// const privateRoutes = [
//   '/admin',
//   '/checkout',
//   '/checkout/address',
//   '/profile',
//   '/orders',
//   '/orders/[id]',
// ];

// function isOnPrivateRoute(pathname: string) {
//   return privateRoutes.some((route) => {
//     const routeRegex = new RegExp(
//       '^' + route.replace(/\[.*?\]/g, '[^/]+') + '$',
//     );
//     return routeRegex.test(pathname);
//   });
// }
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/sign-up'
  },
  callbacks:{
    // authorized({ auth, request: { nextUrl } }) {
    //   // const pathname = nextUrl.pathname;
    //   // const isLoggedIn = !!auth?.user;
    //   // if (isOnPrivateRoute(pathname)) {
    //   //   if (isLoggedIn) return true;
    //   //   return false;
    //   // }
    //   return true;
    // },
    jwt({token, user}){
      if(user){
        token.data = user
      }
      return token
    },
    session({session, token, user}){
      session.user = token.data as any
      return session
    }
  },
  providers: [

    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if(parsedCredentials.success){
            const {email, password} = parsedCredentials.data

            const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}})
            if (!user) return null

            if(!bcryptjs.compareSync(password, user.password)) return null

            // regresa el usuario sin el password
            const { password: _, ...rest } = user
          
            return rest
          }

          return null;
      },
    }),

  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)