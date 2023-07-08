
function ImagePopup(props) {
    const className = `popup popup-image ${props.isOpen ? "popup_opened" : ""}`

    return (
        <div className= {className} >
        <div className="popup-image__body">
             <img src={props.card.link} className="popup-image__image" alt={props.card.name}/>
             <p className="popup-image__text">{props.card.name}</p>
             <button className="popup__close-button" type="button" onClick={props.onClose}/>
        </div>
    </div>
    );
  }
  
  export default ImagePopup;


