import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import  firebaseApp  from "../pages/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { CssVarsProvider, useColorScheme, ThemeProvider } from "@mui/joy/styles";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutRounded';
import {
  GlobalStyles,
  CssBaseline,
  Box,
  IconButton,
  Typography,
  Grid,
  Tooltip,
  Container,
} from "@mui/joy";
import Swal from 'sweetalert2'

function ModeToggle() {
   const { mode, setMode } = useColorScheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);
   
   if (!mounted) {
      return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
   }

   const handleLogout = () => {
      Swal.fire({
         toast: true,
         title: 'Logout',
         text: 'Are you sure you want to log out?',
         icon: 'question',
         showCancelButton: true,
         confirmButtonText: 'Yes',
         cancelButtonText: 'Cancel',
         customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-secondary',
         },
         }).then((result) => {
            if (result.isConfirmed) {
               // if user clicked yes, proceed with logout
               const auth = getAuth(firebaseApp);
               signOut(auth)
                  .then(() => {
                  })
                  .catch((error) => {
                  // Handle error
                  console.error('Error logging out: ', error);
                  });
            }   else {
               // if user clicked cancel, do nothing
            }
         });
   }


   return (
      <main>
         <IconButton
         size="sm"
         color="neutral"
         aria-label="toggle light/dark mode"
         onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light');
         }}
         >
            {mode === 'light'
            
            ? 
            <Tooltip title="Dark" size="sm" variant="solid" placement="bottom">
               <DarkModeRoundedIcon /> 
            </Tooltip>
            
            :
            <Tooltip title="Light" size="sm" variant="solid" placement="bottom">
               <LightModeRoundedIcon />
            </Tooltip> }
         </IconButton>
         
         <IconButton size="sm" color="neutral" onClick={handleLogout}>
            <Tooltip title="Logout" size="sm" variant="solid" placement="bottom">
               <LogoutOutlinedIcon />
            </Tooltip>
         </IconButton>
      </main>
   );
}


export default function Signin() {

   let navigate = useNavigate();
   const auth = getAuth(firebaseApp);

   useEffect(() => {

      onAuthStateChanged(auth, (user)=> {
         if(user) {
            navigate("/")
         } 
      })
   }, [navigate, auth]);


  return (
      <Container>
         <ThemeProvider>
            <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
               <CssBaseline />
               <GlobalStyles 
                  styles={{
                     ':root': {
                        '--Collapsed-breakpoint': '100px', // form will stretch when viewport is below '769px'
                        '--Cover-width': '50vw', // must be `vw` only
                        '--Form-maxWidth': '800px', // 
                        '--Transition-duration': '0.4s', // set to `none` to diable
                     },
                  }}
               />
               <Box>
                  <Grid
                     component="header"
                     sx={{
                        p: 1,
                        direction: 'row',
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'space-between'
                     }}
                  >
                     <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                        <IconButton variant="soft" color="primary" size="sm">
                           <FacebookRoundedIcon />
                        </IconButton>
                        <Typography level="title-lg">FreindFlow</Typography>
                     </Box>
                     <ModeToggle />
                  </Grid>
               </Box>
               <div style={{
               }}>
                  <Outlet></Outlet>
               </div>
            </CssVarsProvider>
         </ThemeProvider>
      </Container>
  );
}
