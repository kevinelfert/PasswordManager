/*
This is the startup page

user needs to log in to see paswords

*/

import { useState } from "react";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/users')
        .then((res) => {
            return res.json()
        })
        .then(users => {
            users.forEach((user) => {
                if(username===user.username && password===user.password){
                    console.log("Logged In")
                }
            })
        })
    }

    return ( 
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Password: </label>
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>


            
            <br />
            {/* Register needs to send user to register page */}
            <button>Register</button>
        </div>
     );
}
 
export default Login;