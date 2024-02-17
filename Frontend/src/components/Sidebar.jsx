import { useState } from "react";
import { useEffect } from 'react';
import docker from '../assets/docker.svg'
import ducker from '../assets/Logo.png'
import axios from 'axios';


const Sidebar = () => {

    const [dockerData, setDockerData] = useState([])
    const [id, setId] = useState([]);
    const dockerFetch = async () => {
       const res = await axios.get('http://localhost:3000/docker')
       let test = [];
       let testId = [];
       for(let i = 0; i< res.data.length;i++) {
           let str = res.data[i].Names[0].slice(1)
           let newId = res.data[i].Id.slice(0, 10);
           test.push(str)
           testId.push(newId);
       }
       setDockerData(test)
       setId(testId);

   }

   useEffect(() => {
       dockerFetch();
   },[])

  return (

    <div className="w-[20%] border-1 bg-[#121212] flex flex-col gap-12">
                <div className='mt-5 flex items-center justify-center gap-8'>
                    <div>
                        <img className=' w-16 h-16' src={ducker} alt="" />
                    </div>
                    <div className="flex items-center"><a href="/" className="mt-5 ml-2 font-bold text-2xl">Ducker</a></div>
                </div>
                {dockerData.map((data, index) => (
                                <a href={`/docker/${id[index]}`} key={index}>
                                    <div className="flex gap-8 justify-center items-center hover:bg-blue-500 trans" >
                                    <div>
                                        <img className=' w-12' src={docker} alt="" />
                                    </div>
                                    <div className="">
                                        <p className='truncate text-xl'>
                                            {data}
                                        </p>
                                    </div>
                                </div>
                                </a>
                ))}

            </div>
  )
}

export default Sidebar