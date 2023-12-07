import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/vi/product/get-product/${params.slug}`
        );
        if (data.product) {
          setProduct(data.product);
          console.log(data.product);
        } else {
          console.log("Can't set the product");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.slug) {
      fetchData(); // Call the async function to fetch data
    }
  }, [params?.slug]);

  return (
    <>
      <Layout>
        <div className="row container mt-2">
          <div className="col-md-6 ">
            <img
              src={`/api/vi/product/product-photo/${product._id}`}
              classname="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 ">
            <h1 className="text-center">Products Details</h1>
            {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}
            <h6> Name: {product.name}</h6>
            <h6> Describtion: {product.describtion}</h6>
            <h6> Price: {product.price}</h6>

            <button className="btn btn-secondary ms-1">Add to Cards</button>
          </div>
        </div>
        <div className="row">Similar Products</div>
      </Layout>
    </>
  );
};

export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const params = useParams();
//   const [product, setProduct] = useState({});

//   //initial details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);

//   //getProducts
//   const getProduct = async () => {
//     try {
//       const { data } = axios.get(
//         `/api/vi/product/get-product/${params.slug}`
//       );
//       if (data.product) {
//         setProduct(data?.product);
//         console.log(product);
//       } else {
//         console.log("cant set the product");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Layout>
//         <div>
//           <h1>Procust dtailas</h1>
//           {JSON.stringify(product, null, 4)}
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default ProductDetails;
