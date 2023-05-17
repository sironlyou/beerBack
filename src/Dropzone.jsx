import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Вот сюда</p>
      ) : (
        <p>перетяните изображение или нажмите</p>
      )}
    </div>
  );
}
