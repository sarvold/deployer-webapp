import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation: React.FC = () => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className={classes.header}>
            <img
                className={classes.logo}
                src='https://www.epwery.com/wp-content/uploads/2020/09/logo-01.png'
                alt='Logo'
            ></img>
            <Link to='/'>
                <div className={classes.logo}>Epwery Deployer</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to='/auth'>Login</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to='/deployments'>Deployments</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
