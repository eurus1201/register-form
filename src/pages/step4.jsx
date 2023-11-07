import React, { useContext } from "react";
import { UserContext } from "../App";
import { Card, Form, Button, Space } from "antd";

const FinalStep = ({ errors, goToPreviousStep }) => {
    const { userData } = useContext(UserContext);

    console.log(userData)
    //   if (Object.keys(errors).length > 0) {
    //     return (
    //       <div>
    //         <h1>Final Step - Errors</h1>
    //         <ul>
    //           {Object.values(errors).map((error, index) => (
    //             <li key={index}>{error}</li>
    //           ))}
    //         </ul>
    //         <button onClick={goToPreviousStep}>Go Back to Previous Step</button>
    //       </div>
    //     );
    //   }
    const onFinish = (values) => {
    // Convert userData to a JSON string
    const userDataJSON = JSON.stringify(userData);

    fetch("https://your-api-endpoint.com/your-post-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: userDataJSON,
    })
      .then((response) => {
        if (response.ok) {
          // The POST request was successful
          return response.json();
        } else {
          // Handle errors here (e.g., network errors, server errors)
          throw new Error("Failed to post data");
        }
      })
      .then((data) => {
        // Handle the response from the server (if needed)
        console.log("Response from server:", data);
        // You can navigate to the next step or perform other actions
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        // if i find an error with an swich case i navigae to error page 
        console.error("Fetch error:", error);
      });
    };
    const customLabel = (key) => {
        // You can define custom labels for specific keys here
        switch (key) {
            case "first_name":
                return "نام";
            case "last_name":
                return "نام خانوادگی";
            case "national-code":
                return "کدملی";
            case "phone":
                return "همراه";
            case "registration_number":
                return "شماره ثبت";
            case "tel":
                return "تلفن ثابت";
            case "province":
                return " استان";
            case "city":
                return " شهر";
            case "bank_name":
                return " نام بانک";
            default:
                return key;
        }
    };
    const formDataArray = Object.entries(userData);
    return (
        <Space className="centered-form">
                <Form name="userDataForm" onFinish={onFinish}>
                    {formDataArray.map(([key, value]) => (
                        <Form.Item key={key} label={customLabel(key)}>
                            <span>{value}</span>
                        </Form.Item>
                    ))}
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            ثبت
                        </Button>
                    </Form.Item>
                </Form>
        </Space>
    );
};

export default FinalStep;
