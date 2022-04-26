import React from "react"

import { Link } from "react-router-dom"



export default function Navbar(){
    console.log("navbar data")
    return(
        <nav>
            <div>
                 <Link to="/">Sign Up</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            {/* <div>
                 <Link to="/display">display</Link>
            </div> */}
       </nav>
    )

}