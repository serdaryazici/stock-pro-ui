import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import SummaryCard from "../../../components/SummaryCard";

const AccountsBalance = () => {
  const navigate = useNavigate();
  const [reportDate, setReportDate] = useState("2024-01-27");
  const [accountTypeFilter, setAccountTypeFilter] = useState("");
  const [balanceFilter, setBalanceFilter] = useState("");

  const balanceData = [
    {
      id: 1,
      code: "CRI001",
      name: "ABC Teknoloji Ltd.",
      type: "Müşteri",
      debitBalance: 0,
      creditBalance: 125000,
      netBalance: 125000,
      lastMovement: "2024-01-27",
    },
    {
      id: 2,
      code: "CRI002",
      name: "Ahmet Yılmaz",
      type: "Müşteri",
      debitBalance: 50000,
      creditBalance: 35000,
      netBalance: -15000,
      lastMovement: "2024-01-25",
    },
    {
      id: 3,
      code: "TDR001",
      name: "XYZ Tedarik A.Ş.",
      type: "Tedarikçi",
      debitBalance: 85000,
      creditBalance: 0,
      netBalance: -85000,
      lastMovement: "2024-01-24",
    },
    {
      id: 4,
      code: "CRI003",
      name: "Fatma Demir",
      type: "Müşteri",
      debitBalance: 0,
      creditBalance: 45000,
      netBalance: 45000,
      lastMovement: "2024-01-22",
    },
    {
      id: 5,
      code: "TDR002",
      name: "DEF Malzeme Ltd.",
      type: "Tedarikçi",
      debitBalance: 120000,
      creditBalance: 0,
      netBalance: -120000,
      lastMovement: "2024-01-20",
    },
    {
      id: 6,
      code: "CRI004",
      name: "Mehmet Özkan",
      type: "Müşteri",
      debitBalance: 25000,
      creditBalance: 75000,
      netBalance: 50000,
      lastMovement: "2024-01-19",
    },
    {
      id: 7,
      code: "TDR003",
      name: "GHI Elektronik A.Ş.",
      type: "Tedarikçi",
      debitBalance: 95000,
      creditBalance: 15000,
      netBalance: -80000,
      lastMovement: "2024-01-18",
    },
  ];

  const totalDebit = balanceData.reduce(
    (sum, account) => sum + account.debitBalance,
    0
  );
  const totalCredit = balanceData.reduce(
    (sum, account) => sum + account.creditBalance,
    0
  );
  const netBalance = totalCredit - totalDebit;
  const activeAccounts = balanceData.length;

  const stats = [
    {
      icon: "fa-solid fa-arrow-up",
      title: "Toplam Alacak",
      value: `₺${totalCredit.toLocaleString("tr-TR")}`,
      detail: `${balanceData.filter((a) => a.creditBalance > 0).length} hesap`,
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-arrow-down",
      title: "Toplam Borç",
      value: `₺${totalDebit.toLocaleString("tr-TR")}`,
      detail: `${balanceData.filter((a) => a.debitBalance > 0).length} hesap`,
      bgColor: "bg-red-500",
    },
    {
      icon: "fa-solid fa-balance-scale",
      title: "Net Bakiye",
      value: `₺${Math.abs(netBalance).toLocaleString("tr-TR")}`,
      detail: netBalance >= 0 ? "Alacak fazlası" : "Borç fazlası",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-users",
      title: "Aktif Hesaplar",
      value: activeAccounts,
      detail: "Toplam cari sayısı",
      bgColor: "bg-amber-500",
    },
  ];

  const columns = [
    { key: "code", label: "Cari Kodu" },
    { key: "name", label: "Cari Adı" },
    { key: "type", label: "Tip" },
    {
      key: "debitBalance",
      label: "Borç Bakiye",
      render: (row) => (
        <span className="text-red-600">₺{row.toLocaleString("tr-TR")}</span>
      ),
    },
    {
      key: "creditBalance",
      label: "Alacak Bakiye",
      render: (row) => (
        <span className="text-green-600">₺{row.toLocaleString("tr-TR")}</span>
      ),
    },
    {
      key: "netBalance",
      label: "Net Bakiye",
      render: (row) => (
        <span
          className={
            row >= 0
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          ₺{Math.abs(row).toLocaleString("tr-TR")} {row >= 0 ? "(A)" : "(B)"}
        </span>
      ),
    },
    {
      key: "lastMovement",
      label: "Son Hareket",
      render: (row) => new Date(row).toLocaleDateString("tr-TR"),
    },
  ];

  const filters = [
    {
      key: "type",
      label: "Tüm Tipler",
      title: "Cari Bakiye Raporu",
      options: [
        { value: "Müşteri", label: "Müşteriler" },
        { value: "Tedarikçi", label: "Tedarikçiler" },
      ],
      filterFn: (item, value) => item.type === value,
    },
    {
      key: "netBalance",
      label: "Tüm Bakiyeler",
      options: [
        { value: "positive", label: "Alacaklı" },
        { value: "negative", label: "Borçlu" },
        { value: "zero", label: "Sıfır Bakiye" },
      ],
      filterFn: (item, value) => {
        if (value === "positive") return item.netBalance > 0
        if (value === "negative") return item.netBalance < 0
        if (value === "zero") return item.netBalance === 0
        return true
      },
    },
  ];

  const handleView = (id) => {
    navigate(`/accounts/details/${id}`);
  };

  const handleMovements = (id) => {
    navigate(`/accounts/movements?accountId=${id}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    alert("PDF dışa aktarma özelliği yakında eklenecek");
  };

  const handleExportExcel = () => {
    alert("Excel dışa aktarma özelliği yakında eklenecek");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rapor Tarihi
            </label>
            <Input
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cari Tip
            </label>
            <Select
              value={accountTypeFilter}
              onChange={(e) => setAccountTypeFilter(e.target.value)}
            >
              <option value="">Tümü</option>
              <option value="Müşteri">Müşteriler</option>
              <option value="Tedarikçi">Tedarikçiler</option>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bakiye Durumu
            </label>
            <Select
              value={balanceFilter}
              onChange={(e) => setBalanceFilter(e.target.value)}
            >
              <option value="">Tümü</option>
              <option value="positive">Alacaklı</option>
              <option value="negative">Borçlu</option>
              <option value="zero">Sıfır Bakiye</option>
            </Select>
          </div>
          <div>
            <Button variant="primary">
              <i className="fas fa-chart-line mr-2"></i>
              Rapor Oluştur
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button variant="primary" onClick={handlePrint}>
          <i className="fas fa-print mr-2"></i>
          Yazdır
        </Button>
        <Button variant="secondary" onClick={handleExportPdf}>
          <i className="fas fa-file-pdf mr-2"></i>
          PDF İndir
        </Button>
        <Button variant="success" onClick={handleExportExcel}>
          <i className="fas fa-file-excel mr-2"></i>
          Excel İndir
        </Button>
      </div>

      <Table
        data={balanceData}
        columns={columns}
        onView={handleView}
        onEdit={(id) => handleMovements(id)}
        filters={filters}
      />

      <div className="bg-slate-50 p-6 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            icon="fa-solid fa-arrow-down"
            label="Toplam Borç Bakiye"
            value={`₺${totalDebit.toLocaleString("tr-TR")}`}
            color="red"
          />
          <SummaryCard
            icon="fa-solid fa-arrow-up"
            label="Toplam Alacak Bakiye"
            value={`₺${totalCredit.toLocaleString("tr-TR")}`}
            color="green"
            trend="up"
            trendValue="+8%"
          />
          <SummaryCard
            icon="fa-solid fa-balance-scale"
            label="Net Bakiye"
            value={`₺${Math.abs(netBalance).toLocaleString("tr-TR")}`}
            color={netBalance >= 0 ? "green" : "red"}
            trend={netBalance >= 0 ? "up" : "down"}
            trendValue={netBalance >= 0 ? "Alacak" : "Borç"}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountsBalance;
