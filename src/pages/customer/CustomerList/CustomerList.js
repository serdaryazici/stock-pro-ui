import { useNavigate } from "react-router-dom";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";

const CustomerList = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: "fa-solid fa-users",
      title: "Toplam Müşteri",
      value: "1,847",
      detail: "Aktif müşteri sayısı",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-user-plus",
      title: "Bu Ay Yeni",
      value: "47",
      detail: "Yeni müşteri kaydı",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-user-tie",
      title: "Aktif Müşteri",
      value: "1,623",
      detail: "Son 30 gün içinde alışveriş",
      bgColor: "bg-amber-500",
    },
    {
      icon: "fa-solid fa-user-xmark",
      title: "İnaktif Müşteri",
      value: "1,367",
      detail: "Son 30 gün içinde alışveriş yok",
      bgColor: "bg-red-500",
    },
  ];

  const customers = [
    {
      id: 1,
      customerNo: "MST001",
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@email.com",
      phone: "+90 532 123 4567",
      city: "İstanbul",
      type: "individual",
      registrationDate: "15.01.2024",
      status: "active",
    },
    {
      id: 2,
      customerNo: "MST002",
      name: "ABC Teknoloji Ltd.",
      email: "info@abcteknoloji.com",
      phone: "+90 212 555 0123",
      city: "İstanbul",
      type: "corporate",
      registrationDate: "08.01.2024",
      status: "active",
    },
    {
      id: 3,
      customerNo: "MST003",
      name: "Fatma Demir",
      email: "fatma.demir@email.com",
      phone: "+90 533 987 6543",
      city: "Ankara",
      type: "vip",
      registrationDate: "22.12.2023",
      status: "active",
    },
    {
      id: 4,
      customerNo: "MST004",
      name: "Mehmet Kaya",
      email: "mehmet.kaya@email.com",
      phone: "+90 534 456 7890",
      city: "İzmir",
      type: "individual",
      registrationDate: "10.12.2023",
      status: "inactive",
    },
    {
      id: 5,
      customerNo: "MST005",
      name: "XYZ İnşaat A.Ş.",
      email: "iletisim@xyzinsaat.com",
      phone: "+90 216 789 0123",
      city: "İstanbul",
      type: "corporate",
      registrationDate: "05.12.2023",
      status: "blocked",
    },
    {
      id: 6,
      customerNo: "MST006",
      name: "Ayşe Kara",
      email: "ayse.kara@email.com",
      phone: "+90 535 111 2233",
      city: "Bursa",
      type: "individual",
      registrationDate: "28.11.2023",
      status: "active",
    },
    {
      id: 7,
      customerNo: "MST007",
      name: "DEF Lojistik A.Ş.",
      email: "info@deflojistik.com",
      phone: "+90 232 444 5566",
      city: "İzmir",
      type: "corporate",
      registrationDate: "15.11.2023",
      status: "active",
    },
    {
      id: 8,
      customerNo: "MST008",
      name: "Zeynep Şahin",
      email: "zeynep.sahin@email.com",
      phone: "+90 536 777 8899",
      city: "Ankara",
      type: "vip",
      registrationDate: "03.11.2023",
      status: "active",
    },
  ];

  const columns = [
    { key: "customerNo", label: "Müşteri No" },
    { key: "name", label: "Ad Soyad / Firma" },
    { key: "email", label: "E-posta" },
    { key: "phone", label: "Telefon" },
    { key: "city", label: "Şehir" },
    {
      key: "type",
      label: "Tip",
      render: (row) => {
        const typeLabels = {
          individual: "Bireysel",
          corporate: "Kurumsal",
          vip: "VIP",
        };
        const typeColors = {
          individual: "bg-blue-100 text-blue-800",
          corporate: "bg-purple-100 text-purple-800",
          vip: "bg-amber-100 text-amber-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
              typeColors[row]
            }`}
          >
            {typeLabels[row]}
          </span>
        );
      },
    },
    { key: "registrationDate", label: "Kayıt Tarihi" },
    {
      key: "status",
      label: "Durum",
      render: (row) => {
        const statusLabels = {
          active: "Aktif",
          inactive: "Pasif",
          blocked: "Engellenmiş",
        };
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-gray-100 text-gray-800",
          blocked: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
              statusColors[row]
            }`}
          >
            {statusLabels[row]}
          </span>
        );
      },
    },
  ];

  const filters = [
    {
      key: "type",
      label: "Müşteri Tipi",
      options: [
        { value: "individual", label: "Bireysel" },
        { value: "corporate", label: "Kurumsal" },
        { value: "vip", label: "VIP" },
      ],
      filterFn: (item, value) => item.type === value,
    },
    {
      key: "city",
      label: "Şehir",
      options: [
        { value: "İstanbul", label: "İstanbul" },
        { value: "Ankara", label: "Ankara" },
        { value: "İzmir", label: "İzmir" },
        { value: "Bursa", label: "Bursa" },
      ],
      filterFn: (item, value) => item.city === value,
    },
    {
      key: "status",
      label: "Durum",
      options: [
        { value: "active", label: "Aktif" },
        { value: "inactive", label: "Pasif" },
        { value: "blocked", label: "Engellenmiş" },
      ],
      filterFn: (item, value) => item.status === value,
    },
  ];

  const handleAddCustomer = () => {
    navigate("/customer/add");
  };

  const handleEdit = (row) => {
    console.log("Edit customer:", row);
    navigate(`/customer/edit/${row.id}`);
  };

  const handleView = (row) => {
    console.log("View customer:", row);
    navigate(`/customer/details/${row.id}`);
  };

  const handleDelete = (row) => {
    if (
      window.confirm(
        `${row.name} müşterisini silmek istediğinize emin misiniz?`
      )
    ) {
      console.log("Delete customer:", row);
    }
  };

  const handleImport = () => {
    console.log("Import customers");
  };

  const handleExport = () => {
    console.log("Export customers");
  };

  const handleBulkEmail = () => {
    console.log("Send bulk email");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={handleAddCustomer} className="px-4 py-2 flex-initial">
          <i className="fa-solid fa-user-plus mr-2"></i>
          Yeni Müşteri Ekle
        </Button>
        <Button variant="secondary" onClick={handleImport} className="px-4 py-2 flex-initial">
          <i className="fa-solid fa-upload mr-2"></i>
          Müşteri İçe Aktar
        </Button>
        <Button variant="outline" onClick={handleExport} className="px-4 py-2 flex-initial">
          <i className="fa-solid fa-download mr-2"></i>
          Dışa Aktar
        </Button>
        <Button variant="outline" onClick={handleBulkEmail} className="px-4 py-2 flex-initial">
          <i className="fa-solid fa-envelope mr-2"></i>
          Toplu E-posta
        </Button>
      </div>

      <Table
        columns={columns}
        data={customers}
        filters={filters}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        itemsPerPage={10}
      />
    </div>
  );
};

export default CustomerList;
