// import ParentBlock from "@/components/page/ParentBlock";
// import { props } from "@/lib/props/page";
// export const getStaticProps = props;
import TextBanner from "@/components/ehasp/partials/TextBanner";
import FeaturedArticle from "@/components/blocks/FeaturedArticle";
import ArticleFilter from "@/components/blocks/ArticleFilter";
import ArticleList from "@/components/blocks/ArticleList";
export default function Index({ page, blocks }) {
  // return <ParentBlock page={page} blocks={blocks} />;

  return (
    <div>
      <TextBanner
        title="ARTICLES & BLOG UPDATES"
        bgImage="/images/blog_bg_banner.png"
      />
      <FeaturedArticle />
      <ArticleFilter />
      <ArticleList />
    </div>
  );
}
