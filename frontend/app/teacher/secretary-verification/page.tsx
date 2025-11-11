"use client";

import React, { useState } from "react";
import Header from "@/components/admin/dashboard/Header";
import type { Secretary } from "@/types/secretary";
import { SecretaryCard } from "@/components/teacher/secretary-verification/SecretaryCard";
import { SecretaryDetailsModal } from "@/components/teacher/secretary-verification/SecretaryDetailModal";
import queryClient from "@/lib/tanstack-query";
import socket from "@/lib/socket-io";
import { decryptSocketData } from "@/hooks/cryptr";
import { useQuery } from "@tanstack/react-query";
// new-secretary socket channel name
// Mock data
const SECRETARIES: Secretary[] = [
    {
        id: "1",
        name: "Rohan Narute",
        profileImage: "/images/secretary.jpg",
        institute: "GCE Karad",
        mobile: "9876543210",
        age: 32,
        bankDetails: "HDFC Bank, A/C 12345678",
        address: "123 Main Street, Pune",
    },
    {
        id: "2",
        name: "Ichigo Kurosaki",
        profileImage: "/images/secretary.jpg",
        institute: "DY Patil",
        mobile: "9123456780",
        age: 29,
        bankDetails: "SBI Bank, A/C 87654321",
        address: "45 MG Road, Mumbai",
    },
];

async function fetchUnverifiedSecretary(){
    
}

export default function SecretaryVerification() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['unverified-teachers'], // unique cache key
        queryFn: fetchUnverifiedSecretary
    });


    React.useEffect(() => {
        socket.connect();
        socket.on('new-teacher', async function (newTeacher) {
            const data = await decryptSocketData(newTeacher)
            queryClient.setQueryData(['unverified-teachers'], function (prevTeacher: any[]) {
                return prevTeacher.length > 0 ? [...prevTeacher, data] : [data]
            })
        })
        return () => {
            socket.off('new-teacher');
        }
    }, [queryClient])

    const [selectedSecretary, setSelectedSecretary] = useState<Secretary | null>(
        null
    );
    const [modalOpen, setModalOpen] = useState(false);

    const handleCardClick = (secretary: Secretary) => {
        setSelectedSecretary(secretary);
        setModalOpen(true);
    };

    const handleVerify = (secretary: Secretary) => {
        console.log("Verified", secretary);
        setModalOpen(false);
    };

    const handleSendBack = (secretary: Secretary) => {
        console.log("Send Back", secretary);
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-900 text-gray-200">
            <Header title="Secretary Verification" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {SECRETARIES.map((secretary) => (
                    <SecretaryCard
                        key={secretary.id}
                        name={secretary.name}
                        profileImage={secretary.profileImage}
                        institute={secretary.institute}
                        onClick={() => handleCardClick(secretary)}
                    />
                ))}
            </div>

            <SecretaryDetailsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                secretary={selectedSecretary}
                onVerify={handleVerify}
                onSendBack={handleSendBack}
            />
        </div>
    );
}