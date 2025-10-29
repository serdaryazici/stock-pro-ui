import { useState } from "react";
import Button from "../../../components/Button";
import SettingsCard from "../../../components/SettingsCard";
import Table from "../../../components/Table";
import { useDialog } from "../../../components/Dialog";

const UserManagement = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const { showDialog } = useDialog();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@stok.com",
      phone: "+90 532 123 4567",
      department: "Yönetim",
      role: "Admin",
      status: "active",
      address: "İstanbul, Türkiye",
      hireDate: "2023-01-15",
      lastLogin: "2 saat önce",
    },
    {
      id: 2,
      name: "Ahmet Yılmaz",
      email: "ahmet@stok.com",
      phone: "+90 533 234 5678",
      department: "Satış",
      role: "Kullanıcı",
      status: "active",
      address: "Ankara, Türkiye",
      hireDate: "2023-03-20",
      lastLogin: "1 gün önce",
    },
    {
      id: 3,
      name: "Ayşe Demir",
      email: "ayse@stok.com",
      phone: "+90 534 345 6789",
      department: "Muhasebe",
      role: "Kullanıcı",
      status: "inactive",
      address: "İzmir, Türkiye",
      hireDate: "2023-05-10",
      lastLogin: "1 hafta önce",
    },
    {
      id: 4,
      name: "Mehmet Kaya",
      email: "mehmet@stok.com",
      phone: "+90 535 456 7890",
      department: "Depo",
      role: "Kullanıcı",
      status: "active",
      address: "Bursa, Türkiye",
      hireDate: "2023-06-15",
      lastLogin: "3 saat önce",
    },
    {
      id: 5,
      name: "Fatma Şahin",
      email: "fatma@stok.com",
      phone: "+90 536 567 8901",
      department: "İnsan Kaynakları",
      role: "Yönetici",
      status: "active",
      address: "Antalya, Türkiye",
      hireDate: "2023-02-28",
      lastLogin: "5 saat önce",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "Kullanıcı",
    password: "",
    address: "",
    hireDate: "",
  });

  const handleAddUser = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      showDialog({
        type: "warning",
        title: "Eksik Bilgi",
        message:
          "Lütfen zorunlu alanları doldurun (Ad, E-posta, Telefon, Şifre).",
      });
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department || "Belirtilmemiş",
      role: formData.role,
      status: "active",
      address: formData.address || "Belirtilmemiş",
      hireDate: formData.hireDate || new Date().toISOString().split("T")[0],
      lastLogin: "Henüz giriş yapmadı",
    };

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

    setUsers([...users, newUser]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "Kullanıcı",
      password: "",
      address: "",
      hireDate: "",
    });

    showDialog({
      type: "success",
      title: "Başarılı",
      message: "Kullanıcı başarıyla eklendi.",
    });
  };

  const handleDeleteUser = (userId) => {
    showDialog({
      type: "danger",
      title: "Kullanıcıyı Sil",
      message: "Bu kullanıcıyı silmek istediğinizden emin misiniz?",
      confirmText: "Sil",
      cancelText: "İptal",
      onConfirm: () => {
        setUsers(users.filter((user) => user.id !== userId));
        showDialog({
          type: "success",
          title: "Silindi",
          message: "Kullanıcı başarıyla silindi.",
        });
      },
    });
  };

  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        department: user.department,
        role: user.role,
        password: "",
        address: user.address,
        hireDate: user.hireDate,
      });
    }
  };

  const columns = [
    {
      key: "name",
      label: "Ad Soyad",
      render: (name) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
            {name.charAt(0)}
          </div>
          <span className="text-slate-700">{name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "E-Mail",
      render: (email) => <span className="text-slate-700">{email}</span>,
    },
    {
      key: "phone",
      label: "Telefon",
      render: (phone) => <span className="text-slate-700">{phone}</span>,
    },
    {
      key: "department",
      label: "Departman",
      render: (department) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {department}
        </span>
      ),
    },
    {
      key: "role",
      label: "Rol",
      render: (role) => (
        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
          {role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Durum",
      render: (status) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status === "active" ? "Aktif" : "Pasif"}
        </span>
      ),
    },
    {
      key: "hireDate",
      label: "İşe Giriş",
      render: (hireDate) => <span className="text-slate-600">{hireDate}</span>,
    },
  ];

  const filters = [
    {
      key: "department",
      label: "Tüm Departmanlar",
      options: [
        { value: "Yönetim", label: "Yönetim" },
        { value: "Satış", label: "Satış" },
        { value: "Muhasebe", label: "Muhasebe" },
        { value: "Depo", label: "Depo" },
        { value: "İnsan Kaynakları", label: "İnsan Kaynakları" },
      ],
      filterFn: (user, value) => user.department === value,
    },
    {
      key: "role",
      label: "Tüm Roller",
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Yönetici", label: "Yönetici" },
        { value: "Kullanıcı", label: "Kullanıcı" },
      ],
      filterFn: (user, value) => user.role === value,
    },
    {
      key: "status",
      label: "Tüm Durumlar",
      options: [
        { value: "active", label: "Aktif" },
        { value: "inactive", label: "Pasif" },
      ],
      filterFn: (user, value) => user.status === value,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Kullanıcı Yönetimi
          </h1>
          <p className="text-slate-600 mt-1">
            Sistem kullanıcılarını yönetin ve yeni kullanıcı ekleyin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SettingsCard
          title="Toplam Kullanıcı"
          icon="fas fa-users"
          description={`${users.length} kullanıcı`}
        >
          <div className="text-3xl font-bold text-blue-600">{users.length}</div>
        </SettingsCard>

        <SettingsCard
          title="Aktif Kullanıcı"
          icon="fas fa-user-check"
          description={`${
            users.filter((u) => u.status === "active").length
          } aktif`}
        >
          <div className="text-3xl font-bold text-green-600">
            {users.filter((u) => u.status === "active").length}
          </div>
        </SettingsCard>

        <SettingsCard
          title="Pasif Kullanıcı"
          icon="fas fa-user-times"
          description={`${
            users.filter((u) => u.status === "inactive").length
          } pasif`}
        >
          <div className="text-3xl font-bold text-red-600">
            {users.filter((u) => u.status === "inactive").length}
          </div>
        </SettingsCard>
      </div>

      <SettingsCard
        title="Yeni Kullanıcı Ekle"
        icon="fas fa-user-plus"
        description="Sisteme yeni kullanıcı ekleyin"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ad Soyad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kullanıcı adı"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E-posta <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+90 5XX XXX XX XX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Departman
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Departman adı"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Şifre <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Rol
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Admin">Admin</option>
              <option value="Yönetici">Yönetici</option>
              <option value="Kullanıcı">Kullanıcı</option>
              <option value="Misafir">Misafir</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              İşe Giriş Tarihi
            </label>
            <input
              type="date"
              value={formData.hireDate}
              onChange={(e) =>
                setFormData({ ...formData, hireDate: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Adres
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Şehir, Ülke"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="primary"
            onClick={handleAddUser}
            className="w-full md:w-auto"
          >
            <i className="fas fa-plus mr-2"></i>
            Kullanıcı Ekle
          </Button>
        </div>
      </SettingsCard>

      <Table
        data={users}
        columns={columns}
        filters={filters}
        itemsPerPage={10}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default UserManagement;
