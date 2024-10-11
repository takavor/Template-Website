import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error("No credentials provided.");
          }
          const { email, password } = credentials;

          // check if email and password exist
          if (!email || !password) {
            throw new Error("Email and password are both required.");
          }

          // get user
          const user = await prisma.user.findUnique({
            where: { email },
          });

          // exit if doesn't exist
          if (!user) {
            throw new Error("User with this email does not exist.");
          }

          // check if pw valid
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            throw new Error("Password is incorrect.");
          }

          // return user
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Invalid email or password.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
