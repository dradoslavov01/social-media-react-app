import style from './Profile.module.scss';
import profileImage from '../../assets/profile.jpg';
import image from '../../assets/dakata.jpg';

const ProfilePage = () => {

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    }

    const username = localStorage.getItem('username');
    return (
        <div className={style.container}>
            <div className={style.info}>
                <img src={profileImage} alt="profileImg" />
                <div className={style.username}>
                    <h3>Username:</h3>
                    <p>{username}</p>
                </div>
                <div className={style.fullName}>
                    <h3>Name:</h3>
                    <p>Yordan Radoslavov</p>
                </div>
                <div className={style.age}>
                    <h3>Age:</h3>
                    <p>20</p>
                </div>
                <div className={style.city}>
                    <h3>City:</h3>
                    <p>Sofia</p>
                </div>
                <div className={style.buttons}>
                    <button>Add a photo</button>
                    <button>Edit info</button>
                    <button onClick={logout} >Logout</button>
                </div>
            </div>
            <div className={style.galery}>
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
                <img src={image} alt="img" />
            </div>
        </div>
    );
};

export default ProfilePage;