'use client'
import axios from 'axios'
import React, { createContext, useState } from 'react'

export const AuthContextProvider = createContext(null)

const AuthContext = ({ children }) => {
    const [data,setData] = React.useState([])
    const [loader,setLoader] = React.useState(false)
    const [obj, setObj] = useState({
        id:"",
        title: "",
        description: ""
    })
  
    const GetData = () => {
      setLoader(true)
      axios.get("/api/User").then((res) =>{
        setLoader(false)
        setData(res.data)
      })
    }
    return (
        <AuthContextProvider.Provider value={{data,setData,GetData,obj, setObj, loader}}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext
