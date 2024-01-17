import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './ImageUpload.css';

const ImageUpload = ({ id, center, onFileInput, errorText }) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);

  const fileUploadRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const selectImgHandler = () => {
    fileUploadRef.current.click();
  };

  const fileInputChangedHandler = (event) => {
    console.log('fileInputChangedHandler');
    let targetFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      targetFile = event.target.files[0];
      setFile(targetFile);
      fileIsValid = true;
      setIsValid(true);
    } else {
      fileIsValid = false;
      setIsValid(false);
    }
    console.log(id);
    console.log(fileIsValid);
    console.log(targetFile);
    onFileInput(id, targetFile, fileIsValid);
  };

  const clearFileSelectionHandler = () => {
    setFile(null);
    setPreview(null);
    setIsValid(false);
    onFileInput(id, null, false);
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
          {preview && <img src={preview} alt="Preview" />}
          {!preview && <p>Please select an image for upload.</p>}
        </div>
        <div className="row">
          <Button type="button" onClick={selectImgHandler}>
            Select Image
          </Button>
          <Button
            type="button"
            onClick={clearFileSelectionHandler}
            style={{ marginRight: '0px' }}
          >
            Clear
          </Button>
        </div>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default ImageUpload;
