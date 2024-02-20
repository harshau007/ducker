
import Sidebar from './Sidebar';

function NoImage() {
    return (
        <section className="bg-black text-white h-screen flex flex-row  ">
            <Sidebar />
            <div className=" w-[80%] h-[100%] flex justify-center items-center">
                <p className="text-3xl text-gray-300 opacity-50 hover:opacity-55">Please select a container</p>
            </div>
        </section>
    )
}
export default NoImage;