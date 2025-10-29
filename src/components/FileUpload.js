import React, { useRef } from "react";

const FileUpload = ({
  label,
  onChange,
  accept = "image/*",
  icon,
  className = "",
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="font-medium text-sm text-slate-800 flex items-center gap-2">
          {icon && <i className={icon}></i>}
          {label}
        </label>
      )}

      <div
        onClick={handleClick}
        className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center cursor-pointer transition-all duration-300 bg-slate-50 hover:border-amber-500 hover:bg-amber-50/50"
      >
        <i className="fas fa-cloud-upload-alt text-4xl text-amber-500 mb-4 block" />

        <div className="text-slate-500 text-sm">
          <strong>Dosya seçmek için tıklayın</strong>
          <br />
          veya dosyayı buraya sürükleyin
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={onChange}
          accept={accept}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUpload;
