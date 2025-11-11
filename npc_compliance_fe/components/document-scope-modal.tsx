"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface DocumentScopeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectScope: (scope: "single" | "multiple") => void
  fileName: string
}

export default function DocumentScopeModal({ isOpen, onClose, onSelectScope, fileName }: DocumentScopeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Illustration */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-24 h-24 text-primary" fill="currentColor">
                {/* Books illustration */}
                <rect x="30" y="60" width="40" height="80" fill="currentColor" opacity="0.8" rx="2" />
                <rect x="80" y="50" width="40" height="90" fill="currentColor" opacity="0.6" rx="2" />
                <rect x="130" y="70" width="40" height="70" fill="currentColor" opacity="0.4" rx="2" />
                {/* Upload arrow */}
                <path
                  d="M100 30 L100 80 M85 65 L100 50 L115 65"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-center space-y-2">
            <p className="text-gray-900 font-semibold">Do you want to upload this file only for this</p>
            <p className="text-gray-900 font-semibold">question, or will it be used for multiple</p>
            <p className="text-gray-900 font-semibold">questions?</p>
          </div>

          {/* File Name Display */}
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">
              File: <span className="font-medium text-gray-900">{fileName}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={() => onSelectScope("single")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              Yes, Upload for this Question Only
            </Button>
            <Button
              onClick={() => onSelectScope("multiple")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 w-full"
            >
              No, Link to Multiple Questions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
