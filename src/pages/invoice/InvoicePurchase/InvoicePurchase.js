import { useState } from "react";
import Tab from "../../../components/Tab";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import InfoCard from "../../../components/InfoCard";
import EditableTable from "../../../components/EditableTable";

const InvoicePurchase = () => {
  const invoiceColumns = [
    {
      key: "product",
      label: "Ürün",
      type: "select",
      placeholder: "Ürün seçin",
      required: true,
      width: "30%",
      options: [
        { value: "", label: "Ürün seçin" },
        { value: "1", label: "Laptop Dell XPS 15" },
        { value: "2", label: "Mouse Logitech MX" },
        { value: "3", label: "Klavye Mechanical" },
      ],
    },
    {
      key: "quantity",
      label: "Miktar",
      type: "number",
      width: "12%",
      inputProps: { min: 1, step: "1" },
    },
    {
      key: "unit",
      label: "Birim",
      type: "select",
      width: "12%",
      options: [
        { value: "adet", label: "Adet" },
        { value: "kg", label: "Kg" },
        { value: "m", label: "Metre" },
      ],
    },
    {
      key: "unitPrice",
      label: "Birim Fiyat",
      type: "number",
      width: "14%",
      inputProps: { step: "0.01", min: 0 },
    },
    {
      key: "taxRate",
      label: "KDV %",
      type: "select",
      width: "10%",
      options: [
        { value: 20, label: "20%" },
        { value: 18, label: "18%" },
        { value: 8, label: "8%" },
        { value: 1, label: "1%" },
      ],
    },
    {
      key: "total",
      label: "Toplam",
      type: "readonly",
      width: "14%",
      format: (v) => Number(v || 0).toFixed(2),
    },
  ];

  const [items, setItems] = useState([
    {
      id: 1,
      product: "",
      quantity: 1,
      unit: "adet",
      unitPrice: 0,
      taxRate: 20,
      total: 0,
    },
  ]);

  const tabs = [
    { icon: "fas fa-info-circle", label: "Fatura Bilgileri" },
    { icon: "fas fa-truck", label: "Tedarikçi" },
    { icon: "fas fa-list", label: "Ürünler" },
    { icon: "fas fa-money-bill", label: "Ödeme" },
  ];

  const calculateRowTotal = (item) => {
    const qty = Number.parseFloat(item.quantity) || 0;
    const price = Number.parseFloat(item.unitPrice) || 0;
    const taxRate = Number.parseFloat(item.taxRate) || 0;
    const subtotal = qty * price;
    const tax = subtotal * (taxRate / 100);
    return subtotal + tax;
  };

  const calculateTotals = (rows) => {
    let subtotal = 0;
    let taxTotal = 0;
    rows.forEach((item) => {
      const qty = Number.parseFloat(item.quantity) || 0;
      const price = Number.parseFloat(item.unitPrice) || 0;
      const taxRate = Number.parseFloat(item.taxRate) || 0;
      const rowNet = qty * price;
      const rowTax = rowNet * (taxRate / 100);
      subtotal += rowNet;
      taxTotal += rowTax;
    });
    return {
      subtotal: subtotal.toFixed(2),
      tax: taxTotal.toFixed(2),
      total: (subtotal + taxTotal).toFixed(2),
    };
  };

  const handleDataChange = (rowIndex, columnKey, value) => {
    setItems((prev) => {
      const copy = [...prev];
      const item = { ...copy[rowIndex] };

      if (["quantity", "unitPrice", "taxRate"].includes(columnKey)) {
        const parsed = value === "" ? 0 : Number.parseFloat(value);
        item[columnKey] = Number.isNaN(parsed) ? 0 : parsed;
      } else {
        item[columnKey] = value;
      }

      item.total = calculateRowTotal(item);
      copy[rowIndex] = item;
      return copy;
    });
  };

  const handleAddRow = () => {
    setItems((prev) => {
      const nextId = prev.length
        ? Math.max(...prev.map((r) => r.id || 0)) + 1
        : 1;
      const newRow = {
        id: nextId,
        product: "",
        quantity: 1,
        unit: "adet",
        unitPrice: 0,
        taxRate: 20,
        total: 0,
      };
      newRow.total = calculateRowTotal(newRow);
      return [...prev, newRow];
    });
  };

  const handleRemoveRow = (rowIndex) => {
    setItems((prev) => {
      if (prev.length <= 1) return prev;
      const copy = prev.filter((_, i) => i !== rowIndex);
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Alış Faturası verileri:", items);
    alert("Alış faturası başarıyla oluşturuldu!");
  };

  const totals = calculateTotals(items);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
            <Tab tabs={tabs}>
              <div>
                <Input
                  label="Fatura No"
                  icon="fas fa-hashtag"
                  value="SF-2025-001"
                  className="mb-6"
                  readOnly
                />
                <Input
                  label="Fatura Tarihi"
                  icon="fas fa-calendar"
                  type="date"
                  defaultValue="2025-10-25"
                  className="mb-6"
                  required
                />
                <Input
                  label="Vade Tarihi"
                  icon="fas fa-calendar-check"
                  type="date"
                  className="mb-6"
                  required
                />

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Select
                    label="Fatura Tipi"
                    icon="fas fa-file-alt"
                    required
                    options={[
                      { value: "purchase", label: "Alış Faturası" },
                      { value: "return", label: "İade Faturası" },
                      { value: "import", label: "İthalat Faturası" },
                    ]}
                  />
                  <Select
                    label="Para Birimi"
                    icon="fas fa-money-bill-wave"
                    options={[
                      { value: "TRY", label: "₺ Türk Lirası" },
                      { value: "USD", label: "$ Dolar" },
                      { value: "EUR", label: "€ Euro" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Select
                    label="Hedef Depo"
                    icon="fas fa-warehouse"
                    required
                    placeholder="Depo seçin"
                    options={[
                      { value: "", label: "Depo seçin" },
                      { value: "1", label: "Ana Depo - İstanbul" },
                      { value: "2", label: "Şube Depo - Ankara" },
                      { value: "3", label: "Transit Depo - İzmir" },
                    ]}
                  />
                  <Select
                    label="Satınalma Sorumlusu"
                    icon="fas fa-user-tie"
                    placeholder="Seçin"
                    options={[
                      { value: "", label: "Seçin" },
                      { value: "1", label: "Serdar Yazıcı" },
                      { value: "2", label: "Ahmet Yılmaz" },
                      { value: "3", label: "Zeynep Kaya" },
                    ]}
                  />
                </div>

                <Textarea
                  label="Açıklama"
                  icon="fas fa-align-left"
                  rows={3}
                  placeholder="Fatura açıklaması..."
                />
              </div>

              <div>
                <div className="relative mb-6">
                  <Input
                    label="Tedarikçi Ara"
                    icon="fas fa-search"
                    placeholder="Tedarikçi adı veya kodu ile ara"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-7 px-4 py-3.5 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
                  >
                    <i className="fas fa-search mr-2"></i>
                    Ara
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Tedarikçi Adı"
                    icon="fas fa-building"
                    readOnly
                    placeholder="Seçilen tedarikçi"
                  />
                  <Input
                    label="Tedarikçi Kodu"
                    icon="fas fa-id-card"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Input label="Telefon" icon="fas fa-phone" readOnly />
                  <Input label="E-posta" icon="fas fa-envelope" readOnly />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Input label="Vergi No" icon="fas fa-file-invoice" readOnly />
                  <Input
                    label="Vergi Dairesi"
                    icon="fas fa-landmark"
                    readOnly
                  />
                </div>

                <Textarea
                  label="Adres"
                  icon="fas fa-map-marker-alt"
                  rows={3}
                  readOnly
                />
              </div>

              <div>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-box"></i>
                    Fatura Kalemleri
                  </h4>
                </div>

                <EditableTable
                  columns={invoiceColumns}
                  data={items}
                  onDataChange={handleDataChange}
                  onAddRow={handleAddRow}
                  onRemoveRow={handleRemoveRow}
                  addButtonText="Yeni Satır Ekle"
                  minRows={1}
                />
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Select
                    label="Ödeme Yöntemi"
                    icon="fas fa-credit-card"
                    required
                    placeholder="Seçin"
                    options={[
                      { value: "", label: "Seçin" },
                      { value: "cash", label: "Nakit" },
                      { value: "card", label: "Kredi Kartı" },
                      { value: "transfer", label: "Havale/EFT" },
                      { value: "check", label: "Çek" },
                      { value: "credit", label: "Vadeli" },
                    ]}
                  />
                  <Select
                    label="Ödeme Durumu"
                    icon="fas fa-wallet"
                    options={[
                      { value: "unpaid", label: "Ödenmedi" },
                      { value: "partial", label: "Kısmi Ödendi" },
                      { value: "paid", label: "Ödendi" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Ödenen Tutar (₺)"
                    icon="fas fa-money-bill"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue="0"
                  />
                  <Input
                    label="Ödeme Tarihi"
                    icon="fas fa-calendar-alt"
                    type="date"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Input
                    label="İrsaliye No"
                    icon="fas fa-receipt"
                    placeholder="İrsaliye numarası"
                  />
                  <Input
                    label="Kargo Takip No"
                    icon="fas fa-shipping-fast"
                    placeholder="Kargo takip numarası"
                  />
                </div>

                <Textarea
                  label="Ödeme Notu"
                  icon="fas fa-comment-alt"
                  rows={3}
                  placeholder="Ödeme ile ilgili notlar..."
                  className="mb-6"
                />
                <Textarea
                  label="Genel Notlar"
                  icon="fas fa-sticky-note"
                  rows={4}
                  placeholder="Fatura ile ilgili genel notlar ve açıklamalar..."
                />
              </div>
            </Tab>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-4">
              <Button variant="outline" icon="fas fa-times" type="button">
                İptal
              </Button>
              <Button
                variant="secondary"
                icon="fas fa-save"
                type="button"
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                Taslak Kaydet
              </Button>
              <Button variant="primary" icon="fas fa-check" type="submit">
                Faturayı Oluştur
              </Button>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <InfoCard title="Fatura Özeti" icon="fas fa-calculator">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Ara Toplam:</span>
                <span className="font-semibold text-slate-800">
                  ₺{totals.subtotal}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">KDV Toplamı:</span>
                <span className="font-semibold text-slate-800">
                  ₺{totals.tax}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">İndirim:</span>
                <span className="font-semibold text-slate-800">₺0.00</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-slate-200">
                <span className="font-bold text-slate-800">Genel Toplam:</span>
                <span className="font-bold text-lg text-amber-600">
                  ₺{totals.total}
                </span>
              </div>
              <div className="mt-4 px-4 py-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                <span className="font-medium">Ödenmedi</span>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Bilgilendirme" icon="fas fa-lightbulb">
            <div className="space-y-2 text-sm leading-relaxed">
              <p>
                <strong>• Fatura No:</strong> Otomatik oluşturulur.
              </p>
              <p>
                <strong>• Tedarikçi:</strong> Mutlaka seçilmelidir.
              </p>
              <p>
                <strong>• Ürünler:</strong> En az 1 ürün eklenmelidir.
              </p>
              <p>
                <strong>• KDV:</strong> Ürün bazlı hesaplanır.
              </p>
              <p>
                <strong>• Depo:</strong> Hedef depo belirtilmelidir.
              </p>
            </div>
          </InfoCard>
        </div>
      </div>
    </form>
  );
};

export default InvoicePurchase;
