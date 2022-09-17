import Box from "@mui/material/Box";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { styled } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Nav = styled('nav')`
  margin-right: auto;

  & ul {
    padding-left: 0;
    display: flex;
    gap: 24px;
  }

  & li {
    list-style-type: none;
  }

  & a {
    text-decoration: none;
  }

  & a:hover,
  & a:acitve,
  & a:link,
  & a:visited {
    // TODO
  }
`

export const Navbar = () => {
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
      <Nav>
        <ul>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/editor"}>
              Editor
            </Link>
          </li>
        </ul>
      </Nav>
      <ConnectButton />
      <ThemeSwitcher />
    </Box>
  )
};
