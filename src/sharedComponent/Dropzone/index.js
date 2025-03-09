import PlusIcon from "@/svgicons/PlusIcon";
import { Formik } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";
import DeleteIcon from "@/svgicons/DeleteIcon";

const Dropzone = ({ setUploadImages, uploadedImages }) => {
  const onDrop = (acceptedFiles) => {
    setUploadImages((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    onDrop,
  });

  return (
    <Formik initialValues={uploadedImages}>
      <form>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <div className={styles.dropzoneInput} {...getRootProps()}>
            <input {...getInputProps()} />
            <PlusIcon />
            <p>Drag n drop or browse</p>
          </div>
          <div className="pt-3">
            <p>PNG/JPG/JPEG/WEBP/AVIF are supported</p>
          </div>
          <div className="d-flex flex-wrap mt-3">
            {uploadedImages.map((file, index) => (
              <div
                style={{ position: "relative" }}
                key={index}
                className={styles.imagePreview}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className={styles.selectedImages}
                />
                <span
                  className={`${styles.deleteIcon}`}
                  onClick={() => {
                    setUploadImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <DeleteIcon size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Formik>
  );
};

export default Dropzone;
