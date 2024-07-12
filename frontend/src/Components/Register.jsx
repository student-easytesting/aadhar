import axios from "axios";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_APP_URI_API;

const Register = () => {
  const [formData, setFormData] = useState({});
  const [phonebool, SetPhoneBool] = useState(true);
  const [emailbool, SetEmailBool] = useState(true);
  const [phoneinput, setPhoneInput] = useState(false);
  const [emailinput, setEmailInput] = useState(false);
  const [otp, setOtp] = useState();
  const fname = useRef();
  const faddress = useRef();
  const fdob = useRef();
  const fphone = useRef();
  const femail = useRef();
  const fphoneotp = useRef();
  const femailotp = useRef();
  const fphonebtn = useRef();
  const femailbtn = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = fname.current.value;
    const address = faddress.current.value;
    const dob = fdob.current.value;
    const phone = fphone.current.value;
    const email = femail.current.value;
    // const phoneotp = fphoneotp.current.value;
    // const emailotp = femailotp.current.value;
    // const phonebtn = fphonebtn.current.value;
    // const emailbtn = femailbtn.current.value;
    if (!phonebool && !emailbool) {
      const response = await axios.post(`${API}/auth/register`, {
        name: name,
        address: address,
        dob: dob,
        phone: phone,
        email: email,
      });
      console.log(response.data);
      if (response.data) {
        toast.success("Successfully Registered");
      } else {
        toast.error("Not Registered");
      }
      fname.current.value = "";
      faddress.current.value = "";
      fdob.current.value = "";
      fphone.current.value = "";
      femail.current.value = "";
      SetEmailBool(true);
      SetPhoneBool(true);
    } else {
      // console.log("Verify Email or Phone");
      toast.error("Verify Email or Phone");
    }
  };

  const handlePhoneOtp = async (e) => {
    const response = await axios.post(`${API}/auth/otp`, {
      phone: fphone.current.value,
    });
    console.log(`Your Phone OTP ${response.data.otp}`);
    setOtp(response.data.otp);
    setPhoneInput(true);
  };

  const handleEmailOtp = async (e) => {
    const response = await axios.post(`${API}/auth/otp`, {
      email: femail.current.value,
    });
    console.log(`Your Email OTP ${response.data.otp}`);
    setOtp(response.data.otp);
    setEmailInput(true);
  };

  const handleChangePhone = (e) => {
    let value = e.target.value;
    if (otp == value) {
      SetPhoneBool(false);
      setPhoneInput(false);
    }
  };
  const handleChangeEmail = (e) => {
    let value = e.target.value;
    if (otp == value) {
      SetEmailBool(false);
      setEmailInput(false);
    }
  };
  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name" className="label">
          Name:
        </label>
        <br />
        <input id="name" type="text" className="input" ref={fname} />
        <br />
        <label htmlFor="address" className="label">
          Address:
        </label>
        <br />
        <input id="address" type="text" className="input" ref={faddress} />
        <br />
        <label htmlFor="dob" className="label">
          DOB:{" "}
        </label>
        <br />
        <input id="dob" type="date" className="input" ref={fdob} />
        <br />
        <label htmlFor="phone" className="label">
          Mobile:{" "}
        </label>
        <br />
        <div>
          <input
            type="tel"
            id="phone"
            pattern="[0-9]{10}"
            className="input"
            ref={fphone}
          />
          {phonebool ? (
            <button
              className="btn"
              type="button"
              ref={fphonebtn}
              onClick={handlePhoneOtp}
            >
              OTP
            </button>
          ) : (
            <span className="icon">
              <FaCheck />
            </span>
          )}

          <br />
          {phoneinput && (
            <input
              type="number"
              id="phoneotp"
              className="input"
              ref={fphoneotp}
              onChange={(e) => handleChangePhone(e)}
            />
          )}
        </div>

        <label htmlFor="email" className="label">
          Email:
        </label>
        <br />
        <div>
          <input type="email" className="input" ref={femail} />
          {emailbool ? (
            <button
              className="btn"
              type="button"
              ref={femailbtn}
              onClick={(e) => handleEmailOtp(e)}
            >
              OTP
            </button>
          ) : (
            <span className="icon">
              <FaCheck className="facheck" />
            </span>
          )}

          <br />
          {emailinput && (
            <input
              type="number"
              id="emailotp"
              className="input"
              ref={femailotp}
              onChange={(e) => handleChangeEmail(e)}
            />
          )}
        </div>
        <br />
        <button className="btn submit">Register</button>
      </form>
    </>
  );
};

export default Register;
