'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddModal from './components/AddModal';
import Topbar from './components/Topbar';
import { AuthContextProvider } from './components/AuthContext';
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function page() {
  const [open,setOpen] = React.useState(false)

  const {data,setData,GetData,obj, setObj,loader} = React.useContext(AuthContextProvider)

  const DeleteData = (id) => {
    axios.delete('/api/User', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { _id: id },
    })
      .then((response) => {
        console.log(response.data.message);
        toast.error("Deleted Successfully")
        GetData()
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error:', error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Request setup error:', error.message);
        }
      });
  };

  React.useEffect(() => {
    GetData()
  },[])

  return (
    <>
     {loader &&  <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  }
   <TableContainer component={Paper} sx={{marginTop:"1rem"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>No.</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Title</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Description</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Action</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <EditIcon sx={{marginRight:"10px",color:"#3e64e6", cursor:"pointer"}} onClick={() => {
                  setOpen(true)
                  setObj({
                    id1:row._id,
                    title:row.title,
                    description:row.description                  })
                }}/>
                <DeleteIcon sx={{color:"#ff0000cf", cursor:"pointer"}} onClick={() => DeleteData(row._id)}/>
                </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table> 
      <AddModal Action="Update" setOpen={setOpen} open={open}  id={obj.id1} title={obj.title} description={obj.description}/>

    </TableContainer>
    </>   
  );
}
