import { Widgets } from "@mui/icons-material";
import { padding } from "@mui/system";
import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
  return {
    container: {
      // backgroundColor: theme.palette.secondary.light,
      backgroundColor: "#f5a3e6",
      padding: theme.spacing(4, 0, 2),
      // marginRight: theme.spacing(2)
    },
    photoAlbumName:{
        fontFamily:'papyrus',
        fontSize:'3rem',
        fontWeight:'bold',
        color:'#679df4',
    },
    folderName:{
        fontFamily:'papyrus',
        fontSize:'1.5rem',
        fontWeight:'bold',
        // color:'#e08cf5',
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
        paddingTop: "56.25%", 
        // display:'flex',
        // alignItems:'center',
        // paddingTop:'100%', //16:9 ratio
    },
    cardContent:{
        flexGrow:'1'
    },
    footer:{
        backgroundColor:theme.palette.primary.main,
        padding:'20px 0'
    },
    cardTitle:{
        // padding:'2px',
        backgroundColor:'#b8d5f6',
        display:'flex',
        justifyContent:'center',
        // alignContent:'center'
    },
  };
});
export default useStyles;
