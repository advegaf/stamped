'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Upload, X, File } from 'lucide-react'

interface FileUploadProps {
  onFileChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // max file size in mb
  label?: string
  error?: string
  files?: File[]
  onRemoveFile?: (index: number) => void
  className?: string
}

export function FileUpload({
  onFileChange,
  accept,
  multiple = true,
  maxSize = 10,
  label,
  error,
  files = [],
  onRemoveFile,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []
    handleFiles(selectedFiles)
  }

  // filter out files that are too big
  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const sizeMB = file.size / (1024 * 1024)
      return sizeMB <= maxSize
    })
    
    onFileChange(validFiles)
  }

  // convert bytes to human readable size, copied from stack overflow
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-neutral-100',
          error && 'border-error-500'
        )}
      >
        <Upload className="h-10 w-10 text-neutral-400" />
        <p className="mt-2 text-sm font-medium text-neutral-700">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {accept ? `Accepted formats: ${accept}` : 'All file types accepted'} (Max {maxSize}MB)
        </p>
        
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}

      {/* show uploaded files */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3"
            >
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{file.name}</p>
                  <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {onRemoveFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveFile(index)
                  }}
                  className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

