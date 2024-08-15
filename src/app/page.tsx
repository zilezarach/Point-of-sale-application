import Image from "next/image";

import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/SignIn"), {
  loading: () => <p className="text-rose-600">Loading...Please Wait</p>,
  ssr: false,
});

export default function Home() {
  return <SignInForm />;
}
