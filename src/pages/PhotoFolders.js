import { Link, useParams } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import useStyles from "./style";

function PhotoFolders() {
  const { classes } = useStyles();
  const { userId } = useParams();
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const albums = collection(db, `albums/${userId}/personalAlbums`);
  let nameNewFolder = { folder: newFolder };

  const fetchAlbums = async () => {
    let albumFolders = await getDocs(albums);
    setFolders(albumFolders.docs.map((doc) => ({ ...doc.data(), folder: doc.id })));
  };

/* eslint-disable */
useEffect(() => {
    fetchAlbums();
  }, []);
/* eslint-enable */


  const handleNewFolder = async () => {
   try {
      await setDoc(doc(db, "albums", userId, "personalAlbums", newFolder), nameNewFolder);
      setFolders((prev) => [...prev, nameNewFolder]);
      setNewFolder("");
      show("newFolderArea", "newFolder");
    } catch (error) {
      console.error("Error creating new folder:", error);
    }
  };

  const show = (hiddenEle, shownEle) => {
    const x = document.getElementById(`${hiddenEle}`);
    const y = document.getElementById(`${shownEle}`);

    if (x.classList.contains("hidden")) {
      x.classList.remove("hidden");
      x.classList.add("visible");
    } else {
      x.classList.remove("visible");
      x.classList.add("hidden");
    }

    if (y.classList.contains("hidden")) {
      y.classList.remove("hidden");
      y.classList.add("visible");
    } else {
      y.classList.remove("visible");
      y.classList.add("hidden");
    }
  };

  async function deleteFolder(albumName) {
    const data = doc(db, "albums", userId, "personalAlbums", albumName);
    await deleteDoc(data);
    fetchAlbums();
  }
  return (
    <div>
      <div className={classes.container}>
        <Container maxWidth="sm" className={classes.photoAlbumName}>
          Photo Albums
        </Container>
        <Typography variant="h6" gutterBottom className={classes.foldersQuote}>
          Collect memories -Not things
        </Typography>
      </div>
      <CreateNewFolderOutlinedIcon
        fontSize="large"
        id="newFolder"
        onClick={() => show("newFolderArea", "newFolder")}
        className="visible"
      />
      <div id="newFolderArea"  className="hidden">
        <button onClick={(evt) => handleNewFolder()} id="addFolderButton">Add folder</button>
        <input
          value={newFolder}
          onChange={(e) => setNewFolder(`${e.target.value}`)}
        />
      </div>
     
      <div className="folderArea"></div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {folders.map((card) => (
            <Grid item key={card + v4()} xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <DeleteIcon
                  onClick={() => deleteFolder(card.folder)}
                  className="deleteIconFolders"
                ></DeleteIcon>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    Object.keys(card).length > 1
                      ? card[Object.keys(card)[0]]
                      : "https://t3.ftcdn.net/jpg/04/84/88/76/360_F_484887682_Mx57wpHG4lKrPAG0y7Q8Q7bJ952J3TTO.jpg"
                  }
                  title="Image title"
                />
                <CardContent className={classes.cardTitle} id='folderName'>
                  <Link
                  className={classes.folderNameArea}
                    key={card.folder}
                    to={`/${userId}/albums/${card.folder}`}
                  >
                    <Typography variant="h5" className={classes.folderName}>
                      {card.folder} 
                    </Typography>
                  </Link>
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
