"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { LoginSchema } from "@repo/zodschema";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Signin = () => {
  const route = useRouter();
  const form = useForm({
    defaultValues: {
      number: "",
      password: "",
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/signin`,
          {
            number: value.number,
            password: value.password,
          },
          {
            withCredentials: true,
          },
        );
        alert("Signin succesfully");
        route.push("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.error || "Something went wrong");
        } else {
          alert("Something went wrong");
        }
      }
    },
  });
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500">
      <div className="w-fit max-w-md rounded-2xl border px-4 py-8  xl:px-32 xl:py-20 border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl flex flex-col items-center">
        <div className="text-center mb-8 w-full">
          <h1 className="text-2xl xl:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign in
          </h1>
          <p className="text-sm xl:text-lg text-slate-600 dark:text-slate-400 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form
          className="w-full flex flex-col  gap-5 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="w-full">
            <form.Field
              name="number"
              children={(field) => {
                return (
                  <Input
                    id={field.name}
                    label="Phone Number"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Enter your number"
                    type="text"
                    value={field.state.value}
                  />
                );
              }}
            />
          </div>

          <div className="w-full">
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <Input
                    id={field.name}
                    label="Password"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Enter your password"
                    type="password"
                    value={field.state.value}
                  />
                );
              }}
            />
          </div>

          <div className=" pt-2">
            <Button children="Sign In" size="lg" type="submit" />
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2 w-full">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"}>
              <span className="font-medium text-slate-900 dark:text-white cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
