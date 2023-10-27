import AuthLayout from "@/components/ehasp/auth/AuthLayout";
import LoginForm from "@/components/ehasp/auth/modals/LoginForm";
export default function Login() {
  return (
    <AuthLayout backgroundImage="/images/yantra1.webp">
      <LoginForm route="/" />
    </AuthLayout>
  );
}
