import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
};

type HomePageProps = {
  articles: Article[];
};

const Home: NextPage<HomePageProps> = ({ articles }) => {
  return (
    <div style={{ padding: "0 24px" }}>
      <Head>
        <title>Dargon Li</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {articles.map((article) => (
          <div key={article.id} style={{ marginBottom: '16px' }}>
            <Link
              href={{
                pathname: 'articles/[slug]',
                query: { slug: article.slug}
              }}
            >
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant='h5' component={'div'}>
                    {article.title}
                  </Typography>
                  <Typography variant='body2'>
                    {article.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Read More</Button>
                </CardActions>
              </Card>
            </Link>
          </div>
        ))}
      </main>

      <footer>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          Vercel
        </a> */}
      </footer>
    </div>
  )
}

export const getStaticProps = (): { props: HomePageProps } => {
  return {
    props: {
      articles: [
        {
          id: 'skjdf2',
          slug: 'example',
          title: 'Example',
          description: 'offical example'
        },
        {
          id: 'iojer9',
          slug: 'another-example',
          title: 'Another Example',
          description: 'another example'
        },
      ]
    },
  };
}

export default Home
