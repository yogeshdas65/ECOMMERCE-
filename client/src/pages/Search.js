import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();

  const resultsLength = values?.results?.length || 0;
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {resultsLength === 0
              ? "No Products Found"
              : `Found ${resultsLength} Products`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/vi/product/product-photo/${p._id}`}
                  classname="card-img-top"
                  alt={p.name}
                />
                <div classname="card-body">
                  <h5 classname="card-title">{p.name}</h5>
                  <a classname="card-text">{p.describtion}</a>
                  <div classname="card-body">
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cards
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
