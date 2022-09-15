import React, { FC, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import { useSlate } from "slate-react";
import { Editor, Element, Transforms } from "slate";
import type { T } from "@/components/Toolbar";
import { StyledToggleButtonGroup } from "@/components/StyledToggleButtonGroup";

type BlockButtonGroupProps = {
  blocks: T[];
};

export const BlockButtonGroup: FC<BlockButtonGroupProps> = ({ blocks }) => {
  const editor = useSlate();

  const [formats, setFormats] = useState<string[]>(() => []);

  const handleFormat = (
    evt: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  const isBlockActive = (editor: any, format: any, blockType?: any): boolean => {
    const { selection } = editor;
    if (!selection) {
      return false;
    }

    const [match] = Array.from(
      Editor.nodes(
        editor,
        {
          at: Editor.unhangRange(editor, selection),
          match: node =>
            !Editor.isEditor(node) &&
            Element.isElement(node) &&
            // @ts-ignore
            node[blockType] === format,
        }
      )
    );

    return !!match;
  };

  const toggleBlock = (editor: any, format: any): void => {
    const isActive = isBlockActive(editor, format, 'type');

    Transforms.unwrapNodes(
      editor,
      {
        match: node =>
          !Editor.isEditor(node) &&
          Element.isElement(node) &&
          false,
        split: true,
      }
    );

    const newProperties: Partial<Element> = {
      type: isActive ? 'paragraph' : format,
    };

    Transforms.setNodes<Element>(editor, newProperties);
  };

  const onMouseDown = (evt: React.MouseEvent<HTMLButtonElement>, format: any) => {
    evt.preventDefault();
    toggleBlock(editor, format);
  };

  return (
    <StyledToggleButtonGroup
      size="small"
      value={formats}
      exclusive
      onChange={handleFormat}
      aria-label="text formatting"
    >
      {blocks.map(({ format, ariaLabel, icon }) => (
        <ToggleButton
          key={format}
          value={format}
          aria-label={ariaLabel}
          selected={isBlockActive(editor, format, 'type')}
          onMouseDown={(evt) => onMouseDown(evt, format)}
        >
          {icon}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};
