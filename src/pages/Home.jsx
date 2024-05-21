import firebaseApp from "./firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, addDoc, collection, Timestamp,onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CssVarsProvider, ThemeProvider } from "@mui/joy/styles";
import Avatar from '@mui/joy/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
import { 
   Button,
   Container,
   Box,
   Typography,
   Grid,
   Input,
} from "@mui/joy";
import LeftSideBar from "./Left";
import Posts from "./Posts";

function Home() {

   const auth = getAuth(firebaseApp);
   const db = getFirestore(firebaseApp);
   let navigate = useNavigate();

   const [userProfile, setUserProfile] = useState('');
   const [postContent, setPostContent] = useState('');
   const [posts, setPosts] = useState([]);

   const [buttonLoading, setButtonLoading] = useState('');
   
   useEffect(()=> {

      // User authentication
      onAuthStateChanged(auth, (user) => {
         if (user) {
            setUserProfile({
               email: user.email,
               name: user.displayName
            })
         } else {
            navigate("/signin")
         }
      });

      // Retrieve posts
      onSnapshot(collection(db, "posts"), snapshot => {
         const newPosts = [];
         snapshot.forEach((pst) => {
            newPosts.push(pst.data());
         })
         setPosts(newPosts);
      })

   }, [auth, navigate, db, posts]);

   // function to handle post
   const createPost = () => {

      setButtonLoading(true);
      if(postContent !== '') {
         // create post
         const postData = {
            body: postContent,
            user_name: userProfile.name,
            date_posted: Timestamp.now()
         };

         addDoc(collection(db, "posts"), postData).then(() => {
            setPostContent('');
            setButtonLoading(false);
         });
         
      } else {
         alert('Post cannot be empty').then(() => {
            setButtonLoading(false);
         });
      }
   }

   return (
      <ThemeProvider>
         <CssVarsProvider>
            <Container>
               <Grid container>

                  {/* Left Sidebar content */}
                  <Grid xs={12} sm={4} sx={{ marginTop: '10px', marginRight: '5px', marginBottom: '20px'}}>
                     <Grid item>
                        <Box sx={{ boxShadow: 5,  backgroundColor: '#181818', borderRadius: '8px', width: '100%' }}>
                           <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              paddingY: '10px',
                              }}>
                              <Box sx={{ display: 'flex'}}>
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
                        borderRadius: '8px',
                        }}>
                        <Grid item xs={12} md={12} padding={'16px'}>
                           <Grid container>
                              <Grid item xs={12} display={'flex'} alignItems={'center'} gap={1}>
                                 {postContent}
                                 <Input disabled={buttonLoading}
                                    onChange={(e) => {
                                       setPostContent(e.target.value)
                                    }}
                                    value={postContent}
                                    type="text" 
                                    placeholder="What's in your mind?"
                                    maxRows={6}
                                    fullWidth
                                    inputProps={{
                                       sx: { borderRadius: '20px' },
                                    }}
                                 />

                                 <Box>
                                    <Button disableRipple component='span' size="md" sx={{ borderRadius: '12px', '&:hover': { backgroundColor: 'inherit', color: 'inherit' }}}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="#181818" stroke="#7e57c2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    </Button>
                                 </Box>
                              </Grid>

                           </Grid>
                        </Grid>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', paddingX: '16px' }}>
                          <Button loading={buttonLoading} onClick={createPost}color="neutral" size="sm" variant="soft" fullWidth>Post</Button>
                        </Box>
                     </Box>

                     <Box sx={{ backgroundColor: '#181818', paddingY: '3px', borderRadius: '8px' }}>

                        {
                           posts.map((postRecord) => (
                              <Posts
                                 key={postRecord.id}
                                 user_name={postRecord.user_name}
                                 body={postRecord.body}
                                 date_posted={postRecord.date_posted.toDate().toString()}
                              />
                           ))
                        }
                         
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