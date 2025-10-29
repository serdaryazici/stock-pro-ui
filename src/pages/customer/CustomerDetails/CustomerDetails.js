import { useState } from "react"
import { useNavigate } from "react-router-dom"
import EntityHeader from "../../../components/EntityHeader"
import StatsGrid from "../../../components/StatsGrid"
import Tab from "../../../components/Tab"
import InfoSection from "../../../components/InfoSection"
import Table from "../../../components/Table"
import NoteItem from "../../../components/NoteItem"
import Button from "../../../components/Button"

const CustomerDetails = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  const customer = {
    name: "Ahmet Yılmaz",
    customerNo: "MST001",
    type: "Bireysel",
    status: "Aktif",
    registrationDate: "15 Ocak 2024",
  }

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "individual":
      case "bireysel":
        return "blue"
      case "corporate":
      case "kurumsal":
        return "purple"
      case "vip":
        return "amber"
      default:
        return "gray"
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "aktif":
        return "green"
      case "inactive":
      case "inaktif":
        return "red"
      case "blocked":
      case "engelli":
        return "gray"
      default:
        return "gray"
    }
  }

  const headerData = {
    icon: "fa-solid fa-user-circle",
    title: customer.name,
    subtitle: customer.customerNo,
    badges: [
      { label: customer.type, color: getTypeColor(customer.type) },
      { label: customer.status, color: getStatusColor(customer.status) },
    ],
    metadata: [{ label: "Kayıt Tarihi", value: customer.registrationDate }],
    actions: [
      {
        label: "Düzenle",
        icon: "fas fa-edit",
        variant: "primary",
        onClick: () => navigate("/customer/add"),
      },
      {
        label: "E-posta Gönder",
        icon: "fas fa-envelope",
        variant: "secondary",
        onClick: () => console.log("Send email to customer"),
      },
      {
        label: "Yazdır",
        icon: "fas fa-print",
        variant: "outline",
        onClick: () => window.print(),
      },
    ],
  }

  const stats = [
    {
      icon: "fa-solid fa-shopping-cart",
      title: "Toplam Sipariş",
      value: "47",
      detail: "Son 12 ay",
      bgColor: "bg-blue-500",
    },
    {
      icon: "fa-solid fa-lira-sign",
      title: "Toplam Harcama",
      value: "₺58,647",
      detail: "Tüm zamanlar",
      bgColor: "bg-green-500",
    },
    {
      icon: "fa-solid fa-calendar-alt",
      title: "Son Sipariş",
      value: "3 gün önce",
      detail: "₺1,247",
      bgColor: "bg-purple-500",
    },
    {
      icon: "fa-solid fa-star",
      title: "Müşteri Puanı",
      value: "4.8",
      detail: "5 üzerinden",
      bgColor: "bg-amber-500",
    },
  ]

  const contactInfo = [
    { label: "E-posta:", value: "ahmet.yilmaz@email.com" },
    { label: "Telefon:", value: "+90 532 123 4567" },
    { label: "Alternatif Telefon:", value: "-" },
    { label: "Web Sitesi:", value: "-" },
  ]

  const addressInfo = [
    { label: "Şehir:", value: "İstanbul" },
    { label: "İlçe:", value: "Kadıköy" },
    { label: "Adres:", value: "Moda Mahallesi, Bahariye Caddesi No: 123/5" },
    { label: "Posta Kodu:", value: "34710" },
  ]

  const personalInfo = [
    { label: "Doğum Tarihi:", value: "15 Mart 1985" },
    { label: "Cinsiyet:", value: "Erkek" },
    { label: "Müşteri Kaynağı:", value: "Web Sitesi" },
  ]

  const notesInfo = [
    {
      label: "Not:",
      value: "Düzenli müşteri, genellikle elektronik ürünler satın alıyor. Hızlı teslimat tercih ediyor.",
    },
    {
      label: "Not:",
      value: "Düzenli müşteri, genellikle elektronik ürünler satın alıyor.",
    },
  ]

  const ordersColumns = [
    { key: "orderNo", label: "Sipariş No" },
    { key: "date", label: "Tarih" },
    { key: "products", label: "Ürünler" },
    { key: "amount", label: "Tutar" },
    { key: "status", label: "Durum" },
  ]

  const ordersData = [
    {
      id: 1,
      orderNo: "SIP001",
      date: "22.01.2024",
      products: "Samsung Galaxy S24, Kılıf",
      amount: "₺26,247",
      status: "Tamamlandı",
    },
    {
      id: 2,
      orderNo: "SIP002",
      date: "18.01.2024",
      products: "MacBook Pro M3",
      amount: "₺65,999",
      status: "Tamamlandı",
    },
    {
      id: 3,
      orderNo: "SIP003",
      date: "10.01.2024",
      products: "Sony WH-1000XM5",
      amount: "₺3,999",
      status: "Beklemede",
    },
  ]

  const paymentsColumns = [
    { key: "date", label: "Tarih" },
    { key: "orderNo", label: "Sipariş No" },
    { key: "amount", label: "Tutar" },
    { key: "paymentMethod", label: "Ödeme Yöntemi" },
    { key: "status", label: "Durum" },
  ]

  const paymentsData = [
    {
      id: 1,
      date: "22.01.2024",
      orderNo: "SIP001",
      amount: "₺26,247",
      paymentMethod: "Kredi Kartı",
      status: "Ödendi",
    },
    {
      id: 2,
      date: "18.01.2024",
      orderNo: "SIP002",
      amount: "₺65,999",
      paymentMethod: "Banka Transferi",
      status: "Ödendi",
    },
    {
      id: 3,
      date: "10.01.2024",
      orderNo: "SIP003",
      amount: "₺3,999",
      paymentMethod: "Nakit",
      status: "Beklemede",
    },
  ]

  const notes = [
    {
      date: "22.01.2024 14:30",
      author: "Admin",
      content: "Müşteri Samsung Galaxy S24 için kılıf önerisi istedi. Premium kılıf seçenekleri sunuldu.",
    },
    {
      date: "18.01.2024 10:15",
      author: "Admin",
      content: "MacBook Pro M3 siparişi için özel indirim uygulandı. VIP müşteri statüsü değerlendirilmeli.",
    },
    {
      date: "15.01.2024 09:00",
      author: "System",
      content: "Müşteri kaydı oluşturuldu. Web sitesi üzerinden kayıt oldu.",
    },
  ]

  const tabs = [
    { label: "Bilgiler", icon: "fa-solid fa-info-circle" },
    { label: "Siparişler", icon: "fa-solid fa-shopping-bag" },
    { label: "Ödemeler", icon: "fa-solid fa-credit-card" },
    { label: "Notlar", icon: "fa-solid fa-sticky-note" },
  ]

  const handleViewOrder = (row) => {
    console.log("View order:", row)
  }

  const handleAddNote = () => {
    console.log("Add new note")
  }

  const handleNewOrder = () => {
    console.log("Create new order")
  }

  return (
    <div>
      <EntityHeader {...headerData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((stat, i) => (
          <StatsGrid key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoSection title="İletişim Bilgileri" items={contactInfo} />
              <InfoSection title="Adres Bilgileri" items={addressInfo} />
              <InfoSection title="Kişisel Bilgiler" items={personalInfo} />
              <InfoSection title="Notlar" items={notesInfo} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Son Siparişler</h3>
              <Button variant="primary" onClick={handleNewOrder} className="px-3 py-1 flex-initial">
                <i className="fas fa-plus mr-2"></i>
                Yeni Sipariş
              </Button>
            </div>
            <Table data={ordersData} columns={ordersColumns} onView={handleViewOrder} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Ödeme Geçmişi</h3>
              <div className="flex gap-6 text-sm">
                <span className="text-green-600 font-semibold">Toplam: ₺58,647</span>
                <span className="text-amber-600 font-semibold">Bekleyen: ₺3,999</span>
              </div>
            </div>
            <Table data={paymentsData} columns={paymentsColumns} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Müşteri Notları</h3>
              <Button variant="primary" onClick={handleAddNote} className="px-3 py-1 flex-initial">
                <i className="fas fa-plus mr-2"></i>
                Not Ekle
              </Button>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {notes.map((note, index) => (
                <NoteItem key={index} note={note} />
              ))}
            </div>
          </div>
        </Tab>
      </div>
    </div>
  )
}

export default CustomerDetails
