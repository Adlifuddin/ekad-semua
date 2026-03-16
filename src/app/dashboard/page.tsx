import DashboardContent from "./dashboard-content";
import Layout from "@/components/layout/Layout";

export default async function DashboardPage() {
  return (
    <Layout pages="main">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Wedding Cards</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view all your wedding invitation cards
          </p>
        </div>
        <DashboardContent />
      </div>
    </Layout>
  );
}
