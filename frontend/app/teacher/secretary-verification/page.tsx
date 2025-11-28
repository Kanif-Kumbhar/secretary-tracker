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
import axios from "axios";
import { useSessionContext } from "@/context/session";
import { UsersTemp } from "@prisma/client";
import toast from "react-hot-toast";
import { statusEnum } from "@/types/common";
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

async function fetchUnverifiedSecretary(teacherId: string) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher/unverified-secretary/${teacherId}`);
    return response.data;
}

export default function SecretaryVerification() {

    const [selectedSecretary, setSelectedSecretary] = useState<UsersTemp | null>(
        null
    );
    const [modalOpen, setModalOpen] = useState(false);
    const { session } = useSessionContext();
    const { data, error, isLoading } = useQuery({
        queryKey: ['unverified-secretary'], // unique cache key
        queryFn: async () => {
            return fetchUnverifiedSecretary(session?.user.id!)
        }
    });
    React.useEffect(() => {
        socket.connect();
        socket.on(`new-secretary-${session?.user.id!}`, async function (newSecretary) {
            console.log(newSecretary);
            const data = await decryptSocketData(newSecretary)
            queryClient.setQueryData(['unverified-secretary'], function (prevSecretary: any[]) {
                return prevSecretary.length > 0 ? [...prevSecretary, data] : [data]
            })
        })
        return () => {
            socket.off('new-teacher');
        }
    }, [queryClient])
    if (isLoading)
        return (
            <div className="text-center h-screen  flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Loading...
                </h1>
            </div>
        );

    if (!data || error)
        return (
            <div className="text-center h-screen  flex items-center justify-center">
                <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
                    Error Occurred
                </h1>
            </div>
        )

    if (data.length === 0)
        return (
            <div className="text-center h-screen  flex items-center justify-center">
                <h1 className="text-3xl font-bold text-red-500 flex items-center gap-3">
                    No Unverified Secretary
                </h1>
            </div>
        )


    console.log(data);




    const handleCardClick = (secretary: UsersTemp) => {
        setSelectedSecretary(secretary);
        setModalOpen(true);
    };

    const handleStatus = async (secretaryId: string, status: statusEnum) => {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher/verify-secretary/${secretaryId}`, {
            adminAction: status
        });
        toast.success(response.data);
        queryClient.setQueryData(['unverified-teachers'], function (prevSecretarys: UsersTemp[]) {
            console.log(prevSecretarys);
            return prevSecretarys.filter((prevSecretary) => prevSecretary.id !== secretaryId)
        })
        setModalOpen(false);
    };


    return (
        <div className="min-h-screen p-6 bg-gray-900 text-gray-200">
            <Header title="Secretary Verification" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {data.map((secretary: UsersTemp) => (
                    <SecretaryCard
                        key={secretary.id}
                        name={secretary.fullName}
                        profileImage={"/placeholder-user.jpg"}
                        institute={secretary.collegeName}
                        onClick={() => handleCardClick(secretary)}
                    />
                ))}
            </div>

            <SecretaryDetailsModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                secretary={selectedSecretary}
                onVerify={handleStatus}
                onSendBack={handleStatus}
            />
        </div>
    );
}