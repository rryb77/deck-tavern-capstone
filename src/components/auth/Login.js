import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("decktavern_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            
            <div className="theLogin">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                <section>
                    
                    <form className="form--login" onSubmit={handleLogin}>
                        <fieldset>
                            <input ref={email} type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        
                        <fieldset>
                            <button type="submit" className="btnSubmit">
                                Sign in
                            </button>
                        </fieldset>
                    </form>
                    
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </div>
        </main>
    )
}