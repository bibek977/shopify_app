import {Form, FormLayout, Checkbox, TextField, Button,Toast,Frame,Spinner} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useAppMutation, useAppQuery } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateProductForm() {
  const [active,setActive] = useState(false)
  const [message,setMessage] = useState('product created')

const queryClient=useQueryClient();
const[formData, setFormData]=useState({
  title : "",
  status : "",
  vendor : ""
})

  const {mutate:create,isLoading }=useAppMutation({url:'/api/products/create', method:'POST', reactQueryOptions:{
    onSuccess:(data)=>{
      console.log(data);
      queryClient.invalidateQueries({queryKey:(['products'])});
      setMessage(data.products)
      toggleActive()
    }
  }});


  const handleSubmit = async () => {
    // if (isLoading) return;
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

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast content={message} onDismiss={toggleActive} duration={4500} />
  ) : null;
  return (
    <>
    <div style={{height: '300px'}}>

    <Frame>

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

        <Button submit>
          {isLoading?<Spinner accessibilityLabel="Small spinner example" size="small" />:"Create"}
        </Button>
      </FormLayout>
    </Form>
    {toastMarkup}
    </Frame>
    </div>

    </>

  );
}