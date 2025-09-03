import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"

import border from "/assets/border.png"
import LandingPage from "./components/boot/LandingPage"
import Loader from "./components/boot/Loader"
import Contact from "./components/Contact"

import NotFound from "./components/NotFound"

import Content from "./components/Content";
import Article from "./components/Article"

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])

  return (
    <div className="text-xl text-slate-400"> 
      {!loading ?
          <section id="main-app" className="sm:w-full md:w-[50vw] mx-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/content/:contentType" element={<Content />} />
            <Route path="/article/:contentType/:date/:title" element={<Article />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <img src={border} alt="border" className="w-[40%] my-5 mx-auto" />
          <Contact/>
          </section>     
        :
        <Loader />}
    </div>
  )
}
