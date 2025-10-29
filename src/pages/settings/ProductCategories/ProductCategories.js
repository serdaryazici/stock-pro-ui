import { useState } from "react";
import Button from "../../../components/Button";
import SettingsCard from "../../../components/SettingsCard";
import { useDialog } from "../../../components/Dialog";

const ProductCategories = () => {
  const { showDialog } = useDialog();
  const [categories, setCategories] = useState([
    { id: 1, name: "Elektronik", icon: "💻", color: "blue", productCount: 45 },
    { id: 2, name: "Gıda", icon: "🍎", color: "green", productCount: 120 },
    { id: 3, name: "Giyim", icon: "👕", color: "purple", productCount: 78 },
    { id: 4, name: "Mobilya", icon: "🪑", color: "amber", productCount: 32 },
    { id: 5, name: "Kozmetik", icon: "💄", color: "pink", productCount: 56 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    icon: "📦",
    color: "blue",
  });

  const [editingId, setEditingId] = useState(null);

  const colorOptions = [
    { value: "blue", label: "Mavi", class: "bg-blue-500" },
    { value: "green", label: "Yeşil", class: "bg-green-500" },
    { value: "purple", label: "Mor", class: "bg-purple-500" },
    { value: "amber", label: "Turuncu", class: "bg-amber-500" },
    { value: "pink", label: "Pembe", class: "bg-pink-500" },
    { value: "red", label: "Kırmızı", class: "bg-red-500" },
  ];

  const iconOptions = [
    "📦",
    "💻",
    "🍎",
    "👕",
    "🪑",
    "💄",
    "📱",
    "🎮",
    "📚",
    "⚽",
    "🎨",
    "🔧",
  ];

  const handleSubmit = () => {
    if (!formData.name) {
      showDialog({
        type: "warning",
        title: "Eksik Bilgi",
        message: "Lütfen kategori adını girin.",
      });
      return;
    }

    if (editingId) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingId
            ? {
                ...cat,
                name: formData.name,
                icon: formData.icon,
                color: formData.color,
              }
            : cat
        )
      );
      setEditingId(null);
      showDialog({
        type: "success",
        title: "Güncellendi",
        message: "Kategori başarıyla güncellendi.",
      });
    } else {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        icon: formData.icon,
        color: formData.color,
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
      showDialog({
        type: "success",
        title: "Eklendi",
        message: "Kategori başarıyla eklendi.",
      });
    }

    setFormData({ name: "", icon: "📦", color: "blue" });
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
    setEditingId(category.id);
  };

  const handleDelete = (categoryId) => {
    showDialog({
      type: "danger",
      title: "Kategoriyi Sil",
      message: "Bu kategoriyi silmek istediğinizden emin misiniz?",
      confirmText: "Sil",
      cancelText: "İptal",
      onConfirm: () => {
        setCategories(categories.filter((cat) => cat.id !== categoryId));
        showDialog({
          type: "success",
          title: "Silindi",
          message: "Kategori başarıyla silindi.",
        });
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", icon: "📦", color: "blue" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Ürün Kategorileri
          </h1>
          <p className="text-slate-600 mt-1">
            Ürün kategorilerini yönetin ve yeni kategori ekleyin
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SettingsCard
          title="Toplam Kategori"
          icon="fas fa-tags"
          description={`${categories.length} kategori tanımlı`}
        >
          <div className="text-3xl font-bold text-indigo-600">
            {categories.length}
          </div>
        </SettingsCard>

        <SettingsCard
          title="Toplam Ürün"
          icon="fas fa-box"
          description={`${categories.reduce(
            (sum, cat) => sum + cat.productCount,
            0
          )} ürün`}
        >
          <div className="text-3xl font-bold text-green-600">
            {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
          </div>
        </SettingsCard>

        <SettingsCard
          title="Ortalama Ürün"
          icon="fas fa-chart-pie"
          description="Kategori başına"
        >
          <div className="text-3xl font-bold text-purple-600">
            {Math.round(
              categories.reduce((sum, cat) => sum + cat.productCount, 0) /
                categories.length
            )}
          </div>
        </SettingsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsCard
          title={editingId ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
          icon={editingId ? "fas fa-edit" : "fas fa-plus"}
          description={
            editingId
              ? "Kategori bilgilerini güncelleyin"
              : "Yeni ürün kategorisi oluşturun"
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kategori Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Kategori adı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                İkon Seç
              </label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                      formData.icon === icon
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Renk Seç
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() =>
                      setFormData({ ...formData, color: color.value })
                    }
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      formData.color === color.value
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${color.class}`}
                    ></div>
                    <span className="text-sm font-medium">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="flex-1"
              >
                <i className={`fas fa-${editingId ? "save" : "plus"} mr-2`}></i>
                {editingId ? "Güncelle" : "Kategori Ekle"}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={cancelEdit}>
                  İptal
                </Button>
              )}
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Kategori Listesi"
          icon="fas fa-list"
          description={`${categories.length} kategori listeleniyor`}
        >
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center justify-between p-4 bg-${category.color}-50 rounded-xl hover:shadow-md transition-all border border-${category.color}-100`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-xl bg-${category.color}-500 flex items-center justify-center text-3xl shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-lg">
                      {category.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {category.productCount} ürün
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <i className="fas fa-edit text-slate-600"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

export default ProductCategories;
