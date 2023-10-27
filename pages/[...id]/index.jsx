// import ParentBlock from "@/components/page/ParentBlock";
import { paths, props } from "@/lib/props/page";
import dynamic from "next/dynamic";
export const getStaticPaths = paths;
export const getStaticProps = props;

const ParentBlock = dynamic(() =>
  import("../../components/page/ParentBlock").then((module) => module.default)
);

export default function DynamicPage({ page, blocks }) {
  return (
    <>
      <ParentBlock page={page} blocks={blocks} />
    </>
  );
}

// export default function DynamicPage({ page, blocks }) {
//   return "Test";
// }
