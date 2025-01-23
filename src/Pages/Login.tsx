import  { useState } from 'react';
import { handleError, handleSuccess } from '../toast'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email) return handleError('Email is required.');
        if (!password) return handleError('Password is required.');
        if (password.length < 6) return handleError('Password must be at least 6 characters.');

        try {
            const URL = 'http://localhost:3000/auth/Login';
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
          
            if (response.status === 201) {
                handleSuccess(result.message); 
                localStorage.setItem('token' , result.token);
                console.log("token"  ,result.token);
                
                setTimeout(() => {
                    navigate('/Home'); 
                }, 1000);
            } else {
                handleError(result.message); 
            }
        } catch (error) {
            handleError('An error occurred during the request.');
            console.error(error); 
        }

    };

    return (
        <div className="Login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={6}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
