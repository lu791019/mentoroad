import { type NextPage } from "next";
import Head from "next/head";
import { AuthShowcase } from "~/components/AuthShowcase";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout>
      <Head>
        <title>Topmate Clone</title>
        <meta name="description" content="A Topmate-like application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Topmate <span className="text-[hsl(280,100%,70%)]">Clone</span> App
          </h1>
          <AuthShowcase />
        </div>
      </main>
    </Layout>
  );
};

export default Home;