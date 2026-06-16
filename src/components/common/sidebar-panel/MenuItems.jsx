import { Link } from "react-router-dom";

const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Houses", href: "/grid-full-4-col" },
    { id: 2, title: "Apartments", href: "/grid-full-4-col" },
    { id: 3, title: "Townhouses", href: "/grid-full-4-col" },
    { id: 4, title: "Units", href: "/grid-full-4-col" },
    { id: 5, title: "Villas", href: "/grid-full-4-col" },
    { id: 6, title: "Acreage", href: "/grid-full-4-col" },
    { id: 7, title: "Land", href: "/grid-full-4-col" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link className="nav-link" to={item.href}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
