import LoginForm from "../../../../components/admin/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

const SigninPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
