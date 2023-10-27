const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const axios = require("axios").default;
const { Jsona } = require("jsona");
const dataFormatter = new Jsona();
module.exports.preBuildDevelopment = async () => {
  dotenv.config();
  // Convert the environment variables to a JSON object
  const envVars = {};
  for (const key in process.env) {
    envVars[key] = process.env[key];
  }

  // Form Setting
  // const formSettingHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/settings/form"
  // );
  // const formSetting = dataFormatter.deserialize(formSettingHandler.data);

  // Locales
  // const localesHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/locales"
  // );
  // const locales = localesHandler.data;

  // Form
  // const formHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/forms/get-in-touch?include=blueprint"
  // );
  // const form = dataFormatter.deserialize(formHandler.data);

  // Global Data
  const tenantDetailsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/globals/tenant-details"
  );
  const tenantDetails = dataFormatter.deserialize(tenantDetailsHandler.data);

  // Currency
  const currencyHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/currency"
  );
  const currency = dataFormatter.deserialize(currencyHandler.data);

  // Menu Data Header
  const menusHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/header?include=nodes.children,parentNodes,nodes.model"
  );
  const menus = dataFormatter.deserialize(menusHandler.data);

  // Menu Data Footer
  const seedmenusFooterHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/seed-bank/?include=nodes.children,parentNodes"
  );
  const seedmenus = dataFormatter.deserialize(seedmenusFooterHandler.data);

  const aboutmenusFooterHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/about-us/?include=nodes.children,parentNodes"
  );
  const aboutmenus = dataFormatter.deserialize(aboutmenusFooterHandler.data);

  // Generate default Image
  const generateImage = (imageUrl, path) => {
    const file = fs.createWriteStream(path);
    https.get(imageUrl, function (response) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Default Image Downloaded");
      });
    });
  };
  [].forEach((e, i) => {
    generateImage(e, `./public/image${i}.webp`);
  });

  fs.writeFileSync(
    "./lib/preBuildScripts/static/globalData.json",
    JSON.stringify({
      tenantDetails,
      menus,
      seedmenus,
      aboutmenus,
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/currencyData.json",
    JSON.stringify({
      currency,
    })
  );

  console.log("New Global Data Generated!");
};
