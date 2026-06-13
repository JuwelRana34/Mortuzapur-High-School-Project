"use client";

import { Button } from "@/components/ui/button";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "valibot";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginSchema = object({
    email: string(),
    password: string(),
  });

  type LoginForm = { email: string; password: string };

  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: valibotResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    try {
      // Placeholder: connect to auth client in later step
      console.log("login submit:", values);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogle = async () => {
    setLoading(true);
    try {
      // Placeholder: implement OAuth flow with auth client later
      console.log("google login requested");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-indigo-600 to-purple-600 text-white items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">পুনরায় স্বাগতম</h2>
          <p className="opacity-90 text-lg leading-relaxed">
            আপনার ড্যাশবোর্ড এবং স্কুলের কার্যক্রমে প্রবেশ করতে সাইন-ইন করুন।
          </p>
          <div className="mt-8">
            <Image
              src="/next.svg" // এখানে আপনার স্কুলের ছবি বা লোগো ব্যবহার করতে পারেন
              alt="School Login Illustration"
              width={300}
              height={80}
              className="opacity-90 drop-shadow-md"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">
            আপনার অ্যাকাউন্টে সাইন-ইন করুন
          </h1>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-2 border rounded-md mb-4 hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-18.8-1.5-37-4.3-54.6H272v103.3h147.2c-6.3 34-25.2 62.9-53.9 82v68.1h87.1c51-47 81.1-116.1 81.1-198.8z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.8 0 135.8-24.6 181.1-66.7l-87.1-68.1c-24.2 16.2-55.3 25.8-94 25.8-71.9 0-132.9-48.6-154.7-114.1H28.1v71.6C73.5 481 166 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M117.3 324.4c-8.6-25.8-8.6-53.6 0-79.4V173.4H28.1c-33.9 65.5-33.9 143.9 0 209.4l89.2-58.4z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c39.9 0 75.8 13.7 104.1 40.6l78-78C407.9 24.9 345.9 0 272 0 166 0 73.5 63.3 28.1 173.4l89.2 71.6C139.1 156.2 200.1 107.7 272 107.7z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium">গুগল দিয়ে সাইন-ইন করুন</span>
          </button>

          <div className="flex items-center my-4">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-sm text-gray-400">
              অথবা ইমেইল দিয়ে চালিয়ে যান
            </span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">ইমেইল</span>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {String(formState.errors.email.message)}
                </p>
              )}
            </label>

            <label className="block relative">
              <span className="text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </span>
              <input
                {...register("password")}
                type={show ? "text" : "password"}
                className="mt-1 block w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formState.errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {String(formState.errors.password.message)}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-9 p-1 text-gray-500"
                aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            <Button
              type="submit"
              className="w-full py-2 rounded-md hover:bg-linear-to-tl hover:from-blue-500 hover:to-blue-700 text-white hover:transition-all"
            >
              {loading ? "সাইন-ইন হচ্ছে..." : "সাইন-ইন করুন"}
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            অ্যাকাউন্ট নেই?{" "}
            <a href="/register" className="text-blue-600 underline">
              সাইন-আপ করুন
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
