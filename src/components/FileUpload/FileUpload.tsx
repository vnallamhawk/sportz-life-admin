import classNames from "classnames";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({
  onDropCallback,
}: {
  onDropCallback: (acceptedFiles: Array<File>) => void;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
  });

  const className = classNames("wfp--dropzone__input text-red-700", {
    "wfp--dropzone__input--drag-active": isDragActive,
  });

  return (
    <div {...getRootProps({ isDragActive, className: className })}>
      <input {...getInputProps()} />
      <a className="text-red-800">Drop files or click here to upload</a>
    </div>
  );
}
