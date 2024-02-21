import { useState, useEffect } from "react";
import docker from '../assets/docker.svg'
import ducker from '../assets/Logo.png'
import axios from 'axios';

const Sidebar = ({ dataId }) => {
    const [dockerData, setDockerData] = useState([])
    const [id, setId] = useState([]);

    const dockerFetch = async () => {
        const res = await axios.get('http://localhost:3000/docker')
        let test = [];
        let testId = [];
        for (let i = 0; i < res.data.length; i++) {
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
    }, [])

    return (
        <div className="w-full sm:w-[18%] border-1 bg-[#121212] flex flex-col p-5 overflow-auto">
            <div className='mt-5 p-2 flex items-center justify-center gap-8 mb-12'>
                <div>
                    <img className='w-18 h-18' src={ducker} alt="" />
                </div>
                <div className="flex items-center"><a href="/" className="mt-5 ml-2 font-bold text-5xl block text-transparent bg-clip-text bg-gradient-to-r from-blue-500  to-purple-500">Ducker</a></div>
            </div>
            {dockerData.map((data, index) => (
                <a href={`/docker/${id[index]}`} key={index} >
                    <div className={`p-2 flex gap-4 justify-between items-center rounded-md mb-4 ${id[index] == dataId ? "bg-blue-600" : " hover:bg-blue-500"}`} >
                        <div>
                            <img className='w-12 h-auto' src={docker} alt="" />
                        </div>
                        <div className="w-full">
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
