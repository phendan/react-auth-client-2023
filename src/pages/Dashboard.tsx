import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';

const Dashboard = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div>
            <code>{JSON.stringify(auth)}</code>
            <p>Du hast 1000€ verdient</p>
        </div>
    );
};

export default Dashboard;
