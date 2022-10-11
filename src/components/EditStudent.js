import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function EditStudent() {
    const {id}=useParams();
    const students = useSelector(state=>state);
    const dispatch = useDispatch();
    const history = useNavigate();

     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [phoneNumber, setPhoneNumber] = useState("");
    //student current
    const student = students.find(student=>student.id === parseInt(id));
     const inputRef = useRef(null);

    useEffect(() => {
        if(student){
           inputRef.current.focus();
           setName(student.name);
           setEmail(student.email);
           setPhoneNumber(student.phoneNumber);
        }
         
    }, [student]);

    const handelUpdate = e =>{
      e.preventDefault();

      const checkEmailExists = students.find(
        (student) => student.id !== parseInt(id) && student.email === email
      );
      if (!email || !name || !phoneNumber) {
        return toast.warning(`Please fill in all fields`);
      }
      if (checkEmailExists) {
        return toast.error(`Please this email already exists`);
      }
      const data = {
        id: student.id,
        name,
        email,
        phoneNumber,
      };

      //ajout
      dispatch({ type: "UPDATE_STUDENT", payload: data });
      toast.success(`Student updated succesfuly`);

      //permet to navigate to home page
      history("/");
    }    


  return (
    <div className="container">
      {student ? (
        <div className="row">
          <h1 className="display-3 my-3 text-center">
            Edit Student {student.name}
          </h1>
          <div className="col-md-6 shadow mx-auto p-5">
            <ToastContainer />
            <form onSubmit={handelUpdate}>
              <div className="form-group m-2">
                <input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={inputRef}
                />
              </div>

              <div className="form-group m-2">
                <input
                  type="text"
                  placeholder="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={inputRef}
                />
              </div>

              {/* <div className="form-group m-2">
              <input
                type="text"
                placeholder="phone number"
                className="form-control"
              />
            </div> */}

              <div className="form-group m-2">
                <input
                  type="text"
                  placeholder="phone number"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  ref={inputRef}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update student"
                  className="btn btn-dark m-2"
                />
                <Link to="/" className="btn btn-danger ml-3">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1 className="display-3 my-3 text-center">
          Oups!!! Student with id {id} not found
        </h1>
      )}
    </div>
  );
}

export default EditStudent