import type { NextPage } from 'next';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import { Editor as Renderer } from '@/components/Editor';
import type { Descendant } from 'slate';

interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  content: Descendant[];
};

type ArticlePageProps = {
  article: Article;
};

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  return (
    <div>
      <Head>
        <title>{article.slug}</title>
        <meta name="description" content={article.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ margin: '24px' }}>
          <Typography variant='h5' component={'div'}>
            {article.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {article.author.slice(0, 5)}
            {'...'}
            {article.author.slice(article.author.length - 5)}
          </Typography>
        </div>
        <Renderer value={article.content} editable={false} />
      </main>
    </div>
  );
};

export const getServerSideProps = (): { props: ArticlePageProps } => {
  // fake content.
  const content: Descendant[] = [
    {
      type: 'paragraph',
      children: [
        { text: 'This is ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text:
            ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
  ];

  return {
    props: {
      article: {
        slug: 'example',
        title: 'Example',
        description: 'official example',
        author: '0xe073B0fb1554390a47aBeCBDD42599a64c7D45DF',
        content,
      }
    },
  }
}

export default ArticlePage;
