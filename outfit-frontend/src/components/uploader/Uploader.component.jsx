import React, { useState, useEffect } from 'react';
import s from './Uploader.module.css'; // CSS module';
import uploadIcon from '../../../public/icons/icons8-add-image.svg';
import axios from 'axios';

function UploaderComponent({ onUpload }) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    console.log('helo');
    const { data } = await axios.post('upload', formData);
    // setUrl(data.url);
    onUpload(data.url);
  };

  useEffect(() => {
    if (file) {
      upload();
    }
  }, [file]);

  return (
    <div className={s.file_picker}>
      <input className={s.file_input} type='file' onChange={handleChange} />
      <img src={url ? url : uploadIcon} height={100} />
    </div>
  );
}

export default UploaderComponent;
