import { LandingPage } from "@/features/landing/landing-page";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout pages="main">
      <LandingPage />
    </Layout>
  );
}
