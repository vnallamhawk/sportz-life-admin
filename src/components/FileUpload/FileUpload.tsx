import classNames from "classnames";
import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({
  onDropCallback,
  multiple = false,
}: {
  onDropCallback: (acceptedFiles: Array<File>) => void;
  multiple?: boolean;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    multiple,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
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
