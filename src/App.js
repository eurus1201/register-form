import React, { useState, createContext, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Step1P from "./pages/step1";
import Step2 from "./pages/step2";
import Step3 from "./pages/step3";
import FinalStep from "./pages/step4";

export const UserContext = createContext(); // Create a UserContext

function App() {

  const [userData, setUserData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validateFinalStep(userData) {
    const errors = {};

    if (!userData.finalStepField1) {
      errors.finalStepField1 = "Field 1 is required";
    }

    if (!userData.finalStepField2) {
      errors.finalStepField2 = "Field 2 is required";
    }

    // Add more validation rules as needed

    return errors;
  }

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Check for errors in the final step
      const finalStepErrors = validateFinalStep(userData);
      if (Object.keys(finalStepErrors).length === 0) {
        // No errors, navigate to the final step
        navigate("/final-step");
      } else {
        // Set errors and stay on the final step
        setErrors(finalStepErrors);
      }
    }
  };
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route path="/" element={<Step1P goToNextStep={goToNextStep} />} />
        <Route path="/personal" element={<Step1P goToNextStep={goToNextStep} />} />
        <Route path="/legal" element={<Step1P goToNextStep={goToNextStep} />} />
        <Route path="/step2" element={<Step2 goToNextStep={goToNextStep} />} />
        <Route path="/step3" element={<Step3 goToNextStep={goToNextStep} />} />
        <Route path="/final-step" element={<FinalStep errors={errors} goToPreviousStep={goToPreviousStep} />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
