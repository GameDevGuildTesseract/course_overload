import React from 'react'
import { Banner } from '../assets/imgs'
import "../css/Gdd.css";

const Gdd = () => {
  return (
    <>
      <section className="banner">
        <div className="banner_container">
          <img src={Banner} alt="" />
        </div>
        <div className="title">
          <h1>Project:</h1>
          <h1>Course Overload</h1>
        </div>
      </section>
      <section className="">
      </section>
    </>
  )
}

export default Gdd