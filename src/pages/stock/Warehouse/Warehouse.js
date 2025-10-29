import React from "react";
import StatsGrid from "../../../components/StatsGrid";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";

const Warehouse = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: "fas fa-building",
      title: "Toplam Depo",
      value: "8",
      detail: "Aktif depo sayısı",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fas fa-boxes",
      title: "Toplam Kapasite",
      value: "450",
      detail: "Depolama alanı",
      bgColor: "bg-indigo-500",
    },
    {
      icon: "fas fa-exclamation-triangle",
      title: "Doluluk Oranı",
      value: "68%",
      detail: "Ortalama Doluluk",
      bgColor: "bg-red-500",
    },
    {
      icon: "fas fa-truck-loading",
      title: "Bugünkü Hareketler",
      value: "34",
      detail: "Giriş / Çıkış İşlemleri",
      bgColor: "bg-amber-500",
    },
  ];

  const columns = [
    { key: "code", label: "Depo Kodu" },
    { key: "name", label: "Depo Adı" },
    { key: "location", label: "Lokasyon" },
    { key: "capacity", label: "Kapasite" },
    { key: "occupied", label: "Doluluk" },
    { key: "productCount", label: "Ürün Çeşidi" },
    {
      key: "status",
      label: "Durum",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item === "active"
              ? "bg-green-100 text-green-700"
              : item === "maintenance"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item === "active"
            ? "Aktif"
            : item === "maintenance"
            ? "Bakımda"
            : "Pasif"}
        </span>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      code: "WH-001",
      name: "Merkez Depo",
      location: "İstanbul / Pendik",
      capacity: 100,
      occupied: 78,
      productCount: 240,
      status: "active",
    },
    {
      id: 2,
      code: "WH-002",
      name: "Ege Bölge Deposu",
      location: "İzmir / Bornova",
      capacity: 60,
      occupied: 52,
      productCount: 190,
      status: "active",
    },
    {
      id: 3,
      code: "WH-003",
      name: "Ankara Yedek Depo",
      location: "Ankara / Sincan",
      capacity: 80,
      occupied: 65,
      productCount: 210,
      status: "maintenance",
    },
    {
      id: 4,
      code: "WH-004",
      name: "Doğu Anadolu Deposu",
      location: "Erzurum / Merkez",
      capacity: 50,
      occupied: 41,
      productCount: 175,
      status: "active",
    },
    {
      id: 5,
      code: "WH-005",
      name: "Akdeniz Bölge Deposu",
      location: "Antalya / Kepez",
      capacity: 55,
      occupied: 38,
      productCount: 160,
      status: "active",
    },
    {
      id: 6,
      code: "WH-006",
      name: "Karadeniz Deposu",
      location: "Samsun / İlkadım",
      capacity: 40,
      occupied: 35,
      productCount: 130,
      status: "active",
    },
    {
      id: 7,
      code: "WH-007",
      name: "Güneydoğu Deposu",
      location: "Gaziantep / Şehitkamil",
      capacity: 30,
      occupied: 28,
      productCount: 115,
      status: "inactive",
    },
    {
      id: 8,
      code: "WH-008",
      name: "Yedek Soğuk Hava Deposu",
      location: "İstanbul / Tuzla",
      capacity: 35,
      occupied: 31,
      productCount: 95,
      status: "maintenance",
    },
  ];

  const filters = [
    {
      key: "region",
      label: "Tüm Bölgeler",
      options: [
        { value: "İstanbul", label: "İstanbul" },
        { value: "İzmir", label: "İzmir" },
        { value: "Ankara", label: "Ankara" },
        { value: "Antalya", label: "Antalya" },
        { value: "Erzurum", label: "Erzurum" },
        { value: "Samsun", label: "Samsun" },
        { value: "Gaziantep", label: "Gaziantep" },
      ],
      filterFn: (item, value) => item.location.includes(value),
    },
    {
      key: "status",
      label: "Depo Durumu",
      options: [
        { value: "active", label: "Aktif" },
        { value: "maintenance", label: "Bakımda" },
        { value: "inactive", label: "Pasif" },
      ],
      filterFn: (item, value) => item.status === value,
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
          className="px-4 py-2 flex-initial"
          onClick={() => navigate("/stock/warehouse/add")}
        >
          Yeni Depo Ekle
        </Button>
        <Button
          variant="primary"
          icon="fas fa-exchange-alt"
          className="px-4 py-2 flex-initial"
        >
          Depo Transferi
        </Button>
        <Button
          variant="outline"
          icon="fas fa-download"
          className="px-4 py-2 flex-initial"
        >
          Rapor Al
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

export default Warehouse;
