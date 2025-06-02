import NextAuth, { Account, Profile } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

interface JWTProps{

  token: JWT;
  account: Account | null;
  profile?: Profile;
}

export const authOptions : AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],

  callbacks:{

    async jwt({token, account, profile}: JWTProps){

      console.group(token, account, profile);
      return token;

    }
  }
}

const handler = NextAuth(authOptions);

export {handler as POST, handler as GET}