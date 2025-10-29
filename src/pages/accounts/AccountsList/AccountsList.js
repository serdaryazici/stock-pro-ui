"use client";
import { useNavigate } from "react-router-dom";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";

const AccountsList = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: "fa-solid fa-users",
      title: "Toplam Cari",
      value: "156",
      detail: "Aktif hesap sayısı",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: "fa-solid fa-building",
      title: "Müşteriler",
      value: "89",
      detail: "Alıcı hesapları",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      icon: "fa-solid fa-truck",
      title: "Tedarikçiler",
      value: "67",
      detail: "Satıcı hesapları",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      icon: "fa-solid fa-lira-sign",
      title: "Toplam Bakiye",
      value: "₺1.2M",
      detail: "Net cari bakiye",
      bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
  ];

  const accountsData = [
    {
      id: 1,
      code: "CRI001",
      name: "ABC Teknoloji Ltd.",
      type: "customer",
      phone: "+90 212 555 0123",
      email: "info@abcteknoloji.com",
      balance: 125000,
      status: "active",
    },
    {
      id: 2,
      code: "CRI002",
      name: "Ahmet Yılmaz",
      type: "customer",
      phone: "+90 532 123 4567",
      email: "ahmet.yilmaz@email.com",
      balance: -15000,
      status: "active",
    },
    {
      id: 3,
      code: "TDR001",
      name: "XYZ Tedarik A.Ş.",
      type: "supplier",
      phone: "+90 216 444 5555",
      email: "satis@xyztedarik.com",
      balance: -85000,
      status: "active",
    },
    {
      id: 4,
      code: "CRI003",
      name: "Fatma Demir",
      type: "customer",
      phone: "+90 533 987 6543",
      email: "fatma.demir@email.com",
      balance: 45000,
      status: "active",
    },
    {
      id: 5,
      code: "TDR002",
      name: "DEF Malzeme Ltd.",
      type: "supplier",
      phone: "+90 312 777 8888",
      email: "info@defmalzeme.com",
      balance: -120000,
      status: "inactive",
    },
    {
      id: 6,
      code: "CRI004",
      name: "Mehmet Kaya",
      type: "customer",
      phone: "+90 535 111 2222",
      email: "mehmet.kaya@email.com",
      balance: 78000,
      status: "active",
    },
    {
      id: 7,
      code: "TDR003",
      name: "GHI Lojistik A.Ş.",
      type: "supplier",
      phone: "+90 232 333 4444",
      email: "info@ghilojistik.com",
      balance: -45000,
      status: "active",
    },
  ];

  const columns = [
    { key: "code", label: "Cari Kodu" },
    { key: "name", label: "Cari Adı" },
    {
      key: "type",
      label: "Tip",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item === "customer"
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {item === "customer" ? "Müşteri" : "Tedarikçi"}
        </span>
      ),
    },
    { key: "phone", label: "Telefon" },
    { key: "email", label: "E-posta" },
    {
      key: "balance",
      label: "Bakiye",
      render: (item) => (
        <span
          className={`font-semibold ${
            item >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₺{Math.abs(item).toLocaleString("tr-TR")}{" "}
          {item >= 0 ? "(A)" : "(B)"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Durum",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
            item.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {item.status === "active" ? "Aktif" : "Pasif"}
        </span>
      ),
    },
  ];

  const filters = [
    {
      key: "type",
      label: "Tüm Tipler",
      title: "Cari Hesap Listesi",
      options: [
        { value: "customer", label: "Müşteri" },
        { value: "supplier", label: "Tedarikçi" },
      ],
      filterFn: (item, value) => item.type === value,
    },
    {
      key: "status",
      label: "Tüm Durumlar",
      options: [
        { value: "active", label: "Aktif" },
        { value: "inactive", label: "Pasif" },
      ],
      filterFn: (item, value) => item.status === value,
    },
  ];

  const handleEdit = (account) => {
    console.log("Edit account:", account);
  };

  const handleDelete = (account) => {
    console.log("Delete account:", account);
  };

  const handleView = (account) => {
    console.log("View account:", account);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          className="px-4 py-2 flex-initial"
          variant="primary"
          onClick={() => navigate("/accounts/add")}
          icon="fa-solid fa-plus"
        >
          Yeni Cari Hesap
        </Button>
        <Button 
          className="px-4 py-2 flex-initial"
          variant="secondary" 
          icon="fa-solid fa-upload"
        >
          İçe Aktar
        </Button>
        <Button 
          className="px-4 py-2 flex-initial"
          variant="outline" 
          icon="fa-solid fa-download"
        >
          Dışa Aktar
        </Button>
      </div>

      <Table
        data={accountsData}
        columns={columns}
        filters={filters}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        itemsPerPage={10}
      />
    </div>
  );
};

export default AccountsList;