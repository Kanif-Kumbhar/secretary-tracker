"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerInstitute } from "@/types/form-schema";
import { z } from "zod";

type registerInstituteForm = z.infer<typeof registerInstitute>;

export default function InstitutionRegisterPage() {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm<registerInstituteForm>({
    resolver: zodResolver(registerInstitute),
    defaultValues: {
      name: "",
      address: "",
      district: "",
      state: "",
      pincode: "",
      email: "",
      contactNumber: "",
      type: "",
    },
  });

  // Handling form submit
  async function handleformSubmit(data: registerInstituteForm) {
    startTransition(async () => {
      console.log("Form Data Submitted: ", data);
      // Here you would typically send data to the API or handle the logic
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Section */}
      <main className="flex-1 px-10 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Register Institution
        </h1>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleformSubmit)}
            >
              {/* Institution Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="text"
                        placeholder="Institution Name"
                        {...field}
                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Address"
                        disabled={isPending}
                        {...field}
                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isPending}
                        placeholder="District"
                        {...field}
                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange} // Fix state selection
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pincode */}
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Pincode"
                        disabled={isPending}
                        {...field}
                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="Institution Email"
                        {...field}
                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Number */}
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Contact Number"
                        disabled={isPending}
                        {...field}
                        className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type (Govt/Private) */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange} // Fix institution type selection
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <SelectValue placeholder="Select Institution Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="aided">Aided</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit" // Fix submit button type
                disabled={isPending}
                className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
              >
                Register Institution
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
