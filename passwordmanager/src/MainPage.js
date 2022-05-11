/**
 * 
 */
import Select from "react-select"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react"

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
                    
                    {!update && <button onClick={handleSubmit}>Save Login Info</button>}
                    {update && <button onClick={handleUpdate}>Update Login Info</button>}
                </form>

                <button onClick={logout}>Log Out</button>
            </div>
        </div>
     );
}
 
export default MainPage;