'use client'
import axios from 'axios'
import React, { createContext, useState } from 'react'

export const AuthContextProvider = createContext(null)

const AuthContext = ({ children }) => {
    const [data,setData] = React.useState([])
    const [obj, setObj] = useState({
        id:"",
        title: "",
        description: ""
    })
  
    const GetData = () => {
      axios.get("/api/User").then((res) =>{
        setData(res.data)
      })
    }
    return (
        <AuthContextProvider.Provider value={{data,setData,GetData,obj, setObj}}>
            {children}
        </AuthContextProvider.Provider>
    )
}

export default AuthContext
