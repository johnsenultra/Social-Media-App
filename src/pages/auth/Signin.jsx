import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import  firebaseApp  from "../firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2'
import { CssVarsProvider, useColorScheme, ThemeProvider } from "@mui/joy/styles";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {
  GlobalStyles,
  CssBaseline,
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  FormLabel,
  FormControl,
  Input,
  Link as JoyLink,
} from "@mui/joy";
import { formLabelClasses } from "@mui/material";

function ModeToggle() {
   const { mode, setMode } = useColorScheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);
   
   if (!mounted) {
      return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
   }

   return (
      <IconButton
         size="sm"
         variant="outlined"
         color="neutral"
         aria-label="toggle light/dark mode"
         onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light');
         }}
      >
         {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon /> }
      </IconButton>
   );
}


export default function Signin() {
   

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   let navigate = useNavigate();
   const auth = getAuth(firebaseApp);

   useEffect(() => {

      onAuthStateChanged(auth, (user)=> {
         if(user) {
            navigate("/")
         } 
      })
   }, [navigate, auth]);

   const handleLogin = () => {
      if (email !== "" && password !== "" ) {
         signInWithEmailAndPassword(auth, email, password)
         .then((userCredentials) => {
            //Signed in
            const user = userCredentials;
            navigate("/")

         })
         .cacth((error) => {
            Swal.fire({
               toast: 'true',
               text: error,
               icon: 'warning',
               showConfirmButton: false,
               timer: 4000
            });
         })
      } else {
         Swal.fire({
            toast: 'true',
            text: "Please fill in all the required fields",
            icon: 'warning',
            showConfirmButton: false,
            timer: 4000
         });
      }
   }
   
   useEffect(() => {

      

   }, [])

  return (
      <ThemeProvider>
         <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles 
               styles={{
                  ':root': {
                     '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below '769px'
                     '--Cover-width': '50vw', // must be `vw` only
                     '--Form-maxWidth': '800px', // 
                     '--Transition-duration': '0.4s', // set to `none` to diable
                  },
               }}
            />
            <Box
               sx={(theme) => ({
                  width: 'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                  transition: 'width var(--Transition-duration)',
                  transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  backdropFilter: 'blur(12px)',
                  backgroundColor: 'rgba(255 255 255 / 0.2)',
                  [theme.getColorSchemeSelector('dark')]: {
                     backgroundColor: 'rgba(19 19 24 / 0.4)',
                  },
               })}
            >
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     minHeight: '100dvh',
                     width:
                     'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                     maxWidth: '100%',
                     px: 2,
                  }}
               >
                  <Box
                     component="header"
                     sx={{
                        py: 3,
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
                  </Box>
                  <Box 
                     component="main"
                     sx={{
                        my: 'auto',
                        py: 2,
                        pb: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 400,
                        maxWidth: '100%',
                        mx: "auto",
                        borderRadius: 'sm',
                        '& form' : {
                           display: 'flex',
                           flexDirection: 'column',
                           gap: 2,
                        }, 
                        [`&.${formLabelClasses.asterisk}`]: {
                           visibility: 'hidden',
                        },
                     }}
                  >
                     <Stack gap={4} sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack gap={1} >
                           <Typography level="h2">Sign in</Typography>
                        </Stack>
                        <Typography level="title-sm">Sign in your account here!</Typography>
                     </Stack>
                     <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input 
                           color="neutral"
                           variant="soft"
                           type="email" 
                           name="email" 
                           id="email"
                           onChange={(e) => setEmail(
                              e.target.value,
                           )}
                           value={email}
                        />
                     </FormControl>
                     <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input
                           color="neutral"
                           variant="soft"
                           type="password" 
                           name="password" 
                           id="password" 
                           onChange={(e) => setPassword(
                              e.target.value,
                           )}
                           value={password}
                        />
                     </FormControl>
                     <Stack gap={4} sx={{ mt: 2 }}>
                        <Box sx={{ alignSelf: 'center'}}>
                           <Typography level="body-sm">
                              Don&apos;t have an account? {' '}
                              <Link to="/signup">
                                 <JoyLink level="title-sm">Sign up!</JoyLink>
                              </Link>
                           </Typography>
                        </Box>
                        <Button fullWidth sx={{ textTransform: 'uppercase' }} onClick={handleLogin}>
                           Log in
                        </Button>
                     </Stack>
                  </Box>
                  <Box component="footer" sx={{ py: 3 }}>
                     <Typography level="body-xs" textAlign="center">
                        @ {new Date().getFullYear()} Johnsen Ultra. All rights reserved
                     </Typography>
                  </Box>
               </Box>
            </Box>
            <Box
               sx={(theme) => ({
                  height: '100%',
                  position: 'fixed',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                  transition:
                     'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                  transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                  backgroundColor: 'background.level1',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage:
                     'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                  [theme.getColorSchemeSelector('dark')]: {
                     backgroundImage:
                     'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                  },
               })}
            />
         </CssVarsProvider>
      </ThemeProvider>
  );
}
