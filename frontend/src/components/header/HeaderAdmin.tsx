import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const links = [
  { to: "/dashboard/game", label: "Gestión de juegos" },
  { to: "/dashboard/provider", label: "Gestión de proveedores" },
  { to: "/dashboard/user", label: "Gestión de usuarios" },
  { to: "/dashboard/purchase", label: "Gestión de compras" },
  { to: "/dashboard/sale", label: "Gestión de ventas" },
];

const HeaderAdmin = () => {
  return (
    <AppBar position="sticky" className="!bg-black !text-white !shadow-none">
      <Toolbar className="p-0">
        <nav className="w-full flex flex-col md:flex-row md:justify-evenly items-center gap-2 md:gap-0 py-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="no-underline text-white hover:text-yellow-400 transition-colors"
            >
              <div className="text-lg sm:text-lg tracking-tight font-extrabold text-start text-white font-['Roboto_Slab','Roboto',sans-serif]">
                {link.label}
              </div>
            </Link>
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAdmin;
