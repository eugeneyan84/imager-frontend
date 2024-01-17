import { useRef } from 'react';
import Button from './Button';
import './ImageUpload.css';

const ImageUpload = ({ id, center }) => {
  const fileUploadRef = useRef();

  const selectImgHandler = () => {
    fileUploadRef.current.click();
  };

  const fileInputChangedHandler = (event) => {
    console.log(event.target);
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={fileUploadRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg,.gif"
        onChange={fileInputChangedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={selectImgHandler}>
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
