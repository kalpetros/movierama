import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export const TrailerModal = (props) => {
  const [visible, setVisible] = useState(false);
  const { id: id } = props;

  const handleClick = () => {
    setVisible((v) => (v ? false : true));
  };

  let portal = null;

  if (visible) {
    portal = createPortal(
      <div className="modal-wrapper" onClick={handleClick}>
        <div className="modal">
          <iframe
            width="1280"
            height="720"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>,
      document.getElementById('modal')
    );
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={faYoutube}
        size="2x"
        className="button-icon"
        onClick={handleClick}
      />
      {portal}
    </div>
  );
};

TrailerModal.defaultProps = {
  id: '1',
};

TrailerModal.propTypes = {
  id: PropTypes.string.isRequired,
};
