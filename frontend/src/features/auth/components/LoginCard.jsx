import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
// import { GoogleIcon } from "../components/Icons"
// import { GithubIcon } from "../components/Icons"

export function LoginCard() {
  const navigate = useNavigate();
  const [emailorusername, setEmailorusername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();

  async function handleLoginUser(e) {
    e.preventDefault();
    await handleLogin(emailorusername, password);
    navigate("/home");
  }
  return (
    <Card className="w-full max-w-xl border-none shadow-none flex flex-col  ">
      <CardHeader className="pb-6 pt-10">
        <CardTitle className="text-xl font-bold sm:text-2xl">
          Login to your account
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button onClick={() => navigate("/auth/register")} variant="link">
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleLoginUser}
          className="flex flex-col gap-6  py-5 px-2"
        >
          <div className="grid gap-2 mb-5">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              className="bg-gray-100 py-4 px-3"
              value={emailorusername}
              onChange={(e) => setEmailorusername(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com, john_deo"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              className="bg-gray-100 py-4 px-3"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 px-5  py-5">
        <Button
          onClick={handleLoginUser}
          disabled={emailorusername === "" || password === ""}
          type="submit"
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Spinner /> <p>Login</p>
            </div>
          ) : (
            "Login"
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs uppercase tracking-widest">
            or continue with
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-3 w-full py-5">
          <Button type="button" variant="outline" className="w-full gap-2">
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Button>
          <Button type="button" variant="outline" className="w-full gap-2">
            {/* Google Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

//  <Card className="w-full xl:max-w-xl lg:max-w-xl md:max-w-xl sm:w-full border-none shadow-none">
//     <CardHeader className="pb-6 pt-10">
//       <CardTitle className="text-3xl font-bold">Login</CardTitle>
//       <CardDescription className="text-base">
//         Enter your email below to login to your account
//       </CardDescription>
//     </CardHeader>
//     <form onSubmit={handleLoginUser}>
//       <CardContent>
//         <div className="flex flex-col gap-6">
//           {/* Social Buttons */}
//           <div className="grid grid-cols-2 gap-3">
//             <Button type="button" variant="outline" className="w-full gap-2">
//               {/* GitHub Icon */}
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
//                 <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
//               </svg>
//               GitHub
//             </Button>
//             <Button type="button" variant="outline" className="w-full gap-2">
//             {/* Google Icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
//               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//             </svg>
//             Google
//           </Button>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center gap-3">
//           <Separator className="flex-1" />
//           <span className="text-muted-foreground text-xs uppercase tracking-widest">or continue with</span>
//           <Separator className="flex-1" />
//         </div>

//         {/* Email & Password */}

//         <div className="grid gap-2">
//           <Label htmlFor="login-email">Email or Username</Label>
//           <Input
//             value={emailorusername}
//             onChange={(e) => setEmailorusername(e.target.value)}
//             id="login-email"
//             type="email"
//             placeholder="m@example.com , johndoe"
//             required
//           />
//         </div>
//         <div className="grid gap-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="login-password">Password</Label>

//           </div>
//           <Input required value={password} onChange={(e) => setPassword(e.target.value)} id="login-password" type="password"  />
//         </div>
//       </div>
//       </CardContent>
//       <CardFooter className="flex-col gap-4 pb-10">
//         <Button type="submit" className="w-full h-12">
//           { loading ? (
//               <Spinner />
//           ) : (
//               "Login"
//           )

//           }

//       </Button>
//       <p className="text-muted-foreground text-sm text-center">
//         Don't have an account?{" "}
//         <Link to="/auth/register" className="text-foreground underline underline-offset-4 hover:opacity-80">
//           Sign up
//         </Link>
//       </p>
//       </CardFooter>
//     </form>
//   </Card>

// {/* Social Buttons */}
//         <div className="grid grid-cols-2 gap-3">
//           <Button type="button" variant="outline" className="w-full gap-2">
//             {/* GitHub Icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
//               <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
//             </svg>
//             GitHub
//           </Button>
//           <Button type="button" variant="outline" className="w-full gap-2">
//           {/* Google Icon */}
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
//             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//             <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//           </svg>
//           Google
//         </Button>
//       </div>
