import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsAll = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async (req, res) => {
    try {
      const { data } = await axios.get("/api/vi/product/get-products");
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error in fetch");
    }
  };

  //lifeCycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/vi/product/product-photo/${p._id}`}
                      classname="card-img-top"
                      alt={p.name}
                    />
                    <div classname="card-body">
                      <h5 classname="card-title">{p.name}</h5>
                      <a classname="card-text">{p.describtion}</a>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductsAll;
