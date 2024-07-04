import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "./Layout";
import ThemeContextProvider from "~/contexts/useThemeContext";
import ThemeButton from "~/components/ThemeButton";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const AnyComponent = Component as any;
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <ThemeButton />
        <Layout>
          <AnyComponent {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
