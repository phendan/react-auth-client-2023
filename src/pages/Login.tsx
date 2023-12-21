import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { AuthContext } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import http from '../utils/http';

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
        formState: { errors, isSubmitting },
        setError
    } = form;

    // Wenn Nutzer von einer Private Route kam
    // dann wollen wir dahin nach Login zurück
    // Wenn er direkt auf Login klickte, schicken wir
    // den Nutzer an die Homepage
    const { from = '/' } = state || {};

    // Diese Funktion wird nur ausgeführt, wenn alle Felder
    // korrekt validiert sind
    const onSubmit = async (data: FormValues) => {
        // Logik für den Login
        try {
            await http.get('/sanctum/csrf-cookie');
            const response = await http.post('/api/auth/login', data);
            const userData = response.data;

            setAuth({ ...userData, role: userData.role ?? 'user' });
            navigate(from);
        } catch (exception: any) {
            const errors = exception.response.data.errors;

            for (let [fieldName, errorList] of Object.entries(errors)) {
                type Field = 'email' | 'password' | 'root';
                const errors = (errorList as any[]).map(message => ({ message }));
                console.log(fieldName, errors);
                setError(fieldName as Field, errors[0]);
            }
        }

        console.log('Formular Submit');
    };
    // Request ans Backend -> Email & Password
    // vom Backend -> Daten vom Nutzer { id, username, role } || httponly cookie & same-site attribut

    /* // Muss ein unerwarteter Fehler sein
  throw new Error("Fehler !!! Login falsch !!!"); */

    // wird ausgeführt, wenn Fehler vorhanden sind
    const onError = () => {
        console.log('Formular Error');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <p style={{ color: 'red' }}>{JSON.stringify(errors.root?.message)}</p>
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
