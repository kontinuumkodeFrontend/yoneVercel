import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const ImagePreview = ({ placeImg, imgHandler }) => {
  const [image, setImage] = useState(placeImg);


  const ImageHandler = (e) => {
    const selectedFile = e.target.files[0];
    toast.dismiss()
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        if (selectedFile.size <= 1048576 ) { // 1MB in bytes
          let url = URL.createObjectURL(selectedFile);
          setImage(url);
          imgHandler(selectedFile);
        } else {
          toast.error("File size exceeds the allowed limit (up to 1MB allowed).");
          setImage('/images/placeholder.png');
        }
      } else {
        toast.error("Selected file is not an image.");
        setImage(placeholder);
      }
    }
  };

  return (
    <div className="image-prev-bx">
      <input type="file" accept='image/*' onChange={ImageHandler} />
      <div className="image-prev">
        <img src={image} className="img-fluid" alt="img" />
        <span>
          <img src={'/images/camera.png'} className="img-fluid" alt="img" />
        </span>
      </div>
    </div>
  )
}
