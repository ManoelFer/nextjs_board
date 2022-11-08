import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import crudDonors from "services/donorsFirebase/crudDonors"

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
            const { getDonor } = crudDonors()

            try {
                const donor = await getDonor(String(token.sub))

                if (donor == null) return { ...session, id: token.sub, vip: false, lasDonate: null }

                const { lastDonate, lastDonateFormatted } = donor

                return { ...session, id: token.sub, vip: lastDonate ? true : false, lastDonate: lastDonateFormatted }
            } catch (error) {
                return { ...session, id: null, vip: false, lasDonate: null }
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