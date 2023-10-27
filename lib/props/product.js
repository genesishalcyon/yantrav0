import PRODUCTAPI from "@/lib/api/product/request";
import { deserialize } from "@/lib/services/globalService";

const paths = async () => {
  const handler = await PRODUCTAPI.getProducts("/products");
  const products = deserialize(handler);
  const paths = products.map((e) => {
    return {
      params: { slug: e.slug },
    };
  });
  return { paths, fallback: "blocking" };
};

const props = async (context) => {
  const slug = context?.params?.slug;
  const handler = await PRODUCTAPI.findProductCustom(`/products/${slug}`);
  const product = deserialize(handler);
  return {
    props: { product },
    revalidate: 10,
  };
};

export { paths, props };
