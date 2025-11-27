"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Illustration */}
                    <div className="order-2 md:order-1">
                        <div
                            className={`transition-all duration-1000 ${
                                mounted
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                            }`}
                        >
                            <div className="relative">
                                {/* Lock Illustration */}
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700 shadow-2xl">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-red-500/5 rounded-full blur-xl"></div>
                                        <ShieldX className="w-48 h-48 text-red-500 mx-auto relative animate-bounce" />
                                    </div>
                                </div>
                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full animate-ping"></div>
                                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div
                        className={`order-1 md:order-2 transition-all duration-1000 delay-300 ${
                            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                        }`}
                    >
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                                <span className="text-red-500 font-semibold text-sm">
                                    Error 403
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                                Access
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                    Forbidden
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-gray-400 text-lg leading-relaxed">
                                You don't have permission to view this page. This might be
                                because you're not logged in with the correct credentials or
                                trying to access a restricted area!.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    href="/"
                                    className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                                >
                                    <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    Go Home
                                </Link>

                                <button
                                    onClick={() => router.back()}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200 border border-gray-700"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Go Back
                                </button>
                            </div>

                            {/* Help Text */}
                            <div className="pt-4 border-t border-gray-800">
                                <p className="text-gray-500 text-sm">
                                    If you believe this is an error, please{" "}
                                    <a
                                        href="mailto:support@yourdomain.com"
                                        className="text-orange-500 hover:text-orange-400 underline"
                                    >
                                        contact support
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}