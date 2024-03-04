import React from 'react'
import { useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Joi from 'joi';

 
export default function Login(props) {
    const [isLoading,setIsLoading]=useState(false);
    const [validateError,setvalidateError]=useState([]);
    const [error,setError]=useState('')
    const [user,setUser]=useState(
        {
            email:'',
            password:''
        }
    )
    let navigate=useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('userToken')){
            navigate('/home')
        }
        
    }, [])

    function getUserData(e){
        let userData ={...user};
        userData[e.target.name]=e.target.value;
        setUser(userData);
    }
    function setValidationR(){
        let schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','org'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
            })
            return schema.validate(user,{abortEarly:false});
    }
    async function setApiData(e){
        e.preventDefault();
        let ValidationR = setValidationR()
        setIsLoading(true)
        
        if(ValidationR.error){
            setvalidateError(ValidationR.error.details)
            setIsLoading(false)
        }else{
            let response= await Axios.post(`https://movies-api.routemisr.com/signin`,user);
            if(response.data.message==='success'){
                localStorage.setItem('userToken',response.data.token);
                props.getToken();
                navigate('/home')
                setIsLoading(false)
            }else{
                setError(response.data.message);
                setIsLoading(false)
            }
        }
    }
    return (
        < >
            <div className='w-75 mx-auto mt-5'>
                <h2 className='pt-5 pb-3'>Login Form</h2>
                <form onSubmit={setApiData} className='form-rej'>
                   
                    {validateError.map((valierror,i)=>i===1?<div key={i} className='alert alert-danger'>password is invalid</div>:<div key={i} className='alert alert-danger'>{valierror.message}</div>)}
                    {error?<div className='alert alert-danger'>{error}</div>:<div></div>}

                    <label className='mt-4' htmlFor='email'>Email:</label>
                    <input onChange={getUserData} className='form-control mt-2' id='email' type='email' name='email'/>

                    <label className='mt-4' htmlFor='password'>password:</label>
                    <input onChange={getUserData} className='form-control mt-2' id='password' type='password' name='password'/>

                    <button  className='btn btn-outline-info d-block mt-4'> {isLoading?<i className='fas fa-spin fa-spinner'></i>:'Login'}</button>
                </form>
            </div>
        </>
    )
}
