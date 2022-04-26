import React from "react"
import Die from "./Die"
import { v4 as uuid } from 'uuid';
import Confetti from "react-confetti"
import "../Styles/style.css"
import { Redirect } from "react-router-dom";

export default function App(props){
    const [dieNum,setDieNum]=React.useState(allNewDice())
    const [tenzies,setTenzies]=React.useState(false)

    const {loggedInUserDetails,isUserLoggedIn,setIsUserLoggedIn}=props

    React.useEffect(()=>{
        const allHeld=dieNum.every(die=>die.isHeld)
        const firstValue=dieNum[0].value;
        const allValues=dieNum.every(die=>die.value===firstValue)
        if(allHeld && allValues){
            setTenzies(true)
            console.log("you won")
        }
    },[dieNum])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        console.log(newDice)
        return newDice
    }

    // const allNewDice=()=>{
    //     const newDice = []
    //     for (let i = 0; i < 10; i++) {
    //         newDice.push(generateNewDie())
    //     }
    //     console.log(newDice)
    //     return newDice
    // }

    function generateNewDie(){
       return {
            value:(Math.ceil(Math.random() * 6)),
            isHeld:false,
            id:uuid()
        }
    }
    function rollDice(){
      if(!tenzies){
        setDieNum(oldDice => oldDice.map(die=>{
            return die.isHeld? die : generateNewDie()
        }))
     }
     else{
         setTenzies(false)
         setDieNum(allNewDice())
     }
    }
    function holdDice(id){
        setDieNum(oldDice => oldDice.map(die=>{
            return die.id===id? {...die,isHeld:!die.isHeld}:die
        }))

    }
    const diceNumElements=dieNum.map(num=>(
        <Die 
            key={num.id} 
            value={num.value} 
            isHeld={num.isHeld} 
            holdDice={()=>holdDice(num.id)}
            
        />
    ))
    
    if(!isUserLoggedIn){
        return <Redirect to="/"/>
    }
    return(
        <main>
            
            {tenzies && <Confetti />}
            <h1>Welcome back {loggedInUserDetails.firstName}!!!</h1>
            <div className="container">
              {diceNumElements}
            </div>
            {<button className="btn" onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>}
            <button className="btn" onClick={(isUserLoggedIn)=>setIsUserLoggedIn(false)}>logout</button>
        </main>
    )
}