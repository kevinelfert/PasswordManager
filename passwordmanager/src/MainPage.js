/**
 * 
 */
import Select from "react-select"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react"
const validator = require('url-validator12')
const os = require('os')
const { exec } = require('child_process')

const MainPage = () => {

    const { id } = useParams()
    const [selection, setSelection] = useState(null)
    const [company, setCompany] = useState('')
    const [website, setWebsite] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginID, setLoginID] = useState(0)
    const [update, setUpdate] = useState(false)
    const history = useHistory()

    const options = []

    fetch('http://localhost:8000/logins')
    .then((res) => {
        return res.json()
    })
    .then((logins) => {
        logins.forEach(login => {
            if(login.user_id === id){
                options.push({value: login.company, label: login.company})
            }
            
        })
    })

    const selectPrefs = {
        isClearable: true,
        isSearchable: true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       const login = {user_id: id, company, website, username, password}
       fetch('http://localhost:8000/logins', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            }).then((res) => {
                if(!res.ok){
                    throw Error("Could not add login")
                }
                console.log("Login added")
                setUpdate(false)
                setCompany('')
                setWebsite('')
                setUsername('')
                setPassword('')
                setLoginID(0)
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const login = {user_id: id, company, website, username, password}
       fetch('http://localhost:8000/logins/'+loginID, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(login)
            }).then((res) => {
                if(!res.ok){
                    throw Error("Could not update login")
                }
                console.log("Login updated")
                setUpdate(false)
                setCompany('')
                setWebsite('')
                setUsername('')
                setPassword('')
                setLoginID(0)
                setSelection(null)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const viewLogin = (e) => {
        try {
            if(e === null){
                setUpdate(false)
                setCompany('')
                setWebsite('')
                setUsername('')
                setPassword('')
                setLoginID(0)
                throw Error("value is null")
            }
            fetch('http://localhost:8000/logins/')
            .then((res) => {
                return res.json()
            })
            .then((logins) => {
                logins.forEach(login => {
                    if(login.company === e.value){
                        setCompany(login.company)
                        setWebsite(login.website)
                        setUsername(login.username)
                        setPassword(login.password)
                        setLoginID(login.id)
                        setUpdate(true)

                    }
                })
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = () => {
        history.push('/')
    }

    const goToWebsite = (e) => {
        //opens in a new tab
        //might need to open in a new window
        e.preventDefault()
        const win = window.open('http://'+website, '_blank')
        win.focus()

        // const url = 'http://'+website
        // let command;
        // // if (osPlatform === 'win32') {
        // //     command = `start microsoft-edge:${url}`;
        // // } 
        // // else if (osPlatform === 'darwin') {
        //     command = `open -a "Google Chrome" ${url}`;
        // // } 
        // // else {
        // //     command = `google-chrome --no-sandbox ${url}`;
        // // }
        // // console.log(`executing command: ${command}`);
        // exec(command)
    }

    return ( 
        <div className="main-page">
            <div className="select">
                <form>
                    <Select 
                        onChange={viewLogin}
                        options={options}
                        isClearable={selectPrefs.isClearable}
                        isSearchable={selectPrefs.isSearchable}
                    />
                </form>
                
            </div>
            <div className="login-info">
                <form>
                    <label>Comapny: </label>
                    <input 
                        required
                        value={company}
                        type="text" 
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <br />
                    <label>Website: </label>
                    <input 
                        value={website}
                        type="text" 
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <br />
                    <label>Username: </label>
                    <input 
                        required
                        value={username}
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <label>Password: </label>
                    <input 
                        required
                        value={password}
                        type="text" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="hidden" 
                        value={loginID}
                    />
                    <br />
                    {!update && <button class="waves-effect waves-light btn-small" onClick={handleSubmit}>Save Login Info</button>}
                    {validator.verify("http://"+website) ? <button class="waves-effect waves-light btn-small" onClick={goToWebsite}>Go to Website</button> : null}
                    {update && <button class="waves-effect waves-light btn-small" onClick={handleUpdate}>Update Login Info</button>}
                </form>
                <button class="waves-effect waves-light btn-small" onClick={logout}>Log Out</button>
            </div>
        </div>
     );
}
 
export default MainPage;