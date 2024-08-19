import Image from "next/image";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/SignIn"), {
  loading: () => <Spinner />,
  ssr: false,
});

export default function Home() {
  return <SignInForm />;
}
