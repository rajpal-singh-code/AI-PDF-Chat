function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem('token')

    window.location.href = '/'
  }

  return (

    <div className='w-full h-17.5 bg-[#071127] border-b border-[#1b2942] px-6 flex items-center justify-between'>

      {/* LOGO */}

      <div>

        <h1 className='text-2xl font-bold text-white'>
          DocuMind
        </h1>

        <p className='text-gray-400 text-sm'>
          AI PDF Intelligence
        </p>

      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        className='bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-xl transition-all duration-300'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar