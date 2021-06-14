import style from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import profileImage from './profile.jpg';


const NavigationPage = () => {
    return (
        <header className={style.header}>
            <h2>Social Media</h2>
            <form className={style.searchForm}>
                <input type="text" name="search" value="search" />
                <SearchIcon className={style.searchIcon}/>
            </form>
            <nav className={style.navbar}>
                <ul>
                    <li><Link to="/"><HomeIcon className={style.homeIcon} /></Link></li>
                    <li><Link to="/messages"><ChatBubbleOutlineIcon className={style.chatIcon} /></Link></li>
                    <li><Link to="/notifications"><FavoriteBorderIcon className={style.favIcon} /></Link></li>
                    <li><Link to="/profile"><img style={{width:"30px", height:"30px", borderRadius: "50%" }} src={profileImage} alt="img" /></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavigationPage;