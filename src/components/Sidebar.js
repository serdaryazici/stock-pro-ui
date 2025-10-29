import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  {
    key: "stock",
    icon: "fa-solid fa-warehouse",
    title: "Stok Yönetimi",
    subItems: [
      {
        to: "/stock/movements",
        icon: "fas fa-exchange-alt",
        label: "Stok Hareketleri",
      },
      {
        to: "/stock/warehouse",
        icon: "fas fa-building",
        label: "Depo Yönetimi",
      },
      { to: "/stock/entry", icon: "fas fa-arrow-up", label: "Stok Giriş" },
      { to: "/stock/exit", icon: "fas fa-arrow-down", label: "Stok Çıkış" },
      {
        to: "/stock/critical",
        icon: "fas fa-exclamation-triangle",
        label: "Kritik Stok",
      },
    ],
  },
  {
    key: "customer",
    icon: "fas fa-users",
    title: "Müşteri Yönetimi",
    subItems: [
      { to: "/customer/list", icon: "fas fa-list", label: "Müşteri Listesi" },
      { to: "/customer/add", icon: "fas fa-user-plus", label: "Yeni Müşteri" },
    ],
  },
  {
    key: "accounts",
    icon: "fas fa-calculator",
    title: "Cari Hesaplar",
    subItems: [
      {
        to: "/accounts/list",
        icon: "fas fa-address-book",
        label: "Cari Listesi",
      },
      {
        to: "/accounts/movements",
        icon: "fas fa-exchange-alt",
        label: "Cari Hareketleri",
      },
      {
        to: "/accounts/balance",
        icon: "fas fa-balance-scale",
        label: "Cari Bakiye Raporu",
      },
    ],
  },
  {
    key: "invoice",
    icon: "fa-solid fa-file-invoice",
    title: "Faturalar/İşlemler",
    subItems: [
      {
        to: "/invoice/sales",
        icon: "fas fa-file-export",
        label: "Satış Faturası",
      },
      {
        to: "/invoice/purchase",
        icon: "fas fa-file-import",
        label: "Alış Faturası",
      },
      { to: "/invoice/list", icon: "fas fa-list-alt", label: "Fatura Listesi" },
      {
        to: "/invoice/payments",
        icon: "fas fa-money-bill-wave",
        label: "Tahsilat / Ödeme",
      },
    ],
  },
  {
    key: "reports",
    icon: "fa-solid fa-chart-bar",
    title: "Raporlar",
    subItems: [
      { to: "/reports/stock", icon: "fas fa-boxes", label: "Stok Raporu" },
      {
        to: "/reports/sales",
        icon: "fas fa-chart-line",
        label: "Satış Raporu",
      },
      {
        to: "/reports/purchase",
        icon: "fas fa-shopping-cart",
        label: "Alış Raporu",
      },
      {
        to: "/reports/balance",
        icon: "fas fa-balance-scale",
        label: "Cari Bakiye Raporu",
      },
    ],
  },
  {
    key: "settings",
    icon: "fa-solid fa-cog",
    title: "Ayarlar",
    subItems: [
      {
        to: "/settings/users",
        icon: "fas fa-users-cog",
        label: "Kullanıcı Yönetimi",
      },
      {
        to: "/settings/categories",
        icon: "fas fa-tags",
        label: "Ürün Kategorileri",
      },
      { to: "/settings/units", icon: "fas fa-ruler", label: "Birim Tanımları" },
    ],
  },
];

const Sidebar = ({ isCollapsed }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();
  const popoverRef = useRef(null);

  useEffect(() => {
    const foundMenu = menuItems.find((menu) => {
      if (menu.subItems) {
        return menu.subItems.some((item) =>
          location.pathname.startsWith(item.to)
        );
      }
      return menu.to && location.pathname.startsWith(menu.to);
    });
    setOpenSubmenu(foundMenu?.key || null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setHoveredMenu(null);
      }
    };

    if (hoveredMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hoveredMenu]);

  const toggleSubmenu = (menuKey) => {
    if (isCollapsed) {
      setHoveredMenu((prev) => (prev === menuKey ? null : menuKey));
    } else {
      setOpenSubmenu((prev) => (prev === menuKey ? null : menuKey));
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-800 text-white z-[1000] transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      <div className="p-6 border-b border-slate-700 flex items-center justify-center">
        <div className="flex items-center gap-3 text-xl font-bold">
          <i className="fa-solid fa-boxes text-amber-500 text-2xl"></i>
          {!isCollapsed && <span>Stok Pro</span>}
        </div>
      </div>

      <nav className="py-4">
        <ul className="list-none m-0 p-0">
          {menuItems.map((menu) => (
            <li key={menu.key} className="mb-1 relative">
              {menu.subItems ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(menu.key)}
                    className={`w-full flex items-center gap-3 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border-r-[3px] ${
                      openSubmenu === menu.key || hoveredMenu === menu.key
                        ? "border-amber-500 bg-slate-700"
                        : "border-transparent"
                    } ${isCollapsed ? "px-6 justify-center" : "px-6"}`}
                    title={isCollapsed ? menu.title : ""}
                  >
                    <i
                      className={`${menu.icon} ${
                        isCollapsed ? "text-lg" : "w-5"
                      } text-center flex-shrink-0`}
                    ></i>
                    {!isCollapsed && (
                      <>
                        <span>{menu.title}</span>
                        <i
                          className={`fas fa-chevron-down ml-auto text-sm transition-transform duration-300 ${
                            openSubmenu === menu.key ? "rotate-180" : ""
                          }`}
                        ></i>
                      </>
                    )}
                  </button>

                  {!isCollapsed && (
                    <ul
                      className={`list-none bg-slate-900 overflow-hidden transition-all duration-300 ${
                        openSubmenu === menu.key ? "max-h-[400px]" : "max-h-0"
                      }`}
                    >
                      {menu.subItems.map((item, i) => (
                        <li key={i}>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-6 py-3 pl-12 text-sm hover:bg-slate-800 transition-all ${
                                isActive
                                  ? "bg-slate-800 border-r-[3px] border-amber-500"
                                  : ""
                              }`
                            }
                          >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {isCollapsed && hoveredMenu === menu.key && (
                    <div
                      ref={popoverRef}
                      className="absolute left-[80px] top-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl min-w-[220px] z-[1001] py-2"
                    >
                      <div className="px-4 py-2 border-b border-slate-700 font-semibold text-sm text-amber-500">
                        {menu.title}
                      </div>
                      <ul className="list-none m-0 p-0">
                        {menu.subItems.map((item, i) => (
                          <li key={i}>
                            <NavLink
                              to={item.to}
                              onClick={() => setHoveredMenu(null)}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-all ${
                                  isActive
                                    ? "bg-slate-700 text-white border-l-2 border-amber-500"
                                    : ""
                                }`
                              }
                            >
                              <i className={item.icon}></i>
                              <span>{item.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={menu.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-all border-r-[3px] ${
                      isActive
                        ? "border-amber-500 bg-slate-700"
                        : "border-transparent"
                    } ${isCollapsed ? "px-6 justify-center" : "px-6"}`
                  }
                  title={isCollapsed ? menu.title : ""}
                >
                  <i
                    className={`${menu.icon} ${
                      isCollapsed ? "text-lg" : "w-5"
                    } text-center flex-shrink-0`}
                  ></i>
                  {!isCollapsed && <span>{menu.title}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
