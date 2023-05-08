import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      backgroundColor: "#f5a3e6",
      padding: theme.spacing(4, 0, 2),
    },
    photoAlbumName: {
      fontFamily: "papyrus",
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#679df4",
    },
    foldersQuote: {
      fontFamily: "papyrus",
      fontSize: "2rem",
      fontWeight: "light",
      color: "#9042f5",
    },
    folderName: {
      fontFamily: "papyrus",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    icon: {
      marginRight: "20px",
    },
    buttons: {
      marginTop: "40px",
    },
    cardGrid: {
      padding: "10px 0",
    },
    cardImageGrid: {
      padding: "30px 0",
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    image: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", //16:9 ratio
    },
    cardImageMedia: {
      paddingTop: "56.25%",
    },
    cardContent: {
      flexGrow: "1",
    },
    footer: {
      backgroundColor: theme.palette.primary.main,
      padding: "20px 0",
    },
    cardTitle: {
      backgroundColor: "#b8d5f6",
      display: "flex",
      justifyContent: "center",
    },
  };
});
export default useStyles;
