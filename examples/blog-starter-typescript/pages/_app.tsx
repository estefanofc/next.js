import { AppProps } from 'next/app'
import '../styles/index.css'
import { createContext, useState, useEffect } from 'react'

export const LoggedInContext = createContext({loggedIn: false})

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInCookie = document.cookie?.split('loggedIn=')[1] === 'true' ? true: false
    setLoggedIn(loggedInCookie)
  }, [])

  return (
      <LoggedInContext.Provider value={{loggedIn}}>
        <Component {...pageProps} />
      </LoggedInContext.Provider>
  )
}