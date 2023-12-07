import React, { useState, useEffect } from "react";
import "../style/homepagestyle.css";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useCart();
  const [checked, setChecked] = useState([]);

  //get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/vi/category/get-category");
      console.log(" Category here it is", data.category);
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //getAll Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/vi/product/get-products");
      setProducts(data.products);
      console.log({ products });
    } catch (error) {
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="row mt-3">
        <div className="col-md-12">
          <h1 className="text-center"> All Products</h1>
          {/* {JSON.stringify(checked, null, 4)} */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-1" style={{ width: "18rem" }}>
                <img
                  src={`/api/vi/product/product-photo/${p._id}`}
                  classname="card-img-top"
                  alt={p.name}
                />
                <div classname="card-body">
                  <h5 classname="card-title">{p.name}</h5>
                  <a classname="card-text">{p.describtion}</a>
                  <h4>
                    Price:{" "}
                    {p.price.toLocaleString("en-Us", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h4>
                  <div classname="card-body">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product-details/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
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

export default HomePage;
