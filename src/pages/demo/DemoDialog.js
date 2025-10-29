import { useState } from "react";
import Dialog, { useDialog } from "../../components/Dialog";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";

const DemoDialog = () => {
  const {
    dialogState,
    closeDialog,
    showSuccess,
    showError,
    showConfirm,
    showDelete,
    showInfo,
    openDialog,
  } = useDialog();

  const [selectedId, setSelectedId] = useState(null);

  const handleFormDialog = () => {
    openDialog({
      type: "info",
      title: "Hızlı Ürün Ekle",
      subtitle: "Yeni ürün bilgilerini girin",
      large: false,
      children: (
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            closeDialog();
            setTimeout(
              () =>
                showSuccess("İşlem Başarılı!", "Ürün başarıyla kaydedildi."),
              300
            );
          }}
        >
          <Input
            label="Ürün Adı"
            placeholder="Ürün adını girin"
            required
            icon="fas fa-tag"
          />
          <Input
            label="Ürün Kodu"
            placeholder="Örn: PRD-001"
            required
            icon="fas fa-barcode"
          />
          <Select
            label="Kategori"
            options={[
              { value: "", label: "Kategori seçin" },
              { value: "elektronik", label: "Elektronik" },
              { value: "giyim", label: "Giyim" },
              { value: "gida", label: "Gıda" },
            ]}
            icon="fas fa-layer-group"
          />
          <Input
            label="Stok Miktarı"
            type="number"
            placeholder="0"
            min="0"
            icon="fas fa-boxes"
          />
        </form>
      ),
      buttons: [
        {
          text: "İptal",
          variant: "outline",
          onClick: closeDialog,
        },
        {
          text: "Kaydet",
          variant: "primary",
          icon: "fas fa-save",
          onClick: () => {
            closeDialog();
            setTimeout(
              () =>
                showSuccess("İşlem Başarılı!", "Ürün başarıyla kaydedildi."),
              300
            );
          },
          className: "bg-green-500 hover:bg-green-600",
        },
      ],
    });
  };

  const handleLoadingDialog = () => {
    openDialog({
      type: "info",
      title: "İşleminiz Gerçekleştiriliyor",
      subtitle: "Lütfen bekleyin",
      showCloseButton: false,
      closeOnOverlay: false,
      closeOnEscape: false,
      children: (
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-slate-600">Veriler işleniyor...</p>
        </div>
      ),
      buttons: [],
    });

    // Simulate loading
    setTimeout(() => {
      closeDialog();
      showSuccess("İşlem Tamamlandı!", "Verileriniz başarıyla işlendi.");
    }, 3000);
  };

  const handleListDialog = () => {
    const customers = [
      {
        id: 1,
        name: "Ahmet Yılmaz",
        code: "MST-001",
        phone: "+90 555 123 4567",
        icon: "fas fa-user",
      },
      {
        id: 2,
        name: "ABC Teknoloji Ltd.",
        code: "MST-002",
        phone: "+90 555 987 6543",
        icon: "fas fa-building",
      },
      {
        id: 3,
        name: "Fatma Demir",
        code: "MST-003",
        phone: "+90 555 456 7890",
        icon: "fas fa-user",
      },
    ];

    openDialog({
      type: "info",
      title: "Müşteri Seç",
      subtitle: "Bir müşteri seçin",
      children: (
        <ul className="space-y-3">
          {customers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => setSelectedId(customer.id)}
              className={`p-4 border-2 rounded-lg flex items-center gap-4 cursor-pointer transition-all ${
                selectedId === customer.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-slate-200 hover:border-amber-500 hover:bg-amber-50/50"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-amber-500">
                <i className={customer.icon}></i>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {customer.name}
                </div>
                <div className="text-sm text-slate-600">
                  {customer.code} • {customer.phone}
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 relative ${
                  selectedId === customer.id
                    ? "border-amber-500"
                    : "border-slate-300"
                }`}
              >
                {selectedId === customer.id && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ),
      buttons: [
        {
          text: "İptal",
          variant: "outline",
          onClick: closeDialog,
        },
        {
          text: "Seç",
          variant: "primary",
          icon: "fas fa-check",
          onClick: () => {
            if (selectedId) {
              const selected = customers.find((c) => c.id === selectedId);
              closeDialog();
              setTimeout(
                () =>
                  showSuccess(
                    "Seçim Tamamlandı",
                    `${selected.name} isimli müşteri seçildi.`
                  ),
                300
              );
            } else {
              showInfo("Uyarı", "Lütfen listeden bir müşteri seçin.");
            }
          },
        },
      ],
    });
  };

  const handleLargeDialog = () => {
    openDialog({
      type: "info",
      title: "Detaylı Bilgiler",
      subtitle: "Ürün detayları ve açıklaması",
      large: true,
      children: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ürün Adı"
              value="Laptop Dell XPS 15"
              readOnly
              icon="fas fa-tag"
            />
            <Input
              label="Ürün Kodu"
              value="PRD-12345"
              readOnly
              icon="fas fa-barcode"
            />
            <Input
              label="Kategori"
              value="Elektronik"
              readOnly
              icon="fas fa-layer-group"
            />
            <Input label="Stok" value="45 Adet" readOnly icon="fas fa-boxes" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <i className="fas fa-align-left mr-2"></i>
              Açıklama
            </label>
            <textarea
              readOnly
              rows="4"
              className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg text-slate-900 bg-slate-50"
              value='15.6" 4K OLED ekran, Intel i7 işlemci, 16GB RAM, 512GB SSD. Premium aluminyum kasa, parmak izi okuyucu ve Windows 11 Pro işletim sistemi ile birlikte gelir.'
            />
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Modern Dialog Sistemi
          </h1>
          <p className="text-slate-600">
            StokPro temasına uygun, kullanıma hazır dialog bileşenleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="primary"
            onClick={() =>
              showSuccess(
                "İşlem Başarılı!",
                "Ürün bilgileri sistemde güncellendi. Stok listesinden görüntüleyebilirsiniz."
              )
            }
            className="bg-green-500 hover:bg-green-600 py-5"
          >
            <i className="fas fa-check-circle text-xl"></i>
            Başarı Mesajı
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              showDelete(
                "Silme Onayı",
                "Bu ürünü silmek istediğinizden emin misiniz? Tüm ilişkili veriler de silinecektir.",
                () => {
                  setTimeout(
                    () => showSuccess("Silindi!", "Ürün başarıyla silindi."),
                    300
                  );
                }
              )
            }
            className="bg-red-500 hover:bg-red-600 py-5"
          >
            <i className="fas fa-trash text-xl"></i>
            Silme Onayı
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              showConfirm(
                "Dikkat!",
                "Seçtiğiniz üründen sadece 5 adet kalmıştır. Yeni sipariş vermek ister misiniz?",
                () => console.log("Confirmed")
              )
            }
            className="bg-amber-500 hover:bg-amber-600 py-5"
          >
            <i className="fas fa-exclamation-triangle text-xl"></i>
            Uyarı Mesajı
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              showInfo(
                "Bilgilendirme",
                "Sistemde yapılan son güncellemeler hakkında bilgi almak için destek ekibimizle iletişime geçebilirsiniz."
              )
            }
            className="bg-blue-500 hover:bg-blue-600 py-5"
          >
            <i className="fas fa-info-circle text-xl"></i>
            Bilgi Mesajı
          </Button>

          <Button variant="primary" onClick={handleFormDialog} className="py-5">
            <i className="fas fa-edit text-xl"></i>
            Form Dialog
          </Button>

          <Button
            variant="primary"
            onClick={handleLoadingDialog}
            className="py-5"
          >
            <i className="fas fa-spinner text-xl"></i>
            Yükleniyor
          </Button>

          <Button variant="primary" onClick={handleListDialog} className="py-5">
            <i className="fas fa-list text-xl"></i>
            Liste Seçimi
          </Button>

          <Button
            variant="primary"
            onClick={handleLargeDialog}
            className="py-5"
          >
            <i className="fas fa-expand text-xl"></i>
            Geniş Dialog
          </Button>
        </div>
      </div>

      <Dialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        {...dialogState.config}
      />
    </div>
  );
};

export default DemoDialog;
