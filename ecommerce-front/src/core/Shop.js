import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(3);//prpduct lesss so use 3 but sir used 6
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        //console.log("error");
        setError(data.error);
      } else {
         //console.log("set");
        //console.log(data);
        setCategories(data);
         //console.log("data");
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    //console.log(newFilters);
    //console.log("entry")
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      console.log("entry1")
      if (data.error) {
        setError(data.error);
      } else {
        console.log("data");
        setFilteredResults(data.data);
        //console.log("size-->");
        //console.log(data.size);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    //console.log("skip"+skip);
    //console.log("limit"+limit);
    //console.log("lmore");
    let toSkip = skip + limit;
    ///console.log("toSkip"+toSkip);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      //console.log("filter");
      //console.log( myFilters.filters)
      if (data.error) {
        setError(data.error);
      } else {
        //console.log(filteredResults);
        //console.log(data.data);
        setFilteredResults([...filteredResults, ...data.data]);
        //console.log("after");
        //console.log(...filteredResults);
        //console.log(filteredResults);
        //console.log(filteredResults);
        //console.log([...filteredResults])
        //console.log([...filteredResults, ...data.data])
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          load more
        </button>
      )
    );
  };
  useEffect(() => {
    console.log("init");
    init();
    //console.log("stop");
    console.log("initial");
    loadFilteredResults(skip, limit, myFilters.filters);
    console.log("skip");
  }, []);

  const handleFilters = (filters, filterBy) => {
    //console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    //console.log(newFilters);
    newFilters.filters[filterBy] = filters;
    //console.log(typeof(filters));

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
      //console.log(priceValues);
    }

    //console.log(myFilters.filters);

    //console.log("gg");

    loadFilteredResults(myFilters.filters);

    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    //console.log(value);
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  // const x = (filters)=>{
  //   console.log("filters:"+filters);
  //   handleFilters(filters, "category")
  // }

  return (
    <Layout
      title="Shop Page"
      description="search and buy books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            {/* below will be show in list show we wrap it in unorder list */}

            <Checkbox
              categories={categories}
              handleFilters={(filters) =>
                handleFilters(filters, "category")
              }
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
