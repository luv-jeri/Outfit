import React, { useEffect } from 'react';
import s from './Profile.module.css';
import { useAuth } from '../../../context/Auth.context';
import UploaderComponent from './../../../components/uploader/Uploader.component';
import axios from 'axios';
function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(() => {
    return user.name;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState('');

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    };
  };

  const update = debounce(async () => {
    const { data } = await axios.patch('http://localhost:5000/users', {
      name,
      email,
      image,
    });
    setUser(data.user);
  }, 1000);

  useEffect(() => {
    update();
  }, [email, name, image]);

  return (
    <div>
      <h1>Profile</h1>
      {!isEditing ? (
        <h1>{user.name}</h1>
      ) : (
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder={name}
        />
      )}
      <span onC>🖊️</span>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder={email}
      />

      <UploaderComponent img={user.photo} onUpload={setImage} />
    </div>
  );
}

export default Profile;
