import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <br />
                    <NavLink to="/login">Login</NavLink>
                </nav>
            </header>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
