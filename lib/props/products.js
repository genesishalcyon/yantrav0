const fs = require("fs");
import Jsona from "jsona";
const dataFormatter = new Jsona();
import TAXONOMYAPI from "@/lib/api/taxonomy/request";
import PRODUCTAPI from "@/lib/api/product/request";
const props = async () => {
  const taxonomies = ["brand", "categories"];
  const taxonomyHandler = await Promise.all(
    taxonomies.map(async (taxonomy) => {
      const dataHandler = await TAXONOMYAPI.getTaxonomies(
        `/${taxonomy}?include=parentTerms.children,parentTerms.taxonomy,taxonomyTerms.children,taxonomyTerms.taxonomy`
      );
      const data = dataFormatter.deserialize(dataHandler);
      delete data.relationshipNames;
      return data;
    })
  );

  const categories = taxonomyHandler[1];
  const relatedProducts = {};
  await Promise.all(
    categories?.taxonomyTerms?.map(async (category) => {
      const productsHandler = await PRODUCTAPI.getProducts(
        `/products?include=media,productTier&filter[taxonomies][categories]=${category.id}&page[size]=4`
      );
      const relatedHandler = dataFormatter.deserialize(productsHandler);
      relatedProducts[category.id] = relatedHandler;
      return;
    })
  );

  fs.writeFileSync(
    "./lib/preBuildScripts/static/relatedProducts.json",
    JSON.stringify({
      products: relatedProducts,
    })
  );

  return {
    props: {
      brands: taxonomyHandler[0],
      categories,
    },
    // revalidate: 86400, // 1 DAY
    revalidate: 3600, // 1 HOUR
  };
};

const allProducts = async () => {
  const productsHandler = await PRODUCTAPI.getProducts(
    "/products?include=media"
  );
  const products = dataFormatter.deserialize(productsHandler);
  let allData = products;
  let { last_page = 1 } = productsHandler?.meta || {};
  let current_page = 1;
  while (current_page < last_page) {
    current_page = current_page + 1;
    const productsHandler = await PRODUCTAPI.getProducts(
      `?include=media&page[number]=${current_page}`
    );
    const products = dataFormatter.deserialize(productsHandler);
    allData = [...allData, ...products];
  }
  return allData;
};

export { props };
