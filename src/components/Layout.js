"use client";

import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const breadcrumbMap = {
  // 🏭 Stok Yönetimi
  "/stock/movements": [
    {
      label: "Stok Yönetimi",
      path: "/stock/movements",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Stok Hareketleri", path: "/stock/movements" },
  ],
  "/stock/movements/add": [
    {
      label: "Stok Yönetimi",
      path: "/stock/movements",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Stok Hareketleri", path: "/stock/movements" },
    { label: "Yeni Hareket Ekle", path: "/stock/movements/add" },
  ],
  "/stock/warehouse": [
    {
      label: "Stok Yönetimi",
      path: "/stock/warehouse",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Depo Yönetimi", path: "/stock/warehouse" },
  ],
  "/stock/warehouse/add": [
    {
      label: "Stok Yönetimi",
      path: "/stock/warehouse",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Depo Yönetimi", path: "/stock/warehouse" },
    { label: "Yeni Depo Ekle", path: "/stock/warehouse/add" },
  ],
  "/stock/entry": [
    {
      label: "Stok Yönetimi",
      path: "/stock/entry",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Stok Giriş", path: "/stock/entry" },
  ],
  "/stock/exit": [
    {
      label: "Stok Yönetimi",
      path: "/stock/exit",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Stok Çıkış", path: "/stock/exit" },
  ],
  "/stock/critical": [
    {
      label: "Stok Yönetimi",
      path: "/stock/critical",
      icon: "fa-solid fa-warehouse",
    },
    { label: "Kritik Stok", path: "/stock/critical" },
  ],

  // 👥 Müşteri Yönetimi
  "/customer/list": [
    {
      label: "Müşteri Yönetimi",
      path: "/customer/list",
      icon: "fa-solid fa-users",
    },
    { label: "Müşteri Listesi", path: "/customer/list" },
  ],
  "/customer/add": [
    {
      label: "Müşteri Yönetimi",
      path: "/customer/list",
      icon: "fa-solid fa-users",
    },
    { label: "Yeni Müşteri", path: "/customer/add" },
  ],
  "/customer/detail": [
    {
      label: "Müşteri Yönetimi",
      path: "/customer/list",
      icon: "fa-solid fa-users",
    },
    { label: "Müşteri Listesi", path: "/customer/list" },
    { label: "Müşteri Detay", path: "/customer/detail" },
  ],

  // 💰 Cari Hesaplar
  "/accounts/list": [
    {
      label: "Cari Hesaplar",
      path: "/accounts/list",
      icon: "fa-solid fa-calculator",
    },
    { label: "Cari Listesi", path: "/accounts/list" },
  ],
  "/accounts/movements": [
    {
      label: "Cari Hesaplar",
      path: "/accounts/list",
      icon: "fa-solid fa-calculator",
    },
    { label: "Cari Hareketleri", path: "/accounts/movements" },
  ],
  "/accounts/balance": [
    {
      label: "Cari Hesaplar",
      path: "/accounts/list",
      icon: "fa-solid fa-calculator",
    },
    { label: "Cari Bakiye Raporu", path: "/accounts/balance" },
  ],

  // 🧾 Faturalar / İşlemler
  "/invoice/sales": [
    {
      label: "Faturalar / İşlemler",
      path: "/invoices",
      icon: "fa-solid fa-file-invoice",
    },
    { label: "Satış Faturası", path: "/invoice/sales" },
  ],
  "/invoice/purchase": [
    {
      label: "Faturalar / İşlemler",
      path: "/invoices",
      icon: "fa-solid fa-file-invoice",
    },
    { label: "Alış Faturası", path: "/invoice/purchase" },
  ],
  "/invoice/list": [
    {
      label: "Faturalar / İşlemler",
      path: "/invoice/list",
      icon: "fa-solid fa-file-invoice",
    },
    { label: "Fatura Listesi", path: "/invoice/list" },
  ],
  "/invoice/payments": [
    {
      label: "Faturalar / İşlemler",
      path: "/invoices",
      icon: "fa-solid fa-file-invoice",
    },
    { label: "Tahsilat / Ödeme", path: "/invoice/payments" },
  ],

  // 📊 Raporlar
  "/reports": [
    { label: "Raporlar", path: "/reports", icon: "fa-solid fa-chart-bar" },
  ],
  "/reports/stock": [
    { label: "Raporlar", path: "/reports", icon: "fa-solid fa-chart-bar" },
    { label: "Stok Raporu", path: "/reports/stock" },
  ],
  "/reports/sales": [
    { label: "Raporlar", path: "/reports", icon: "fa-solid fa-chart-bar" },
    { label: "Satış Raporu", path: "/reports/sales" },
  ],
  "/reports/purchase": [
    { label: "Raporlar", path: "/reports", icon: "fa-solid fa-chart-bar" },
    { label: "Alış Raporu", path: "/reports/purchase" },
  ],
  "/reports/balance": [
    { label: "Raporlar", path: "/reports", icon: "fa-solid fa-chart-bar" },
    { label: "Cari Bakiye Raporu", path: "/reports/balance" },
  ],

  // ⚙️ Ayarlar
  "/settings": [
    { label: "Ayarlar", path: "/settings", icon: "fa-solid fa-cog" },
  ],
  "/settings/users": [
    { label: "Ayarlar", path: "/settings", icon: "fa-solid fa-cog" },
    { label: "Kullanıcı Yönetimi", path: "/settings/users" },
  ],
  "/settings/categories": [
    { label: "Ayarlar", path: "/settings", icon: "fa-solid fa-cog" },
    { label: "Ürün Kategorileri", path: "/settings/categories" },
  ],
  "/settings/units": [
    { label: "Ayarlar", path: "/settings", icon: "fa-solid fa-cog" },
    { label: "Birim Tanımları", path: "/settings/units" },
  ],
};

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const currentBreadcrumbs = breadcrumbMap[location.pathname] || [];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar isCollapsed={isCollapsed} />
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-[80px]" : "ml-[280px]"
        }`}
      >
        <Header
          breadcrumbs={currentBreadcrumbs}
          onToggleSidebar={toggleSidebar}
        />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
