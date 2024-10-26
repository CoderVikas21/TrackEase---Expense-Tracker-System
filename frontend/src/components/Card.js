import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import {remove, subAmount} from '../redux/slices/List'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios'
const Card = ({id,item,fetchItems,setData}) => {

    const [edit,setEdit] = useState(false);

    const dispatch = useDispatch();
    
    async function deletehandler(){

        toast.error("Item Removed")

        try{
            const response =  await axios.post('http://localhost:8000/api/v1/deleteItem', {
            name: item.name,
        });
        console.log('Item Deleted:', response.data);
        }
        catch(e){
           console.log("error in deleting item" , e.message)
        }
        finally{
          fetchItems();
        }
    }
    function edithandler(){
      setEdit(!edit);
    }
    function editclicked(){
      try{
        const currentItem = { name: item.name, cost: item.cost };
        deletehandler()
        setData(currentItem);
      }
      catch(e){
        toast.error("Error in editing data")
      }
    }

  return (
    <div className='card_container'>
        <div className="card_item_1">
            <p>{item.name}</p>
            <p style={{color:'green'}}>Rs.{item.cost}</p>
        </div>
        <div className="card_item_2">
          <div className="delete" onClick={deletehandler}><MdDelete /></div>
          <span onClick={edithandler}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="edit" 
              style={{display:edit?('block'):('none')}} onClick={editclicked}
            >Edit</div>
          </span>
        </div>
    </div>
  )
}

export default Card
