import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import  firebaseApp from "../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { CssVarsProvider, useColorScheme, ThemeProvider } from "@mui/joy/styles";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Swal from 'sweetalert2'
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
  Grid,
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


export default function Signup() {

   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');   
   const [confirmPassword, setConfirmPassword] = useState('');

   const auth = getAuth(firebaseApp);

   let navigate = useNavigate();

   useEffect(()=> {
      onAuthStateChanged(auth, (user)=> {
         if(user) {
            navigate("/")
         }
      });
   }, [navigate, auth]);


   const handleSignup = () => {
        // Helper functions for email and password validation
         const isValidEmail = (email) => {
            // For a simple check, use a regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
         };
         
            const isValidPassword = (password) => {
            // For a simple check, ensure it's at least 6 characters
            return password.length >= 10;
         };

      if (firstname !== "" && 
            lastname !== "" && 
            username !== "" &&
            email !== "" && isValidEmail(email) &&
            password !== "" && isValidPassword(password) &&
            confirmPassword !== "" && 
            password === confirmPassword) {
         
         createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...

            updateProfile(auth.currentUser,{
               displayName: firstname + lastname
            })
            Swal.fire({
               toast: 'true',
               text: `Hello, ${firstname} ${lastname}! Your account has been successfully created.`,
               icon: 'success',
               showConfirmButton: false,
               timer: 4000
            });
         })
         .catch((error) => {
            Swal.fire({
               toast: 'true',
               text: error,
               icon: 'warning',
               showConfirmButton: false,
               timer: 4000
            });
         });
      } else {
         let errorMessage = 'Please fill in all the required fields!';
         if (email !== '' && !isValidEmail(email)) {
         errorMessage = 'Please enter a valid email address!';
         }
         if (password !== '' && !isValidPassword(password)) {
         errorMessage = 'Please enter a valid password (at least 10 characters)!';
         }

         Swal.fire({
         toast: 'true',
         title: 'Incomplete or Invalid',
         text: errorMessage,
         icon: 'error',
         confirmButtonText: 'OK',
         customClass: {
            confirmButton: 'btn btn-dark',
         },
      });
      }
   };

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
                        py: 2,
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'space-between'
                     }}
                  >
                     <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                        <IconButton variant="soft" color="primary" size="sm">
                           <FacebookRoundedIcon />
                        </IconButton>
                        <Typography level="title-lg">FRIENDFLOW</Typography>
                     </Box>
                     <ModeToggle />
                  </Box>
                  <Box 
                     component="main"
                     sx={{
                        my: 'auto',
                        py: 1,
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
                     <Stack gap={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack gap={1} >
                           <Typography level="h2">Sign up</Typography>
                        </Stack>
                        <Typography level="title-sm">Create your account here!</Typography>
                     </Stack>
                     <Grid 
                        container 
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{ flexGrow: 1 }}
                     >
                        <Grid xs={6} md={6} >
                           <FormControl required>
                              <FormLabel>First Name</FormLabel>
                              <Input 
                                 type="text" 
                                 name="firstname" 
                                 id="firstname" 
                                 onChange={(e) => setFirstname (
                                    e.target.value,
                                 )}
                                 value={firstname}
                              />
                           </FormControl>
                        </Grid>
                        <Grid xs={6} md={6} >
                           <FormControl required>
                              <FormLabel>Last Name</FormLabel>
                              <Input 
                                type="text" 
                                name="lastname" 
                                id="lastname" 
                                onChange={(e) => setLastname (
                                    e.target.value,
                                )}
                                value={lastname}
                              />
                           </FormControl>
                        </Grid>
                     </Grid>
                     <FormControl required>
                        <FormLabel>User Name</FormLabel>
                        <Input 
                           type="text" 
                           name="username" 
                           id="username" 
                           onChange={(e) => setUsername (
                              e.target.value,
                           )}
                           value={username}
                        />
                     </FormControl>
                     <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input 
                           type="email" 
                           name="email" 
                           id="email" 
                           onChange={(e) => setEmail (
                              e.target.value,
                           )}
                           value={email}
                        />
                     </FormControl>
                     <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input 
                           type="password" 
                           name="password" 
                           id="password" 
                           onChange={(e) => setPassword (
                              e.target.value,
                           )}
                           value={password}
                        />
                     </FormControl>
                     <FormControl required>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input 
                           variant="outlined"
                           type="password" 
                           name="confirmPassword" 
                           id="confirmPassword" 
                           onChange={(e) => setConfirmPassword (
                              e.target.value,
                           )}
                           value={confirmPassword}
                        />
                     </FormControl>

                     <Stack gap={2} sx={{ mt: '2px' }}>
                        <Box sx={{ alignSelf: 'center'}}>
                           <Typography level="body-sm">
                              Already have an account? {' '}
                              <Link to="/signin">
                                 <JoyLink level="title-sm">Sign in!</JoyLink>
                              </Link>
                           </Typography>
                        </Box>
                        <Button fullWidth sx={{ textTransform: 'uppercase' }} onClick={() => handleSignup()}>
                           Create account
                        </Button>
                     </Stack>
                  </Box>
                  <Box component="footer" sx={{ pb: 2 }}>
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
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage:
                     'url(https://konvajs.org/assets/features/undraw_drag_5i9w.svg)',
                  [theme.getColorSchemeSelector('dark')]: {
                     backgroundImage:
                     'url(https://konvajs.org/assets/features/undraw_drag_5i9w.svg)',
                  },
               })}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '100%',
                     maxWidth: '100%',
                     mx: "auto",
                     borderRadius: 'sm',
                  }}
               > 
                  <Stack>
                     <Stack gap={1}>
                        <Typography 
                           level="h1"
                           sx={{
                              alignSelf: 'center',
                              color: '#6F8EFF',
                              fontWeight: 'xl',
                              fontSize: '3.75rem',
                              letterSpacing: 2,
                           }}
                        >  
                           FRIENDFLOW
                        </Typography>
                     </Stack>
                     <Typography level="title-lg"
                        sx={{ 
                           alignSelf: 'center',
                           fontSize: '1.50rem'
                        }}
                     >
                        Ride the Waves of Connection.
                     </Typography>
                  </Stack>
               </Box>
            </Box>
            
         </CssVarsProvider>
      </ThemeProvider>
  );
}
