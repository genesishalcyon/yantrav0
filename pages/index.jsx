// import ParentBlock from "@/components/page/ParentBlock";
import { props } from "@/lib/props/page";
import dynamic from "next/dynamic";
export const getStaticProps = props;
const ParentBlock = dynamic(() =>
  import("../components/page/ParentBlock").then((module) => module.default)
);
export default function Homepage({ page, blocks }) {
  return <ParentBlock page={page} blocks={blocks} initialBlocks={2} />;
}
