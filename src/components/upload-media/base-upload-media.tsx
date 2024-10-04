'use client';

import { cn } from '@/lib/utils';
import { CloudUpload } from 'lucide-react';
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';
import { FILE_FORMATS, MAX_FILE_SIZE, MAX_FILE_SIZE_IN_MB } from './file-properties';
// import { MediaPreview } from './media-preview';

export function UploadMedia() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  // const updateFile = useMediaPreview((state) => state.updateFile);

  function updateFiles(inputFiles: FileList | null) {
    if (!inputFiles) {
      // TODO: Handle case for no file selected
      return;
    }

    // Check for correct file formats
    if (!FILE_FORMATS.includes(inputFiles[0].type.split('/')[1].toLowerCase())) {
      // TODO: Handle case for incorrect file format
      return;
    }

    // Verify file size
    if (inputFiles[0].size > MAX_FILE_SIZE) {
      // TODO: Handle case for file size too large
      return;
    }

    console.log('inputFiles', inputFiles);

    setLoading(true);

    const blobUrl = URL.createObjectURL(inputFiles[0]);

    // updateBlob({ preview: true, url: blobUrl });

    // updateFile(inputFiles[0]);
    setLoading(false);
  }

  function dragPreventDefault(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent<HTMLFormElement>) {
    dragPreventDefault(e);

    updateFiles(e.dataTransfer.files);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputFiles = e.target.files;
    updateFiles(inputFiles);
  }

  return (
    <form
      className='p-6 max-w-7xl mx-auto'
      onDragEnter={dragPreventDefault}
      onDragLeave={dragPreventDefault}
      onDragOver={dragPreventDefault}
      onDrop={handleDrop}
    >
      <button
        type='button'
        className={cn(
          'hover:cursor-pointer w-full mx-auto border-2 border-dashed border-muted-foreground/30 flex items-center justify-center gap-4 flex-col bg-neutral-100 dark:bg-neutral-900 h-96',
        )}
        onClick={() => inputRef.current?.click()}
        disabled={loading}
      >
        <div className='bg-neutral-200/40 dark:bg-muted/60 rounded-full p-4'>
          <CloudUpload size={32} className='text-muted-foreground' />
        </div>
        <p className='text-muted-foreground font-medium'>Drag or upload your media here</p>
        <p className='text-muted-foreground font-normal text-sm px-3'>
          Up to {MAX_FILE_SIZE_IN_MB}MB in size. {FILE_FORMATS.join(', ')}
        </p>
      </button>
      <input
        ref={inputRef}
        className='hidden'
        type='file'
        accept={FILE_FORMATS.map((format) => `.${format}`).join(',')}
        multiple={false}
        onChange={handleChange}
      />
    </form>
  );
}
