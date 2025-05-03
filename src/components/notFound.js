import React from 'react'
import { CiWarning } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {

    const navigate=useNavigate();
  return (
    <div className='min-h-screen flex justify-center items-center border border-text_secondary_2 px-4'>
        <div className="lg:w-2/5 px-8 py-4 rounded-lg  w-full border border-text_secondary_2">
            <div className="flex justify-start gap-4">
                <div className="bg-secondary  text-text_secondary h-20 w-20 p-2 rounded-full text-center flex items-center">
                    <CiWarning size={50} className='w-20 h-20'/>
                </div>
                <div className="text-text_secondary text-4xl">
                    <h1 className="font-bold">Ooops!</h1>
                    <label className="text-sm">Page not found.</label>
                    <div className="flex w-full justify-start my-4">
                        <button className=" text-secondary text-sm p-2 bg-primary w-full" onClick={()=>navigate(-1,{replace:true})}>Go back</button>
                    </div>
                </div>
                
            </div>
           
        </div>
    </div>

  )
}

export default NotFound