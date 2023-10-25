import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import './index.css'

const CollapsibleSection = ({ name, label, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="section">
      <div className={`section__header${isCollapsed ? '' : ' active'}`} onClick={toggleSection}>
        <Icon name="dropdown" className={`section__icon${isCollapsed ? '' : ' active-icon'}`} />
        <h3>{label}</h3>
      </div>
      {!isCollapsed && <div className="section__body">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
