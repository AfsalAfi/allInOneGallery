import React, { useState } from 'react'
import bgImg from '../assets/images/img1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css"

export default function SignUp() {

    // const { register, handleSubmit, formState: { errors } } = useForm()
    // const onSubmit = data => console.log(data);
    const [data, setData] = useState({
        userName:"",
        password:"",
        mobileNumber:""
    })
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTaget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    
    const handleSubmit =async(e) => {
        e.preventDefault();
        try {
            const url = "https://localhost:3000/api/users";
            const { data: res } = await axios.post(url, data);
            console.log(res.message);
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
               setErr(err.response.data.message) 
            }
        }
    };

  return (
    <section>
        <div className="register">
            <div className="col-1">
                <h2>Sign In</h2>
                <span>register and enjoy the service</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                      <input type="text"  placeholder='username' name='userName' value={data.userName} onChange={handleChange} />
                    <input type="text"  placeholder='password' name='password' value={data.password} onChange={handleChange} />
                    <input type="text"  placeholder='confirm password' name='password' value={data.password} onChange={handleChange} />
                    <input type="text"  placeholder='mobile number' name='mobileNumber' value={data.mobileNumber} onChange={handleChange} />
                      {err && <div>{ err }</div>}
                      <link rel="stylesheet" href="/login" >
                    <button className='btn'>Sign In</button>
                      </link>
                  </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
  )
}