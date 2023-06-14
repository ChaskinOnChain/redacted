import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/utils/connectDb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

const authOptions: NextAuthOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDb();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isCorrect) {
              return user;
            } else {
              throw new Error("Wrong credentials");
            }
          } else {
            throw new Error("User Not Found!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        await connectDb();

        // The profile object contains the user's information
        const { email, name, image } = profile;

        let dbUser = await User.findOne({ email });
        const firstName = name.split(" ")[0];
        const lastName = name.split(" ").slice(-1)[0];
        if (!dbUser) {
          dbUser = new User({ email, firstName, lastName, picturePath: image });
          await dbUser.save();
        }

        // You can choose to return a boolean or an object
        // Returning an object will merge the returned object with the current user object
        return dbUser;
      }

      // If the callback returns false or nothing, the sign in will be denied
      return true;
    },
  },
});

export { authOptions as GET, authOptions as POST };
