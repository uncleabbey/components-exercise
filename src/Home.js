import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="exercise">
      <h2>Exercise</h2>
      
      <p><Link to={"/giphy"}>Task One</Link> </p>
      <p><Link to={"/todo"}>Task Two</Link> </p>
      {/* <p><Link to={"/divs"}>Task Four</Link> </p> */}
    </div>
  )
}

export default Home
