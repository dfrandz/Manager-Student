import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

function AddStudent() {

    //les states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const students= useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleSubmit = e =>{
      e.preventDefault();
      
      //verification d'email existant
      const checkEmailExists = students.find(student => student.email === email && email);
      if(!email || !name || !phoneNumber){
        return toast.warning(`Please fill in all fields`);
      }
      if(checkEmailExists){
        return toast.error(`Please this email already exists`);
      }
      const data = {
        id: students[students.length - 1].id +1,
        name,
        email,
        phoneNumber,
      };

      // console.log(data);

      //ajout
      dispatch({ type: "ADD_STUDENT", payload: data });
      toast.success(`Student ${name} added succesfuly`);

      //permet to navigate to home page
      history('/');
    
    }

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 my-3 text-center">Add Student</h1>

        <div className="col-md-6 shadow mx-auto p-5">
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="form-group m-2">
              <input
                type="text"
                placeholder="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group m-2">
              <input
                type="text"
                placeholder="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="text"
                placeholder="phone number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="submit"
                value="add student"
                className="btn btn-block btn-dark form-control"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent