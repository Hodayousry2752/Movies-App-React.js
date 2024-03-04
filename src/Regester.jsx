import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Joi from 'joi';

export default function Regester() {
    const [isLoading,setIsLoading]=useState(false);
    const [validateError,setvalidateError]=useState([]);
    const [error,setError]=useState('')
    const [user,setUser]=useState(
        {
            first_name:'',
            last_name:'',
            email:'',
            age:0,
            password:''
        }
    )
    let navigate=useNavigate();
    
    function getUserData(e){
        let userData ={...user};
        userData[e.target.name]=e.target.value;
        setUser(userData);
    }
    function setValidationR(){
        let schema = Joi.object({
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','org'] } }).required(),
            age:Joi.number().min(16).max(80).required(),
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
            let response= await Axios.post(`https://movies-api.routemisr.com/signup`,user);
            if(response.data.message==='success'){
                navigate('/login')
                setIsLoading(true)
            }else{
                setError(response.data.message);
                setIsLoading(false)

            }
        }
    
    }
    
    
    return (
        < >
        <div className='w-75 mx-auto mt-5'>
            <h2 className='pt-5 pb-3'>Rejesteration now</h2>
            <form onSubmit={setApiData} className='form-rej'>
               {validateError.length>0?validateError.map((valierror,i)=><div key={i} className='alert alert-danger'>{valierror.message}</div>):''}

                {error?<div className='alert alert-danger'>{error}</div>:<div></div>}

                <label htmlFor='first-name'>firstName:</label>
                <input onChange={getUserData} className='form-control mt-2' id='first_name' type='text' name='first_name'/>
                
                <label className='mt-4' htmlFor='last-name'>LastName:</label>
                <input onChange={getUserData} className='form-control mt-2' id='last_name' type='text' name='last_name'/>

                <label className='mt-4' htmlFor='email'>Email:</label>                
                <input onChange={getUserData} className='form-control mt-2' id='email' type='email' name='email'/>

                <label className='mt-4' htmlFor='age'>Age:</label>
                <input onChange={getUserData} className='form-control mt-2' id='age' type='number' name='age'/>

                

                <label className='mt-4' htmlFor='password'>password:</label>
                <input onChange={getUserData} className='form-control mt-2' id='password' type='password' name='password'/>

                <button  className='btn btn-outline-info d-block my-4 '>{isLoading?<i className='fas fa-spin fa-spinner'></i>:'Rejester'} </button>
            </form>
          </div>
        </>
    )
}
