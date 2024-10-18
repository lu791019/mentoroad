import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Layout from "~/components/Layout";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      console.error(result.error);
    } else {
      void router.push("/");
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Sign <span className="text-[hsl(280,100%,70%)]">In</span>
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="rounded-full px-4 py-2 text-black"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="rounded-full px-4 py-2 text-black"
            />
            <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
              Sign In
            </button>
          </form>
          <div className="flex flex-col gap-4">
            <button onClick={() => void signIn("google")} className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
              Sign in with Google
            </button>
            <button onClick={() => void signIn("linkedin")} className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
              Sign in with LinkedIn
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}