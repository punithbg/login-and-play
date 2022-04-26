import React from "react";
import { v4 as uid } from 'uuid';
import Login from "./Login";
import {Redirect } from "react-router"
export default function SignUP(){

    const[isSignUp,setIsSignUp]=React.useState(false)

    const [user,setUser]=React.useState({
        id:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    

    function handleChange(event){
        
        const{name,value}=event.target
        setUser(prevState => ({
            ...prevState,
            [name]:value
        }))
    }
   
    function handleClick(event){
        event.preventDefault()
        if(user.password === user.confirmPassword){
       
            setUser(prev => {
                return {
                     ...prev,
                     id: uid()
                }
             });

            let userData=localStorage.getItem("user")
            if(userData===null){
                const userDataArray=[]
                userDataArray.push(user)
                localStorage.setItem("user", JSON.stringify(userDataArray));
            }else{
                const userPreviousDetais=JSON.parse(userData)
                userPreviousDetais.push(user);
                localStorage.setItem("user", JSON.stringify(userPreviousDetais));
            }
            
            setIsSignUp(prevState => !prevState)
            setUser({
                id:"",
                firstName:"",
                lastName:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            

        }
        else{
            alert("password not same")
        }

    }

    if(isSignUp){
        return <Redirect to='/login'/>
    }
    return(
        <div className="center">
            <div className="commmon-flex">
                <form className="form" onSubmit={handleClick}>
                    <div>
                        <input 
                            className="form-input"
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            placeholder="first name"
                            required
                        />
                        <input 
                            className="form-input"
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            placeholder="last name"
                            required
                        />
                        
                    </div>
                    <input 
                            className="form-input"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="email"
                            required
                    />
                    <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="password"
                            required
                    /> 
                    <input 
                            className="form-input"
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            placeholder="confirm password"
                            required
                    />   
                    <div className="btn-div">
                        <button 
                            type="submit" 
                            className="btn"
                        >
                            Sign Up
                        </button>
                    </div>
                    
                </form>   
            </div>
           
        </div>
       
    )
}