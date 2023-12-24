'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddModal from './AddModal';
import { AuthContextProvider } from './AuthContext';

export default function Topbar() {
  const [open,setOpen] = React.useState(false)
  const {GetData,obj, setObj} = React.useContext(AuthContextProvider)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Demo
          </Typography>
          <Button color="inherit" onClick={() => {
            setObj({
              id:"",
              title:"",
              description:""
            })
            setOpen(true)
          }}>Add</Button>
        </Toolbar>
      </AppBar>
      <AddModal Action="Add" open={open} setOpen={setOpen}/>
    </Box>
  );
}
