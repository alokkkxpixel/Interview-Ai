import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {LoginCard} from "../components/LoginCard"


export function LoginCardPage() {



  return (
    <div className="flex h-screen w-screen  ">

      {/* Left — Image */}
      {/* <div className="hidden md:block"> */}
      <div className=" bg-green-300 hidden md:block flex items-center justify-center  w-[30%]  m-auto">
        <img
          src="https://plus.unsplash.com/premium_vector-1726498072933-f6112c1b1396?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
  )
}