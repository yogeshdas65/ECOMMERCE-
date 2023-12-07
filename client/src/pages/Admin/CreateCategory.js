import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updateName, SetUpdatedName] = useState("");
  const [selected, setSelected] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/vi/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is Created`);
        getAllCategory();
      }
    } catch (error) {}
  };
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/vi/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
      }
      console.log(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting error");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //update category
  const handleUpdated = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/vi/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data?.success) {
        toast.success(`${updateName} is Updated`);
        setSelected(null);
        SetUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/vi/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`One Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {categories?.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>
                        <button
                          className="btn btn-info ms-2"
                          onClick={() => {
                            setVisible(true);
                            SetUpdatedName(item.name);
                            setSelected(item);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={SetUpdatedName}
              handleSubmit={handleUpdated}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
