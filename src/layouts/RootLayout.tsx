import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext, defaultAuth } from '../context/AuthProvider';

const RootLayout = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        setAuth(defaultAuth);
    };

    return (
        <>
            <header style={{ width: '100%' }}>
                <nav
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>
                        </li>
                    </ul>
                    {auth.id ? (
                        <div>
                            <p>You are logged in as: {auth.username}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
