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
} from "@mui/joy";
import LeftSideBar from "./Left";
import Posts from "./Posts";
import { pink } from "@mui/material/colors";

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
               <Grid container sx={{
               }}>

                  {/* Left Sidebar content */}
                  <Grid xs={12} sm={3} style={{ maxHeight: '100vh', width: '100vw%', overflow: 'auto' }}>
                     <Box>
                        <Stack sx={{
                           padding: '10px',
                           margin: '5px',
                        }}>
                           <Grid container spacing={1}>
                              <Grid sx={3} >
                                 <Avatar />
                              </Grid>
                              <Grid sx={3} overflow={ 'auto' }>
                                 <Typography fontWeight={'bold'}>{userProfile.name}</Typography>
                                 <Typography fontStyle={'italic'}>{userProfile.email}</Typography>
                              </Grid>
                              <Grid sx={3}>
                                 <LeftSideBar/>
                              </Grid>
                           </Grid>
                        </Stack>
                     </Box>

                  </Grid>

                  {/* Main Content */}
                  <Grid xs={12} sm={6} sx={{ maxHeight: '100vh', overflow: 'auto'}}>
                     <Typography>Tweet Post Here!</Typography>
                     <Input type="text" placeholder="What's in your mind?"></Input>
                     <Button sx={{ margin: 1, display: "flex", alignItems: "end", justifyContent: "center"}}>Post</Button>
                     
                     <Box sx={{ backgroundColor: '#181818', paddingY: '5px' }}>
                        <Posts />
                        <Posts />
                        <Posts />
                     </Box>
                  </Grid>

                  {/* Right Sidebar content optional */}
                  <Grid xs={12} sm={3} style={{ maxHeight: '100vh', overflow: 'hidden' }}>
                     <Typography level="h1">Trends in PH!</Typography>
                  </Grid>
               </Grid>
               {/* Media Query for screens below 500px */}
                  <style >{`
                     @media (max-width: 500px) {
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