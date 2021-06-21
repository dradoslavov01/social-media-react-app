import style from './Profile.module.scss';
import { useState } from 'react';
import { uploadPhoto, sendPhoto } from '../../services';
import Gallery from './Gallery/Gallery';
import profilePhoto from '../../assets/profile.jpg'


const ProfilePage = () => {

    const [currentUpload, setCurrentUpload] = useState('');

    const username = localStorage.getItem('username');

    const fileUploadHandler = (e) => {
        const value = (e.target.files[0]);
        let fileData = value;
        setCurrentUpload(e.target.value);

        if (
            (fileData && fileData.type === "image/png") ||
            fileData.type === "image/jpeg" ||
            fileData.type === "image/jpg"
        ) {

            const data = new FormData();
            data.append("file", fileData);

            uploadPhoto(data)
                .then((res) => {
                    sendPhoto(res.data)
                    setCurrentUpload(null);
                })
                .catch((err) => {
                    console.log(err.message);
                });

        };
    };


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    };


    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={profilePhoto} alt="profileImg" />
                <button><label htmlFor="profilePic">Select profile photo</label></button>
                <input type="file" id="profilePic" className={style.profileInput} name="upload" onChange={e => fileUploadHandler(e)} />
                <div className={style.username}>
                    <h4>Username:</h4>
                    <p>{username}</p>
                </div>
                <div className={style.fullName}>
                    <h4>Name:</h4>
                    <p>Yordan Radoslavov</p>
                </div>
                <div className={style.age}>
                    <h4>Age:</h4>
                    <p>20</p>
                </div>
                <div className={style.city}>
                    <h4>City:</h4>
                    <p>Sofia</p>
                </div>
                <div className={style.profileBtns}>
                    <button><label htmlFor="file">Add a photo</label></button>
                    <input type="file" id="file" name="upload" onChange={e => fileUploadHandler(e)} />
                    <button>Edit info</button>
                    <button onClick={logout} >Logout</button>
                </div>
            </div>
            <div className={style.gallery}>
                <Gallery currentUpload={currentUpload} />
            </div>
        </div>
    );
};

export default ProfilePage;