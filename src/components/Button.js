import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  icon, 
  disabled = false, 
  className = '' 
}) => {
  const baseStyles = "px-5 py-3 rounded-lg font-medium text-sm cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 border-none";
  
  const variants = {
    primary: "bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",
    success: "bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed",
    error: "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed",
    info: "bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <i className={icon} />}
      {children}
    </button>
  );
};

export default Button;