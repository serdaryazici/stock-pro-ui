import { useState } from "react";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import SummaryCard from "../../../components/SummaryCard";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-27");
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const salesData = [
    {
      id: 1,
      invoiceNo: "SF-2024-001",
      date: "2024-01-27",
      customer: "ABC Teknoloji Ltd.",
      product: "Kablosuz Kulaklık",
      quantity: 15,
      unitPrice: 650,
      totalAmount: 9750,
      discount: 0,
      netAmount: 9750,
      status: "Ödendi",
    },
    {
      id: 2,
      invoiceNo: "SF-2024-002",
      date: "2024-01-26",
      customer: "Ahmet Yılmaz",
      product: "Akıllı Saat",
      quantity: 5,
      unitPrice: 1200,
      totalAmount: 6000,
      discount: 300,
      netAmount: 5700,
      status: "Beklemede",
    },
    {
      id: 3,
      invoiceNo: "SF-2024-003",
      date: "2024-01-25",
      customer: "Fatma Demir",
      product: "Kot Pantolon",
      quantity: 20,
      unitPrice: 220,
      totalAmount: 4400,
      discount: 0,
      netAmount: 4400,
      status: "Ödendi",
    },
    {
      id: 4,
      invoiceNo: "SF-2024-004",
      date: "2024-01-24",
      customer: "Mehmet Özkan",
      product: "Spor Ayakkabı",
      quantity: 10,
      unitPrice: 450,
      totalAmount: 4500,
      discount: 450,
      netAmount: 4050,
      status: "Ödendi",
    },
    {
      id: 5,
      invoiceNo: "SF-2024-005",
      date: "2024-01-23",
      customer: "ABC Teknoloji Ltd.",
      product: "Blender Seti",
      quantity: 8,
      unitPrice: 480,
      totalAmount: 3840,
      discount: 0,
      netAmount: 3840,
      status: "İptal",
    },
  ];

  const totalSales = salesData.filter((s) => s.status !== "İptal").length;
  const totalRevenue = salesData
    .filter((s) => s.status !== "İptal")
    .reduce((sum, item) => sum + item.netAmount, 0);
  const totalDiscount = salesData
    .filter((s) => s.status !== "İptal")
    .reduce((sum, item) => sum + item.discount, 0);
  const pendingPayments = salesData
    .filter((s) => s.status === "Beklemede")
    .reduce((sum, item) => sum + item.netAmount, 0);

  const stats = [
    {
      icon: "fa-solid fa-file-invoice",
      title: "Toplam Satış",
      value: totalSales,
      detail: "Tamamlanan fatura sayısı",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-lira-sign",
      title: "Toplam Ciro",
      value: `₺${totalRevenue.toLocaleString("tr-TR")}`,
      detail: "Net satış tutarı",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-percent",
      title: "Toplam İndirim",
      value: `₺${totalDiscount.toLocaleString("tr-TR")}`,
      detail: "Verilen indirimler",
      bgColor: "bg-amber-500",
    },
    {
      icon: "fa-solid fa-clock",
      title: "Bekleyen Ödemeler",
      value: `₺${pendingPayments.toLocaleString("tr-TR")}`,
      detail: "Tahsil edilecek tutar",
      bgColor: "bg-red-500",
    },
  ];

  const columns = [
    { key: "invoiceNo", label: "Fatura No" },
    {
      key: "date",
      label: "Tarih",
      render: (row) => new Date(row).toLocaleDateString("tr-TR"),
    },
    { key: "customer", label: "Müşteri" },
    { key: "product", label: "Ürün" },
    { key: "quantity", label: "Miktar" },
    {
      key: "unitPrice",
      label: "Birim Fiyat",
      render: (row) => `₺${row.toLocaleString("tr-TR")}`,
    },
    {
      key: "totalAmount",
      label: "Tutar",
      render: (row) => `₺${row.toLocaleString("tr-TR")}`,
    },
    {
      key: "discount",
      label: "İndirim",
      render: (row) => (
        <span className="text-amber-600">₺{row.toLocaleString("tr-TR")}</span>
      ),
    },
    {
      key: "netAmount",
      label: "Net Tutar",
      render: (row) => (
        <span className="font-semibold">₺{row.toLocaleString("tr-TR")}</span>
      ),
    },
    {
      key: "status",
      label: "Durum",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row === "Ödendi"
              ? "bg-green-100 text-green-700"
              : row === "Beklemede"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row}
        </span>
      ),
    },
  ];

  const filters = [
    {
      key: "customer",
      label: "Tüm Müşteriler",
      options: [
        { value: "ABC Teknoloji Ltd.", label: "ABC Teknoloji Ltd." },
        { value: "Ahmet Yılmaz", label: "Ahmet Yılmaz" },
        { value: "Fatma Demir", label: "Fatma Demir" },
        { value: "Mehmet Özkan", label: "Mehmet Özkan" },
      ],
      filterFn: (item, value) => item.customer === value,
    },
    {
      key: "status",
      label: "Tüm Durumlar",
      options: [
        { value: "Ödendi", label: "Ödendi" },
        { value: "Beklemede", label: "Beklemede" },
        { value: "İptal", label: "İptal" },
      ],
      filterFn: (item, value) => item.status === value,
    },
  ];

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
              Başlangıç Tarihi
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bitiş Tarihi
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
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
        <Button variant="outline" onClick={handleExportExcel}>
          <i className="fas fa-file-excel mr-2"></i>
          Excel İndir
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Satış Raporu Detayları
          </h2>
          <span className="text-sm text-slate-600">
            {new Date(startDate).toLocaleDateString("tr-TR")} -{" "}
            {new Date(endDate).toLocaleDateString("tr-TR")}
          </span>
        </div>

        <Table data={salesData} columns={columns} filters={filters} />

        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              icon="fa-solid fa-chart-line"
              label="Brüt Satış"
              value={`₺${salesData
                .reduce((sum, item) => sum + item.totalAmount, 0)
                .toLocaleString("tr-TR")}`}
              color="blue"
              trend="up"
              trendValue="+15%"
            />
            <SummaryCard
              icon="fa-solid fa-percent"
              label="Toplam İndirim"
              value={`₺${totalDiscount.toLocaleString("tr-TR")}`}
              color="amber"
            />
            <SummaryCard
              icon="fa-solid fa-money-bill-wave"
              label="Net Satış"
              value={`₺${totalRevenue.toLocaleString("tr-TR")}`}
              color="green"
              trend="up"
              trendValue="+18%"
            />
            <SummaryCard
              icon="fa-solid fa-clock"
              label="Bekleyen Ödemeler"
              value={`₺${pendingPayments.toLocaleString("tr-TR")}`}
              color="red"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
