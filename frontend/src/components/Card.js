import React from "react";
import {useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => {return i === currentUser._id} );
    const cardLikeButtonClassName = ( 
      `elements__like ${isLiked && 'elements__like_active'}` 
    ); 

    function handleClick() {
        props.onCardClick(props.card);
      }
    function handleLikeClick(){
        props.onCardLike(props.card)
      }
    function handleDeleteClick(){
        props.onDeleteClick(props.card)
      }

    return (
  
(<li className="elements__list-item" key={props.card._id} >
            <img src={props.card.link} className="elements__image" alt={props.card.name} onClick={handleClick} />
            {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
            <div className="elements__content">
                <h2 className="elements__text">{props.card.name}</h2>
                <div className="elements__wrapper">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="elements__like-number">{props.card.likes.length}</span>
                </div>
            </div>
        </li>)

    );
  }
  
  export default Card;