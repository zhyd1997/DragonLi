import { FC, useCallback, useMemo } from 'react';
import { withHistory } from 'slate-history';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';
import { Element } from './Element';
import type { ElementProps } from './Element';
import { Leaf } from './Leaf';
import type { LeafProps } from './Leaf';
import Paper from '@mui/material/Paper';
import { Toolbar } from '@/components/Toolbar';

const initialValue: Descendant[] = [
  {
      "type": "paragraph",
      "children": [
          {
              "text": ""
          }
      ]
  }
  // {
  //   type: 'table',
  //   children: [
  //     {
  //       type: 'table-row',
  //       children: [
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: '',
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'Homepage',
  //               bold: true,
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'Editor',
  //               bold: true,
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'Subscription',
  //               bold: true,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       type: 'table-row',
  //       children: [
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'Mirror',
  //               bold: true,
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'No entries are displayed,\nWriters need to share their entries to make them visible',
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               "type": "bulleted-list",
  //               "children": [
  //                 {
  //                   "type": "list-item",
  //                   "children": [
  //                     {
  //                       "text": "Block"
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "type": "list-item",
  //                   "children": [
  //                     {
  //                       "text": "only light mode"
  //                     }
  //                   ]
  //                 }
  //               ]
  //           }
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'one-time donation',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       type: 'table-row',
  //       children: [
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'MirrorX\n(Dragon Li)',
  //               bold: true,
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'All the articles display on the homepage',
  //             },
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //            {
  //             "type": "bulleted-list",
  //             "children": [
  //                 {
  //                   "type": "list-item",
  //                   "children": [
  //                     {
  //                       "text": "Toolbar"
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "type": "list-item",
  //                   "children": [
  //                     {
  //                       "text": "Both light mode and dark mode"
  //                     }
  //                   ]
  //                 }
  //               ]
  //             }
  //           ],
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [
  //             {
  //               text: 'Donate continuously in seconds',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

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
              "text": "Twitter: @zhyd007"
          }
      ]
  },
  {
      "type": "paragraph",
      "children": [
          {
              "text": "Github: @zhyd1997"
          }
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
  }
];

type EditorProps = {
  /** the editor content */
  value?: Descendant[];
  /** editable or read-only */
  editable?: boolean;
};

export const Editor: FC<EditorProps> = ({ value = content, editable = true }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props: ElementProps) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props: LeafProps) => <Leaf {...props}/>, []);
  editor.children = value;

  return (
    <Slate editor={editor} value={value} 
    onChange={value => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        // // Save the value to Local Storage.
        // const content = JSON.stringify(value)
        // // localStorage.setItem('content', content)
        // console.log(content);
        console.log(value)
      }
    }}>
      {editable && (<Toolbar />)}
      <Paper elevation={editable ? 10 : 2} sx={{ margin: '24px', minHeight: '550px' }}>
        <Editable
          style={{ padding: '24px' }}
          readOnly={!editable}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text..."
          autoFocus
        />
      </Paper>
    </Slate>
  );
};
