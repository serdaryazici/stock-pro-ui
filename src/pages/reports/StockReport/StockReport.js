import { useState } from "react";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import SummaryCard from "../../../components/SummaryCard";

const StockReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-27");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");

  const stockData = [
    {
      id: 1,
      code: "PRD-001",
      name: "Kablosuz Kulaklık",
      category: "Elektronik",
      warehouse: "Ana Depo",
      openingStock: 100,
      entry: 50,
      exit: 30,
      currentStock: 120,
      unitPrice: 650,
      totalValue: 78000,
    },
    {
      id: 2,
      code: "PRD-002",
      name: "Kot Pantolon",
      category: "Giyim",
      warehouse: "Ana Depo",
      openingStock: 50,
      entry: 20,
      exit: 62,
      currentStock: 8,
      unitPrice: 220,
      totalValue: 1760,
    },
    {
      id: 3,
      code: "PRD-003",
      name: "Blender Seti",
      category: "Ev & Yaşam",
      warehouse: "Şube Depo",
      openingStock: 30,
      entry: 15,
      exit: 45,
      currentStock: 0,
      unitPrice: 480,
      totalValue: 0,
    },
    {
      id: 4,
      code: "PRD-004",
      name: "Akıllı Saat",
      category: "Elektronik",
      warehouse: "Ana Depo",
      openingStock: 75,
      entry: 40,
      exit: 35,
      currentStock: 80,
      unitPrice: 1200,
      totalValue: 96000,
    },
    {
      id: 5,
      code: "PRD-005",
      name: "Spor Ayakkabı",
      category: "Giyim",
      warehouse: "Şube Depo",
      openingStock: 60,
      entry: 30,
      exit: 55,
      currentStock: 35,
      unitPrice: 450,
      totalValue: 15750,
    },
  ];

  const totalProducts = stockData.length;
  const totalEntry = stockData.reduce((sum, item) => sum + item.entry, 0);
  const totalExit = stockData.reduce((sum, item) => sum + item.exit, 0);
  const totalValue = stockData.reduce((sum, item) => sum + item.totalValue, 0);

  const stats = [
    {
      icon: "fa-solid fa-boxes",
      title: "Toplam Ürün Çeşidi",
      value: totalProducts,
      detail: "Raporlanan ürün sayısı",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-arrow-up",
      title: "Toplam Giriş",
      value: totalEntry,
      detail: "Dönem içi giriş adedi",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-arrow-down",
      title: "Toplam Çıkış",
      value: totalExit,
      detail: "Dönem içi çıkış adedi",
      bgColor: "bg-red-500",
    },
    {
      icon: "fa-solid fa-lira-sign",
      title: "Toplam Stok Değeri",
      value: `₺${totalValue.toLocaleString("tr-TR")}`,
      detail: "Mevcut stok değeri",
      bgColor: "bg-amber-500",
    },
  ];

  const columns = [
    { key: "code", label: "Ürün Kodu" },
    { key: "name", label: "Ürün Adı" },
    { key: "category", label: "Kategori" },
    { key: "warehouse", label: "Depo" },
    { key: "openingStock", label: "Açılış Stok" },
    {
      key: "entry",
      label: "Giriş",
      render: (row) => (
        <span className="text-green-600 font-medium">{row}</span>
      ),
    },
    {
      key: "exit",
      label: "Çıkış",
      render: (row) => <span className="text-red-600 font-medium">{row}</span>,
    },
    {
      key: "currentStock",
      label: "Mevcut Stok",
      render: (row) => <span className="font-semibold">{row}</span>,
    },
    {
      key: "unitPrice",
      label: "Birim Fiyat",
      render: (row) => `₺${row.toLocaleString("tr-TR")}`,
    },
    {
      key: "totalValue",
      label: "Toplam Değer",
      render: (row) => (
        <span className="font-semibold">₺{row.toLocaleString("tr-TR")}</span>
      ),
    },
  ];

  const filters = [
    {
      key: "category",
      label: "Tüm Kategoriler",
      options: [
        { value: "Elektronik", label: "Elektronik" },
        { value: "Giyim", label: "Giyim" },
        { value: "Ev & Yaşam", label: "Ev & Yaşam" },
      ],
      filterFn: (item, value) => item.category === value,
    },
    {
      key: "warehouse",
      label: "Tüm Depolar",
      options: [
        { value: "Ana Depo", label: "Ana Depo" },
        { value: "Şube Depo", label: "Şube Depo" },
      ],
      filterFn: (item, value) => item.warehouse === value,
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
            Stok Raporu Detayları
          </h2>
          <span className="text-sm text-slate-600">
            {new Date(startDate).toLocaleDateString("tr-TR")} -{" "}
            {new Date(endDate).toLocaleDateString("tr-TR")}
          </span>
        </div>

        <Table data={stockData} columns={columns} filters={filters} />

        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              icon="fa-solid fa-arrow-up"
              label="Toplam Giriş"
              value={totalEntry}
              color="green"
              trend="up"
              trendValue="+12%"
            />
            <SummaryCard
              icon="fa-solid fa-arrow-down"
              label="Toplam Çıkış"
              value={totalExit}
              color="red"
              trend="down"
              trendValue="-8%"
            />
            <SummaryCard
              icon="fa-solid fa-exchange-alt"
              label="Net Hareket"
              value={totalEntry - totalExit}
              color="blue"
            />
            <SummaryCard
              icon="fa-solid fa-lira-sign"
              label="Toplam Değer"
              value={`₺${totalValue.toLocaleString("tr-TR")}`}
              color="amber"
              trend="up"
              trendValue="+5%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockReport;
