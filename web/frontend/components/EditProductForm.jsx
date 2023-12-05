import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useAppMutation, useAppQuery } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function EditProductForm({d}) {
    console.log(d)
const queryClient=useQueryClient();

  const {mutate:update }=useAppMutation({url:'/api/products/update', method:'POST', reactQueryOptions:{
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({queryKey:(['products'])})
    }
  }});
  const {mutate:del }=useAppMutation({url:'/api/products/delete', method:'POST', reactQueryOptions:{
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({queryKey:(['products'])})
    }
  }});

const deleteProduct = async ()=>{
  try{
    del(d)
    console.log(d)
  }
  catch(error){
    console.log(error)
  }
}


  return (<>

    <Button onClick={deleteProduct}>Delete</Button>
    </>

  );
}