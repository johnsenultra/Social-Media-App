import {
   Box,
   Stack,
   IconButton,
   Typography,
   Grid,
   Link,
} from "@mui/joy"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { CssVarsProvider, ThemeProvider } from "@mui/joy/styles";
import { Token } from "@mui/icons-material";
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';



function LeftSideBar() {
   return(
      <ThemeProvider>
         <CssVarsProvider>
         <Dropdown>
            <MenuButton>Menu</MenuButton>
            <Menu>
               <MenuItem>
                  <IconButton>
                     <HomeRoundedIcon />
                     <Typography level="title-lg">
                        <Link variant="plain" to="/" underline="none">Home</Link>
                     </Typography>
                  </IconButton>
               </MenuItem>
               <MenuItem>
                  <IconButton>
                     <NotificationsRoundedIcon />
                     <Typography level="title-lg">
                        <Link variant="plain" href="#" underline="none">Notification</Link>
                     </Typography>
                  </IconButton>
               </MenuItem>
               <MenuItem>
               <IconButton>
                  <AccountCircleRoundedIcon />
                  <Typography level="title-lg">
                     <Link variant="plain" href="#" underline="none">Profile</Link>
                  </Typography>               
               </IconButton>
               </MenuItem>
            </Menu>
         </Dropdown>
            {/* <Box>
               <Stack>
                  <Typography>Nav</Typography>
                  <Box
                  sx={(theme) => ({
                     boxShadow: theme.shadow.lg,
                     '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                     '--joy-shadowRing': 'inset 0 -3px 0 rgba(0 0 0 / 0.24)',
                     marginRight: "12px",
                  })}
                  >  
                     <IconButton>
                        <HomeRoundedIcon />
                        <Typography level="title-lg">
                           <Link to="/" underline="none">Home</Link>
                        </Typography>
                     </IconButton> <br />
                     <IconButton>
                        <NotificationsRoundedIcon />
                        <Typography level="title-lg">
                           <Link href="#" underline="none">Notification</Link>
                        </Typography>
                     </IconButton> <br />
                     <IconButton>
                        <AccountCircleRoundedIcon />
                        <Typography level="title-lg">
                           <Link href="#" underline="none">Profile</Link>
                        </Typography>               
                     </IconButton>
                  </Box>
               </Stack>
            </Box> */}
         </CssVarsProvider>         
      </ThemeProvider>     
   )
}
export default LeftSideBar;