'use client'
import { Box, Button, Dialog, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../globals.css'
import axios from 'axios'
import { AuthContextProvider } from './AuthContext'
import { toast } from 'react-toastify'


const AddModal = ({ open, setOpen,title,description,id,data,Action}) => {
    const [errorMessage, setErrorMessage] = useState(false)
   
    const {GetData,obj, setObj} = React.useContext(AuthContextProvider)


   useEffect(() =>{
        setObj({title:title,description:description})
    },[])
    const handleClose = () => {
        setOpen(false)
    }


    const UpdateData = () => {
        if(Action==="Update"){
            axios.put(`/api/User`, {
                _id: id,
                title: obj.title,
                description: obj.description,
              })
                .then((response) => {
                  console.log(response.data);
                  toast.success("Updated Successfully")
                  GetData()
                  setOpen(false)
                })
                .catch((error) => {
                  console.error('Error updating user:', error);
                });
        }else if(Action==="Add"){
            if (obj.title === "" || obj.description === "") {
                setErrorMessage(true)
            } else {
                axios.post("/api/User", {
                    title: obj.title,
                    description: obj.description
                }).then((res) => {
                    console.log(res.data);
                  toast.success("Added Successfully")
                    GetData()
                    setOpen(false)
                })
            }
        }        
      };
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <Box sx={{padding:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Typography className='text-center'>{obj.title === "" ? "ADD":"UPDATE"}</Typography>
                <TextField
                    style={{ width: "90%" }}
                    id="outlined-basic"
                    variant="outlined"
                    label="Title"
                    value={obj.title}
                    onChange={(e) => setObj({ ...obj, title: e.target.value })}
                />
                {
                    errorMessage && obj.title === "" ? <h5 className='error'>This field is required</h5> : ""
                }
                <TextField
                    style={{ width: "90%", marginTop: "10px" }}
                    multiline
                    maxRows={4}
                    id="outlined-basic"
                    variant="outlined"
                    label="Description"
                    value={obj.description}
                    onChange={(e) => setObj({ ...obj, description: e.target.value })}
                />
                {
                    errorMessage && obj.description === "" ? <h5 className='error'>This field is required</h5> : ""
                }
                <Box sx={{ flexDirection: "row" }}>
                    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Grid item md={6} sx={{paddingTop:"0.8rem",paddingLeft:"2rem"}}>
                            <Button variant='contained' sx={{ width: "100%" }} onClick={handleClose}>Cancel</Button>
                        </Grid>
                        <Grid item md={6} sx={{paddingTop:"0.8rem",paddingLeft:"2rem"}}>
                            <Button variant='contained' sx={{ width: "90%" }} onClick={() => UpdateData()}>{obj.title === ""?"Add":"Update"}</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Dialog>
    )
}

export default AddModal
