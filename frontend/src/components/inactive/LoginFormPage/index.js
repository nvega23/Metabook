import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import './LoginForm.css'


const LoginFormPage = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([])

    // if (sessionUser) return <Redirect to='/' />


    const handleSubmit = (e) => {
        e.preventDefault();
        // const user = {
        //     credential,
        //     password
        // }
        // dispatch(login(user))
        setErrors([]);
        return dispatch(login({credential, password}))
            .catch(async res => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }


    return (
        <>
            <h1 class="metabook">Metaborrrrok</h1>
            <h5 class="connect">Connect with friends and the world around you on Metabook.</h5>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
            </label>
            <button type="submit">Log Innnnn</button>
        </form>
        </>
    );
}

export default LoginFormPage