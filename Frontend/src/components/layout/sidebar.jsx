import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  PlusCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const menuItems = [
    {
      title: "Produtos",
      url: "/produtos",
      icon: Package,
    },
    {
      title: "Cadastrar Produto",
      url: "/cadastrar",
      icon: PlusCircle,
    },
  ];

  return (
    <div
      className={`bg-white shadow h-screen transition-all ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      <div className="flex items-center p-4">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-100"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {isOpen && (
          <div className="ml-2 flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center border border-[#A4D0CD] rounded-lg">
              <img
                src="/Prodex.svg"
                alt="Logo"
                className="w-4 h-4 object-contain"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold">Prodex</span>
              <span className="text-xs">Sistema de gerenciamento</span>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className={`flex items-center gap-2 p-2 mb-1 rounded ${
              location.pathname === item.url
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon size={20} />
            {isOpen && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-2 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 w-full text-left rounded hover:bg-red-50 text-red-600"
        >
          <LogOut size={20} />
          {isOpen && "Sair"}
        </button>
      </div>
    </div>
  );
}
