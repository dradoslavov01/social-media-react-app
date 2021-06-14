import style from './Login.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { login } from '../../services'

const LoginPage = ({
    history
}) => {
    const [errorHandler, setErrorHandler] = useState('');

    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            return setErrorHandler('All fields are required!');
        }

        login(email, password)
            .then(res => {
                if(res.data === 'email') {
                    setErrorHandler('Incorrect email');
                    return;
                } else if(res.data === 'pass') {
                    setErrorHandler('Incorrect password')
                    return;
                }

                const token = res.data.token;
                const username = res.data.username

                if(token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                }
                history.push('/');
            })
            .catch(err => alert(err))

    };

    return (
        <div className={style.form_container}>
            <form className={style.form} onSubmit={onLoginFormSubmitHandler} autoComplete="off">
                <h2>Sign In</h2>
                <div className={style.errorMsg}>{errorHandler}</div>
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
                <button>Sign In</button>
                <p> Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
}


export default LoginPage;