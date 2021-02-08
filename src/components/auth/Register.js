import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Register.css"

export const Register = (props) => {
    const username = useRef()
    const email = useRef()
    // const verifyPassword = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            username: username.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("decktavern_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--register" onSubmit={handleRegister}>
                <fieldset>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required autoFocus/>
                </fieldset>
                <fieldset>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required  />
                </fieldset>
                <fieldset>
                    <button type="submit" className="btnSubmitReg"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}