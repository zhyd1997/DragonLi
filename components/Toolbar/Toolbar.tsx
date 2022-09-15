import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { MarkButtonGroup } from '@/components/MarkButtonGroup';
import { BlockButtonGroup } from '@/components/BlockButtonGroup';

export type T = {
  format: string;
  ariaLabel: string;
  icon: any;
};

const marks: T[] = [
  {
    format: 'bold',
    ariaLabel: 'bold',
    icon: <FormatBoldIcon />,
  },
  {
    format: 'italic',
    ariaLabel: 'italic',
    icon: <FormatItalicIcon />,
  },
  {
    format: 'underlined',
    ariaLabel: 'underlined',
    icon: <FormatUnderlinedIcon />,
  },
];

const blocks: T[] = [
  {
    format: 'heading-one',
    ariaLabel: 'heading one',
    icon: <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
          </svg>,
  },
  {
    format: 'heading-two',
    ariaLabel: 'heading two',
    icon: <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" />
          </svg>,
  },
];

export const Toolbar = () => {
  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <MarkButtonGroup marks={marks} />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <BlockButtonGroup blocks={blocks} />
      </Paper>
    </div>
  );
}
