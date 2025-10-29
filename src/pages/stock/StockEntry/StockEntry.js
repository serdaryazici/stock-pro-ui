import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import TypeCard from "../../../components/TypeCard";
import EditableTable from "../../../components/EditableTable";
import Table from "../../../components/Table";

const StockEntry = () => {
  const navigate = useNavigate();
  const [entryType, setEntryType] = useState("purchase");
  const [formData, setFormData] = useState({
    entryDate: new Date().toISOString().split("T")[0],
    documentNo: "",
    supplier: "",
    description: "",
  });
  const [productRows, setProductRows] = useState([
    { id: 1, product: "", quantity: "", unitPrice: "", total: 0 },
  ]);

  useEffect(() => {
    generateDocumentNumber();
  }, []);

  const generateDocumentNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const docNumber = `GRS-${year}-${String(randomNum).padStart(3, "0")}`;
    setFormData((prev) => ({ ...prev, documentNo: docNumber }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (rowIndex, columnKey, value) => {
    setProductRows((prev) => {
      const updated = [...prev];
      updated[rowIndex] = { ...updated[rowIndex], [columnKey]: value };

      if (columnKey === "quantity" || columnKey === "unitPrice") {
        const quantity =
          Number.parseFloat(
            columnKey === "quantity" ? value : updated[rowIndex].quantity
          ) || 0;
        const unitPrice =
          Number.parseFloat(
            columnKey === "unitPrice" ? value : updated[rowIndex].unitPrice
          ) || 0;
        updated[rowIndex].total = quantity * unitPrice;
      }

      return updated;
    });
  };

  const addProductRow = () => {
    const newId = Math.max(...productRows.map((r) => r.id), 0) + 1;
    setProductRows((prev) => [
      ...prev,
      { id: newId, product: "", quantity: "", unitPrice: "", total: 0 },
    ]);
  };

  const removeProductRow = (rowIndex) => {
    if (productRows.length > 1) {
      setProductRows((prev) => prev.filter((_, index) => index !== rowIndex));
    }
  };

  const calculateTotals = () => {
    const totalProducts = productRows.reduce((sum, row) => {
      return sum + (Number.parseFloat(row.quantity) || 0);
    }, 0);
    const grandTotal = productRows.reduce((sum, row) => sum + row.total, 0);
    return { totalProducts, grandTotal };
  };

  const clearForm = () => {
    setFormData({
      entryDate: new Date().toISOString().split("T")[0],
      documentNo: "",
      supplier: "",
      description: "",
    });
    setProductRows([
      { id: 1, product: "", quantity: "", unitPrice: "", total: 0 },
    ]);
    generateDocumentNumber();
  };

  const handleSave = () => {};

  const { totalProducts, grandTotal } = calculateTotals();

  const recentEntriesColumns = [
    { key: "documentNo", label: "Belge No" },
    { key: "date", label: "Tarih" },
    { key: "supplier", label: "Tedarikçi" },
    { key: "productCount", label: "Ürün Sayısı" },
    {
      key: "totalAmount",
      label: "Toplam Tutar",
      render: (item) => `₺${item.toLocaleString("tr-TR")}`,
    },
    {
      key: "status",
      label: "Durum",
      render: (value) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value}
        </span>
      ),
    },
  ];

  const recentEntriesData = [
    {
      id: 1,
      documentNo: "GRS-2024-001",
      date: "15.01.2024",
      supplier: "ABC Elektronik Ltd.",
      productCount: 25,
      totalAmount: 125500,
      status: "Onaylandı",
    },
    {
      id: 2,
      documentNo: "GRS-2024-002",
      date: "14.01.2024",
      supplier: "XYZ Giyim San.",
      productCount: 18,
      totalAmount: 45200,
      status: "Onaylandı",
    },
  ];

  const productColumns = [
    {
      key: "product",
      label: "Ürün",
      type: "select",
      placeholder: "Ürün Seçin",
      required: true,
      width: "35%",
      options: [
        { value: "PRD001", label: "Samsung Galaxy S24" },
        { value: "PRD002", label: "Nike Air Max 270" },
        { value: "PRD003", label: "Dyson V15 Detect" },
        { value: "PRD004", label: "Apple MacBook Pro 14" },
        { value: "PRD005", label: "Sony WH-1000XM5" },
      ],
      inputProps: { required: true },
    },
    {
      key: "quantity",
      label: "Miktar",
      type: "number",
      placeholder: "0",
      required: true,
      width: "15%",
      inputProps: { min: 1, step: 1, required: true },
    },
    {
      key: "unitPrice",
      label: "Birim Fiyat",
      type: "number",
      placeholder: "0.00",
      required: true,
      width: "20%",
      inputProps: { min: 0, step: 0.01, required: true },
    },
    {
      key: "total",
      label: "Toplam",
      type: "readonly",
      width: "20%",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          ₺
          {(row.total || 0).toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <TypeCard
          icon="fas fa-shopping-cart"
          title="Alış"
          description="Tedarikçiden ürün alımı"
          isActive={entryType === "purchase"}
          onClick={() => setEntryType("purchase")}
        />
        <TypeCard
          icon="fas fa-undo"
          title="İade"
          description="Müşteri iade işlemi"
          isActive={entryType === "return"}
          onClick={() => setEntryType("return")}
        />
        <TypeCard
          icon="fas fa-exchange-alt"
          title="Transfer"
          description="Depo arası transfer"
          isActive={entryType === "transfer"}
          onClick={() => setEntryType("transfer")}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Stok Giriş Formu
          </h2>
          <div className="flex gap-4">
            <Button variant="outline" icon="fas fa-eraser" onClick={clearForm}>
              Temizle
            </Button>
            <Button variant="primary" icon="fas fa-save" onClick={handleSave}>
              Kaydet
            </Button>
          </div>
        </div>

        <form className="p-6">
          <div className="mb-6">
            <div className="flex flex-col mb-4">
              <Input
                label="İşlem Tarihi"
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleInputChange}
                className="mb-4"
                required
              />
              <Input
                label="Belge No"
                type="text"
                name="documentNo"
                value={formData.documentNo}
                placeholder="Otomatik oluşturulacak"
                className="mb-4"
                readOnly
              />
              <Select
                label="Tedarikçi"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                required
              >
                <option value="">Tedarikçi Seçin</option>
                <option value="supplier1">ABC Elektronik Ltd.</option>
                <option value="supplier2">XYZ Giyim San.</option>
                <option value="supplier3">DEF Ev Eşyaları</option>
              </Select>
            </div>
            <Textarea
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="İşlem açıklaması..."
              rows={2}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b-2 border-slate-100">
              Ürün Bilgileri
            </h3>
            <EditableTable
              columns={productColumns}
              data={productRows}
              onDataChange={handleProductChange}
              onAddRow={addProductRow}
              onRemoveRow={removeProductRow}
              addButtonText="Ürün Ekle"
              minRows={1}
            />
          </div>

          <div className="flex justify-end gap-8 p-4 bg-slate-50 rounded-lg">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-slate-600">Toplam Ürün:</span>
              <strong className="text-lg text-slate-800">
                {totalProducts}
              </strong>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-slate-600">Genel Toplam:</span>
              <strong className="text-lg text-slate-800">
                ₺
                {grandTotal.toLocaleString("tr-TR", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Son Stok Girişleri
          </h2>
          <Button variant="outline" icon="fas fa-eye" className="px-4 py-2 flex-initial">
            Tümünü Gör
          </Button>
        </div>
        <Table
          columns={recentEntriesColumns}
          data={recentEntriesData}
          itemsPerPage={5}
          onView={(item) => console.log("View:", item)}
          onEdit={(item) => console.log("Edit:", item)}
        />
      </div>
    </div>
  );
};

export default StockEntry;
