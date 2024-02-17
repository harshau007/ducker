import { useState } from "react";

import Sidebar from "./Sidebar";


function WithImage(){
    const [showDiv1, setShowDiv1] = useState(true);
    const handleClick1 = () => {
        setShowDiv1(true);
        setShowDiv2(false);
        setShowDiv3(false);
    }
    const [showDiv2, setShowDiv2] = useState(false);
    const handleClick2 = () => {
        setShowDiv1(false);
        setShowDiv2(true);
        setShowDiv3(false);

    }
    const [showDiv3, setShowDiv3] = useState(false);
    const handleClick3 = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(true);
    }
    
    return(
        < section className="flex gap-8 bg-black text-white h-screen">

            
            <Sidebar />

        <div className="w-[85%] ">


            <div className="flex gap-10 justify-around">
            <div className="bg-[#121212] p-4 rounded-md cursor-pointer" onClick={handleClick1}>
                CPU USAGE
            </div>
            <div className="bg-[#121212] p-4 rounded-md cursor-pointer" onClick={handleClick2}>
                RAM USAGE  
            </div>
            <div className="bg-[#121212] p-4 rounded-md cursor-pointer" onClick={handleClick3}>
                NETWORK USAGE
            </div>
            </div>
            {
                showDiv1 && (
                <div className="bg-[#121212]">
                    GRAPH 1

                </div>)
            }
            {
                showDiv2 && (
                <div className="bg-[#121212]">
                    GRAPH 2

                </div>)
            }
            {
                showDiv3 && (
                <div className="bg-[#121212]">
                    GRAPH 3

                </div>)
            }


        </div>
        </section>

    )
}
export default WithImage;