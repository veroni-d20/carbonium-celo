import Head from "next/head";
import Layout from "@/components/Utilities/Layout";
import Hero from "@/components/Index/Hero";

export default function Index() {
  return (
    <>
      <Head>
        <title>
          Carbonium | Empowering Sustainability Through Blockchain Innovation
          tokens
        </title>
      </Head>

      <Layout>
        <Hero />
      </Layout>
    </>
  );
}
