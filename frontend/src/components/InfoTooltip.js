import acceptance from "../images/acceptance.svg"
import rejection from "../images/error.svg"


function InfoTooltip({isOpen, onClose, authorizationStatus}) {
    const className = `popup popup-infoTooltip ${isOpen ? "popup_opened" : ""}`

    return (
        <div className= {className} >
        <div className="popup__body">
            <img src={authorizationStatus ? acceptance : rejection} alt="acceptance" className="popup-infoTooltip__message"/>
             <p className="popup-infoTooltip__text">{authorizationStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так, попробуйте ещё раз."}</p>
             <button className="popup__close-button" type="button" onClick={onClose} />
        </div>
    </div>
    );
  }
  
  export default InfoTooltip;
