import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormRegistration = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formType,setFormType] = useState(true);
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authorization="))
    ?.split("=")[1];
    console.log("signUp",cookieValue);

    if(cookieValue){
      navigate('/bar');
    }
  },[])

  function handleFormToggle(e){
   e.preventDefault();
   setFormType(!formType);
  }

  async function formRegisterHandler(e){
    e.preventDefault();
     try {
      console.log("i am called",{name:userName,email,password});
      const newUser = await fetch("https://data-app-backend.vercel.app/user/register",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:userName,
            email: email,
            password: password
        })
    });
      const json = await newUser.json();
      console.log(json);
     } catch (error) {
      console.log(error);
     }
  };

 async function loginHandler(e){
    console.log("login handler");
    e.preventDefault();
    try {
     console.log("i am called",{email,password});
     const user = await fetch("https://data-app-backend.vercel.app/user/login",{
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           email: email,
           password: password
       })
   });
     const res = await user.json();
     if(res.success){
       document.cookie = `Authorization=${res.token};`;
       navigate("/bar")
       console.log(res);
     }
    } catch (error) {
     console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white">Dark Mode : &nbsp;</h3>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-white"
        }  w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {(formType)?"Register for a free account":"Login"}
        </h1>
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {(formType) ? (<input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}
                placeholder="Your first name"
              />):null}
            </div>
            <input
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
           type="text" placeholder="password"
           value={password}
           onChange={(e)=>{setPassword(e.target.value)}}
           />
            <button onClick={(formType)?formRegisterHandler:loginHandler} className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">
              {(formType)?"Register":"LogIn"}
              </span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              {(formType)?"Already have an account?":"Create new account"}
              {" "}
              <a href="">
                <span onClick={handleFormToggle} className="text-[#E9522C] font-semibold">{(formType)?"Login":"Register"}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormRegistration;
