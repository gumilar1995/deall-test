import Head from "next/head";
import Sidebar from "./Sidebar";
import utilityStyle from "@/styles/Utility.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Deall Frontend Test</title>
        <meta name="description" content="deall frontend test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={utilityStyle.main}>
        <Sidebar />
        {children}
      </main>
    </>
  );
}
