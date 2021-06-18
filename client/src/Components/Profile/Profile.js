import style from './Profile.module.scss';
import { useState, useEffect } from 'react';
import profileImage from '../../assets/profile.jpg';
import img from '../../assets/dakata.jpg';
import { uploadImage } from '../../services';
import axios from 'axios';

const ProfilePage = () => {
    const [photos, setPhotos] = useState([]);
    const [currentUpload, setCurrentUpload] = useState()
    useEffect(() => {
        axios.get('photos').then(res => {
            setPhotos(res.data)
        })
            .catch(err => console.log('Couldnt load images'))
    }, [])
    const [fileData, setFileData] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    };

    const fileSelectHandler = (e) => {
        const value = (e.target.files[0]);
        setFileData(value);
        setCurrentUpload(e.target.value);
    };

    const fileUploadHandler = (e) => {
        e.preventDefault();
        if (currentUpload) {
            if (
                (fileData && fileData.type === "image/png") ||
                fileData.type === "image/jpeg" ||
                fileData.type === "image/jpg"
            ) {

                const data = new FormData();
                data.append("file", fileData);

                uploadImage(data)
                    .then((res) => {
                        sendPhoto(res.data)
                        setCurrentUpload(null);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            };
        }
    }
    const deletePhoto = (id) => {
        axios.post('deletePhoto', {id});
        /* window.location.reload() */
    }
    const sendPhoto = (url) => {
        axios.post('images', { url })

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
                        <input type="file" name="upload" onChange={e => fileSelectHandler(e)} />
                        <button>Upload</button>
                        <button>Edit info</button>
                        <button onClick={logout} >Logout</button>
                    </form>
                </div>
            </div>
            <div className={style.galery}>

                {photos.slice(0).reverse().map(photo => {
                    return (
                        <div key={photo.id}>
                            <img src={photo.url} alt='default' />
                            <button onClick={() => deletePhoto(photo.id)}> Delete photo</button>
                        </div>
                    )

                })}
            </div>
        </div>
    );
};

export default ProfilePage;