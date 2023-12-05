import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useAppMutation, useAppQuery } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function UpdateProductForm({d,p}) {
    // console.log(d)
    // console.log(p)
const queryClient=useQueryClient();
const[formData, setFormData]=useState({
    id : d,
  title : p[0],
  status : p[2],
  vendor : p[1]
})
// console.log(formData)

  const {mutate:update,isLoading }=useAppMutation({url:'/api/products/update', method:'POST', reactQueryOptions:{
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({queryKey:(['products'])})
    }
  }});

  const updateProduct = async ()=>{
    try{
      update(formData)
      console.log(formData)
    }
    catch(error){
      console.log(error)
    }
  }



  const handleTitleChange = useCallback((value) => setFormData(data=>({...data,title:value})), []);
  const handleVendorChange = useCallback((value) => setFormData(data=>({...data,vendor:value})), []);
  const handleStatusChange = useCallback((value) => setFormData(data => ({...data,status:value})), []);

  return (
    <>
    {/* <Button onClick={updateProduct}>UPdate</Button> */}

    <Form onSubmit={updateProduct}>
    <FormLayout>

<TextField
  value={formData.title}
  onChange={handleTitleChange}
  label="Title"
  type="text"
  autoComplete="title"
  helpText={
    <span>

        Enter a product title : 
    </span>
  }
/>
<TextField
  value={formData.vendor}
  onChange={handleVendorChange}
  label="Vendor"
  type="text"
  autoComplete="Vendor"
  helpText={
    <span>

        Enter the Vendor of Product : 
    </span>
  }
/>
<TextField
  value={formData.status}
  onChange={handleStatusChange}
  label="Status"
  type="text"
  autoComplete="Staus"
  helpText={
    <span>

        Enter the Vendor of Product : 
    </span>
  }
/>

<Button onClick={updateProduct}>Update</Button>
</FormLayout>
    </Form>
   
    </>
  );
}