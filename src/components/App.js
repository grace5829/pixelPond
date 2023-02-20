import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { AppRoutes, Navbar, PhotoFolders } from "./index";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  ButtonGroup,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import useStyles from "./style";
const cards=[1,2,3,4,5,6,7,8,9]
function App() {
  
  const {classes}=useStyles()
  return (
    <div className="App">
       {/* <CssBaseline>
        <AppBar position="relative">
          <Toolbar>
            <PhotoCamera className={classes.icon}/>
            <Typography variant="h6">Photo Album</Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.container}>
            <Container maxWidth="sm">
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Photo Album
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Hello, this is a photo album and I'm trrying to make this as
                long as possible so we can see how it looks like on the screen
              </Typography>
              <div className={classes.buttons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      See my photos
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary Action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
            {cards.map((card)=> (
              <Grid item key={card} xs={4} md={4}>
                <Card className={classes.card}>
                  <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image title"/>
                  <CardContent className={classes.CardContent}>
                    <Typography gutterBottom variant="h5">Heading</Typography>
                    <Typography> This is a media card. You can use to describe content</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">View</Button>
                    <Button size="small" color="primary">Edit</Button>
                  </CardActions>
                  </Card>
              </Grid>
            ))}
            </Grid>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>footer</Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">Something to give footer a purpose</Typography>
        </footer>
      </CssBaseline>  */}
      <AppRoutes />
    </div>
  );
}

export default App;
