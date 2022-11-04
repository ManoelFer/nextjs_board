import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            authorization: {
                params: {
                    scope: 'read:user'
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            try {
                return { ...session, id: token.sub }
            } catch (error) {
                return { ...session, id: null }
            }
        },
        async signIn({ }) {
            try {
                return true
            } catch (error) {
                console.log('Erro na autenticação :>> ', error);
                return false
            }
        }
    }
} as NextAuthOptions

export default NextAuth(authOptions)