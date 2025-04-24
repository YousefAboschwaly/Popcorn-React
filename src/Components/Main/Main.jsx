
import PropTypes from 'prop-types';
Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function Main({ children }) {
  return <main className="main flex flex-col lg:flex-row  justify-center gap-[2.4rem] lg:h-[calc(100vh-14.4rem)] h-full ">{children}</main>;
}


