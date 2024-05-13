import React,{useState,useRef} from 'react'
import {Button, IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Data from './data.json'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Box from '@material-ui/core/Box'
import './Table.css'
import {TextField} from '@material-ui/core';


function Table() {
    const [data,setData]=useState(Data)
    const[editState,setEditState]=useState(-1)
    
    
   
  return (
    <div className='tableWrap'>
        <div>
    <h1><Box borderTop={1} textAlign='center' borderColor='secondary.main'>Employee Record List</Box></h1>
        <div>
        <AddMember setData={setData}/>
        <form onSubmit={handleUpdate}>
            <TableContainer>
        
            <TableHead>
                <TableRow>
                   
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Email</TableCell>
                <TableCell align='center'>Phone</TableCell>
                <TableCell align='center'>Action</TableCell>
              
                </TableRow>
            </TableHead>
        {
       data.map((current)=> (
        editState === current.id ? <EditMember current={current} data={data} setData={setData}/> :
       <TableBody>
        <TableRow>
           <TableCell align='center'>{current.name}</TableCell>
            <TableCell align='center'>{current.email}</TableCell>
            <TableCell align='center'>{current.phone}</TableCell>
           
<TableCell>
            <IconButton aria-label='Edit' style={{color:'blue'}} onClick={()=>handleEdit(current.id)}><EditIcon/></IconButton>
            <IconButton aria-label='Delete' style={{color:"red"}} onClick={()=>handleDelete(current.id)}><DeleteIcon/></IconButton>
           </TableCell> 
        </TableRow>
        </TableBody>
    ))
    
    }
</TableContainer>
</form>
    </div>
    </div>
    </div>
  )
  function handleUpdate(e){
    e.preventDefault();
       const name=e.target.elements.name.value;
       const email=e.target.elements.email.value;
       const phone=e.target.elements.phone.value;
      const updatedData=data.map((d)=> d.id === editState ? {...d,name:name,email:email,phone:phone}:d)
      setEditState(-1)
      setData(updatedData)
     
    
}
  function handleEdit(id){
    setEditState(id);
    
  }
   function handleDelete(id){
    const updatedData=data.filter((d)=>id !== d.id)
    setData(updatedData)
  
  
  }
}
function EditMember(current,data,setData){
    function handleName(e){
   const name=e.target.value;
   const updatedData=data.map((d)=> d.id===current.id ? {...d,name:name}: d)
   setData(updatedData)
}
function handleEmail(e){
    const email=e.target.value;
    const updatedData=data.map((d)=> d.id===current.id ? {...d,email:email}: d)
    setData(updatedData)
 }
 function handlePhone(e){
    const phone=e.target.value;
    const updatedData=data.map((d)=> d.id===current.id ? {...d,phone:phone}: d)
    setData(updatedData)
 }
    
    return(
    <tr> 
       <td><TextField id="outlined-basic" label="Enter Name" variant="outlined" onChange={handleName}  value={current.name} name='name'/></td>
        <td><TextField id="outlined-basic" label="Enter Email" variant="outlined" onChange={handleEmail} value={current.email} name='email'/></td>
        <td><TextField id="outlined-basic" label="Enter Phone no" variant="outlined" onChange={handlePhone} value={current.phone} name='phone'/></td>

        <td><Button type='submit' variant='primary' color="success">Update</Button></td>
       
    </tr>
    )}

    
function AddMember({setData}){
    const nameRef=useRef()
    const emailRef=useRef()
    const phoneRef=useRef()
   
function handleValues(e){
e.preventDefault();
const name=e.target.elements.name.value;
const email=e.target.elements.email.value; 
const phone=e.target.elements.phone.value; 

const newMember={
    id:4,
    name,
    email,
    phone,
}
setData(prevData=>prevData.concat(newMember))
 nameRef.current.value=" ";
 emailRef.current.value=" ";
 phoneRef.current.value=" ";
}
    return(
        <form className='addForm' onSubmit={handleValues}>
        <TextField id="outlined-basic" label="Enter Name" variant="outlined" name='name' ref={nameRef}/>
        <TextField id="outlined-basic" label="Enter Email" variant="outlined" name='email' ref={emailRef}/>
        <TextField id="outlined-basic" label="Enter Phone no" variant="outlined" name='phone' ref={phoneRef}/>

       <Button varient='outlined' color='success' startIcon={<AddIcon />}>Add</Button>
    
      
       </form>
    
    );
}
export default Table
