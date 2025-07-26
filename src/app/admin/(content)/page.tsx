import { Clock, Eye } from "lucide-react";
import SummaryCard from "../../../components/admin/SummaryCard";
import SummaryList from "../../../components/admin/SummaryList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const AdminPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard status={""} title={"Total Posts"} />
        <SummaryCard status={"published"} title={"Published"} />
        <SummaryCard status={"draft"} title={"Draft"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryList />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
