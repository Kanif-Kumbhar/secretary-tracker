"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadSectionProps {
  control: any;
  pdfFile: File | null;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePdf: () => void;
}

export default function FileUploadSection({
  control,
  pdfFile,
  handlePdfUpload,
  removePdf,
}: FileUploadSectionProps) {
  return (
    <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
      <legend className="text-lg font-semibold text-orange-400 px-3">
        Upload Document
      </legend>

      <div className="mt-4">
        {/* PDF Upload */}
        <FormField
          control={control}
          name="impactPdf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Impact Form PDF</FormLabel>
              <FormDescription className="text-gray-400 text-sm">
                Upload the completed impact form (PDF only, max 10MB)
              </FormDescription>
              <FormControl>
                <div className="space-y-3">
                  {!pdfFile ? (
                    <label className="flex items-center justify-center w-full h-32 px-4 transition bg-gray-700 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-600 hover:border-orange-500">
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <div className="text-sm text-gray-300">
                          <span className="font-semibold text-orange-500">
                            Click to upload
                          </span>{" "}
                          PDF file
                        </div>
                        <p className="text-xs text-gray-400">PDF up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        onChange={handlePdfUpload}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-700 border border-gray-600 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-red-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-100">
                            {pdfFile.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removePdf}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </fieldset>
  );
}