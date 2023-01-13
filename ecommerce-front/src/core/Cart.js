import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    //setItems use for set items if present in localstorage if not then only save empty array
    setItems(getCart());
  }, [items]);

  const showItems = () => {
    return (
      <div>
        <h2>your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} />
        ))}
      </div>
    );
  };
  const noItemsMessage = () => (
    <h2>
      your cart is empty. <br /> <Link to="/shop"> continue shopping</Link>
    </h2>
  );
  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items.Add remove  checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr/>
          <Checkout products={items}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
