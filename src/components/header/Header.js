import { Fragment } from "react";
import InfoIcon from "../../components/infoIcon/InfoIcon";

const Header = () => {    
  // Returning header with logo, title and info icon
  return (
    <Fragment>
      <header className="header">
        
        <div className="header-content">
            <img
              id="header-logo"
              src={process.env.PUBLIC_URL + "/images/eyenew.png"}
              alt="eye scanner logo"
            />
          <h1 className="header-title">Eye Gaze System</h1>
          <InfoIcon id="show-info-btn-2"  />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
