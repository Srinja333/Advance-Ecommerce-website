import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  //console.log("props", props);
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingelProduct = (productId) => {
    //read used to get single product from api, read in apiCore
    //console.log("pid:", productId);
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related  products
        console.log("data_id",data._id);
        listRelated(data._id).then((data) => {
          if (data.error) {
            //console.log("error",data.error);
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    //observation if i change productId to productI in route then we need to change below code to props.match.params.productI
    const productId = props.match.params.productId;
    //console.log("ue:", productId);
    loadSingelProduct(productId);
  }, [props]);
  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 100)}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {/* by card we can send product as props */}
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
  
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3" key={i} >
              <Card product={p} />
            </div>
          ))} 
        </div>
      </div>
    </Layout>
  );
};
export default Product;
