import {type Session} from 'next-auth'
import {SessionProvider, getSession} from 'next-auth/react'
import {type AppType} from 'next/app'
import {api} from '~/utils/api'
import '~/styles/globals.css'
import Layout from './Layout'
import Login from './Login'
import {usePathname} from 'next/navigation'
import ThemeContextProvider from '~/contexts/useThemeContext'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
})

const MyApp: AppType<{session: Session | null}> = ({
  Component,
  pageProps: {session, ...pageProps},
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const AnyComponent = Component as any
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (!session) {
        void router.push('/Login')
      }
    }

    void checkSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          {pathname !== '/Login' ? (
            <Layout>
              <AnyComponent {...pageProps} />
            </Layout>
          ) : (
            <Login />
          )}
        </ThemeContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
MyApp.getInitialProps = async (context) => {
  const {ctx} = context
  const session = await getSession(ctx)

  return {
    session,
  }
}
export default api.withTRPC(MyApp)
