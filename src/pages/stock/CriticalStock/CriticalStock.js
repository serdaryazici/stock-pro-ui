"use client"

import { useState } from "react"
import StatsGrid from "../../../components/StatsGrid"
import Table from "../../../components/Table"
import Button from "../../../components/Button"

const CriticalStock = () => {
  const [showAlert, setShowAlert] = useState(true)

  const criticalStockData = [
    {
      id: 1,
      productCode: "PRD003",
      productName: "Dyson V15 Detect",
      category: "Ev & Yaşam",
      currentStock: 0,
      minStock: 5,
      lastSale: "3 gün önce",
      status: "out",
    },
    {
      id: 2,
      productCode: "PRD002",
      productName: "Nike Air Max 270",
      category: "Giyim",
      currentStock: 8,
      minStock: 15,
      lastSale: "1 gün önce",
      status: "low",
    },
    {
      id: 3,
      productCode: "PRD004",
      productName: "iPhone 15 Pro",
      category: "Elektronik",
      currentStock: 3,
      minStock: 10,
      lastSale: "2 saat önce",
      status: "critical",
    },
    {
      id: 4,
      productCode: "PRD005",
      productName: "MacBook Air M2",
      category: "Elektronik",
      currentStock: 2,
      minStock: 8,
      lastSale: "5 gün önce",
      status: "critical",
    },
  ]

  const columns = [
    { key: "productCode", label: "Ürün Kodu" },
    { key: "productName", label: "Ürün Adı" },
    { key: "category", label: "Kategori" },
    {
      key: "currentStock",
      label: "Mevcut Stok",
      render: (item) => (
        <span
          className={`font-semibold ${
            item === 0 ? "text-red-600" : item < 5 ? "text-amber-600" : "text-slate-800"
          }`}
        >
          {item}
        </span>
      ),
    },
    { key: "minStock", label: "Minimum Stok" },
    { key: "lastSale", label: "Son Satış" },
    {
      key: "status",
      label: "Durum",
      render: (item) => {
        const statusConfig = {
          out: { label: "Stokta Yok", className: "bg-red-100 text-red-800" },
          low: { label: "Düşük Stok", className: "bg-yellow-100 text-yellow-800" },
          critical: { label: "Kritik", className: "bg-red-100 text-red-800" },
        }
        const config = statusConfig[item]
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${config.className}`}>
            {config.label}
          </span>
        )
      },
    },
  ]

  const filters = [
    {
      key: "status",
      label: "Tüm Durumlar",
      title: "Kritik Stok Listesi",
      options: [
        { value: "critical", label: "Kritik" },
        { value: "low", label: "Düşük" },
        { value: "out", label: "Stokta Yok" },
      ],
      filterFn: (item, value) => item.status === value,
    },
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
  ]

  const handleExportReport = () => {
    console.log("Exporting critical stock report...")
  }

  const handleSendEmailAlert = () => {
    console.log("Sending email alert...")
  }

  return (
    <div className="space-y-6">
      {showAlert && (
        <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-xl relative">
          <div className="text-2xl text-red-600 flex-shrink-0">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-1">Kritik Stok Uyarısı!</h3>
            <p className="text-sm text-red-800">23 ürün kritik stok seviyesinde. Acil sipariş vermeniz önerilir.</p>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-xl opacity-70 hover:opacity-100 transition-opacity"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsGrid
          icon="fas fa-exclamation-triangle"
          title="Kritik Stok"
          value="23"
          detail="Acil sipariş gerekli"
          bgColor="bg-red-500"
          critical={true}
        />
        <StatsGrid
          icon="fas fa-exclamation"
          title="Düşük Stok"
          value="45"
          detail="Yakında sipariş"
          bgColor="bg-amber-500"
        />
        <StatsGrid
          icon="fas fa-times-circle"
          title="Stokta Yok"
          value="12"
          detail="Satış yapılamaz"
          bgColor="bg-red-500"
        />
        <StatsGrid
          icon="fas fa-chart-line"
          title="Ortalama Stok Süresi"
          value="15 gün"
          detail="Tükenme tahmini"
          bgColor="bg-amber-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={handleExportReport} className="px-4 py-2 flex-initial">
          <i className="fas fa-download mr-2"></i>
          Kritik Stok Raporu
        </Button>
        <Button variant="outline" onClick={handleSendEmailAlert} className="px-4 py-2 flex-initial">
          <i className="fas fa-envelope mr-2"></i>
          E-posta Uyarısı Gönder
        </Button>
      </div>

      <Table
        data={criticalStockData}
        columns={columns}
        filters={filters}
        itemsPerPage={10}
        onEdit={(item) => console.log("Edit:", item)}
        onView={(item) => console.log("View:", item)}
      />
    </div>
  )
}

export default CriticalStock
