import React from "react";
import {
     Button,
     Modal,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import CreateProductForm from "./CreateProductForm";
import { useAppQuery } from "../hooks";
import EditProductForm from "./EditProductForm";
import UpdateProductForm from "./UpdateProductForm";

const UpdateProduct = ({data, prevData}) => {
    // console.log(data)
//     console.log(prevData)
     const [active, setActive] = useState(false);

     const handleChange = useCallback(() => {
          setActive(!active), 
          [active]
     });


     const activator = <Button onClick={handleChange}>Edit</Button>;

     
    

     return (
          <div style={{ height: "fit-content" }}>
               <Modal
                    activator={activator}
                    open={active}
                    onClose={handleChange}
                    title="Create New Product">
                    <Modal.Section>
                        <UpdateProductForm d = {data} p = {prevData} />
                    </Modal.Section>
               </Modal>
          </div>
     );
};

export default UpdateProduct;