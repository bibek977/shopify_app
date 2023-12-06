import {Form, FormLayout, Checkbox, TextField, Button,Toast,Frame,Spinner} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import { useAppMutation, useAppQuery } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';

export default function UpdateProductForm({d,p}) {
  const [active,setActive] = useState(false)
  const [message,setMessage] = useState('product updated')

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
      queryClient.invalidateQueries({queryKey:(['products'])});
      setMessage(data.id)
      toggleActive()
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

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast content={message} onDismiss={toggleActive} />
  ) : null;
  
  return (
    <>
    {/* <Button onClick={updateProduct}>UPdate</Button> */}
    <div style={{height: '300px'}}>
<Frame>


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

<Button onClick={updateProduct}>
  {isLoading?<Spinner accessibilityLabel="Small spinner example" size="small" />:"Update"
  }
  </Button>
</FormLayout>
    </Form>

    {toastMarkup}
    </Frame>

  </div>
    </>
  );
}