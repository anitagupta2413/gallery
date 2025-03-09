import React, { useState } from "react";
import ReactModal from "@/sharedComponent/ReactModal";
import PlusIcon from "@/svgicons/PlusIcon";
import Dropzone from "@/sharedComponent/Dropzone";

const Profile = () => {
  const [openUploadImageModal, setOpenUploadImageModal] = useState(false);
  const [uploadedImages , setUploadImages] = useState([]);

  const handleSubmit = () => {
    console.log(uploadedImages , 'uploadedImages')
    setOpenUploadImageModal(false);
  }

  return (
    <div>
      <div
        onClick={() => {
          setOpenUploadImageModal(true);
        }}
      >
        <p>upload image</p>
        <PlusIcon />
      </div>

      <ReactModal
        showModal={openUploadImageModal}
        handleClose={() => setOpenUploadImageModal(false)}
        modalTitle="Upload Image"
        handleSubmit={handleSubmit}
      >
        <Dropzone  uploadedImages={uploadedImages} setUploadImages={setUploadImages}/>
      </ReactModal>
    </div>
  );
};

export default Profile;
