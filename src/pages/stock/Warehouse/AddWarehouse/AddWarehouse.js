import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../../../components/Tab";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Textarea from "../../../../components/Textarea";
import Checkbox from "../../../../components/Checkbox";
import Button from "../../../../components/Button";
import InfoCard from "../../../../components/InfoCard";
import TypeCard from "../../../../components/TypeCard";

const AddWarehouse = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    warehouseCode: "",
    warehouseName: "",
    openingDate: new Date().toISOString().split("T")[0],
    status: "active",
    manager: "",
    phone: "",
    description: "",
    city: "",
    district: "",
    address: "",
    postalCode: "",
    region: "",
    totalArea: "",
    capacity: "",
    shelfCount: "",
    sectionCount: "",
    workHoursStart: "08:00",
    workHoursEnd: "18:00",
    email: "",
    fax: "",
    monthlyCost: "",
    energyCost: "",
    criticalStockLimit: "20",
    priority: "1",
    notes: "",
  });

  const [features, setFeatures] = useState({
    climateControl: false,
    security: false,
    fireSystem: false,
    loadingDock: false,
    forklift: false,
    coldStorage: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    alert("Depo başarıyla kaydedildi!");
    navigate("/stock/warehouse");
  };

  const handleCancel = () => {
    navigate("/stock/warehouse");
  };

  const tabs = [
    { label: "Temel Bilgiler", icon: "fas fa-info-circle" },
    { label: "Lokasyon & Adres", icon: "fas fa-map-marked-alt" },
    { label: "Kapasite & Özellikler", icon: "fas fa-boxes" },
    { label: "Ek Ayarlar", icon: "fas fa-cog" },
  ];

  const cityOptions = [
    { value: "istanbul", label: "İstanbul" },
    { value: "ankara", label: "Ankara" },
    { value: "izmir", label: "İzmir" },
    { value: "bursa", label: "Bursa" },
    { value: "antalya", label: "Antalya" },
    { value: "kayseri", label: "Kayseri" },
  ];

  const regionOptions = [
    { value: "marmara", label: "Marmara" },
    { value: "ege", label: "Ege" },
    { value: "akdeniz", label: "Akdeniz" },
    { value: "ic-anadolu", label: "İç Anadolu" },
    { value: "karadeniz", label: "Karadeniz" },
  ];

  const statusOptions = [
    { value: "active", label: "Aktif" },
    { value: "inactive", label: "Pasif" },
    { value: "maintenance", label: "Bakımda" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <Tab tabs={tabs}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TypeCard
                  icon="fas fa-building"
                  title="Ana Depo"
                  description="Merkez depo"
                  selected={selectedType === "main"}
                  onClick={() => setSelectedType("main")}
                />
                <TypeCard
                  icon="fas fa-store"
                  title="Şube Deposu"
                  description="Bölgesel depo"
                  selected={selectedType === "branch"}
                  onClick={() => setSelectedType("branch")}
                />
                <TypeCard
                  icon="fas fa-truck"
                  title="Transit Depo"
                  description="Transfer deposu"
                  selected={selectedType === "transit"}
                  onClick={() => setSelectedType("transit")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Depo Kodu"
                  icon="fas fa-barcode"
                  name="warehouseCode"
                  placeholder="Örn: DEP-001"
                  required
                  value={formData.warehouseCode}
                  onChange={handleInputChange}
                />
                <Input
                  label="Açılış Tarihi"
                  icon="fas fa-calendar"
                  type="date"
                  name="openingDate"
                  value={formData.openingDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Depo Adı"
                  icon="fas fa-warehouse"
                  name="warehouseName"
                  placeholder="Depo adını girin"
                  required
                  value={formData.warehouseName}
                  onChange={handleInputChange}
                />
                <Select
                  label="Durum"
                  icon="fas fa-toggle-on"
                  name="status"
                  required
                  options={statusOptions}
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Depo Sorumlusu"
                  icon="fas fa-user-tie"
                  name="manager"
                  placeholder="Sorumlu kişi adı"
                  required
                  value={formData.manager}
                  onChange={handleInputChange}
                />
                <Input
                  label="İletişim Telefonu"
                  icon="fas fa-phone"
                  type="tel"
                  name="phone"
                  placeholder="+90 5XX XXX XX XX"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <Textarea
                label="Depo Açıklaması"
                icon="fas fa-align-left"
                name="description"
                placeholder="Depo hakkında genel bilgiler..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Şehir"
                  icon="fas fa-city"
                  name="city"
                  required
                  options={cityOptions}
                  placeholder="Şehir seçin"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Input
                  label="İlçe"
                  icon="fas fa-map-pin"
                  name="district"
                  placeholder="İlçe"
                  required
                  value={formData.district}
                  onChange={handleInputChange}
                />
              </div>

              <Textarea
                label="Adres"
                icon="fas fa-map-marked-alt"
                name="address"
                placeholder="Detaylı adres bilgisi"
                required
                value={formData.address}
                onChange={handleInputChange}
              />

              <Input
                label="Posta Kodu"
                icon="fas fa-mailbox"
                name="postalCode"
                placeholder="34000"
                value={formData.postalCode}
                onChange={handleInputChange}
              />

              <Select
                label="Bölge"
                icon="fas fa-globe"
                name="region"
                options={regionOptions}
                placeholder="Bölge seçin"
                value={formData.region}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Toplam Alan (m²)"
                  icon="fas fa-ruler-combined"
                  type="number"
                  name="totalArea"
                  placeholder="0"
                  required
                  value={formData.totalArea}
                  onChange={handleInputChange}
                />
                <Input
                  label="Depolama Kapasitesi"
                  icon="fas fa-boxes"
                  type="number"
                  name="capacity"
                  placeholder="0"
                  required
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Raf Sayısı"
                  icon="fas fa-layer-group"
                  type="number"
                  name="shelfCount"
                  placeholder="0"
                  value={formData.shelfCount}
                  onChange={handleInputChange}
                />
                <Input
                  label="Depo Bölüm Sayısı"
                  icon="fas fa-th"
                  type="number"
                  name="sectionCount"
                  placeholder="0"
                  value={formData.sectionCount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  Depo Özellikleri
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox
                    label="İklim Kontrolü"
                    name="climateControl"
                    checked={features.climateControl}
                    onChange={handleFeatureChange}
                  />
                  <Checkbox
                    label="Güvenlik Sistemi"
                    name="security"
                    checked={features.security}
                    onChange={handleFeatureChange}
                  />
                  <Checkbox
                    label="Yangın Söndürme"
                    name="fireSystem"
                    checked={features.fireSystem}
                    onChange={handleFeatureChange}
                  />
                  <Checkbox
                    label="Yükleme Rampası"
                    name="loadingDock"
                    checked={features.loadingDock}
                    onChange={handleFeatureChange}
                  />
                  <Checkbox
                    label="Forklift"
                    name="forklift"
                    checked={features.forklift}
                    onChange={handleFeatureChange}
                  />
                  <Checkbox
                    label="Soğuk Hava Deposu"
                    name="coldStorage"
                    checked={features.coldStorage}
                    onChange={handleFeatureChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Çalışma Saatleri (Başlangıç)"
                  icon="fas fa-clock"
                  type="time"
                  name="workHoursStart"
                  value={formData.workHoursStart}
                  onChange={handleInputChange}
                />
                <Input
                  label="Çalışma Saatleri (Bitiş)"
                  icon="fas fa-clock"
                  type="time"
                  name="workHoursEnd"
                  value={formData.workHoursEnd}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="E-posta Adresi"
                  icon="fas fa-envelope"
                  type="email"
                  name="email"
                  placeholder="depo@sirket.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Fax Numarası"
                  icon="fas fa-fax"
                  type="tel"
                  name="fax"
                  placeholder="+90 XXX XXX XX XX"
                  value={formData.fax}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Aylık Kira Bedeli (₺)"
                  icon="fas fa-dollar-sign"
                  type="number"
                  name="monthlyCost"
                  placeholder="0"
                  value={formData.monthlyCost}
                  onChange={handleInputChange}
                />
                <Input
                  label="Enerji Maliyeti (₺/ay)"
                  icon="fas fa-bolt"
                  type="number"
                  name="energyCost"
                  placeholder="0"
                  value={formData.energyCost}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Kritik Stok Limiti (%)"
                  icon="fas fa-exclamation-triangle"
                  type="number"
                  name="criticalStockLimit"
                  placeholder="20"
                  value={formData.criticalStockLimit}
                  onChange={handleInputChange}
                />
                <Input
                  label="Öncelik Sırası"
                  icon="fas fa-sort-numeric-down"
                  type="number"
                  name="priority"
                  placeholder="1"
                  value={formData.priority}
                  onChange={handleInputChange}
                />
              </div>

              <Textarea
                label="Ek Notlar"
                icon="fas fa-sticky-note"
                name="notes"
                placeholder="Depo ile ilgili özel notlar ve bilgiler..."
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </Tab>
          <div className="flex gap-4 p-8 border-t border-slate-200">
            <Button
              variant="error"
              icon="fas fa-times"
              onClick={handleCancel}
            >
              İptal
            </Button>
            <Button variant="primary" icon="fas fa-save">
              Depoyu Kaydet
            </Button>
          </div>
        </form>
      </div>
      <div className="space-y-6">
        <InfoCard title="Bilgilendirme" icon="fas fa-lightbulb">
          <p>
            <strong>• Depo Kodu:</strong> Benzersiz olmalıdır.
          </p>
          <p>
            <strong>• Zorunlu Alanlar:</strong> (*) işaretli alanlar gereklidir.
          </p>
          <p>
            <strong>• Kapasite:</strong> Toplam alan ve kapasite
            belirtilmelidir.
          </p>
          <p>
            <strong>• Sorumlu:</strong> Depo sorumlusu atanmalıdır.
          </p>
        </InfoCard>
      </div>
    </div>
  );
};

export default AddWarehouse;
