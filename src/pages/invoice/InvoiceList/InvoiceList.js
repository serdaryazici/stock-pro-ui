import { useNavigate } from "react-router-dom";
import StatsGrid from "../../../components/StatsGrid";
import Table from "../../../components/Table";
import Button from "../../../components/Button";

const InvoiceList = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: "fa-solid fa-file-invoice",
      title: "Toplam Fatura",
      value: "156",
      detail: "Bu ay: 23 fatura",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-file-export",
      title: "Satış Faturaları",
      value: "₺1.2M",
      detail: "89 adet fatura",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-file-import",
      title: "Alış Faturaları",
      value: "₺850K",
      detail: "67 adet fatura",
      bgColor: "bg-purple-500",
    },
    {
      icon: "fa-solid fa-clock",
      title: "Vadesi Geçen",
      value: "12",
      detail: "Toplam: ₺145K",
      bgColor: "bg-red-500",
      critical: true,
    },
  ];

  const invoices = [
    {
      id: 1,
      invoiceNo: "SF-2025-001",
      type: "sales",
      customer: "ABC Teknoloji A.Ş.",
      date: "2025-01-15",
      dueDate: "2025-02-15",
      amount: 45000,
      status: "paid",
    },
    {
      id: 2,
      invoiceNo: "AF-2025-001",
      type: "purchase",
      customer: "XYZ Tedarik Ltd.",
      date: "2025-01-18",
      dueDate: "2025-02-18",
      amount: 32000,
      status: "pending",
    },
    {
      id: 3,
      invoiceNo: "SF-2025-002",
      type: "sales",
      customer: "DEF Mühendislik",
      date: "2025-01-10",
      dueDate: "2025-01-25",
      amount: 18500,
      status: "overdue",
    },
    {
      id: 4,
      invoiceNo: "SF-2025-003",
      type: "sales",
      customer: "GHI Danışmanlık",
      date: "2025-01-20",
      dueDate: "2025-02-20",
      amount: 27000,
      status: "pending",
    },
    {
      id: 5,
      invoiceNo: "AF-2025-002",
      type: "purchase",
      customer: "JKL Lojistik",
      date: "2025-01-22",
      dueDate: "2025-02-22",
      amount: 15000,
      status: "paid",
    },
    {
      id: 6,
      invoiceNo: "SF-2025-004",
      type: "sales",
      customer: "MNO Ticaret",
      date: "2025-01-25",
      dueDate: "2025-02-25",
      amount: 52000,
      status: "pending",
    },
    {
      id: 7,
      invoiceNo: "AF-2025-003",
      type: "purchase",
      customer: "PQR Sanayi",
      date: "2025-01-28",
      dueDate: "2025-02-28",
      amount: 38000,
      status: "paid",
    },
    {
      id: 8,
      invoiceNo: "SF-2025-005",
      type: "sales",
      customer: "STU Yazılım",
      date: "2025-01-12",
      dueDate: "2025-01-20",
      amount: 22000,
      status: "overdue",
    },
  ];

  const columns = [
    {
      key: "invoiceNo",
      label: "Fatura No",
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: "type",
      label: "Tip",
      render: (value) => {
        const typeLabels = {
          sales: "Satış",
          purchase: "Alış",
        };
        const typeColors = {
          sales: "bg-blue-100 text-blue-800",
          purchase: "bg-purple-100 text-purple-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${typeColors[value]}`}
          >
            {typeLabels[value]}
          </span>
        );
      },
    },
    { key: "customer", label: "Müşteri/Tedarikçi" },
    { key: "date", label: "Tarih" },
    { key: "dueDate", label: "Vade Tarihi" },
    {
      key: "amount",
      label: "Tutar",
      render: (value) => <strong>₺{value.toLocaleString("tr-TR")}</strong>,
    },
    {
      key: "status",
      label: "Durum",
      render: (value) => {
        const statusLabels = {
          paid: "Ödendi",
          pending: "Beklemede",
          overdue: "Vadesi Geçti",
        };
        const statusColors = {
          paid: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          overdue: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${statusColors[value]}`}
          >
            {statusLabels[value]}
          </span>
        );
      },
    },
  ];

  const filters = [
    {
      key: "type",
      label: "Fatura Tipi",
      title: "Faturalar",
      options: [
        { value: "sales", label: "Satış Faturaları" },
        { value: "purchase", label: "Alış Faturaları" },
      ],
      filterFn: (item, value) => item.type === value,
    },
    {
      key: "status",
      label: "Durum",
      options: [
        { value: "paid", label: "Ödendi" },
        { value: "pending", label: "Beklemede" },
        { value: "overdue", label: "Vadesi Geçti" },
      ],
      filterFn: (item, value) => item.status === value,
    },
  ];

  const handleCreateSalesInvoice = () => {
    navigate("/invoice/sales");
  };

  const handleCreatePurchaseInvoice = () => {
    navigate("/invoice/purchase");
  };

  const handleExport = () => {
    console.log("Export invoices");
    alert("Faturalar Excel formatında dışa aktarılıyor...");
  };

  const handleView = (invoice) => {
    console.log("View invoice:", invoice);
    navigate(`/invoice/view/${invoice.id}`);
  };

  const handleEdit = (invoice) => {
    console.log("Edit invoice:", invoice);
    if (invoice.type === "sales") {
      navigate(`/invoice/sales/${invoice.id}`);
    } else {
      navigate(`/invoice/purchase/${invoice.id}`);
    }
  };

  const handleDelete = (invoice) => {
    if (
      window.confirm(
        `${invoice.invoiceNo} numaralı faturayı silmek istediğinize emin misiniz?`
      )
    ) {
      console.log("Delete invoice:", invoice);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          onClick={handleCreateSalesInvoice}
          className="px-4 py-2 flex-initial"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Satış Faturası Oluştur
        </Button>
        <Button
          variant="secondary"
          onClick={handleCreatePurchaseInvoice}
          className="px-4 py-2 flex-initial"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Alış Faturası Oluştur
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          className="px-4 py-2 flex-initial bg-transparent"
        >
          <i className="fa-solid fa-download mr-2"></i>
          Dışa Aktar
        </Button>
      </div>

      <Table
        columns={columns}
        data={invoices}
        filters={filters}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
      />
    </div>
  );
};

export default InvoiceList;
