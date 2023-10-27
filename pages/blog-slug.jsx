// import ParentBlock from "@/components/page/ParentBlock";
// import { props } from "@/lib/props/page";
// export const getStaticProps = props;
import ArticleBanner from "@/components/blocks/ArticleBanner";
import Article from "@/components/blocks/Article";
import RelatedArticles from "@/components/blocks/RelatedArticles";
export default function Index({ page, blocks }) {
  // return <ParentBlock page={page} blocks={blocks} />;

  return (
    <div>
      <ArticleBanner />
      <Article />
      <RelatedArticles />
    </div>
  );
}
