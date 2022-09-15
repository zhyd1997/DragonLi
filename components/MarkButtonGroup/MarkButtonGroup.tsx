import React, { FC, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import { Editor } from "slate";
import { useSlate } from "slate-react";
import type { T } from "@/components/Toolbar";
import { StyledToggleButtonGroup } from "@/components/StyledToggleButtonGroup";

type MarkButtonGroupProps = {
  marks: T[],
};

export const MarkButtonGroup: FC<MarkButtonGroupProps> = ({ marks }) => {
  const editor = useSlate();

  const [formats, setFormats] = useState<string[]>(() => []);

  const handleFormat = (
    evt: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  const isMarkActive = (editor: any, format: any): boolean => {
    const marks = Editor.marks(editor);

    // @ts-ignore
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor: any, format: any): void => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const onMouseDown = (evt: React.MouseEvent<HTMLButtonElement>, format: any) => {
    evt.preventDefault();
    toggleMark(editor, format)
  };

  return (
    <StyledToggleButtonGroup
      size="small"
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      {marks.map(({ format, ariaLabel, icon }) => (
        <ToggleButton
          key={format}
          value={format}
          aria-label={ariaLabel}
          selected={isMarkActive(editor, format)}
          onMouseDown={(evt) => onMouseDown(evt, format)}
        >
          {icon}
        </ToggleButton>
        ))}
    </StyledToggleButtonGroup>
  );
};
