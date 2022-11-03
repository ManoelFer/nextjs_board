import type { AppProps } from 'next/app'
import { Header } from 'components/Header'
import { ToastContainer } from 'react-toastify';

import 'styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
