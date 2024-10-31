import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Services", link: "/services" },
  { name: "Contact Us", link: "/contact-us" },
];

const NavBar = () => {
  return (
    <div className="flex justify-between items-center h-12 px-10 text-blue-600 hover:shadow-lg">
      <Link
        to={"/"}
        className="flex items-center gap-3 hover:scale-110 hover:ease-in-out duration-150 active:text-blue-800">
        <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" />
        <span>Tasks CRUD</span>
      </Link>

      <div className="flex gap-5">
        {navLinks.map((item, index) => {
          return (
            <Link
              to={item.link}
              key={index}
              className="hover:scale-110 hover:ease-in-out duration-150 active:text-blue-800 focus:underline focus:underline-offset-[5px] focus:text-blue-600">
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-5 ">
        <Link to={"/sign-in"}>
          <button className="text-white px-3 py-1.5 bg-blue-600 rounded hover:scale-110 hover:ease-in-out duration-150 active:bg-blue-700 ">
            Sign In
          </button>
        </Link>
        <Link to={"/sign-up"}>
          <button className="text-white px-3 py-1.5 bg-blue-600 rounded hover:scale-110 hover:ease-in-out duration-150 active:bg-blue-700">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
