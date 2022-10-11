import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert';

function Home() {
    const students = useSelector((state) => state);
    //console.log(students);

    const dispatch = useDispatch();
    const history = useNavigate();

    const deleteStudent = (id) =>{
        Swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((Response) => {
          if(Response) {
            console.log(Response);
            dispatch({ type: "DELETE_STUDENT", payload: id });
            toast.success(`Student deleted succesfuly`);
          }
        });
         
         //permet to navigate to home page
         history("/");
    }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/add" className="btn btn-outline-dark">
            Add Student
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <h1 className="text-center">
            {" "}
            Bienvenue sur Manager Student
          </h1>
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students ? (
                students.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phoneNumber}</td>
                    <td>
                      <Link
                        to={`edit/${student.id}`}
                        className="btn btn-small btn-primary mr-2 m-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteStudent(student.id)}
                        type="button"
                        className="btn btn-small btn-danger mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>List is empty!!!!</h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home