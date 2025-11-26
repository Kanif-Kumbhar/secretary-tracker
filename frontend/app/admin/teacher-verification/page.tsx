"use client";

import React, { useState } from "react";
import Header from "@/components/admin/dashboard/Header";
import TeacherCard from "@/components/admin/teacher-verification/TeacherCard";
import { TeacherDetailsModal } from "@/components/admin/teacher-verification/TeacherDetailModal";
import useSWR from "swr";
import axios from "axios";
import { UsersTemp } from "@prisma/client";
import toast from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';
import queryClient from "@/lib/tanstack-query";
import socket from "@/lib/socket-io";
import { decryptSocketData } from "@/hooks/cryptr";
import { statusEnum } from "@/types/common";


async function fetchUnverifiedTeachers() {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/unverified-teachers`);
	return response.data;
}

export default function ReportVerification() {
	const [modalOpen, setModalOpen] = useState(false);

	const [selectedTeacher, setSelectedTeacher] = useState<UsersTemp | null>(null);


	const { data, error, isLoading } = useQuery({
		queryKey: ['unverified-teachers'], // unique cache key
		queryFn: fetchUnverifiedTeachers
	});


	React.useEffect(() => {
		socket.connect();
		socket.on('new-teacher', async function (newTeacher) {
			const data = await decryptSocketData(newTeacher)
			queryClient.setQueryData(['unverified-teachers'], function (prevTeacher: UsersTemp[]) {
				return prevTeacher.length > 0 ? [...prevTeacher, data] : [data]
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
					No Unverified Teachers
				</h1>
			</div>
		)




	const handleCardClick = (teacher: UsersTemp) => {
		setSelectedTeacher(teacher);
		setModalOpen(true);
	};

	const handleStatus = async (teacher: UsersTemp, status: statusEnum) => {
		const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/verify-teacher/${teacher.id}`, {
			adminAction: status
		});
		toast.success(response.data);
		setModalOpen(false);
		queryClient.setQueryData(['unverified-teachers'], function (prevTeachers: UsersTemp[]) {
			return prevTeachers.filter((prevTeacher) => prevTeacher.id !== teacher.id)
		})

	};



	return (
		<div className="min-h-screen p-6 bg-gray-900 text-gray-200">
			<Header title="Report Verification" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
				{data.map((teacher: UsersTemp) => (
					<TeacherCard
						key={teacher.id}
						name={teacher.fullName!}
						profileImage={"/public/placeholder-user.jpg"}
						institute={"gcek"}
						onClick={() => handleCardClick(teacher)}
					/>
				))}
			</div>

			<TeacherDetailsModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				teacher={selectedTeacher}
				onVerify={handleStatus}
				onSendBack={handleStatus}
			/>
		</div>
	);
}