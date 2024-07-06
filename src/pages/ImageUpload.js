import "../assets/App.css";
import { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useParams } from "react-router-dom";
import { Card, CardActions, CardMedia, Grid, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import useStyles from "./style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EachImage from "./EachImage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function ImageUpload() {
  const { classes } = useStyles();
  const [uploadImages, setUploadImages] = useState(null);
  const [imageList, setImageList] = useState({});
  const [imageTriggerPopup, setImageTriggerPopup] = useState({});
  const [imageListBackup, setImageListBackup] = useState({});
  const [sortedImageList, setSortedImageList] = useState([]);
  const { userId, albumName } = useParams();
  const data = doc(db, "albums", userId, "personalAlbums", albumName);
  const aRef = useRef(null);
  let unsortedKeys = [];
  const fetchImages = async () => {
    setSortedImageList([]);
    setImageList({});
    try {
      const datas = await getDoc(data);
      Object.keys(datas.data()).map((name) => {
        setImageList((prev) => ({ ...prev, [name]: datas.data()[name] }));
        setImageListBackup((prev) => ({ ...prev, [name]: datas.data()[name] }));
        setSortedImageList((prev) => [...prev, name]);
        setImageTriggerPopup((prev) => ({ ...prev, [name]: false }));
        return datas
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  });
  useEffect(() => {
    sort();
  }, [fetchImages, sort]);

  const sort = () => {
    unsortedKeys = sortedImageList;
    unsortedKeys.sort();
    setSortedImageList(unsortedKeys);
    setImageList(unsortedKeys);
  };
  const handleUpload = (e) => {
    if (uploadImages == null) return;
    let obj = {};
    Object.values(uploadImages).forEach((image) => {
      const imageRef = ref(
        storage,
        `images/${image.name.split(".")[0] + v4()}`
      );
      let name = image.name;
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => ({ ...prev, [name.split(".")[0]]: url }));
          setImageListBackup((prev) => ({
            ...prev,
            [name.split(".")[0]]: url,
          }));
          setSortedImageList((prev) => [...prev, [name.split(".")[0]]]);
          setImageTriggerPopup((prev) => ({ ...prev, [name]: false }));

          let newName = image.name.split(".")[0];
          obj[newName] = url;
          // updateDoc allows us to override info in DB or add info without erasing previously data
          //we can use setDoc if we always want to erase all informaiton
          updateDoc(data, obj);
        });
      });
    });
    aRef.current.value = null;
    show("newPhotoArea", "newPhotoImage");
  };
  const download = async (fileName) => {
    console.log(imageListBackup[fileName]);
    fetch(imageListBackup[fileName])
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = `${fileName}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("oh no!"));

    toast.success(`${fileName} download complete`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const downloadSelected = () => {
    let checkboxes = document.querySelectorAll(".checkbox");
    let downloadThese = [];
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        downloadThese.push(checkbox.id);
      }
    }
    var zip = new JSZip();
    const remoteZips = downloadThese.map(async (image) => {
      const response = await fetch(imageListBackup[image]);
      const data = await response.blob();
      zip.file(`${image}.jpeg`, data);
      return data;
    });
    Promise.all(remoteZips)
      .then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `StoryOfMyLife.zip`);
        });
      })
      .then(
        toast.success(`Selected images downloaded`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );

    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    }
  };

  const downloadAll = async () => {
    var zip = new JSZip();

    // block.packages is an array of items from the CMS
    const remoteZips = Object.keys(imageListBackup).map(async (image) => {
      // pack.file.url is the URL for the .zip hosted on the CMS
      const response = await fetch(imageListBackup[image]);
      const data = await response.blob();

      // pack.kitName is from a loop, replace with your file name.
      zip.file(`${image}.jpeg`, data);

      return data;
    });

    Promise.all(remoteZips)
      .then(() => {
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, `StoryOfMyLife.zip`);
        });
      })
      .then(
        toast.success(`All images downloaded`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  const show = (hiddenEle, shownEle) => {
    const x = document.getElementById(`${hiddenEle}`);
    const y = document.getElementById(`${shownEle}`);
    (x.style.display === "none"
      ? (x.style.display = "block")
      : (x.style.display = "none"))(
      y.style.display === "none"
        ? (y.style.display = "block")
        : (y.style.display = "none")
    );
  };
  async function deleteImage(entry) {
    const folderRef = doc(db, "albums", userId, "personalAlbums", albumName);
    await updateDoc(folderRef, {
      [entry]: deleteField(),
    });
    let copyImageSet = imageList;
    Reflect.deleteProperty(copyImageSet, entry);
    setImageList({});
    setSortedImageList([]);
    fetchImages();
  }
  const maxImageName = (name) => {
    if (name.length < 20) {
      return name;
    }
    return name.substring(0, 20) + "...";
  };
  const triggerPopup = (name) => {
    imageTriggerPopup[name] === false
      ? setImageTriggerPopup((prev) => ({ ...prev, [name]: true }))
      : setImageTriggerPopup((prev) => ({ ...prev, [name]: false }));
  };

  const previousPopup = (name) => {
    let previous = sortedImageList[sortedImageList.indexOf(name) - 1];

    triggerPopup(name);
    if (previous) {
      triggerPopup(previous);
    } else {
      triggerPopup(sortedImageList[sortedImageList.length - 1]);
    }
  };
  const nextPopup = (name) => {
    let next = sortedImageList[sortedImageList.indexOf(name) + 1];

    triggerPopup(name);
    if (next) {
      triggerPopup(next);
    } else {
      triggerPopup(sortedImageList[0]);
    }
  };
  return (
    <>
      <div className="App">
        <AddAPhotoIcon
          fontSize="large"
          id="newPhotoImage"
          onClick={() => show("newPhotoArea", "newPhotoImage")}
        />
        <div id="newPhotoArea" style={{ display: "none" }}>
          <input
            type="file"
            multiple
            ref={aRef}
            onChange={(e) => {
              setUploadImages(e.target.files);
            }}
          />
          <button onClick={handleUpload}>Upload </button>
        </div>
        <div>
          <button onClick={downloadSelected}>Download selected </button>
          <button onClick={(e) => downloadAll(e)}>Download All </button>
        </div>
        <Container className={classes.cardImageGrid} maxWidth="md">
          <Grid container spacing={4}>
            {sortedImageList.map((name) => (
              <Grid
                item
                key={name + v4()}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className={name}
              >
                <Card className={classes.image}>
                  <input type={"checkbox"} className={"checkbox"} id={name} />
                  <CardMedia
                    className={classes.cardImageMedia}
                    image={imageListBackup[name]}
                    title="Image title"
                  />
                  <CardActions id="imageDetails">
                    <span>
                      <DownloadIcon
                        fontSize="medium"
                        id="downloadIcon"
                        onClick={(e) => download(name)}
                      ></DownloadIcon>
                    </span>
                    <p id="imageName" onClick={() => triggerPopup(name)}>
                      {maxImageName(name)}
                    </p>
                    <EachImage
                      trigger={imageTriggerPopup[name]}
                      imageName={name}
                      imageLink={imageListBackup[name]}
                      folder={albumName}
                    >
                      <div id="arrowArea">
                        <ArrowBackIosNewIcon
                          className="arrow"
                          onClick={() => previousPopup(name)}
                        />
                        <ArrowForwardIosIcon
                          className="arrow"
                          onClick={() => nextPopup(name)}
                        />
                      </div>
                      <div id="popupTop">
                        <button onClick={(e) => download(name)}>
                          Download
                        </button>
                        <h3 id="popupName">{name} </h3>
                        <button onClick={() => triggerPopup(name)}>
                          {" "}
                          close
                        </button>
                      </div>
                    </EachImage>
                    <DeleteIcon
                      onClick={() => deleteImage(name)}
                      className="deleteIcon"
                    ></DeleteIcon>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
}

export default ImageUpload;
