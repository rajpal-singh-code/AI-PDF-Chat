function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (

    <div className="w-full bg-[#071127] border-b border-[#1b2942] px-4 md:px-6 py-4 flex items-center justify-between">

      <div>

        <h1 className="text-xl md:text-2xl font-bold text-white">
          DocuMind
        </h1>

        <p className="text-gray-400 text-xs md:text-sm">
          AI PDF Intelligence
        </p>

      </div>

      <button
        onClick={handleLogout}
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm md:text-base px-4 md:px-5 py-2 rounded-xl transition-all duration-300"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;