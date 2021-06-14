import style from './Register.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { register } from '../../services'

const RegisterPage = () => {

    const [errorHandler, setErrorHandler] = useState('');

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const rePass = e.target.rePass.value;


        if (!username || !email || !password || !rePass) {
            return setErrorHandler('All fields are required!');
        }

        if (password !== rePass) {
            return setErrorHandler('Passwords don\'t match!');
        }
        register(username, email, password)
            .then(res => {
                res.data === 'bad' ? setErrorHandler('Email already exist!') : setErrorHandler(null);
            })
            .catch(err => alert(err));

    };

    return (
        <div className={style.form_container}>
            <form className={style.form} onSubmit={onRegisterSubmitHandler} autoComplete="off">
                <h2>Create an account</h2>
                <div className={style.errorMsg}>{errorHandler}</div>
                <label htmlFor="username">Username</label>
                <div className={style.input_content}>
                    <PersonIcon className={style.icons} />
                    <input id="username" type="text" name="username" placeholder="Enter your username" />
                </div>
                <label htmlFor="email">Email</label>
                <div className={style.input_content}>
                    <EmailIcon className={style.icons} />
                    <input id="email" type="text" name="email" placeholder="Enter your email" />
                </div>
                <label htmlFor="pass">Password</label>
                <div className={style.input_content}>
                    <LockIcon className={style.icons} />
                    <input id="pass" type="password" name="password" placeholder="Enter your password" />
                </div>
                <label htmlFor="rePass">Confirm Password</label>
                <div className={style.input_content}>
                    <LockIcon className={style.icons} />
                    <input id="rePass" type="password" name="rePass" placeholder="Confirm your password" />
                </div>
                <button>Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}


export default RegisterPage;