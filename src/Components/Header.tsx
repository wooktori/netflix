import { Link, useMatch } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
};

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const { scrollY } = useScroll();
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSearch = () => {
    setIsSearch((prev) => !prev);
  };

  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 80) setIsScroll(true);
    else setIsScroll(false);
  });

  useEffect(() => {
    if (isSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearch]);

  return (
    <div
      className={`flex fixed ${
        isScroll
          ? "bg-gradient-to-b from-black-first to-black-first"
          : "bg-gradient-to-b from-black to-inherit"
      } text-white w-full px-14 py-5 text-sm items-center justify-between transition-colors duration-500`}
    >
      <div className="flex gap-5 items-center">
        <motion.svg
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="95"
          height="25"
          viewBox="0 0 1024 276.742"
          className="fill-red"
        >
          <path
            className="stroke-white stroke-[10px]"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </motion.svg>
        <Link to="/" className="hover:text-white-second relative">
          홈
          {homeMatch && (
            <motion.div
              layoutId="circle"
              className="w-1 h-1 bg-red rounded-full absolute left-0 right-0 -bottom-2 m-auto"
            ></motion.div>
          )}
        </Link>
        <Link to="tv" className="hover:text-white-second relative">
          시리즈
          {tvMatch && (
            <motion.div
              layoutId="circle"
              className="w-1 h-1 bg-red rounded-full absolute left-0 right-0 -bottom-2 m-auto"
            ></motion.div>
          )}
        </Link>
      </div>
      <div className="flex items-center gap-4 relative">
        <motion.svg
          onClick={toggleSearch}
          animate={{ x: isSearch ? -225 : 0 }}
          transition={{ type: "linear" }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6 hover:cursor-pointer"
        >
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </motion.svg>
        <motion.input
          animate={{
            scaleX: isSearch ? 1 : 0,
            scale: isSearch ? 1 : 0,
            x: isSearch ? -185 : 0,
          }}
          transition={{ type: "linear" }}
          placeholder="제목, 사람, 장르"
          className="border-solid border-white border-1 px-2 py-1 absolute"
          ref={inputRef}
        />
      </div>
    </div>
  );
}
