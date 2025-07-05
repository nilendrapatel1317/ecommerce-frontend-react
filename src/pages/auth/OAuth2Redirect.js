import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUserProfile } from "../../services/UserService";

export default function OAuth2RedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(true);

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    
    if (token) {
      localStorage.setItem("token", token);
      
      // Fetch and store user profile
      const fetchProfile = async () => {
        try {
          const profile = await fetchUserProfile();
          localStorage.setItem("user", JSON.stringify(profile.data));
          console.log("User profile saved:", profile.data);
        } catch (profileError) {
          console.error("Failed to fetch user profile:", profileError);
          // Still proceed with login even if profile fetch fails
        }
      };
      
      // Fetch profile immediately after storing token
      fetchProfile();
      
      setTimeout(() => {
        setCount(false);
      }, 1500);
      setTimeout(() => {
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate("/", { replace: true });
      }, 3000);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {count ? (
        <div className="text-lg text-orange-500">
          Logging you in with Google...
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-lg text-green-500">
            Login Successful with Google
          </h1>
          <h1 className="text-base text-blue-500">
            Redirecting to homepage ...
          </h1>
        </div>
      )}
    </div>
  );
} 