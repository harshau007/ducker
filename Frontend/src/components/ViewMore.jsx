import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewMore = ({id}) => {
    const [additionalInfo, setAdditionalInfo] = useState(null)
    const [message, setMessage] = useState([])
    const handelFunc = async () => {
        console.log(id);
        const res = await axios.get(`http://localhost:3000/docker/info/${id}`)
        const newres = await axios.get(`http://localhost:3000/docker/logs/${id}`)
        const data = res.data
        const newData = newres.data
        console.log(newData);
        let msg = []
        for(let i=0;i<= newData.length - 1;i++) {
            // console.log(newData[i]);
            if(newData[i] === "") {
                const str = "..."
                msg.push(str)
            }else {
                const str = newData[i] || "No Logs Available......"
                msg.push(str) 
            }
                       
        }
        setAdditionalInfo(res.data)
        setMessage(msg)
    }

    useEffect(() => {
        handelFunc();
    },[])
 
   if(additionalInfo) {
    return(<>
    <section className='p-4 h-full'>
        <div className='grid grid-cols-3 grid-rows-2 h-1/2 place-items-center text-lg font-semibold'>
        <div>
            Status : {additionalInfo.State.Status}
        </div>
        <div>
            PID : {additionalInfo.State.Pid}
        </div>
        <div>
            Restart Count : {additionalInfo.RestartCount}
        </div>
        <div>
            Image : {additionalInfo.Config.Image}
        </div>
        <div>
            Volumes : {additionalInfo.Config.Volumes || "null"}
        </div>
        <div>
            Gateway : {additionalInfo.NetworkSettings.Gateway}
        </div>
        </div>

        <div className='overflow-y-scroll h-1/2 bg-[#202020] rounded-md p-3'>
        {message.map((data,index) => (
            <p key={index}>{data}</p>
        ))}
        </div>
        
    </section>
    </>)
   }
    
  
}

export default ViewMore;