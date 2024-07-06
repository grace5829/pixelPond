import "../assets/App.css";

function EachImage(props) {
  const { imageLink } = props;

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="singleImageArea">
          <img src={imageLink} className={"singleImage"} alt={props.children} />
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default EachImage;
