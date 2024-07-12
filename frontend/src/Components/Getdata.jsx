import { useRef, useState } from "react";
import axios from "axios";

const Getdata = () => {
  const faadhar = useRef();
  const [userData, setUserData] = useState({});
  const [isData, setIsData] = useState(false);

  const API = import.meta.env.VITE_APP_URI_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aadhar = faadhar.current.value;

    const response = await axios.post(`${API}/data/service`, {
      aadhar: aadhar,
    });

    response && setIsData(true);
    const data = response.data;

    setUserData(data);

    faadhar.current.value = "";
  };

  const { name, address, dob, phone, email, aadhar } = userData;

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="aadhar" className="label">
          Aadhar No:
        </label>
        <br />
        <input type="number" id="aadhar" className="input" ref={faadhar} />
        <button className="btn submit">Get Aadhar</button>
      </form>

      {isData && (
        <div className="card">
          <div>
            <span className="data bold aadhar">Aadhar No: </span>
            <span className="data aadhar">{aadhar}</span>
          </div>
          <br />
          <div>
            <span className="data bold">Name: </span>
            <span className="data">{name}</span>
          </div>
          <br />
          <div>
            <span className="data bold">Address: </span>
            <span className="data">{address}</span>
          </div>
          <br />
          <div>
            <span className="data bold">DOB: </span>
            <span className="data">{dob}</span>
          </div>
          <br />
          <div>
            <span className="data bold">Mobile: </span>
            <span className="data">{phone}</span>
          </div>
          <br />
          <div>
            <span className="data bold">Email: </span>
            <span className="data">{email}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Getdata;
