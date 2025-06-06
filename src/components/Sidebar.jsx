import { BarChart2, Menu, Settings, PersonStanding, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const DEFAULT_SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#9CA3AF",
    href: "/",
  },
  {
    name: "Users",
    icon: Users,
    color: "#9CA3AF",
    href: "/users",
  },
];

const STUDENT_SIDEBAR_ITEMS = [
  {
    name: "User",
    icon: PersonStanding,
    color: "#9CA3AF",
    href: "/user",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {

    const userRole = sessionStorage.getItem("token");
    if (userRole === "estudiante") {
      setSidebarItems(STUDENT_SIDEBAR_ITEMS);
    } else {
      setSidebarItems(DEFAULT_SIDEBAR_ITEMS);
    }
  }, []);

  return (
    <motion.div
      className="relative z-10 flex-shrink-0"
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{
                    color: item.color,
                    minWidth: "20px",
                  }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                      }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.1,
                      }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
