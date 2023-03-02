import React, { useEffect } from "react";
import "./MovieModel.css";

const MovieModel = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            X
          </span>

          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal_poster-img"
            className="modal_poster-img"
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="overview">평점: {vote_average}</p>
            <p className="overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModel;
