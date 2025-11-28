"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle } from "lucide-react";

interface DateSetupModalProps {
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    onStart: () => void;
}

export default function DateSetupModal({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onStart,
}: DateSetupModalProps) {
    const isValid = startDate && endDate && new Date(startDate) < new Date(endDate);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"></div>

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center text-white mb-2">
                        Setup Execution Plan
                    </h2>
                    <p className="text-center text-gray-400 mb-8">
                        Define your planning period to get started
                    </p>

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <Label className="text-gray-300 mb-2 block">
                                Start Date *
                            </Label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-gray-700/50 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-300 mb-2 block">
                                Tentative End Date *
                            </Label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate}
                                className="bg-gray-700/50 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <p className="text-sm text-blue-300 flex items-start">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                The system will calculate weeks available based on your
                                selected dates
                            </p>
                        </div>

                        {/* Button */}
                        <Button
                            onClick={onStart}
                            disabled={!isValid}
                            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Start Planning
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}