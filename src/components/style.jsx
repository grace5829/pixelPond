import { Widgets } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
  return {
    container: {
      // backgroundColor: theme.palette.secondary.light,
      backgroundColor: "#F7E2D9",
      padding: theme.spacing(8, 0, 6),
      // marginRight: theme.spacing(2)
    },
    icon: {
        marginRight:'20px',
    },
    buttons: {
        marginTop:'40px'
    },
    cardGrid:{
        padding:'10px 0'
    },
    cardImageGrid:{
        padding:'30px 0',
    },
    card:{
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    image:{
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    cardMedia:{
        paddingTop:'56.25%' //16:9 ratio
        // height:'100%'
    },
    cardImageMedia:{
        // height: "250px", 
        paddingTop: "56.25%" 
        // paddingTop:'100%', //16:9 ratio
    },
    cardContent:{
        flexGrow:'1'
    },
    footer:{
        backgroundColor:theme.palette.primary.main,
        padding:'20px 0'
    },

  };
});
export default useStyles;
