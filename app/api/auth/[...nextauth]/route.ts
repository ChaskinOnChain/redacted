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

        const { email, given_name, family_name, picture } = profile;
        console.log(profile);

        let dbUser = await User.findOne({ email });

        if (!dbUser) {
          dbUser = new User({
            email,
            firstName: given_name,
            lastName: family_name,
            picturePath: picture,
            occupation: "",
            location: "",
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
          });
          await dbUser.save();
        }
        return dbUser;
      }
      return true;
    },
  },
});

export { authOptions as GET, authOptions as POST };
