import React from "react";
import {
     Button,
     Modal,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import CreateProductForm from "./CreateProductForm";
import { useAppQuery } from "../hooks";
import EditProductForm from "./EditProductForm";

const EditProduct = ({data}) => {
    // console.log(data)
     const [active, setActive] = useState(false);

     const handleChange = useCallback(() => {
          setActive(!active), 
          [active]
     });


     const activator = <Button onClick={handleChange}>Create {data}</Button>;

     
    

     return (
          <div style={{ height: "fit-content" }}>
               <Modal
                    activator={activator}
                    open={active}
                    onClose={handleChange}
                    title="Create New Product">
                    <Modal.Section>
                        <EditProductForm d = {data}></EditProductForm>
                    </Modal.Section>
               </Modal>
          </div>
     );
};

export default EditProduct;