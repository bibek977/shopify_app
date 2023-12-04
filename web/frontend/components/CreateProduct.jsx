import React from "react";
import {
     Button,
     Modal,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import CreateProductForm from "./CreateProductForm";
import { useAppQuery } from "../hooks";

const CreateProduct = () => {
     const [active, setActive] = useState(false);

     const handleChange = useCallback(() => {
          setActive(!active), 
          [active]
     });


     const activator = <Button onClick={handleChange}>Create</Button>;

     
    

     return (
          <div style={{ height: "fit-content" }}>
               <Modal
                    activator={activator}
                    open={active}
                    onClose={handleChange}
                    title="Create New Product">
                    <Modal.Section>
                         <CreateProductForm handleChange={handleChange}/>
                    </Modal.Section>
               </Modal>
          </div>
     );
};

export default CreateProduct;