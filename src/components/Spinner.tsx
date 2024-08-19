import { motion } from "framer-motion";
import logo from "../../public/logo2.png";
import Image from "next/image";

const Spinner = () => {
  return (
    <div className="flex flex-col fixed inset-0 bg-opacity-75 z-50 items-center justify-center h-screen bg-white">
      <div className="animate-bounce mb-4">
        <Image src="/logo2.png" alt="Loading .." width={100} height={100} />
      </div>
      <p className="text-rose-600 text-lg"> Loading Sit Tight....</p>
    </div>
  );
};
export default Spinner;
