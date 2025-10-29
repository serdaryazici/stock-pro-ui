const citiesData = require("../data/cities.json");
const districtsData = require("../data/districts.json");

/**
 * Tüm şehirleri döndürür
 * @returns {Array} Şehir listesi
 */
export const getCities = () => {
  return citiesData;
};

/**
 * Belirli bir şehre ait ilçeleri döndürür
 * @param {string} cityId - Şehir ID'si
 * @returns {Array} İlçe listesi
 */
export const getDistrictsByCity = (cityId) => {
  if (!cityId) return [];
  return districtsData.filter(
    (district) => district.city_id === cityId.toString()
  );
};

/**
 * ID'ye göre şehir bilgisini döndürür
 * @param {string} cityId - Şehir ID'si
 * @returns {Object|null} Şehir objesi
 */
export const getCityById = (cityId) => {
  if (!cityId) return null;
  return citiesData.find((city) => city.id === cityId.toString());
};

/**
 * ID'ye göre ilçe bilgisini döndürür
 * @param {string} districtId - İlçe ID'si
 * @returns {Object|null} İlçe objesi
 */
export const getDistrictById = (districtId) => {
  if (!districtId) return null;
  return districtsData.find(
    (district) => district.id === districtId.toString()
  );
};

/**
 * Şehir adına göre şehir bilgisini döndürür
 * @param {string} cityName - Şehir adı
 * @returns {Object|null} Şehir objesi
 */
export const getCityByName = (cityName) => {
  if (!cityName) return null;
  return citiesData.find(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
};

/**
 * Tüm ilçeleri döndürür
 * @returns {Array} İlçe listesi
 */
export const getAllDistricts = () => {
  return districtsData;
};
