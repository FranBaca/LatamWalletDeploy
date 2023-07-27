import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";


function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          role="button"
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2  text-white flex flex-row items-center gap-3 rounded-full cursor-pointer hover: shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link to="/userProfile" className="flex flex-row p-2">
            <img src="images/Perfil.svg" alt="Perfil"/>
            <MenuItem label="Perfil" onClick={() => console.log("Login")} />
            </Link>
            <Link to="/transactions" className="flex flex-row p-2">
            <img src="images/Transferir.svg" alt="Perfil"/>
            <MenuItem label="Transferir Dinero"  />
            </Link>
            <Link to="/receive" className="flex flex-row p-2">
            <img src="images/Transferir.svg" alt="Perfil"/>
            <MenuItem label="Recibir Dinero"  />
            </Link>
            <div className="flex flex-row p-2">
            <img src="images/Salir.svg" alt="Perfil"/>
            <MenuItem label="Salir"  />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
