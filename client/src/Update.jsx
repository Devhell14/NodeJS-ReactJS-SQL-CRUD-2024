import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/${id}`)
      .then((res) => {
        const { name, email } = res.data[0];
        setValues({ name, email });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/update/${id}`, values)
      .then((res) => {
        // console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 ">
    <div className="rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2 className="text-center">Update Student</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
