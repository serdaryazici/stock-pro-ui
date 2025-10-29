import { useState } from "react";
import Button from "../../../components/Button";
import SettingsCard from "../../../components/SettingsCard";
import { useDialog } from "../../../components/Dialog";

const UnitDefinitions = () => {
  const { showDialog } = useDialog();
  const [units, setUnits] = useState([
    { id: 1, name: "Adet", shortName: "AD", type: "Sayısal", usageCount: 156 },
    {
      id: 2,
      name: "Kilogram",
      shortName: "KG",
      type: "Ağırlık",
      usageCount: 89,
    },
    { id: 3, name: "Litre", shortName: "LT", type: "Hacim", usageCount: 67 },
    { id: 4, name: "Metre", shortName: "M", type: "Uzunluk", usageCount: 45 },
    {
      id: 5,
      name: "Paket",
      shortName: "PKT",
      type: "Sayısal",
      usageCount: 123,
    },
    { id: 6, name: "Kutu", shortName: "KT", type: "Sayısal", usageCount: 98 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    type: "Sayısal",
  });

  const [editingId, setEditingId] = useState(null);

  const unitTypes = ["Sayısal", "Ağırlık", "Hacim", "Uzunluk", "Alan", "Diğer"];

  const handleSubmit = () => {
    if (!formData.name || !formData.shortName) {
      showDialog({
        type: "warning",
        title: "Eksik Bilgi",
        message: "Lütfen tüm alanları doldurun.",
      });
      return;
    }

    if (editingId) {
      setUnits(
        units.map((unit) =>
          unit.id === editingId
            ? {
                ...unit,
                name: formData.name,
                shortName: formData.shortName,
                type: formData.type,
              }
            : unit
        )
      );
      setEditingId(null);
      showDialog({
        type: "success",
        title: "Güncellendi",
        message: "Birim başarıyla güncellendi.",
      });
    } else {
      const newUnit = {
        id: units.length + 1,
        name: formData.name,
        shortName: formData.shortName,
        type: formData.type,
        usageCount: 0,
      };
      setUnits([...units, newUnit]);
      showDialog({
        type: "success",
        title: "Eklendi",
        message: "Birim başarıyla eklendi.",
      });
    }

    setFormData({ name: "", shortName: "", type: "Sayısal" });
  };

  const handleEdit = (unit) => {
    setFormData({
      name: unit.name,
      shortName: unit.shortName,
      type: unit.type,
    });
    setEditingId(unit.id);
  };

  const handleDelete = (unitId) => {
    showDialog({
      type: "danger",
      title: "Birimi Sil",
      message: "Bu birimi silmek istediğinizden emin misiniz?",
      confirmText: "Sil",
      cancelText: "İptal",
      onConfirm: () => {
        setUnits(units.filter((unit) => unit.id !== unitId));
        showDialog({
          type: "success",
          title: "Silindi",
          message: "Birim başarıyla silindi.",
        });
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", shortName: "", type: "Sayısal" });
  };

  const getTypeIcon = (type) => {
    const icons = {
      Sayısal: "fas fa-hashtag",
      Ağırlık: "fas fa-weight",
      Hacim: "fas fa-flask",
      Uzunluk: "fas fa-ruler",
      Alan: "fas fa-vector-square",
      Diğer: "fas fa-cube",
    };
    return icons[type] || "fas fa-cube";
  };

  const getTypeColor = (type) => {
    const colors = {
      Sayısal: "blue",
      Ağırlık: "green",
      Hacim: "purple",
      Uzunluk: "amber",
      Alan: "pink",
      Diğer: "slate",
    };
    return colors[type] || "slate";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Birim Tanımları</h1>
          <p className="text-slate-600 mt-1">
            Ürün birimlerini yönetin ve yeni birim tanımlayın
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SettingsCard
          title="Toplam Birim"
          icon="fas fa-ruler"
          description={`${units.length} birim tanımlı`}
        >
          <div className="text-3xl font-bold text-indigo-600">
            {units.length}
          </div>
        </SettingsCard>

        <SettingsCard
          title="Toplam Kullanım"
          icon="fas fa-chart-line"
          description={`${units.reduce(
            (sum, unit) => sum + unit.usageCount,
            0
          )} kullanım`}
        >
          <div className="text-3xl font-bold text-green-600">
            {units.reduce((sum, unit) => sum + unit.usageCount, 0)}
          </div>
        </SettingsCard>

        <SettingsCard
          title="Birim Türü"
          icon="fas fa-layer-group"
          description={`${unitTypes.length} farklı tür`}
        >
          <div className="text-3xl font-bold text-purple-600">
            {unitTypes.length}
          </div>
        </SettingsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsCard
          title={editingId ? "Birim Düzenle" : "Yeni Birim Ekle"}
          icon={editingId ? "fas fa-edit" : "fas fa-plus"}
          description={
            editingId
              ? "Birim bilgilerini güncelleyin"
              : "Yeni ürün birimi tanımlayın"
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Birim Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Örn: Kilogram"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Kısa Ad
              </label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shortName: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Örn: KG"
                maxLength={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Birim Türü
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {unitTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="flex-1"
              >
                <i className={`fas fa-${editingId ? "save" : "plus"} mr-2`}></i>
                {editingId ? "Güncelle" : "Birim Ekle"}
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
          title="Birim Listesi"
          icon="fas fa-list"
          description={`${units.length} birim listeleniyor`}
        >
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {units.map((unit) => {
              const color = getTypeColor(unit.type);
              return (
                <div
                  key={unit.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all border border-slate-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${color}-500 flex items-center justify-center text-white shadow-md`}
                    >
                      <i className={getTypeIcon(unit.type)}></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-lg">
                          {unit.name}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 bg-${color}-100 text-${color}-700 rounded-full font-medium`}
                        >
                          {unit.shortName}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        <span className="font-medium">{unit.type}</span> •{" "}
                        {unit.usageCount} kullanım
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(unit)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <i className="fas fa-edit text-slate-600"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(unit.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

export default UnitDefinitions;
