"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    User,
    Building,
    Phone,
    Calendar,
    Banknote,
    Home,
    XCircle,
    CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Teacher, UsersTemp } from "@prisma/client";
import { statusEnum } from "@/types/common";

// This component is now part of this file to resolve the import error.
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg"
                    >
                        {/* The content is passed here */}
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


interface Props {
    isOpen: boolean;
    onClose: () => void;
    teacher: UsersTemp | null;
    onVerify: (teacher: UsersTemp, status: statusEnum) => void;
    onSendBack: (teacher: UsersTemp, status: statusEnum) => void;
}

// A helper component for displaying details with an icon
const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
    <div className="flex items-start text-sm">
        <div className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500">{icon}</div>
        <div className="ml-3">
            <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
            <p className="text-gray-600 dark:text-gray-400">{value}</p>
        </div>
    </div>
);

export const TeacherDetailsModal: React.FC<Props> = ({
    isOpen,
    onClose,
    teacher,
    onVerify,
    onSendBack,
}) => {
    if (!teacher) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                {/* Header with Icon and Title */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Teacher Details</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <XCircle className="w-6 h-6 text-gray-400" />
                    </Button>
                </div>

                {/* Body */}
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <DetailItem icon={<User />} label="Name" value={teacher.fullName} />
                        <DetailItem icon={<Building />} label="Institute" value={teacher.collegeName!} />
                        <DetailItem icon={<Phone />} label="Mobile" value={teacher.contactNumber!} />
                        <DetailItem icon={<Calendar />} label="Age" value={teacher.id} />
                        <DetailItem icon={<Banknote />} label="Bank Details" value={teacher.role!} />
                        <DetailItem icon={<Home />} label="Address" value={teacher.email!} />
                    </div>
                </div>

                {/* Footer with action buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 text-red-600 border-red-500 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                        onClick={() => onSendBack(teacher, statusEnum.REJECTED)}
                    >
                        <XCircle className="w-5 h-5" />
                        Send Back
                    </Button>
                    <Button
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => onVerify(teacher, statusEnum.APPROVED)}
                    >
                        <CheckCircle className="w-5 h-5" />
                        Verify
                    </Button>
                </div>
            </div>
        </Modal>
    );
};