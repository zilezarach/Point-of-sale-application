import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/SignIn"), {
  loading: () => <Spinner />,
  ssr: false,
});

export default function Login() {
  return <LoginForm />;
}
