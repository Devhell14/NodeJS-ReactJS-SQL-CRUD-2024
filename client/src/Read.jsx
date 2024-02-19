import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/read/${id}`)
      .then((res) => {
        // console.log(res);
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Student Detail</h2>
              <table className="table">
                <tbody>
                  {student && (
                    <>
                      <tr>
                        <th>ID</th>
                        <td>{student.id}</td>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <td>{student.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{student.email}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <Link to="/" className="btn btn-primary me-2">
                  Back
                </Link>
             
                <Link to={`/edit/${student.id}`} className="btn btn-info">
  Edit
</Link>

        
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
