import { useCallback, useMemo } from 'react';
import { withHistory } from 'slate-history';
import { Descendant ,createEditor } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';
import { Element } from './Element';
import type { ElementProps } from './Element';
import { Leaf } from './Leaf';
import type { LeafProps } from './Leaf';
import { Toolbar } from '../Toolbar';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
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
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

export const Editor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props: ElementProps) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props: LeafProps) => <Leaf {...props}/>, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Toolbar />
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} placeholder="Enter some rich text..." autoFocus />
    </Slate>
  );
};
