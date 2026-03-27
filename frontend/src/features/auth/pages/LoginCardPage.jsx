import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LoginCard } from "../components/LoginCard";

export function LoginCardPage() {
  return (
    <div className="flex h-screen w-screen  ">
      {/* Left — Image */}
      {/* <div className="hidden md:block"> */}
      <div className=" bg-green-300 hidden md:block flex items-center justify-center  w-[30%]  m-auto">
        <img
          src="/login.png"
          alt="Login illustration"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      {/* </div> */}

      {/* Right — Login Form */}
      <div className="flex w-full xl:w-[65%] md:w-[70%] h-full items-center justify-center bg-background px-2">
        <LoginCard />
      </div>
    </div>
  );
}
