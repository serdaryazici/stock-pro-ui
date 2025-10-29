import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import TypeCard from "../../../components/TypeCard";
import EditableTable from "../../../components/EditableTable";
import Table from "../../../components/Table";

const StockExit = () => {
  const navigate = useNavigate();
  const [exitType, setExitType] = useState("sale");
  const [formData, setFormData] = useState({
    exitDate: new Date().toISOString().split("T")[0],
    documentNo: "",
    customer: "",
    customerAddress: "",
    warehouse: "",
    description: "",
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      product: "",
      currentStock: 0,
      quantity: "",
      unitPrice: "",
      total: 0,
    },
  ]);

  const exitTypes = [
    {
      id: "sale",
      icon: "fas fa-shopping-bag",
      title: "Satış",
      description: "Müşteriye satış işlemi",
    },
    {
      id: "waste",
      icon: "fas fa-trash-alt",
      title: "Fire",
      description: "Bozulma, kayıp vb.",
    },
    {
      id: "return-supplier",
      icon: "fas fa-reply",
      title: "Tedarikçi İadesi",
      description: "Tedarikçiye iade",
    },
  ];

  const productOptions = [
    { value: "PRD001", label: "Samsung Galaxy S24" },
    { value: "PRD002", label: "Nike Air Max 270" },
    { value: "PRD003", label: "Dyson V15 Detect" },
  ];

  const customerOptions = [
    { value: "customer1", label: "Ahmet Yılmaz" },
    { value: "customer2", label: "Fatma Kaya" },
    { value: "customer3", label: "Mehmet Demir" },
  ];

  const warehouseOptions = [
    { value: "ana", label: "Ana Depo" },
    { value: "yedek", label: "Yedek Depo" },
    { value: "magaza", label: "Mağaza Deposu" },
  ];

  useEffect(() => {
    generateDocumentNumber();
  }, []);

  const generateDocumentNumber = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    const docNumber = `CKS-${year}-${String(randomNum).padStart(3, "0")}`;
    setFormData((prev) => ({ ...prev, documentNo: docNumber }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductsChange = (newProducts) => {
    setProducts(newProducts);
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      product: "",
      currentStock: 0,
      quantity: "",
      unitPrice: "",
      total: 0,
    };
    setProducts([...products, newRow]);
  };

  const handleRemoveRow = (id) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const calculateTotals = () => {
    let totalProducts = 0;
    let grandTotal = 0;

    products.forEach((product) => {
      const quantity = Number.parseFloat(product.quantity) || 0;
      const unitPrice = Number.parseFloat(product.unitPrice) || 0;
      if (quantity > 0 && unitPrice > 0) {
        totalProducts += quantity;
        grandTotal += quantity * unitPrice;
      }
    });

    return { totalProducts, grandTotal };
  };

  const handleClearForm = () => {
    setFormData({
      exitDate: new Date().toISOString().split("T")[0],
      documentNo: "",
      customer: "",
      customerAddress: "",
      warehouse: "",
      description: "",
    });
    setProducts([
      {
        id: 1,
        product: "",
        currentStock: 0,
        quantity: "",
        unitPrice: "",
        total: 0,
      },
    ]);
    generateDocumentNumber();
  };

  const handleSave = () => {
    console.log("Saving stock exit:", { exitType, formData, products });
    alert("Stok çıkışı kaydedildi!");
  };

  const { totalProducts, grandTotal } = calculateTotals();

  const columns = [
    {
      key: "product",
      label: "Ürün",
      type: "select",
      options: productOptions,
      placeholder: "Ürün Seçin",
      required: true,
      onChange: (value, rowId) => {
        const randomStock = Math.floor(Math.random() * 100) + 1;
        const updatedProducts = products.map((p) =>
          p.id === rowId
            ? { ...p, product: value, currentStock: randomStock }
            : p
        );
        setProducts(updatedProducts);
      },
    },
    {
      key: "currentStock",
      label: "Mevcut Stok",
      type: "readonly",
      render: (row) => (
        <span className="font-semibold text-blue-600">
          {row.currentStock || 0}
        </span>
      ),
    },
    {
      key: "quantity",
      label: "Çıkış Miktarı",
      type: "number",
      placeholder: "0",
      required: true,
      inputProps: { min: 1 },
    },
    {
      key: "unitPrice",
      label: "Birim Fiyat",
      type: "number",
      placeholder: "0.00",
      required: true,
      inputProps: { step: 0.01, min: 0 },
    },
    {
      key: "total",
      label: "Toplam",
      type: "readonly",
      render: (row) => {
        const quantity = Number.parseFloat(row.quantity) || 0;
        const unitPrice = Number.parseFloat(row.unitPrice) || 0;
        const total = quantity * unitPrice;
        return (
          <span className="font-semibold text-gray-900">
            ₺{total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
          </span>
        );
      },
    },
  ];

  const recentExitsColumns = [
    { key: "documentNo", label: "Belge No" },
    { key: "date", label: "Tarih" },
    { key: "customer", label: "Müşteri" },
    { key: "productCount", label: "Ürün Sayısı" },
    { key: "totalAmount", label: "Toplam Tutar" },
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

  const recentExitsData = [
    {
      id: 1,
      documentNo: "CKS-2024-001",
      date: "15.01.2024",
      customer: "Ahmet Yılmaz",
      productCount: 3,
      totalAmount: "₺85,500",
      status: "Tamamlandı",
    },
    {
      id: 2,
      documentNo: "CKS-2024-002",
      date: "14.01.2024",
      customer: "Fatma Kaya",
      productCount: 2,
      totalAmount: "₺6,998",
      status: "Tamamlandı",
    },
  ];

  const handleView = (row) => {
    console.log("View:", row);
  };

  const handleEdit = (row) => {
    console.log("Edit:", row);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {exitTypes.map((type) => (
          <TypeCard
            key={type.id}
            icon={type.icon}
            title={type.title}
            description={type.description}
            isActive={exitType === type.id}
            onClick={() => setExitType(type.id)}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Stok Çıkış Formu
          </h2>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClearForm}>
              <i className="fas fa-eraser mr-2"></i>
              Temizle
            </Button>
            <Button variant="primary" onClick={handleSave}>
              <i className="fas fa-save mr-2"></i>
              Kaydet
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
              Genel Bilgiler
            </h3>
            <div className="flex flex-col">
              <Input
                label="İşlem Tarihi"
                type="date"
                name="exitDate"
                value={formData.exitDate}
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
                label="Müşteri"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                options={customerOptions}
                placeholder="Müşteri Seçin"
                className="mb-4"
                required
              />
              <Input
                label="Müşteri Adresi"
                type="text"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleInputChange}
                placeholder="Otomatik oluşturulacak"
                className="mb-4"
                readOnly
              />
              <Select
                label="Depo"
                name="warehouse"
                value={formData.warehouse}
                onChange={handleInputChange}
                options={warehouseOptions}
                placeholder="Depo seçin"
                className="mb-4"
              />
            </div>
            <div className="mt-4">
              <Textarea
                label="Açıklama"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="İşlem açıklaması..."
                rows={2}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">
              Ürün Bilgileri
            </h3>
            <EditableTable
              columns={columns}
              data={products}
              onDataChange={handleProductsChange}
              onAddRow={handleAddRow}
              onRemoveRow={handleRemoveRow}
              addButtonText="Ürün Ekle"
              minRows={1}
            />
          </div>

          <div className="flex justify-end gap-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Toplam Ürün</div>
              <div className="text-xl font-semibold text-gray-900">
                {totalProducts}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Genel Toplam</div>
              <div className="text-xl font-semibold text-gray-900">
                ₺
                {grandTotal.toLocaleString("tr-TR", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Son Stok Çıkışları
          </h2>
          <Button variant="outline" className="px-4 py-2 flex-initial">
            <i className="fas fa-eye mr-2"></i>
            Tümünü Gör
          </Button>
        </div>
        <Table
          columns={recentExitsColumns}
          data={recentExitsData}
          onView={handleView}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default StockExit;
