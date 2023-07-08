import {useContext } from 'react';
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import { CardContext } from '../contexts/CardContext.js';

function Main(props){
const currentUser = useContext(CurrentUserContext);
const cards = useContext(CardContext);

    return (  <main className="main">
    <section className="profile">
        <div className="profile__avatar-wrap">
            <img src={currentUser.avatar} alt="Профильная фотография" className="profile__avatar"/>
            <div className="profile__avatar-edit-wrap">
                <button className="profile__avatar-edit-button" onClick={props.onEditAvatar}></button>
            </div>
        </div>
        <div className="profile__info">
            <div className="profile__info-wrapper">
                <h1 className="profile__user-name">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                </button>
            </div>
            <p className="profile__user-profession">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>

    </section>
    <section className="elements">
        <ul className="elements__list">
            {cards.map((data, i) => {

return    <Card card={data} key={data._id} onCardClick = {props.onCardClick} onCardLike={props.onCardLike} onDeleteClick={props.onDeleteClick} />
            })}        
        </ul>
    </section>
</main>)
}

  
export default Main;