import {Switch,Route} from "react-router-dom"
// import Display from "./Components/Display";
import Display from "./Tenzies/App";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import "./Styles//index.css"
import {useState} from "react"

function App() {
  const [isUserLoggedIn,setIsUserLoggedIn]=useState(false)
  const [loggedInUserDetails,setLoggedInUserDetails]=useState({
    id:"",
    firstName:"",
    lastName:"",
    email:"",
  })
  return (
    <div >
      <Navbar/>
      <Switch>
          <Route exact path="/">
              <SignUp/>
          </Route> 
          <Route path="/login">
              <Login setLoggedInUserDetails={setLoggedInUserDetails} setIsUserLoggedIn={setIsUserLoggedIn}/>
          </Route> 
          <Route path="/display">
              <Display loggedInUserDetails={loggedInUserDetails} isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>
          </Route>  
      </Switch>
    </div>
  );
}

export default App;
