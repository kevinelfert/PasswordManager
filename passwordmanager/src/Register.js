/*
This page should have three fields
    -username
    -password
    -confirm password


the password must be between 20 and 25 chars long

once the user is registerd, save the user to the db and 
redirect user to login page

*/
import { useState } from "react"
import { useHistory } from "react-router-dom"


const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const logins = []

    const history = useHistory()

    const handleSubmit = (e) => {
        try {
            e.preventDefault()
            const user = {username, password, passwordConfirm, logins}
            if(password!==passwordConfirm){
                throw Error("Passwords do not match")
            }
            if(password.length > 25 || password.length < 20){
                throw Error("Password must be between 20 and 25 characters long")
            }
            fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            }).then((res) => {
                if(!res.ok){
                    throw Error("Could not add user")
                }
                console.log("User added")
            })
        } catch (error) {
            console.log(error.message)
        }
        
    }

    return ( 
        <div className="register">
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
                <label className="length">password length: {password.length}</label>
                <br />
                <label>Confirm Password: </label>
                <input 
                    type="password" 
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <label className="length">password length: {passwordConfirm.length}</label>
                <br />
                <button>Sign Up</button>
            </form>

            <button onClick={() =>{
                history.push('/')
            }}>Back to Login Page</button>
        </div>
     );
}
 
export default Register;