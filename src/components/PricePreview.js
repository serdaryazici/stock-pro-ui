import React from "react";

const PricePreview = ({
  kdvAmount = 0,
  purchasePriceWithVat = 0,
  salePriceWithVat = 0,
  profitMargin = 0,
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300 mt-4 ${className}`}
    >
      {/* Başlık */}
      <h4 className="text-green-600 mb-4 text-base font-semibold flex items-center gap-2">
        <i className="fas fa-calculator"></i>
        Fiyat Özeti
      </h4>

      {/* Fiyat Kalemleri */}
      <div className="flex justify-between py-2 text-sm">
        <span>KDV Tutarı:</span>
        <strong>{kdvAmount.toFixed(2)} ₺</strong>
      </div>

      <div className="flex justify-between py-2 text-sm">
        <span>Alış Fiyatı (KDV Dahil):</span>
        <strong>{purchasePriceWithVat.toFixed(2)} ₺</strong>
      </div>

      <div className="flex justify-between py-2 text-sm">
        <span>Satış Fiyatı (KDV Dahil):</span>
        <strong>{salePriceWithVat.toFixed(2)} ₺</strong>
      </div>

      {/* Kar Marjı */}
      <div className="flex justify-between py-2 font-bold text-lg pt-4 border-t-2 border-green-300 mt-2">
        <span>Kar Marjı:</span>
        <strong>{profitMargin.toFixed(2)} ₺</strong>
      </div>
    </div>
  );
};

export default PricePreview;
