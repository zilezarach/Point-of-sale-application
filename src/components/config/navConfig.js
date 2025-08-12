import { FcCustomerSupport, FcHome } from "react-icons/fc";
import { BiMaleFemale } from "react-icons/bi";
import { FaCreditCard, FaUser } from "react-icons/fa";
import { TbShoppingCartDollar } from "react-icons/tb";
import { FcManager } from "react-icons/fc";

export const navItems = [
  { label: "Home", icon: FcHome, route: "/admin" },
  { label: "Orders", icon: FcCustomerSupport, route: "/Orders" },
  { label: "Customers", icon: BiMaleFemale, route: "/Customers" },
  { label: "Transactions", icon: FaCreditCard, route: "/Transactions" },
  { label: "Users", icon: FaUser, route: "/Users" },
  {
    label: "Product Management",
    icon: TbShoppingCartDollar,
    route: "/admin/productMan",
  },
  {
    label: "Employee Management",
    icon: FcManager,
    route: "/admin/employeeMan",
  },
];
