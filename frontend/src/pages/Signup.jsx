// Signup.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/signup", formData);

      // alert("Signup Success");

      navigate("/");

    } catch (err) {

      alert(err.response.data.error);
    }
  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-5">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div
          className="hidden lg:flex relative bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop')",
          }}
        >

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 flex flex-col justify-between p-10 text-white">

            <h1 className="text-3xl font-bold">
              AI PDF Chat
            </h1>

            <div>

              <h2 className="text-4xl font-bold leading-tight mb-6">
                “Simply all the tools that my team and I need.”
              </h2>

              <p className="font-semibold text-lg">
                Karen Yue
              </p>

              <span className="text-sm text-gray-200">
                Director of Digital Marketing Technology
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8 md:p-14">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >

            <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
              Create Account
            </h1>

            <p className="text-center text-gray-500 mb-8">
              Signup and start building amazing projects.
            </p>

            {/* FIRST NAME */}

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            {/* LAST NAME */}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            {/* EMAIL */}

            <input
              type="email"
              name="emailId"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            {/* PASSWORD */}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-full font-semibold transition duration-300"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500 mt-8">

              Already have an account?

              <Link
                to="/"
                className="text-violet-600 font-semibold ml-1"
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Signup;