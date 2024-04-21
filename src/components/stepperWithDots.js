import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
 
export function StepperWithDots() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
 
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
 
  return (
    <div className="w-full px-8 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step className="w-4 h-4" onClick={() => setActiveStep(0)} />
        <Step className="w-4 h-4" onClick={() => setActiveStep(1)} />
        <Step className="w-4 h-4" onClick={() => setActiveStep(2)} />
      </Stepper>
      <div className="flex justify-between mt-16">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}