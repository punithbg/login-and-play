import React from "react";

import {Redirect } from "react-router"

export default function Login(props){
   
    const {setLoggedInUserDetails,setIsUserLoggedIn}=props
    
    const[isUserPresent,setIsUserPresent]=React.useState(false)
   
    const [user,setUser]=React.useState({
        email:"",
        password:""
    })    
    function handleChange(event){
        const{name,value}=event.target
        setUser(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    function handleSubmit(event){
        
        event.preventDefault()
        const saved = localStorage.getItem("user")

        if(saved===null){
            alert("no user data , kindly sign up first")
        }
        else{

            const savedDetails=JSON.parse(saved)
            
            for(let i=0;i<savedDetails.length;i++)
            {
                var eachUserDetails=savedDetails[i];
                if(user.email===eachUserDetails.email && user.password===eachUserDetails.password){
                    console.log(eachUserDetails)
                    setLoggedInUserDetails(prev =>{
                        return {...prev}=eachUserDetails
                    })
                    setIsUserPresent(true)
                    setIsUserLoggedIn(true)
                    setUser({
                        email:"",
                        password:""
                    })
                    return 
                }
            }
            alert("user details not correct , if not signed up please signup")
        }
        
        
    }
 
    if(isUserPresent){
        return <Redirect to='/display'/>
    }
    return(
        <div className="center">

            <div className="commmon-flex">
                <form className="form" onSubmit={handleSubmit}>                        
                    <input 
                            className="form-input"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="email"
                    />
                    <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="password"
                    />
                    <div className="btn-div">
                        <button type="submit" className="btn">Login</button>
                    </div>
                    
                </form>   
            </div>
        </div>
        
       
    )
}