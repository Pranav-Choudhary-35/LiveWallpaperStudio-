import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 items-center flex justify-between py-6 px-10 shadow-lg">
      <h2 className="font-medium text-2xl text-blue-500">🎨 Media Search</h2>
      <div className="flex gap-5 text-xl items-center">
        <Link className="text-base font-medium active:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition" to='/'>Search</Link>
        <Link className="text-base font-medium active:scale-95 bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 transition" to='/collection'>Collection</Link>
      </div>
    </div>
  )
}

export default Navbar