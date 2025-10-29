import React, { useEffect, useState } from "react";
import Button from "./Button";

const Dialog = ({
  isOpen = false,
  onClose,
  type = "info",
  title,
  subtitle = "",
  message = "",
  children,
  icon,
  buttons = [],
  large = false,
  showCloseButton = true,
  closeOnOverlay = true,
  closeOnEscape = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Default icons based on type
  const defaultIcons = {
    success: "fas fa-check-circle",
    danger: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };

  const dialogIcon = icon || defaultIcons[type] || defaultIcons.info;

  // Icon background colors
  const iconColors = {
    success: "bg-green-500",
    danger: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  // Header gradient backgrounds
  const headerColors = {
    success: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    danger: "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
    warning: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
    info: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
  };

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm transition-opacity duration-200 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl ${
          large ? "max-w-3xl" : "max-w-lg"
        } w-[90%] max-h-[90vh] overflow-hidden transition-all duration-300 ${
          isAnimating
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-6 border-b flex items-center gap-4 ${headerColors[type]}`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 ${iconColors[type]}`}
          >
            <i className={dialogIcon}></i>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {message && (
            <p className="text-slate-600 leading-relaxed mb-4">{message}</p>
          )}
          {children}
        </div>

        {/* Footer */}
        {buttons.length > 0 && (
          <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "outline"}
                onClick={button.onClick}
                className={button.className}
              >
                {button.icon && <i className={button.icon}></i>}
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Preset dialog configurations
export const DialogPresets = {
  success: (title, message, onConfirm) => ({
    type: "success",
    title,
    message,
    buttons: [
      {
        text: "Tamam",
        variant: "primary",
        icon: "fas fa-check",
        onClick: onConfirm,
      },
    ],
  }),

  error: (title, message, onConfirm) => ({
    type: "danger",
    title,
    message,
    buttons: [
      {
        text: "Tamam",
        variant: "primary",
        icon: "fas fa-check",
        onClick: onConfirm,
      },
    ],
  }),

  confirm: (title, message, onConfirm, onCancel) => ({
    type: "warning",
    title,
    message,
    buttons: [
      {
        text: "İptal",
        variant: "outline",
        onClick: onCancel,
      },
      {
        text: "Onayla",
        variant: "primary",
        icon: "fas fa-check",
        onClick: onConfirm,
      },
    ],
  }),

  delete: (title, message, onConfirm, onCancel) => ({
    type: "danger",
    title,
    subtitle: "Bu işlem geri alınamaz",
    message,
    buttons: [
      {
        text: "İptal",
        variant: "outline",
        onClick: onCancel,
      },
      {
        text: "Sil",
        variant: "primary",
        icon: "fas fa-trash",
        onClick: onConfirm,
        className: "bg-red-500 hover:bg-red-600",
      },
    ],
  }),

  info: (title, message, onConfirm) => ({
    type: "info",
    title,
    message,
    buttons: [
      {
        text: "Anladım",
        variant: "primary",
        onClick: onConfirm,
      },
    ],
  }),
};

// Hook for managing dialog state
export const useDialog = () => {
  const [dialogState, setDialogState] = React.useState({
    isOpen: false,
    config: {},
  });

  const openDialog = (config) => {
    setDialogState({
      isOpen: true,
      config,
    });
  };

  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      config: {},
    });
  };

  const showSuccess = (title, message) => {
    openDialog(DialogPresets.success(title, message, closeDialog));
  };

  const showError = (title, message) => {
    openDialog(DialogPresets.error(title, message, closeDialog));
  };

  const showConfirm = (title, message, onConfirm) => {
    openDialog(
      DialogPresets.confirm(
        title,
        message,
        () => {
          onConfirm?.();
          closeDialog();
        },
        closeDialog
      )
    );
  };

  const showDelete = (title, message, onConfirm) => {
    openDialog(
      DialogPresets.delete(
        title,
        message,
        () => {
          onConfirm?.();
          closeDialog();
        },
        closeDialog
      )
    );
  };

  const showInfo = (title, message) => {
    openDialog(DialogPresets.info(title, message, closeDialog));
  };

  return {
    dialogState,
    openDialog,
    closeDialog,
    showSuccess,
    showError,
    showConfirm,
    showDelete,
    showInfo,
  };
};

export default Dialog;