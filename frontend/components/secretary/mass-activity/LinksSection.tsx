"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface LinksSectionProps {
    control: any;
    socialMediaLinks: string[];
    addSocialMediaLink: () => void;
    removeSocialMediaLink: (index: number) => void;
    updateSocialMediaLink: (index: number, value: string) => void;
    mediaLinks: string[];
    addMediaLink: () => void;
    removeMediaLink: (index: number) => void;
    updateMediaLink: (index: number, value: string) => void;
}

export default function LinksSection({
    control,
    socialMediaLinks,
    addSocialMediaLink,
    removeSocialMediaLink,
    updateSocialMediaLink,
    mediaLinks,
    addMediaLink,
    removeMediaLink,
    updateMediaLink,
}: LinksSectionProps) {
    return (
        <fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
            <legend className="text-lg font-semibold text-orange-400 px-3">
                Media Links
            </legend>

            <div className="space-y-6 mt-4">
                {/* Social Media Links */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <Label className="text-gray-300 text-base font-medium">
                            Social Media Links
                        </Label>
                        <Button
                            type="button"
                            onClick={addSocialMediaLink}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Link
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {socialMediaLinks.map((link, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    type="url"
                                    placeholder="https://facebook.com/post/..."
                                    value={link}
                                    onChange={(e) =>
                                        updateSocialMediaLink(index, e.target.value)
                                    }
                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {socialMediaLinks.length > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => removeSocialMediaLink(index)}
                                        size="icon"
                                        variant="destructive"
                                        className="flex-shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Print/Online Media Links */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <Label className="text-gray-300 text-base font-medium">
                            Print / Online Media Links
                        </Label>
                        <Button
                            type="button"
                            onClick={addMediaLink}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Link
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {mediaLinks.map((link, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    type="url"
                                    placeholder="https://news.com/article/..."
                                    value={link}
                                    onChange={(e) => updateMediaLink(index, e.target.value)}
                                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500"
                                />
                                {mediaLinks.length > 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => removeMediaLink(index)}
                                        size="icon"
                                        variant="destructive"
                                        className="flex-shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </fieldset>
    );
}