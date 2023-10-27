import currencyData from "@/lib/preBuildScripts/static/currencyData.json";
const { currency: currencyHandler } = currencyData;
const currency = currencyHandler?.[0]?.symbol || "";
export { currency };
