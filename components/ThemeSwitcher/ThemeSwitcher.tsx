import { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DarkIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "state/context";

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
        {theme.palette.mode === 'dark' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Box>
  );
};
