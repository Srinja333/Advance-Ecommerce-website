import React from "react";
import Menu from './Menu';
import '../styles.css';

const Layout = ({ title = "Title", description = "Description",className="col-md-12",children}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className} >{children}</div> {/* without children in page there not show any form fields */}
  </div>
  
);


export default Layout;

