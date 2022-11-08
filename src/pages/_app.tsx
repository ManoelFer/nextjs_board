import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Header } from 'components/Header'

import 'styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';


const optionsPayPalProvider = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  currency: "BRL",
  intent: "capture",
}

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
      <PayPalScriptProvider options={optionsPayPalProvider}>
        <Header />
        <ToastContainer />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
