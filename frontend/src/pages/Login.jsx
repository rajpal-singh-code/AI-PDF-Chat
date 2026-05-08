// Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await API.post("/login", formData);

      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Login Success");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.error || "Login Failed");
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
            <h1 className="text-3xl font-bold">AI PDF Chat</h1>

            <div>
              <h2 className="text-4xl font-bold leading-tight mb-6">
                “Simply all the tools that my team and I need.”
              </h2>

              <p className="font-semibold text-lg">Karen Yue</p>

              <span className="text-sm text-gray-200">
                Director of Digital Marketing Technology
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8 md:p-14">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
              Welcome back to AI PDF Chat
            </h1>

            <p className="text-center text-gray-500 mb-8">
              Build your design system effortlessly with our powerful component
              library.
            </p>

            <div className="mb-5">
              <label className="text-sm text-gray-600">Email</label>

              <input
                type="email"
                name="emailId"
                placeholder="alex.jordan@gmail.com"
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {/* PASSWORD */}

            <div className="mb-3">
              <label className="text-sm text-gray-600">Password</label>

              <input
                type="password"
                name="password"
                placeholder="********"
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-violet-600 font-medium">
                Forgot password?
              </a>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Remember</span>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />

                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-violet-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>


            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-full font-semibold transition duration-300"
            >
              Log in
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t"></div>

              <span className="px-4 text-gray-400 text-sm">OR</span>

              <div className="flex-1 border-t"></div>
            </div>

            <button
              type="button"
              className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-full font-medium transition"
            >
              Continue with Google
            </button>

            <p className="text-center text-gray-500 mt-8">
              Don’t have an account?
              <Link to="/signup" className="text-violet-600 font-semibold ml-1">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
