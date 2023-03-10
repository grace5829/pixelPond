import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserAuth } from "./AuthContext";
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
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import useStyles from "./style";
import { folder } from "jszip";
import { FolderShared } from "@mui/icons-material";
function PhotoFolders() {
  const { classes } = useStyles();
  const { userId } = useParams();
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [coverPhoto, setCoverPhoto] = useState({});
  const albums = collection(db, `albums/${userId}/personalAlbums`);
  // const album=doc(db, "albums" user.uid, "personalAlbums")
  
  let nameNewFolder = { folder: newFolder };
  useEffect(() => {
    fetchAlbums();
  }, []);

  // useEffect(() => {
  //  folders.forEach((folder)=> (fetchImages(folder)))
  // }, []);

  const fetchAlbums = async () => {
    let albumFolders = await getDocs(albums);
    console.log(albumFolders.docs[0].data())
    setFolders((prev) =>
    albumFolders.docs.map((doc) => ({ ...doc.data(), folder: doc.id }))
    );
  };
// console.log(folders)
  const fetchImages = async (albumName) => {
    // console.log(albumName)
     //   const data = doc(db, "albums", userId, "personalAlbums", albumName);
  //   const datas = await getDoc(data);

  // var keys = Object.keys(datas.data());
  // console.log(datas.data()[keys[ keys.length * Math.random() << 0]])
  // return `${datas.data()[keys[ keys.length * Math.random() << 0]]}`;
    const data = doc(db, "albums", userId, "personalAlbums", albumName);
    try {
      const datas = await getDoc(data);
      Object.keys(datas.data()).forEach((name) => {
        // setImageList((prev) => ({ ...prev, [name]: datas.data()[name] }));
        // unsortedKeys.push(name)
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewFolder = async () => {
    const newAlbum = await setDoc(
      doc(db, "albums", userId, "personalAlbums", newFolder),
      {}
    );
    setFolders((prev) => [...prev, nameNewFolder]);
    show("newFolderArea", "newFolder")
  };

  const show = (hiddenEle, shownEle) => {
    const x = document.getElementById(`${hiddenEle}`);
    const y = document.getElementById(`${shownEle}`);
    (x.style.display === "none" ?
      x.style.display = "block":
      x.style.display = "none")
    
 (y.style.display === "none" ?
      y.style.display = "block": 
      y.style.display = "none"
 )
  };

  let randomProperty =  function (albumName) {
    //     const data = doc(db, "albums", userId, "personalAlbums", albumName);
    //   const datas = await getDoc(data);
// console.log("folders!!!"+ Object.keys(folders))
    let keys = Object.keys(folders);
    // console.log("keys!!!"+ keys)
    if (keys.length<1){
      return "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
    keys.pop()
    // console.log(folders[keys[ keys.length * Math.random() << 0]])
    return `${folders[keys[ keys.length * Math.random() << 0]]}`;
    // return "https://firebasestorage.googleapis.com/v0/b/story-of-my-life-d0220.appspot.com/o/images%2F20220730_123819cc6e83ea-1928-41c2-96d7-a909a027de94?alt=media&token=bbaeda60-b934-41a9-b4f4-b2661c61df77"
};

  return (
    <div>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Photo Albums
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Your magical memories
          </Typography>
        </Container>
      </div>
      <div id="newFolderArea" style={{display:"none"}}>
        <button onClick={(evt) => handleNewFolder()}>Add folder</button>
        <input
          value={newFolder}
          onChange={(e) => setNewFolder(`${e.target.value}`)}
        />
      </div>
      <CreateNewFolderOutlinedIcon
        fontSize="large"
        id="newFolder"
        onClick={() => show("newFolderArea", "newFolder")}
      />
      <div className="folderArea">
        {/* {folders ? 
        folders.map((folder) => (
          <div className={`eachFolder`} key={v4()}>
            <Link key={folder.folder} to={`/${userId}/albums/${folder.folder}`}>
            <div className="folderName">  
                {folder.folder} 
              </div>
              </Link>
            </div>
          ))
          : null} */}
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {folders.map((card) => (
            <Grid item key={card + v4()} xs={4} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image= {Object.keys(card).length>1? card[Object.keys(card)[ Object.keys(card).length * Math.random() << 0]] :"https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg"}
                  title="Image title"
                />
                <CardContent className={classes.CardContent}>
                  <Link
                    key={card.folder}
                    to={`/${userId}/albums/${card.folder}`}
                  >
                    <Typography gutterBottom variant="h5">
                      {card.folder}
                    </Typography>
                  </Link>
                  <Typography>
                    {" "}
                    This is a media card. You can use to describe content
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default PhotoFolders;
