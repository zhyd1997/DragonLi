import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Editor as Renderer } from '@/components/Editor';
import type { Descendant } from 'slate';
import { Subscribe } from '@/components/Subscribe';
import { styled } from '@mui/material';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';

const Container = styled('div')` 
  margin: 24px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;
// fake content.
const content: Descendant[] = [
  {
      "type": "heading-three",
      "children": [
          {
              "text": "Who am I"
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Twitter",
              bold: true,
          },
          {
            text: ': ',
          },
          {
            text: '@zhyd007',
          },
      ]
  },
  {
      "type": "paragraph",
      "children": [
        {
            text: "Github",
            bold: true,
        },
        {
          text: ': ',
        },
        {
          text: '@zhyd1997',
        },
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "A Frontend Dev in China"
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "heading-three",
      "children": [
          {
              "text": "What I built"
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "A DApp alternative to "
          },
          {
              "text": "Mirror",
              "bold": true
          },
          {
              "text": ", but has some differences:"
          }
      ]
  },
  {
    type: 'table',
    children: [
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [
              {
                text: '',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Homepage',
                bold: true,
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Editor',
                bold: true,
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Subscription',
                bold: true,
              },
            ],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [
              {
                text: 'Mirror',
                bold: true,
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'No entries are displayed,\nWriters need to share their entries to make them visible',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                "type": "bulleted-list",
                "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Block"
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "only light mode"
                      }
                    ]
                  }
                ]
            }
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'one-time donation',
              },
            ],
          },
        ],
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            children: [
              {
                text: 'MirrorX\n(Dragon Li)',
                bold: true,
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'All the articles display on the homepage',
              },
            ],
          },
          {
            type: 'table-cell',
            children: [
             {
              "type": "bulleted-list",
              "children": [
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Toolbar"
                      }
                    ]
                  },
                  {
                    "type": "list-item",
                    "children": [
                      {
                        "text": "Both light mode and dark mode"
                      }
                    ]
                  }
                ]
              }
            ],
          },
          {
            type: 'table-cell',
            children: [
              {
                text: 'Donate continuously in seconds',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    "type": "paragraph",
    "children": [
      {
        "text": "Just demonstrate the "
      },
      {
        "text": "Proof of Concept",
        "bold": true
      },
      {
        "text": ", has not finished yet"
      }
    ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "heading-three",
      "children": [
          {
              "text": "How it works"
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Readers",
              "bold": true
          },
          {
              "text": " subscribe to their favorite "
          },
          {
              "text": "writers",
              "bold": true
          },
          {
              "text": " using the "
          },
          {
              "text": "Superfluid",
              "italic": true
          },
          {
              "text": " streaming service"
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  },
  {
      "type": "heading-three",
      "children": [
          {
              "text": "Future work"
          }
      ]
  },
  {
      "type": "bulleted-list",
      "children": [
          {
              "type": "list-item",
              "children": [
                  {
                      "text": "Editor improvement (shortcuts, more formats like text color and images, etc"
                  }
              ]
          }
      ]
  },
  {
      "type": "bulleted-list",
      "children": [
          {
              "type": "list-item",
              "children": [
                  {
                      "text": "Optimism",
                      "bold": true
                  },
                  {
                      "text": " network (currently in "
                  },
                  {
                      "text": "Goerli",
                      "italic": true
                  },
                  {
                      "text": " testnet"
                  }
              ]
          }
      ]
  },
  {
      "type": "bulleted-list",
      "children": [
          {
              "type": "list-item",
              "children": [
                  {
                      "text": "Store contents in a "
                  },
                  {
                      "text": "decentralized",
                      "bold": true
                  },
                  {
                      "text": " way but "
                  },
                  {
                      "text": "not",
                      "italic": true
                  },
                  {
                      "text": " on the blockchain."
                  }
              ]
          }
      ]
  },
  {
    "type": "heading-three",
    "children": [
      {
        "text": "Try it out"
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        text: 'live demo',
        bold: true,
      },
      {
        text:': ',
      },
      {
        "text": "https://dragon-li.on.fleek.co/"
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        text: 'source code',
        bold: true,
      },
      {
        text: ': ',
      },
      {
        "text": "https://github.com/zhyd1997/DragonLi"
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "text": ""
      }
    ]
  },
  {
    "type": "heading-three",
    "children": [
      {
        "text": "Thank you",
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "text": ""
      }
    ]
  }
];

interface Article {
  slug: string;
  title: string;
  description: string;
  author: string;
  content: Descendant[];
};

type ArticlePageProps = {
  article?: Article;
};

const ArticlePage: NextPage<ArticlePageProps> = ({ article = {
  slug: 'ethonline-2022-submission-sere2w',
  title: 'ETHOnline 2022 Submission',
  description: 'presentation',
  author: '0xe073B0fb1554390a47aBeCBDD42599a64c7D45DF',
  content,
} }) => {
  const slides: any = [];

  content.forEach((el: any) => {
    if (el.type === 'heading-three') {
      slides.push([{ ...el, align: 'center'}]);
    } else {
      if (el?.children[0]?.text === '') {}
      else {
        slides.at(-1).push(el);
      }
    }
  });

  const [value, setValue] = useState<Descendant[]>(slides[0]);
  const [isSlidesMode, setIsSlidesMode] = useState<boolean>(false);

  const onClick = () => setIsSlidesMode(!isSlidesMode);

  return (
    <div>
      <Head>
        <title>{article.slug}</title>
        <meta name="description" content={article.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container style={{ margin: '24px' }}>
          <Subscribe recipient={article.author} style={{ marginLeft: 'auto' }} />
          <div style={{ marginLeft: '16px' }}>
            <Button variant='contained' onClick={onClick} sx={{ textTransform: 'none' }}>
              {isSlidesMode ? 'Transfer back' : 'Transfer to Slides'}
            </Button>
          </div>
          <div>
            <Typography variant='h5' component={'div'}>
              {article.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {article.author.slice(0, 5)}
              {'...'}
              {article.author.slice(article.author.length - 5)}
            </Typography>
          </div>
        </Container>
        <Renderer value={isSlidesMode ? value : article.content} editable={false} />
        {isSlidesMode && (
          <Stack alignItems={'flex-end'} spacing={2} sx={{ marginRight: '24px' }}>
            <Pagination
              count={slides.length}
              showFirstButton
              showLastButton
              onChange={(evt, page) => setValue(slides[page - 1])}
            />
          </Stack>
        )}
      </main>
    </div>
  );
};

export default ArticlePage;
