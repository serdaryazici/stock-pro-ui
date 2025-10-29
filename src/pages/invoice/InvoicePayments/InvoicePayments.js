import Button from "../../../components/Button";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";

const InvoicePayments = () => {
  const allPayments = [
    {
      id: "THS-2024-001",
      type: "collection",
      invoiceNo: "SF-2024-156",
      party: "ABC Teknoloji A.Ş.",
      date: "2024-01-15",
      amount: 15000,
      method: "bank",
    },
    {
      id: "ODM-2024-001",
      type: "payment",
      invoiceNo: "AF-2024-089",
      party: "XYZ Tedarik Ltd.",
      date: "2024-01-14",
      amount: 8500,
      method: "bank",
    },
    {
      id: "THS-2024-002",
      type: "collection",
      invoiceNo: "SF-2024-157",
      party: "DEF Mühendislik",
      date: "2024-01-14",
      amount: 22000,
      method: "card",
    },
    {
      id: "ODM-2024-002",
      type: "payment",
      invoiceNo: "AF-2024-090",
      party: "KLM Malzeme San.",
      date: "2024-01-13",
      amount: 12000,
      method: "cash",
    },
    {
      id: "THS-2024-003",
      type: "collection",
      invoiceNo: "SF-2024-158",
      party: "GHI Yazılım A.Ş.",
      date: "2024-01-13",
      amount: 18500,
      method: "bank",
    },
    {
      id: "ODM-2024-003",
      type: "payment",
      invoiceNo: "AF-2024-091",
      party: "NOP Ticaret Ltd.",
      date: "2024-01-12",
      amount: 9500,
      method: "check",
    },
    {
      id: "THS-2024-004",
      type: "collection",
      invoiceNo: "SF-2024-159",
      party: "JKL İnşaat A.Ş.",
      date: "2024-01-12",
      amount: 35000,
      method: "bank",
    },
    {
      id: "ODM-2024-004",
      type: "payment",
      invoiceNo: "AF-2024-092",
      party: "QRS Elektronik",
      date: "2024-01-11",
      amount: 16000,
      method: "bank",
    },
    {
      id: "THS-2024-005",
      type: "collection",
      invoiceNo: "SF-2024-160",
      party: "MNO Danışmanlık",
      date: "2024-01-11",
      amount: 12500,
      method: "card",
    },
    {
      id: "ODM-2024-005",
      type: "payment",
      invoiceNo: "AF-2024-093",
      party: "TUV Makine San.",
      date: "2024-01-10",
      amount: 28000,
      method: "bank",
    },
  ];

  const getTypeLabel = (type) => {
    return type === "collection" ? "Tahsilat" : "Ödeme";
  };

  const getTypeBadgeClass = (type) => {
    return type === "collection"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getMethodLabel = (method) => {
    const methods = {
      cash: "Nakit",
      bank: "Banka Transferi",
      card: "Kredi Kartı",
      check: "Çek",
    };
    return methods[method] || method;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  const columns = [
    {
      key: "id",
      label: "İşlem No",
    },
    {
      key: "type",
      label: "Tip",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getTypeBadgeClass(
            value
          )}`}
        >
          {getTypeLabel(value)}
        </span>
      ),
    },
    {
      key: "invoiceNo",
      label: "Fatura No",
    },
    {
      key: "party",
      label: "Müşteri/Tedarikçi",
    },
    {
      key: "date",
      label: "Tarih",
      render: (value) => formatDate(value),
    },
    {
      key: "amount",
      label: "Tutar",
      render: (value) => (
        <span className="font-semibold">{formatCurrency(value)}</span>
      ),
    },
    {
      key: "method",
      label: "Yöntem",
      render: (value) => getMethodLabel(value),
    },
  ];

  const filters = [
    {
      title: "İşlem Geçmişi",
      key: "type",
      label: "Tüm İşlemler",
      options: [
        { value: "collection", label: "Tahsilat" },
        { value: "payment", label: "Ödeme" },
      ],
      filterFn: (item, value) => item.type === value,
    },
    {
      key: "method",
      label: "Tüm Yöntemler",
      options: [
        { value: "cash", label: "Nakit" },
        { value: "bank", label: "Banka Transferi" },
        { value: "card", label: "Kredi Kartı" },
        { value: "check", label: "Çek" },
      ],
      filterFn: (item, value) => item.method === value,
    },
  ];

  const handleAddCollection = () => {
    alert("Tahsilat ekleme formu açılacak");
  };

  const handleAddPayment = () => {
    alert("Ödeme ekleme formu açılacak");
  };

  const handleExport = () => {
    alert("Veriler dışa aktarılacak");
  };

  const handleViewDetails = (item) => {
    alert(`${item.id} numaralı işlem detayları gösterilecek`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsGrid
          title="Toplam Tahsilat"
          value="₺850K"
          icon="fas fa-hand-holding-usd"
          bgColor="bg-green-500"
          detail="Bu ay: ₺125K"
        />
        <StatsGrid
          title="Toplam Ödeme"
          value="₺620K"
          icon="fas fa-money-bill-wave"
          bgColor="bg-blue-500"
          detail="Bu ay: ₺95K"
        />
        <StatsGrid
          title="Bekleyen Tahsilat"
          value="₺145K"
          icon="fas fa-clock"
          bgColor="bg-amber-500"
          detail="18 fatura"
        />
        <StatsGrid
          title="Bekleyen Ödeme"
          value="₺89K"
          icon="fas fa-exclamation-triangle"
          bgColor="bg-red-500"
          detail="12 fatura"
          variant="critical"
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button
          variant="primary"
          icon="fas fa-plus"
          onClick={handleAddCollection}
        >
          Tahsilat Ekle
        </Button>
        <Button
          variant="secondary"
          icon="fas fa-plus"
          onClick={handleAddPayment}
        >
          Ödeme Ekle
        </Button>
        <Button variant="outline" icon="fas fa-download" onClick={handleExport}>
          Dışa Aktar
        </Button>
      </div>

      <Table
        data={allPayments}
        columns={columns}
        filters={filters}
        itemsPerPage={10}
        onView={handleViewDetails}
      />
    </div>
  );
};

export default InvoicePayments;
