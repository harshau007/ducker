import { useState } from "react";
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Sidebar from "./Sidebar";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
import Graph3 from "./Graph3";
import ViewMore from "./ViewMore";

const SECTIONS = [
  { name: 'CPU USAGE', component: Graph1 },
  { name: 'RAM USAGE', component: Graph2 },
  { name: 'NETWORK USAGE', component: Graph3 },
];

function WithImage() {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState(SECTIONS[0].name);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section className="flex gap-8 bg-black text-white h-screen">
      <Sidebar dataId={id} />
      <div className="w-[85%]">
        <div className="flex gap-10 justify-around mt-6 mb-3 text-white">
          {SECTIONS.map(({ name }) => (
            <div
              key={name}
              className={`bg-[#121212] p-4 rounded-md cursor-pointer transition-colors duration-200 ease-in-out ${activeSection === name ? 'border-b-4 border-blue-500 opacity-100' : 'opacity-50'}`}
              onClick={() => setActiveSection(name)}
            >
              {name}
            </div>
          ))}
        </div>
        {SECTIONS.map(({ name, component: Component }) => (
          activeSection === name && (
            <div key={name} className="bg-[#121212] mr-5 rounded-md transition-all duration-200 ease-in-out">
              <Component id={id} />
            </div>
          )
        ))}
        <div className="flex justify-center mt-4">
          <button onClick={() => setModalIsOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View More
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              transition: 'opacity 1s ease-in-out'
            },
            content: {
              color: 'lightsteelblue',
              backgroundColor: '#121212',
              transition: 'all 1s ease-in-out'
            }
          }}
          contentLabel="Example Modal"
        >
          <div className="flex justify-end">
            <button onClick={() => setModalIsOpen(false)} className="text-2xl font-bold">
              ×
            </button>
          </div>
          <ViewMore id={id} />
        </Modal>
      </div>
    </section>
  );
}

export default WithImage;
