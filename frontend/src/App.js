import React, {useState} from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag); // toggle value 
  };
  return (
    <div className="container mt-4">
    
      <h2 className="text-center mb-4 d-flex align-items-center justify-content-center">
  <img
    src="/assets/spellbook.png"
    alt="Contact Book Logo"
    style={{ width: "40px", height: "40px", marginRight: "10px" }}
  />
  Contact Book
</h2>

      <div className="row">
        <div className="col-md-4">
          <ContactForm onContactAdded={triggerRefresh} />
        </div>
        <div className="col-md-8">
          <ContactList refresh={refreshFlag} />
        </div>
      </div>
    </div>
  );
}

export default App;
