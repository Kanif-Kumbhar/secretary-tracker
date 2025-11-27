"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoleCombobox } from "@/components/ui/RoleCombobox";
import { registerSchema } from "@/types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import {
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchColleges } from "@/hooks/college";

type registerFormType = z.infer<typeof registerSchema>;
type College = {
  institution_id: string;
  name: string;
};

export default function RegisterForm() {
  const { data, isFetched, isError } = useQuery<College[]>({
    queryKey: ["colleges"],
    queryFn: async () => {
      return await fetchColleges();
    },
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error loading page.
      </div>
    );
  }
  const [isPending, startTransition] = useTransition();
  const registerForm = useForm<registerFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: undefined,
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      college: "",
    },
  });
  const selectedRole = registerForm.watch("role");
  async function handleRegister(formData: registerFormType) {
    startTransition(async () => {
      try {
        const validatedFields = registerSchema.safeParse(formData);
        if (!validatedFields.success) return;

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
          validatedFields.data
        );
        toast.success(response.data);
        registerForm.reset();
      } catch (error: any) {
        toast.error(error?.response?.data ?? "Error Occurred");
      }
    });
  }
  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Create Account
      </h2>
      <Form {...registerForm}>
        <form
          className="space-y-6"
          onSubmit={registerForm.handleSubmit(handleRegister)}
        >
          <FormField
            control={registerForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RoleCombobox
                    disabledStatus={isPending}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    {...field}
                    disabled={isPending}
                    className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    disabled={isPending}
                    {...field}
                    className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Password"
                    disabled={isPending}
                    className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Contact No."
                    disabled={isPending}
                    className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedRole === "teacher" ? (
            <FormField
              control={registerForm.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="College"
                      disabled={isPending}
                      {...field}
                      className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            // SECRETARY → SELECT (shadcn)
            <FormField
              control={registerForm.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full bg-white text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <SelectValue placeholder="Select College" />
                      </SelectTrigger>

                      <SelectContent>
                        {data?.map((college: College, index: number) => (
                          <SelectItem
                            key={index}
                            value={college.institution_id}
                          >
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
