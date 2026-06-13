"use client";

import { Button } from "@/components/ui/button";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "valibot";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerSchema = object({
    name: string(),
    email: string(),
    password: string(),
    confirm: string(),
  });

  type RegisterForm = {
    name: string;
    email: string;
    password: string;
    confirm: string;
  };

  const { register, handleSubmit, setError, formState } = useForm<RegisterForm>(
    {
      resolver: valibotResolver(registerSchema),
    },
  );

  const onSubmit = async (values: RegisterForm) => {
    setLoading(true);
    try {
      if (values.password !== values.confirm) {
        setError("confirm", {
          type: "manual",
          message: "Passwords do not match",
        });
        setLoading(false);
        return;
      }

      console.log("register submit:", {
        name: values.name,
        email: values.email,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden md:flex w-1/2 bg-linear-to-br from-sky-600 to-indigo-600 text-white items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">Create your account</h2>
          <p className="opacity-90">
            Start building your projects and collaborate with your team.
          </p>
          <div className="mt-8">
            <Image
              src="/next.svg"
              alt="illustration"
              width={300}
              height={80}
              className="opacity-90"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6">Create an account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input
                {...register("name")}
                type="text"
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {formState.errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {String(formState.errors.name.message)}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {String(formState.errors.email.message)}
                </p>
              )}
            </label>

            <label className="block relative">
              <span className="text-sm font-medium text-gray-700">
                Password
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                minLength={6}
                className="mt-1 block w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-9 p-1 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formState.errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {String(formState.errors.password.message)}
                </p>
              )}
            </label>

            <label className="block relative">
              <span className="text-sm font-medium text-gray-700">
                Confirm password
              </span>
              <input
                {...register("confirm")}
                type={showConfirm ? "text" : "password"}
                minLength={6}
                className="mt-1 block w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-2 top-9 p-1 text-gray-500"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {formState.errors.confirm && (
                <p className="text-sm text-red-600 mt-1">
                  {String(formState.errors.confirm.message)}
                </p>
              )}
            </label>

            <Button
              type="submit"
              className="w-full  py-2 rounded-md hover:bg-sky-700"
            >
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
