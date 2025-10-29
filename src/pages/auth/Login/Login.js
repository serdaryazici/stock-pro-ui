import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi gereklidir";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login
    setIsLoading(true);

    setTimeout(() => {
      if (
        formData.email === "admin@stok.com" &&
        formData.password === "123456"
      ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);
        if (formData.remember) {
          localStorage.setItem("rememberMe", "true");
        }
        navigate("/");
      } else {
        setErrors({ password: "E-posta veya şifre hatalı" });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Login Form Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fas fa-boxes text-4xl text-amber-500"></i>
              <h1 className="text-2xl font-bold text-slate-800">Stok Pro</h1>
            </div>
            <p className="text-slate-600">Hesabınıza giriş yapın</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800">
                E-posta Adresi
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@email.com"
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-lg text-sm transition-all ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                  } outline-none`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800">
                Şifre
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Şifrenizi girin"
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-lg text-sm transition-all ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                  } outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Form Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                />
                <span>Beni hatırla</span>
              </label>
              <a
                href="#"
                className="text-amber-500 hover:text-amber-600 font-medium transition-colors"
              >
                Şifremi unuttum?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
              icon={isLoading ? "fas fa-spinner fa-spin" : "fas fa-sign-in-alt"}
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </div>

        {/* Info Section */}
        <div className="hidden md:flex bg-gradient-to-br from-amber-500 to-amber-600 p-12 items-center justify-center text-white">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Stok Yönetiminizi Kolaylaştırın
            </h2>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span>Gerçek zamanlı stok takibi</span>
              </li>
              <li className="flex items-center gap-4 text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span>Otomatik kritik stok uyarıları</span>
              </li>
              <li className="flex items-center gap-4 text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span>Detaylı raporlama sistemi</span>
              </li>
              <li className="flex items-center gap-4 text-lg">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <span>Müşteri ve cari hesap yönetimi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
