const SettingsCard = ({ title, description, icon, children, actions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                <i className={`${icon} text-blue-600`}></i>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
              {description && (
                <p className="text-sm text-slate-600 mt-0.5">{description}</p>
              )}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default SettingsCard;
