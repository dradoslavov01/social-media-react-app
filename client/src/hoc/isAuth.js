import { useHistory } from 'react-router-dom';

const isAuth = (WrappedComponent) => {

    const Component = (props) => {

        const token = localStorage.getItem('token');
        const history = useHistory();

        if (token === null) {
            history.push('/register') || history.push('/login');
            return null;
        } else {

            if (history.location.pathname === '/login' || history.location.pathname === '/register') {
                history.push('/')
                return null;
            }
        }
        return <WrappedComponent {...props} />

    };
    return Component;
};

export default isAuth;