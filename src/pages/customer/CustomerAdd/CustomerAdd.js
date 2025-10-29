import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../../components/Tab";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import InfoCard from "../../../components/InfoCard";
import TypeCard from "../../../components/TypeCard";
import { getCities, getDistrictsByCity } from "../../../utils/locationUtils";

const CustomerAdd = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    var data = getCities();
    console.log(data);
    setCities(data);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setDistricts(getDistrictsByCity(selectedCity));
    }
  }, [selectedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) {
      alert("Lütfen müşteri tipini seçin!");
      return;
    }
    alert("Müşteri başarıyla kaydedildi!");
    navigate("/customer/list");
  };

  const tabs = [
    { label: "Temel Bilgiler", icon: "fas fa-info-circle" },
    { label: "İletişim Bilgileri", icon: "fas fa-address-book" },
    { label: "Adres Bilgileri", icon: "fas fa-map-marker-alt" },
    { label: "Ek Bilgiler", icon: "fas fa-plus-circle" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <Tab tabs={tabs}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <TypeCard
                  icon="fas fa-user"
                  title="Bireysel"
                  description="Bireysel müşteri kaydı"
                  selected={selectedType === "individual"}
                  onClick={() => setSelectedType("individual")}
                />
                <TypeCard
                  icon="fas fa-building"
                  title="Kurumsal"
                  description="Şirket müşteri kaydı"
                  selected={selectedType === "corporate"}
                  onClick={() => setSelectedType("corporate")}
                />
                <TypeCard
                  icon="fas fa-crown"
                  title="VIP"
                  description="Özel müşteri kaydı"
                  selected={selectedType === "vip"}
                  onClick={() => setSelectedType("vip")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Müşteri No"
                  icon="fas fa-hashtag"
                  value="MST-2025-001"
                  readOnly
                />
                <Select label="Durum" icon="fas fa-toggle-on">
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Ad"
                  icon="fas fa-user"
                  placeholder="Müşteri adını girin"
                  required
                />
                <Input
                  label="Soyad"
                  icon="fas fa-user"
                  placeholder="Müşteri soyadını girin"
                  required
                />
              </div>

              {selectedType === "corporate" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Firma Adı"
                    icon="fas fa-building"
                    placeholder="Firma adını girin"
                    required
                  />
                  <Input
                    label="Vergi No"
                    icon="fas fa-file-invoice"
                    placeholder="Vergi numarasını girin"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Doğum Tarihi"
                  icon="fas fa-birthday-cake"
                  type="date"
                />
                <Select label="Cinsiyet" icon="fas fa-venus-mars">
                  <option value="">Seçin</option>
                  <option value="male">Erkek</option>
                  <option value="female">Kadın</option>
                  <option value="other">Diğer</option>
                </Select>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="E-posta"
                  icon="fas fa-envelope"
                  type="email"
                  placeholder="ornek@email.com"
                  required
                />
                <Input
                  label="Telefon"
                  icon="fas fa-phone"
                  type="tel"
                  placeholder="+90 5XX XXX XX XX"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="Alternatif Telefon"
                  icon="fas fa-mobile-alt"
                  type="tel"
                  placeholder="+90 5XX XXX XX XX"
                />
                <Input
                  label="Web Sitesi"
                  icon="fas fa-globe"
                  type="url"
                  placeholder="https://www.ornek.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  label="İletişim Notları"
                  icon="fas fa-sticky-note"
                  placeholder="İletişim ile ilgili notlar..."
                  rows={5}
                />
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Select
                  label="Şehir"
                  icon="fas fa-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                <Select
                  label="İlçe"
                  icon="fas fa-map-pin"
                  required
                  disabled={!selectedCity}
                >
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6">
                <Textarea
                  label="Adres"
                  icon="fas fa-map-marked-alt"
                  placeholder="Detaylı adres bilgisi"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Posta Kodu"
                  icon="fas fa-mailbox"
                  placeholder="34000"
                />
                <Select label="Ülke" icon="fas fa-flag" required>
                  <option value="turkey">Türkiye</option>
                  <option value="other">Diğer</option>
                </Select>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Select label="Müşteri Kaynağı" icon="fas fa-source">
                  <option value="">Seçin</option>
                  <option value="website">Web Sitesi</option>
                  <option value="referral">Referans</option>
                  <option value="social-media">Sosyal Medya</option>
                  <option value="advertisement">Reklam</option>
                  <option value="other">Diğer</option>
                </Select>
                <Select label="Müşteri Segmenti" icon="fas fa-tags">
                  <option value="">Seçin</option>
                  <option value="retail">Perakende</option>
                  <option value="wholesale">Toptan</option>
                  <option value="online">Online</option>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input
                  label="İndirim Oranı (%)"
                  icon="fas fa-percent"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                />
                <Input
                  label="Ödeme Vadesi (Gün)"
                  icon="fas fa-credit-card"
                  type="number"
                  placeholder="30"
                  min="0"
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  label="Genel Notlar"
                  icon="fas fa-comment-alt"
                  placeholder="Müşteri hakkında genel notlar ve özel bilgiler..."
                  rows={5}
                />
              </div>
            </div>
          </Tab>
          <div className="flex gap-4 p-8 bg-slate-50 border-t border-slate-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/customer/list")}
              className="flex-1"
            >
              <i className="fas fa-times mr-2"></i>
              İptal
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              <i className="fas fa-save mr-2"></i>
              Müşteriyi Kaydet
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-6">
        <InfoCard title="Bilgilendirme" icon="fas fa-lightbulb">
          <p>
            <strong>• Müşteri No:</strong> Otomatik oluşturulur.
          </p>
          <p>
            <strong>• Zorunlu Alanlar:</strong> (*) işaretli alanlar zorunludur.
          </p>
          <p>
            <strong>• Kurumsal Müşteri:</strong> Firma bilgileri eklenmelidir.
          </p>
          <p>
            <strong>• İletişim:</strong> En az bir telefon gereklidir.
          </p>
        </InfoCard>
      </div>
    </div>
  );
};

export default CustomerAdd;
