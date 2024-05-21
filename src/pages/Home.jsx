import firebaseApp from "./firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider, ThemeProvider } from "@mui/joy/styles";
import Avatar from '@mui/joy/Avatar';
import { 
   Button,
   Container,
   Box,
   Typography,
   Stack,
   Grid,
   Input,
   Card,
} from "@mui/joy";
import LeftSideBar from "./Left";
import Posts from "./Posts";
import { pink } from "@mui/material/colors";
import ResponsiveMenu from "./Left";

function Home() {

   const auth = getAuth(firebaseApp);
   const db = getFirestore(firebaseApp);
   let navigate = useNavigate();

   const [userProfile, setUserProfile] = useState('');


   useEffect(()=> {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setUserProfile({
               email: user.email,
               name: user.displayName
            })
         } else {
            navigate("/signin");
         }
      });
   }, [auth, navigate]);

   return (
      <ThemeProvider>
         <CssVarsProvider>
            <Container>
               <Grid container>

                  {/* Left Sidebar content */}
                  <Grid xs={12} sm={4} sx={{ marginTop: '10px', marginRight: '5px' }}>
                     <Grid item>
                        <Box sx={{ boxShadow: 5,  backgroundColor: '#181818', borderRadius: '8px', width: '100%' }}>
                           <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              paddingY: '10px',
                              
                           }}>
                              <Box sx={{ 
                                 display: 'flex'
                              }}>
                                 <Avatar sx={{ 
                                    alignSelf: 'center',
                                    marginX: '5px',
                                 }} />
                                 <Box  sx={{ display: 'flex', flexDirection: 'column', marginY: '' }}>
                                    <Typography fontWeight={'bold'}>{userProfile.name}</Typography>
                                    <Typography fontStyle={'italic'}>{userProfile.email}</Typography>
                                 </Box>
                                 
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'right', marginY: '3px', marginRight: '15px' }}>
                                 <LeftSideBar  />
                              </Box>
                           </Box>
                        </Box>
                     </Grid>


                     {/* Other option here */}
                     <Box sx={{ 
                        maxHeight: '100vh', 
                        overflow: 'hidden',
                        display: { xs: 'none', sm: 'block' }
                     }}>
                        <Typography level="h1">Trends in PH!</Typography>
                     </Box>

                  </Grid>

                  {/* Main Content */}
                  <Grid sm={6} sx={{ maxHeight: '100vh', overflow: 'hidden'}}>

                     <Box sx={{ 
                        backgroundColor: '#181818',
                        marginBottom: '10px', 
                        marginTop: '10px', 
                        padding: '10px 5px', 
                        borderRadius: '8px'
                        }}>
                        <Input sx={{ marginX: '5px' }} type="text" placeholder="What's in your mind?"></Input>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                          <Button sx={{ width: '55%'}}>Post</Button>
                        </Box>
                     </Box>

                     <Box sx={{ backgroundColor: '#181818', paddingY: '3px', borderRadius: '8px' }}>
                        <Posts />
                        <Posts />
                        <Posts />
                     </Box>
                  </Grid>
               </Grid>
               {/* Media Query for screens below 500px */}
                  <style >{`
                     @media (max-width: 800px) {
                        [style*="maxHeight"] {
                        display: none;
                        }

                        [style*="maxHeight"]:first-child {
                        display: block;
                        }
                     }
                  `}</style>
            </Container>
         </CssVarsProvider>
      </ThemeProvider>
   )
}

export default Home;