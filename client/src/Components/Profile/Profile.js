import style from './Profile.module.scss';
import { useState, useEffect } from 'react';
import profileImage from '../../assets/profile.jpg';
import { uploadPhoto, getPhotos, sendPhoto, deletePhoto } from '../../services';

const ProfilePage = () => {

    const [photos, setPhotos] = useState([]);
    const [currentUpload, setCurrentUpload] = useState()
    const [fileData, setFileData] = useState(null);

    const username = localStorage.getItem('username');

    useEffect(() => {
        getPhotos()
            .then(res => {
                setPhotos(res.data)
            })
            .catch(err => console.log('Couldnt load photos'));
    }, [currentUpload])


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

                uploadPhoto(data)
                    .then((res) => {
                        sendPhoto(res.data)
                        setCurrentUpload(null);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            };
        } else {
            console.log('You must select a file!');
        };
    };

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