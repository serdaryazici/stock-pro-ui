import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const StockMovements = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: "fas fa-boxes",
      title: "Toplam Ürün Çeşidi",
      value: "1,247",
      detail: "Aktif ürün sayısı",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fas fa-calendar-day",
      title: "Bugünkü Hareketler",
      value: "47",
      detail: "Giriş: 23 | Çıkış: 24",
      bgColor: "bg-indigo-500",
    },
    {
      icon: "fas fa-exclamation-triangle",
      title: "Kritik Stok Uyarısı",
      value: "23",
      detail: "Acil sipariş gerekli",
      bgColor: "bg-red-500",
      critical: true,
    },
    {
      icon: "fas fa-chart-line",
      title: "En Çok Satan Kategori",
      value: "Elektronik",
      detail: "Bu ay 156 satış",
      bgColor: "bg-amber-500",
    },
  ];

  const columns = [
    { key: "code", label: "Ürün Kodu" },
    { key: "name", label: "Ürün Adı" },
    { key: "category", label: "Kategori" },
    { key: "stock", label: "Mevcut Stok" },
    { key: "minStock", label: "Minimum Stok" },
    { key: "price", label: "Birim Fiyat" },
    {
      key: "status",
      label: "Durum",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item === "available"
              ? "bg-green-100 text-green-700"
              : item === "low"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item === "available"
            ? "Stokta Var"
            : item === "low"
            ? "Düşük Stok"
            : "Stokta Yok"}
        </span>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      code: "PRD-001",
      name: "Kablosuz Kulaklık",
      category: "Elektronik",
      stock: 120,
      minStock: 20,
      price: "₺650",
      status: "available",
    },
    {
      id: 2,
      code: "PRD-002",
      name: "Kot Pantolon",
      category: "Giyim",
      stock: 8,
      minStock: 15,
      price: "₺220",
      status: "low",
    },
    {
      id: 3,
      code: "PRD-003",
      name: "Blender Seti",
      category: "Ev & Yaşam",
      stock: 0,
      minStock: 10,
      price: "₺480",
      status: "out",
    },
    {
      id: 4,
      code: "PRD-001",
      name: "Kablosuz Kulaklık",
      category: "Elektronik",
      stock: 120,
      minStock: 20,
      price: "₺650",
      status: "available",
    },
    {
      id: 5,
      code: "PRD-002",
      name: "Kot Pantolon",
      category: "Giyim",
      stock: 8,
      minStock: 15,
      price: "₺220",
      status: "low",
    },
    {
      id: 6,
      code: "PRD-003",
      name: "Blender Seti",
      category: "Ev & Yaşam",
      stock: 0,
      minStock: 10,
      price: "₺480",
      status: "out",
    },
    {
      id: 7,
      code: "PRD-001",
      name: "Kablosuz Kulaklık",
      category: "Elektronik",
      stock: 120,
      minStock: 20,
      price: "₺650",
      status: "available",
    },
    {
      id: 8,
      code: "PRD-002",
      name: "Kot Pantolon",
      category: "Giyim",
      stock: 8,
      minStock: 15,
      price: "₺220",
      status: "low",
    },
    {
      id: 9,
      code: "PRD-003",
      name: "Blender Seti",
      category: "Ev & Yaşam",
      stock: 0,
      minStock: 10,
      price: "₺480",
      status: "out",
    },
    {
      id: 10,
      code: "PRD-001",
      name: "Kablosuz Kulaklık",
      category: "Elektronik",
      stock: 120,
      minStock: 20,
      price: "₺650",
      status: "available",
    },
    {
      id: 11,
      code: "PRD-002",
      name: "Kot Pantolon",
      category: "Giyim",
      stock: 8,
      minStock: 15,
      price: "₺220",
      status: "low",
    },
    {
      id: 12,
      code: "PRD-003",
      name: "Blender Seti",
      category: "Ev & Yaşam",
      stock: 0,
      minStock: 10,
      price: "₺480",
      status: "out",
    },
  ];

  const filters = [
    {
      key: "category",
      label: "Tüm Kategoriler",
      options: [
        { value: "elektronik", label: "Elektronik" },
        { value: "giyim", label: "Giyim" },
        { value: "ev", label: "Ev & Yaşam" },
      ],
      filterFn: (item, value) =>
        item.category.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: "status",
      label: "Stok Durumu",
      options: [
        { value: "available", label: "Stokta Var" },
        { value: "low", label: "Düşük Stok" },
        { value: "out", label: "Stokta Yok" },
      ],
      filterFn: (item, value) => item === value,
    },
  ];

  const handleEdit = (item) => alert(`${item.name} düzenlenecek`);
  const handleDelete = (item) => alert(`${item.name} silinecek`);
  const handleView = (item) => alert(`${item.name} detayları görüntülenecek`);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          icon="fas fa-plus"
          onClick={() => navigate("/stock/movements/add-product")}
          className="px-4 py-2 flex-initial"
        >
          Yeni Ürün Ekle
        </Button>
        <Button
          variant="primary"
          icon="fas fa-arrow-up"
          className="px-4 py-2 flex-initial"
        >
          Stok Girişi
        </Button>
        <Button
          variant="primary"
          icon="fas fa-arrow-down"
          className="px-4 py-2 flex-initial"
        >
          Stok Çıkışı
        </Button>
        <Button
          variant="outline"
          icon="fas fa-download"
          className="px-4 py-2 flex-initial"
        >
          Dışa Aktar
        </Button>
      </div>

      <Table
        data={data}
        columns={columns}
        filters={filters}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default StockMovements;
