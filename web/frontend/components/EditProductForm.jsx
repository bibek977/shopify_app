import {Form, FormLayout, Checkbox, TextField, Button,Toast,Frame,Spinner} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useAppMutation, useAppQuery } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function EditProductForm({d}) {
  const [active,setActive] = useState(false)
    console.log(d)
const queryClient=useQueryClient();

const [message,setMessage] = useState('product deleted')

  const {mutate:del,isLoading }=useAppMutation({url:'/api/products/delete', method:'DELETE', reactQueryOptions:{
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({queryKey:(['products'])});
      setMessage(data.id);
      toggleActive()
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

const toggleActive = useCallback(() => setActive((active) => !active), []);
const toastMarkup = active ? (
  <Toast content={message} onDismiss={toggleActive} />
) : null;


  return (<>
  <div style={{height: '25px'}}>

    <Frame>
    <Button onClick={deleteProduct}>
      {isLoading?<Spinner accessibilityLabel="Small spinner example" size="small" />:"Delete"}
  </Button>
    {toastMarkup}
    </Frame>
  </div>
    </>

  );
}