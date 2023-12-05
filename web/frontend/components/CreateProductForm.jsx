import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useAppMutation, useAppQuery } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateProductForm() {
const queryClient=useQueryClient();
const[formData, setFormData]=useState({
  title : "",
  status : "active",
  vendor : "sample django app"
})

  const {mutate:create,isLoading }=useAppMutation({url:'/api/products/create', method:'POST', reactQueryOptions:{
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({queryKey:(['products'])})
    }
  }});


  const handleSubmit = async () => {
    if (isLoading) return;
    try {
         create(formData);
         console.log(formData)
         
    } catch (error) {
         console.log(error);
    }
};
  // const handleNewsLetterChange = useCallback(
  //   (value) => setNewsletter(value),
  //   [],
  // );

  const handleTitleChange = useCallback((value) => setFormData(data=>({...data,title:value})), []);
  const handleVendorChange = useCallback((value) => setFormData(data=>({...data,vendor:value})), []);
  const handleStatusChange = useCallback((value) => setFormData(data => ({...data,status:value})), []);

  return (
    <Form onSubmit={handleSubmit}>
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

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}