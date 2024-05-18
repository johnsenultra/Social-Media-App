import { 
   Box,
   Card,
   Typography,
   CardContent
} from "@mui/joy"

function Posts() {

   return (
      <Card sx={{margin: '10px', boxShadow: 1, border: '1px solid #000000', borderRadius: 5}}>
         <CardContent>
            <Box >
               <Typography>john_doe <span>time.date</span></Typography>
               <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi totam quibusdam rem labore quia inventore ipsa libero! Illum ipsa ducimus in facere! Tempora totam harum recusandae aut, natus qui illum!</Typography>
            </Box>
         </CardContent>
      </Card>
   )
}

export default Posts;