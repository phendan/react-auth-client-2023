import { useState } from 'react';

function Navigation() {
    const [isActive, setIsActive] = useState(false);

    return (
        <nav className={isActive ? 'active' : ''}>
            <button onClick={() => setIsActive(value => !value)}>toggle nav</button>
        </nav>
    );
}

export default Navigation;
