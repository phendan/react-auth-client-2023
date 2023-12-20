import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { AuthContext } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

// React Hook Form installieren
// npm install react-hook-form

// React Hook Form DevTools
// npm install -D @hookform/devtools

type FormValues = {
    email: string;
    password: string;
};

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { state } = useLocation();

    const form = useForm<FormValues>();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = form;

    console.log(auth);

    // Wenn Nutzer von einer Private Route kam
    // dann wollen wir dahin nach Login zurück
    // Wenn er direkt auf Login klickte, schicken wir
    // den Nutzer an die Homepage
    const { from = '/' } = state || {};

    const login = {
        id: 1,
        username: 'Tom',
        email: 'asd@asd.de',
        password: 'asd',
        role: 'user'
    };

    // Diese Funktion wird nur ausgeführt, wenn alle Felder
    // korrekt validiert sind
    const onSubmit = async (data: FormValues) => {
        // Logik für den Login
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Formular Submit');
        if (data.email === login.email && data.password === login.password) {
            setAuth(prevAuth => {
                let role = null;

                if (login.role === 'admin') {
                    role = login.role as 'admin';
                }
                if (login.role === 'user') {
                    role = login.role as 'user';
                }

                return {
                    ...prevAuth,
                    id: login.id,
                    username: login.username,
                    role: role
                };
            });
            navigate(from);
        }
        // Request ans Backend -> Email & Password
        // vom Backend -> Daten vom Nutzer { id, username, role } || httponly cookie & same-site attribut
    };

    /* // Muss ein unerwarteter Fehler sein
  throw new Error("Fehler !!! Login falsch !!!"); */

    // wird ausgeführt, wenn Fehler vorhanden sind
    const onError = () => {
        console.log('Formular Error');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <label htmlFor="email">E-Mail</label>
                <input
                    type="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Please enter an email'
                        },
                        pattern: {
                            // Quelle: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email format'
                        }
                    })}
                />
                <br />
                <p style={{ color: 'red' }}>{errors.email?.message}</p>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Please enter a password'
                        }
                    })}
                />
                <p style={{ color: 'red' }}>{errors.password?.message}</p>
                <button disabled={isSubmitting} type="submit">
                    Login
                </button>
            </form>
            <DevTool control={control} />
        </>
    );
};

export default Login;
