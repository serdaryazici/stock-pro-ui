import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Input from "../../../components/Input";

const AccountsMovements = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    accountId: "",
    type: "",
    startDate: "",
    endDate: "",
  });

  const movements = [
    {
      id: 1,
      date: "2024-01-27",
      accountName: "ABC Teknoloji Ltd.",
      description: "Satış faturası",
      documentNo: "SF-2024-001",
      debit: 0,
      credit: 125000,
      balance: 125000,
      type: "credit",
    },
    {
      id: 2,
      date: "2024-01-26",
      accountName: "Ahmet Yılmaz",
      description: "Ürün satışı",
      documentNo: "SF-2024-002",
      debit: 0,
      credit: 35000,
      balance: 35000,
      type: "credit",
    },
    {
      id: 3,
      date: "2024-01-25",
      accountName: "Ahmet Yılmaz",
      description: "Nakit ödeme",
      documentNo: "NK-2024-001",
      debit: 50000,
      credit: 0,
      balance: -15000,
      type: "payment",
    },
    {
      id: 4,
      date: "2024-01-24",
      accountName: "XYZ Tedarik A.Ş.",
      description: "Malzeme alımı",
      documentNo: "AF-2024-001",
      debit: 85000,
      credit: 0,
      balance: -85000,
      type: "debit",
    },
    {
      id: 5,
      date: "2024-01-23",
      accountName: "ABC Teknoloji Ltd.",
      description: "Ek hizmet faturası",
      documentNo: "SF-2024-003",
      debit: 0,
      credit: 25000,
      balance: 150000,
      type: "credit",
    },
  ];

  const stats = [
    {
      icon: "fa-solid fa-arrow-up",
      title: "Toplam Alacak",
      value: "₺850,000",
      detail: "Bu ay: +₺125,000",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-arrow-down",
      title: "Toplam Borç",
      value: "₺650,000",
      detail: "Bu ay: +₺89,000",
      bgColor: "bg-red-500",
    },
    {
      icon: "fa-solid fa-exchange-alt",
      title: "Bu Ay Hareketler",
      value: "247",
      detail: "Geçen ay: 198",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-balance-scale",
      title: "Net Bakiye",
      value: "₺200,000",
      detail: "Alacak fazlası",
      bgColor: "bg-amber-500",
    },
  ];

  const columns = [
    { key: "date", label: "Tarih" },
    { key: "accountName", label: "Cari Hesap" },
    { key: "description", label: "Açıklama" },
    { key: "documentNo", label: "Belge No" },
    {
      key: "debit",
      label: "Borç",
      render: (row) => (
        <span className="text-red-600 font-semibold">
          {row > 0 ? `₺${row.toLocaleString("tr-TR")}` : "-"}
        </span>
      ),
    },
    {
      key: "credit",
      label: "Alacak",
      render: (row) => (
        <span className="text-green-600 font-semibold">
          {row > 0 ? `₺${row.toLocaleString("tr-TR")}` : "-"}
        </span>
      ),
    },
    {
      key: "balance",
      label: "Bakiye",
      render: (row) => (
        <span
          className={`font-semibold ${
            row >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₺{Math.abs(row).toLocaleString("tr-TR")}{" "}
          {row >= 0 ? "(A)" : "(B)"}
        </span>
      ),
    },
  ];

  const tableFilters = [
    {
      type: "select",
      label: "Cari Hesap",
      value: filters.accountId,
      onChange: (value) => setFilters({ ...filters, accountId: value }),
      options: [
        { value: "", label: "Tüm Hesaplar" },
        { value: "1", label: "ABC Teknoloji Ltd." },
        { value: "2", label: "Ahmet Yılmaz" },
        { value: "3", label: "XYZ Tedarik A.Ş." },
      ],
    },
    {
      type: "select",
      label: "Hareket Tipi",
      value: filters.type,
      onChange: (value) => setFilters({ ...filters, type: value }),
      options: [
        { value: "", label: "Tüm Hareketler" },
        { value: "debit", label: "Borç" },
        { value: "credit", label: "Alacak" },
        { value: "payment", label: "Ödeme" },
      ],
    },
  ];

  const handleEdit = (id) => {
    console.log("Edit movement:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete movement:", id);
  };

  const handleView = (id) => {
    console.log("View movement:", id);
  };

  const handleAddMovement = () => {
    console.log("Add new movement");
  };

  const handlePayment = () => {
    console.log("Record payment");
  };

  const handleExport = () => {
    console.log("Export movements");
  };

  const handleApplyFilters = () => {
    console.log("Apply filters:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      accountId: "",
      type: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cari Hesap
            </label>
            <Select
              value={filters.accountId}
              onChange={(e) =>
                setFilters({ ...filters, accountId: e.target.value })
              }
              options={[
                { value: "", label: "Tüm Hesaplar" },
                { value: "1", label: "ABC Teknoloji Ltd." },
                { value: "2", label: "Ahmet Yılmaz" },
                { value: "3", label: "XYZ Tedarik A.Ş." },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hareket Tipi
            </label>
            <Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              options={[
                { value: "", label: "Tüm Hareketler" },
                { value: "debit", label: "Borç" },
                { value: "credit", label: "Alacak" },
                { value: "payment", label: "Ödeme" },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Başlangıç Tarihi
            </label>
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bitiş Tarihi
            </label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="primary" onClick={handleApplyFilters} className="px-4 py-2 flex-initial">
            <i className="fas fa-filter mr-2"></i>
            Filtrele
          </Button>
          <Button variant="outline" onClick={handleClearFilters} className="px-4 py-2 flex-initial">
            <i className="fas fa-times mr-2"></i>
            Temizle
          </Button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button variant="primary" onClick={handleAddMovement}>
          <i className="fas fa-plus mr-2"></i>
          Yeni Hareket
        </Button>
        <Button variant="secondary" onClick={handlePayment}>
          <i className="fas fa-credit-card mr-2"></i>
          Ödeme Kaydet
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <i className="fas fa-download mr-2"></i>
          Dışa Aktar
        </Button>
      </div>

      <Table
        data={movements}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default AccountsMovements;
