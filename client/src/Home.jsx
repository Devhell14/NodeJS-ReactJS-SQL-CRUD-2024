import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to Delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/delete/${id}`);
      const updatedData = data.filter((student) => student.id !== id);
      setData(updatedData);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="rounded p-3">
        <h2 className="text-center">Student List</h2>
        <div className="d-flex justify-content-start">
          <Link to="/create" className="btn btn-success my-3">
            Create +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, i) => {
              return (
                <tr key={i}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link
                      to={`/read/${student.id}`}
                      className="btn btn-sm btn-info"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/edit/${student.id}`}
                      className="btn btn-sm btn-primary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
