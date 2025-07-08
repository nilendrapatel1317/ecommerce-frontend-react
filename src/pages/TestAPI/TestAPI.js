import React, { useState } from "react";
import { fetchAllUserAddress, fetchSingleAddress } from "../../services/AddressService";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { testAPI } from "../../services/UserService";

const TestAPI = () => {
    const [data, setdata] = useState(null);
  const testApi = async () => {
    try {
      const res = await testAPI();
      console.log(res?.data?.data);
      setdata(res?.data?.data)
      toast.success(res?.data?.message);
    } catch (e) {
        console.log(e);
        toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={testApi}>Test API</Button>
      <br/>
      <div className="mt-4">
        {data && (
          <pre style={{ color : "black" ,padding: '1rem', borderRadius: '6px', overflowX: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default TestAPI;
