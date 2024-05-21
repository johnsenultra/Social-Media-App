import { 
   Box,
   Card,
   Typography,
   CardContent
} from "@mui/joy"

function Posts({user_name, body, date_posted}) {

   return (
      <Card sx={{margin: '10px', boxShadow: 1, border: '1px solid #000000', borderRadius: 5}}>
         <CardContent>
            <Box >
               <Typography>{user_name} <span>{date_posted}</span></Typography>
               <Typography>{body}</Typography>
            </Box>
         </CardContent>
      </Card>
   )
}

export default Posts;