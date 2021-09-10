import React from "react";
import PropTypes from "prop-types";

const Player = ( props ) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/g-f7-SWrDdY`}
      fr
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Interview"
    />
  </div>
);
//Player.propTypes = {
//  videoId: PropTypes.string.isRequired
//};

export default Player;
