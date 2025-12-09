import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

const Home = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(null); // null = checking, true/false = result

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setValidated(false);
        navigate("/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await res.json();
        if (res.status === 200 && data.success) {
          setValidated(true);
        } else {
          // token invalid or expired
          localStorage.removeItem("token");
          setValidated(false);
          navigate("/login");
        }
      } catch (err) {
        localStorage.removeItem("token");
        setValidated(false);
        navigate("/login");
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (validated === null) return <div>Loading...</div>;

  return (
    <div className="">
      <Notes />
    </div>
  );
};

export default Home;
