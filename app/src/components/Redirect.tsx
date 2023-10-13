import React from "react";

const ExternalRedirect: React.FC = () => {
    React.useEffect(() => {
      window.location.href = "https://www.harkwise.com"; 
    }, []);
  
    return null;
  };

  export default ExternalRedirect
  