import style from './Profile.module.scss';
import { useState } from 'react';
import profileImage from '../../assets/profile.jpg';
import img from '../../assets/dakata.jpg';
import { uploadImage } from '../../services';


const ProfilePage = () => {

    const [fileData, setFileData] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    };

    const fileSelectHandler = (e) => {
        const value = (e.target.files[0]);
        setFileData(value);
  
    };

    const fileUploadHandler = (e) => {
        e.preventDefault();
        if (
            (fileData && fileData.type === "image/png") ||
            fileData.type === "image/jpeg" ||
            fileData.type === "image/jpg"
        ) {

            const data = new FormData();
            data.append("file", fileData);

            uploadImage(data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err.message);
                });

        };
    }

    const username = localStorage.getItem('username');
    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={profileImage} alt="profileImg" />
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
                <div className={style.buttons}>
                    <form onSubmit={fileUploadHandler}>
                        <input type="file" name="upload" onChange={fileSelectHandler} />
                        <button>Upload</button>
                        <button>Edit info</button>
                        <button onClick={logout} >Logout</button>
                    </form>
                </div>
            </div>
            <div className={style.galery}>
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
                <img src={img} alt="img" />
            </div>
        </div>
    );
};

export default ProfilePage;