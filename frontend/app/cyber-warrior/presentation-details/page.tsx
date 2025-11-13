"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PresentationPage() {
  const form = useForm({
    defaultValues: {
      groupMembers: "",
      mentorFaculty: "",
      schoolName: "",
      city: "",
      taluka: "",
      district: "",
      principalName: "",
      schoolContactNo: "",
      medium: "",
      presentationDate: "",
      timeFrom: "",
      timeTo: "",
      std5Boys: "",
      std5Girls: "",
    },
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Section */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Presentation Details
        </h1>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <Form {...form}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group Members */}
              <FormField
                control={form.control}
                name="groupMembers"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Group Members"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mentor / Faculty */}
              <FormField
                control={form.control}
                name="mentorFaculty"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Mentor / Faculty"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* School Name */}
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="School Name"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Taluka */}
              <FormField
                control={form.control}
                name="taluka"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Taluka"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                        placeholder="District"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Principal Name */}
              <FormField
                control={form.control}
                name="principalName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Principal Name"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* School Contact */}
              <FormField
                control={form.control}
                name="schoolContactNo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="School Contact Number"
                        type="tel"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Medium */}
              <FormField
                control={form.control}
                name="medium"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                          <SelectValue placeholder="Select Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="marathi">Marathi</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="presentationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time From */}
              <FormField
                control={form.control}
                name="timeFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time To */}
              <FormField
                control={form.control}
                name="timeTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* STD 5 Boys */}
              <FormField
                control={form.control}
                name="std5Boys"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="STD 5 Boys Count"
                        type="number"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* STD 5 Girls */}
              <FormField
                control={form.control}
                name="std5Girls"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="STD 5 Girls Count"
                        type="number"
                        {...field}
                        className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button (UI only) */}
              <div className="md:col-span-2 mt-4">
                <Button
                  type="button"
                  className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
                >
                  Save Presentation
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}