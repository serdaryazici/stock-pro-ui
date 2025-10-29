import { useState } from "react";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import SummaryCard from "../../../components/SummaryCard";

const PurchaseReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-27");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const purchaseData = [
    {
      id: 1,
      invoiceNo: "AF-2024-001",
      date: "2024-01-27",
      supplier: "XYZ Tedarik A.Ş.",
      product: "Kablosuz Kulaklık",
      quantity: 50,
      unitPrice: 400,
      totalAmount: 20000,
      discount: 0,
      netAmount: 20000,
      status: "Ödendi",
    },
    {
      id: 2,
      invoiceNo: "AF-2024-002",
      date: "2024-01-25",
      supplier: "DEF Malzeme Ltd.",
      product: "Akıllı Saat",
      quantity: 30,
      unitPrice: 800,
      totalAmount: 24000,
      discount: 1200,
      netAmount: 22800,
      status: "Beklemede",
    },
    {
      id: 3,
      invoiceNo: "AF-2024-003",
      date: "2024-01-24",
      supplier: "GHI Elektronik A.Ş.",
      product: "Blender Seti",
      quantity: 40,
      unitPrice: 300,
      totalAmount: 12000,
      discount: 0,
      netAmount: 12000,
      status: "Ödendi",
    },
    {
      id: 4,
      invoiceNo: "AF-2024-004",
      date: "2024-01-22",
      supplier: "XYZ Tedarik A.Ş.",
      product: "Kot Pantolon",
      quantity: 100,
      unitPrice: 120,
      totalAmount: 12000,
      discount: 600,
      netAmount: 11400,
      status: "Ödendi",
    },
    {
      id: 5,
      invoiceNo: "AF-2024-005",
      date: "2024-01-20",
      supplier: "DEF Malzeme Ltd.",
      product: "Spor Ayakkabı",
      quantity: 60,
      unitPrice: 250,
      totalAmount: 15000,
      discount: 0,
      netAmount: 15000,
      status: "Beklemede",
    },
  ];

  const totalPurchases = purchaseData.filter(
    (p) => p.status !== "İptal"
  ).length;
  const totalExpense = purchaseData
    .filter((p) => p.status !== "İptal")
    .reduce((sum, item) => sum + item.netAmount, 0);
  const totalDiscount = purchaseData
    .filter((p) => p.status !== "İptal")
    .reduce((sum, item) => sum + item.discount, 0);
  const pendingPayments = purchaseData
    .filter((p) => p.status === "Beklemede")
    .reduce((sum, item) => sum + item.netAmount, 0);

  const stats = [
    {
      icon: "fa-solid fa-shopping-cart",
      title: "Toplam Alış",
      value: totalPurchases,
      detail: "Tamamlanan fatura sayısı",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-lira-sign",
      title: "Toplam Gider",
      value: `₺${totalExpense.toLocaleString("tr-TR")}`,
      detail: "Net alış tutarı",
      bgColor: "bg-red-500",
    },
    {
      icon: "fa-solid fa-percent",
      title: "Toplam İndirim",
      value: `₺${totalDiscount.toLocaleString("tr-TR")}`,
      detail: "Alınan indirimler",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-clock",
      title: "Bekleyen Ödemeler",
      value: `₺${pendingPayments.toLocaleString("tr-TR")}`,
      detail: "Ödenecek tutar",
      bgColor: "bg-amber-500",
    },
  ];

  const columns = [
    { key: "invoiceNo", label: "Fatura No" },
    {
      key: "date",
      label: "Tarih",
      render: (row) => new Date(row).toLocaleDateString("tr-TR"),
    },
    { key: "supplier", label: "Tedarikçi" },
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
        <span className="text-green-600">₺{row.toLocaleString("tr-TR")}</span>
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
      key: "supplier",
      label: "Tüm Tedarikçiler",
      title: "Alış Raporu Detayları",
      options: [
        { value: "XYZ Tedarik A.Ş.", label: "XYZ Tedarik A.Ş." },
        { value: "DEF Malzeme Ltd.", label: "DEF Malzeme Ltd." },
        { value: "GHI Elektronik A.Ş.", label: "GHI Elektronik A.Ş." },
      ],
      filterFn: (item, value) => item.supplier === value,
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

      <Table data={purchaseData} columns={columns} filters={filters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon="fa-solid fa-shopping-cart"
          label="Brüt Alış"
          value={`₺${purchaseData
            .reduce((sum, item) => sum + item.totalAmount, 0)
            .toLocaleString("tr-TR")}`}
          color="blue"
          trend="up"
          trendValue="+10%"
        />
        <SummaryCard
          icon="fa-solid fa-tag"
          label="Toplam İndirim"
          value={`₺${totalDiscount.toLocaleString("tr-TR")}`}
          color="green"
          trend="up"
          trendValue="+5%"
        />
        <SummaryCard
          icon="fa-solid fa-money-bill-wave"
          label="Net Alış"
          value={`₺${totalExpense.toLocaleString("tr-TR")}`}
          color="red"
        />
        <SummaryCard
          icon="fa-solid fa-clock"
          label="Bekleyen Ödemeler"
          value={`₺${pendingPayments.toLocaleString("tr-TR")}`}
          color="amber"
        />
      </div>
    </div>
  );
};

export default PurchaseReport;
