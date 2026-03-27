"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { CreateUserSchema } from "@repo/zodschema";
import { useForm } from "@tanstack/react-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Signup = () => {
  const route = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      number: "",
      password: "",
    },
    validators: {
      onChange: CreateUserSchema,
    },

    onSubmit: async ({ value }) => {
      if (value.name === "") {
        return alert("Enter Name");
      }

      if (value.number === "") {
        return alert("Enter Name");
      }

      if (value.password === "") {
        return alert("Enter Name");
      }

      try {
        await axios.post(`${process.env.NEXT_PUBLIC_HTTP_URL}/register`, {
          name: value.name,
          number: value.number,
          password: value.password,
        });
        alert("Account created succesfully");
        route.push("/signin");
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
    <>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-slate-400 via-white/50 to-slate-500 dark:from-slate-800/90 dark:via-black dark:to-slate-900 transition-colors duration-500">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/70 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create New Account
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Sign up to get started with your account.
            </p>
          </div>

          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="w-full">
              <form.Field
                name="name"
                children={(field) => {
                  return (
                    <Input
                      id={field.name}
                      label="Name"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.handleChange(e.target.value)
                      }
                      placeholder="Enter your name"
                      type="text"
                      value={field.state.value}
                    />
                  );
                }}
              />
            </div>

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

            <div className="w-full flex items-center justify-center pt-1">
              <Button children="Create Account" size="lg" type="submit" />
            </div>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-1">
              Already have an account?{" "}
              <Link href={"signin"}>
                <span className="font-medium text-slate-900 dark:text-white cursor-pointer hover:underline">
                  Sign in
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
