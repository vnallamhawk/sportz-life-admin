import { type Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "./Layout";
import Login from "./Login";
import { usePathname } from "next/navigation";
import ThemeContextProvider from "~/contexts/useThemeContext";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const AnyComponent = Component as any;
  const pathname = usePathname();
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        {pathname !== "/" ? (
          <Layout>
            <AnyComponent {...pageProps} />
          </Layout>
        ) : (
          <Login />
        )}
      </ThemeContextProvider>
    </SessionProvider>
  );
};
MyApp.getInitialProps = async (context) => {
  const { ctx } = context;
  const session = await getSession(ctx);

  return {
    session,
  };
};
export default api.withTRPC(MyApp);
