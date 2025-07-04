import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./partials/Step1";
import Step2 from "./partials/Step2";
import Step3 from "./partials/Step3";
import { eventService } from "../../services";
import { sEvent2 } from "./eventStore";
import { toast } from "react-toastify";

function CreateEvent() {
  const event = sEvent2.use();
  const nav = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
  });
  const [visitedSteps, setVisitedSteps] = useState(new Set([1]));
  const createEvent = async () => {
    try {
      console.log(event);
      const result = await eventService.postEvent(event);
      nav("/");
      toast.success("Tạo sự kiện thành công!");
      console.log("Event created successfully:", result);
    } catch (error) {
      toast.error("Tạo sự kiện thất bại! Vui lòng thử lại");
      console.error("Error creating event:", error);
    }
  };
  const handlePreStep = (e) => {
    e.preventDefault();

    setVisitedSteps((prev) => new Set([...prev, currentStep - 1]));
    setCurrentStep((prevStep) => prevStep - 1);
  };
  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep === 3) {
      createEvent();
      return;
    }
    setVisitedSteps((prev) => new Set([...prev, currentStep + 1]));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleStepClick = (step) => {
    if (visitedSteps.has(step)) {
      setCurrentStep(step);
    }
  };

  const updateFormData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  return (
    <form className="flex-1 bg-black mx-auto">
      <div className="flex items-center justify-center  text-2xl lg:pl-4 h-16 bg-bg-main border-b-2 border-[#A19393] font-semibold text-white">
        Tạo sự kiện
      </div>

      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2 mb-4 border-b-2 border-[#A19393] space-x-6 bg-bg-main bg-opacity-50">
        <div className="flex items-center space-x-4">
          <Step
            label="Thông tin sự kiện"
            stepNumber={1}
            isActive={currentStep >= 1}
            onClick={() => handleStepClick(1)}
          />
          <Step
            label="Thời gian & loại vé"
            stepNumber={2}
            isActive={currentStep >= 2}
            onClick={() => handleStepClick(2)}
          />
          <Step
            label="Thông tin thanh toán"
            stepNumber={3}
            isActive={currentStep >= 3}
            onClick={() => handleStepClick(3)}
          />
        </div>
        <div className="space-x-1 lg:space-x-2">
          {currentStep !== 1 && (
            <button
              className="ml-auto w-[72px] px-3 py-2   bg-white cursor-pointer text-black font-semibold rounded"
              onClick={handlePreStep}
            >
              Trước
            </button>
          )}
          <button
            type="submit"
            onClick={handleNextStep}
            className="ml-auto w-[72px] px-3 py-2 bg-primary cursor-pointer text-white font-semibold rounded"
          >
            {currentStep === 3 ? "Tạo" : "Tiếp"}
          </button>
        </div>
      </div>

      {currentStep === 1 && (
        <Step1
          data={formData.step1}
          updateData={(data) => updateFormData("step1", data)}
        />
      )}
      {currentStep === 2 && (
        <Step2
          data={formData.step2}
          updateData={(data) => updateFormData("step2", data)}
        />
      )}
      {currentStep === 3 && (
        <Step3
          data={formData.step3}
          updateData={(data) => updateFormData("step3", data)}
        />
      )}
    </form>
  );
}

function Step({ label, stepNumber, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-2  cursor-pointer ${
        isActive ? "text-primary" : "text-gray-400"
      }`}
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center ${
          isActive ? "bg-primary" : "bg-gray-600"
        } text-white font-semibold`}
      >
        {stepNumber}
      </span>
      <span className="hidden md:flex">{label}</span>
    </div>
  );
}

export default CreateEvent;
