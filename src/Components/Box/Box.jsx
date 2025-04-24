import  { useState } from "react";
import PropTypes from 'prop-types';
Box.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="box lg:w-[40%] w-full">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    </>
  );
}
