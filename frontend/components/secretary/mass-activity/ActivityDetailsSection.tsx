"use client";

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ActivityDetailsSectionProps {
    control: any;
}

export default function ActivityDetailsSection({
    control,
}: ActivityDetailsSectionProps) {
    return (
        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
            <legend className="text-lg font-semibold text-orange-400 px-3">
                Activity Details *
            </legend>
            <div className="grid grid-cols-1 gap-6 mt-4">
                <FormField
                    control={control}
                    name="activityName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">Activity Name *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g., Nukkad Natak, Cyber Safe Warri"
                                    {...field}
                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="activityDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">
                                Activity Description *
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the activity, its purpose, and key highlights..."
                                    rows={4}
                                    {...field}
                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </fieldset>
    );
}