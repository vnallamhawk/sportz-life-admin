import {createContext, useContext, useState} from 'react'

interface StepContextTypes {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  totalSteps: number
}

const StepContext = createContext<StepContextTypes | undefined>(undefined)

export const useStepContext = () => {
  const context = useContext(StepContext)
  if (context === undefined) {
    throw new Error('useStepContext must be used within a StepProvider')
  }
  return context
}

export const StepProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const totalSteps = 3

  return (
    <StepContext.Provider value={{currentStep, setCurrentStep, totalSteps}}>
      {children}
    </StepContext.Provider>
  )
}
