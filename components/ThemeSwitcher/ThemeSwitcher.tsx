import { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import DarkIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "state/context";

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
        {theme.palette.mode === 'dark' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
  );
};
