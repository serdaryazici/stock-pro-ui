import React, { useState } from "react";
import Tab from "../../../../components/Tab";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Textarea from "../../../../components/Textarea";
import FileUpload from "../../../../components/FileUpload";
import Toggle from "../../../../components/Toggle";
import Button from "../../../../components/Button";
import InfoCard from "../../../../components/InfoCard";
import PricePreview from "../../../../components/PricePreview";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    category: "",
    unit: "adet",
    quantity: "",
    description: "",
    purchasePrice: 0,
    salePrice: 0,
    vatRate: 18,
    stockTracking: true,
    initialStock: "",
    minStock: "",
    maxStock: "",
    shelfLocation: "",
    warehouse: "",
    stockNotes: "",
  });

  const [prices, setPrices] = useState({
    kdvAmount: 0,
    purchasePriceWithVat: 0,
    salePriceWithVat: 0,
    profitMargin: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(newData);

    if (["purchasePrice", "salePrice", "vatRate"].includes(name)) {
      calculatePrices(newData);
    }
  };

  const calculatePrices = (data) => {
    const purchasePrice = parseFloat(data.purchasePrice) || 0;
    const salePrice = parseFloat(data.salePrice) || 0;
    const vatRate = parseFloat(data.vatRate) || 0;

    const kdvAmount = (salePrice * vatRate) / 100;
    const purchasePriceWithVat =
      purchasePrice + (purchasePrice * vatRate) / 100;
    const salePriceWithVat = salePrice + kdvAmount;
    const profitMargin = salePriceWithVat - purchasePriceWithVat;

    setPrices({
      kdvAmount,
      purchasePriceWithVat,
      salePriceWithVat,
      profitMargin,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const categoryOptions = [
    { value: "elektronik", label: "Elektronik" },
    { value: "giyim", label: "Giyim" },
    { value: "gida", label: "Gıda" },
    { value: "ev", label: "Ev & Yaşam" },
  ];

  const unitOptions = [
    { value: "adet", label: "Adet" },
    { value: "kg", label: "Kilogram" },
    { value: "metre", label: "Metre" },
    { value: "litre", label: "Litre" },
  ];

  const vatOptions = [
    { value: "0", label: "%0" },
    { value: "1", label: "%1" },
    { value: "8", label: "%8" },
    { value: "18", label: "%18" },
    { value: "20", label: "%20" },
  ];

  const warehouseOptions = [
    { value: "ana", label: "Ana Depo" },
    { value: "yedek", label: "Yedek Depo" },
    { value: "magaza", label: "Mağaza Deposu" },
  ];

  const tabs = [
    { label: "Temel Bilgiler", icon: "fas fa-info-circle" },
    { label: "Fiyatlandırma", icon: "fas fa-dollar-sign" },
    { label: "Stok Bilgileri", icon: "fas fa-warehouse" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Tab tabs={tabs}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Input
                label="Ürün Adı"
                icon="fas fa-tag"
                name="productName"
                placeholder="Ürün adını girin"
                required
                value={formData.productName}
                onChange={handleChange}
              />
              <Input
                label="Ürün Kodu"
                icon="fas fa-barcode"
                name="productCode"
                placeholder="Örn: PRD-001"
                required
                value={formData.productCode}
                onChange={handleChange}
              />
            </div>

            <Select
              label="Kategori"
              icon="fas fa-layer-group"
              name="category"
              required
              options={categoryOptions}
              value={formData.category}
              onChange={handleChange}
              placeholder="Kategori seçin"
            />

            <div className="grid grid-cols-2 gap-6 mb-6 mt-6">
              <Select
                label="Birim"
                icon="fas fa-box"
                name="unit"
                options={unitOptions}
                value={formData.unit}
                onChange={handleChange}
              />
              <Input
                label="Miktar"
                icon="fas fa-plus"
                name="quantity"
                type="number"
                required
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <Textarea
              label="Ürün Açıklaması"
              icon="fas fa-align-left"
              name="description"
              placeholder="Ürün hakkında detaylı açıklama yazın..."
              value={formData.description}
              onChange={handleChange}
              className="mb-6"
            />

            <FileUpload
              label="Ürün Görseli"
              icon="fas fa-image"
              onChange={(e) => console.log(e.target.files[0])}
            />
          </form>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Input
                label="Alış Fiyatı (KDV Hariç)"
                icon="fas fa-shopping-cart"
                name="purchasePrice"
                type="number"
                placeholder="0.00"
                value={formData.purchasePrice}
                onChange={handleChange}
              />
              <Input
                label="Satış Fiyatı (KDV Hariç)"
                icon="fas fa-hand-holding-usd"
                name="salePrice"
                type="number"
                placeholder="0.00"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </div>

            <Select
              label="KDV Oranı"
              icon="fas fa-percent"
              name="vatRate"
              options={vatOptions}
              value={formData.vatRate}
              onChange={handleChange}
            />

            <PricePreview {...prices} />
          </form>

          <form onSubmit={handleSubmit}>
            <Toggle
              label="Stok Takibi Yap"
              icon="fas fa-list-ol"
              name="stockTracking"
              checked={formData.stockTracking}
              onChange={handleChange}
              className="mb-5"
            />

            <Input
              label="Başlangıç Stok Miktarı"
              icon="fas fa-cubes"
              name="initialStock"
              type="number"
              placeholder="0"
              value={formData.initialStock}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-6 mb-6 mt-6">
              <Input
                label="Minimum Stok Seviyesi"
                icon="fas fa-exclamation-triangle"
                name="minStock"
                type="number"
                placeholder="10"
                value={formData.minStock}
                onChange={handleChange}
              />
              <Input
                label="Maksimum Stok Seviyesi"
                icon="fas fa-chart-line"
                name="maxStock"
                type="number"
                placeholder="1000"
                value={formData.maxStock}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <Input
                label="Raf Konumu"
                icon="fas fa-map-marker-alt"
                name="shelfLocation"
                placeholder="Örn: A-12-3"
                value={formData.shelfLocation}
                onChange={handleChange}
              />
              <Select
                label="Depo"
                icon="fas fa-warehouse"
                name="warehouse"
                options={warehouseOptions}
                value={formData.warehouse}
                onChange={handleChange}
                placeholder="Depo seçin"
              />
            </div>

            <Textarea
              label="Stok Notları"
              icon="fas fa-sticky-note"
              name="stockNotes"
              placeholder="Stok ile ilgili özel notlar..."
              value={formData.stockNotes}
              onChange={handleChange}
            />
          </form>
        </Tab>

        <div className="flex gap-4 p-8 bg-slate-50 border-t border-slate-200">
          <Button variant="error" icon="fas fa-times">
            İptal
          </Button>
          <Button variant="primary" icon="fas fa-save" type="submit">
            Ürünü Kaydet
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <InfoCard title="İpuçları" icon="fas fa-lightbulb">
          <p>
            <strong>• Ürün Kodu:</strong> Benzersiz bir kod kullanın.
          </p>
          <p>
            <strong>• Fotoğraf:</strong> Yüksek kaliteli görsel kullanın.
          </p>
          <p>
            <strong>• Açıklama:</strong> Detaylı bilgi verin.
          </p>
          <p>
            <strong>• Fiyatlandırma:</strong> Pazar araştırması yapın.
          </p>
        </InfoCard>

        <InfoCard title="Bildirimler" icon="fas fa-bell">
          <p>
            Yeni ürün eklendiğinde ilgili departmanlara otomatik bildirim
            gönderilecektir.
          </p>
        </InfoCard>
      </div>
    </div>
  );
};

export default AddProductPage;
