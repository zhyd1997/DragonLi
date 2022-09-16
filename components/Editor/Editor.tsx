import { FC, useCallback, useMemo } from 'react';
import { withHistory } from 'slate-history';
import type { Descendant } from 'slate';
import { createEditor } from 'slate';
import { withReact, Slate, Editable } from 'slate-react';
import { Element } from './Element';
import type { ElementProps } from './Element';
import { Leaf } from './Leaf';
import type { LeafProps } from './Leaf';
import { Paper } from '@mui/material';
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
];

type EditorProps = {
  /** the editor content */
  value?: Descendant[];
  /** editable or read-only */
  editable?: boolean;
};

export const Editor: FC<EditorProps> = ({ value = initialValue, editable = true }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props: ElementProps) => <Element {...props}/>, []);
  const renderLeaf = useCallback((props: LeafProps) => <Leaf {...props}/>, []);

  return (
    <Slate editor={editor} value={value}>
      {editable && (<Toolbar />)}
      <Paper elevation={editable ? 10 : 2} sx={{ margin: '24px' }}>
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
