import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className=" card w-75 p-3">
              <h1>Admin Name: {auth?.user?.name}</h1>
              <h1>Admin Email: {auth?.user?.email}</h1>
              <h1>Admin Number: {auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
