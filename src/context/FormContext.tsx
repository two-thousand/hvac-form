import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EquipmentData } from "../components/EquipmentSpecifications";
import { InstallationData } from "../components/InstallationCommissioning";
import { ControlSystemData } from "../components/ControlSystems";
import { SafetyComplianceData } from "../components/SafetyCompliance";
import { PerformanceData } from "../components/PerformanceMetrics";

// Define the equipment schema
const equipmentSchema = z.object({
  modelNumber: z.string().min(1, "Model number is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  compressorType: z.string().min(1, "Compressor type is required"),
  heatingCapacity: z.string().min(1, "Heating capacity is required"),
  coolingCapacity: z.string().min(1, "Cooling capacity is required"),
  hspfRating: z.string().min(1, "HSPF rating is required"),
  eerRating: z.string().min(1, "EER rating is required"),
  seerRating: z.string().min(1, "SEER rating is required"),
  replacementType: z.string().min(1, "Replacement type is required"),
});

// Define the installation schema
const installationSchema = z.object({
  externalStaticPressure: z
    .string()
    .min(1, "External static pressure is required"),
  airflowMeasurement: z.string().min(1, "Airflow measurement is required"),
  airflowMethod: z.string().min(1, "Airflow method is required"),
  refrigerantChargeHeating: z
    .string()
    .min(1, "Refrigerant charge for heating is required"),
  refrigerantChargeCooling: z
    .string()
    .min(1, "Refrigerant charge for cooling is required"),
  ductLeakageBefore: z.string().min(1, "Duct leakage before is required"),
  ductLeakageAfter: z.string().min(1, "Duct leakage after is required"),
  ductLeakageUnit: z.string().min(1, "Duct leakage unit is required"),
  notes: z.string().optional(),
});

// Define the control system schema
const controlSystemSchema = z.object({
  controlSystemType: z.string().min(1, "Control system type is required"),
  lowAmbientLockout: z.string().min(1, "Low ambient lockout is required"),
  auxiliaryHeatLockout: z.string().min(1, "Auxiliary heat lockout is required"),
  performanceMonitoring: z.boolean(),
  temperatureDifferential: z.string().optional(),
  pressureReadings: z.string().optional(),
  notes: z.string().optional(),
});

// Define the safety compliance schema
const safetyComplianceSchema = z.object({
  csaCompliance: z.boolean(),
  documentationComplete: z.boolean(),
  installerName: z.string().min(1, "Installer name is required"),
  installerLicense: z.string().min(1, "Installer license is required"),
  installationDate: z.string().min(1, "Installation date is required"),
  signOffDate: z.string().min(1, "Sign-off date is required"),
  additionalNotes: z.string().optional(),
});

// Define the performance metrics schema
const performanceSchema = z.object({
  thermalBalancePoint: z.string().min(1, "Thermal balance point is required"),
  temperatureSplitActual: z
    .string()
    .min(1, "Actual temperature split is required"),
  temperatureSplitExpected: z
    .string()
    .min(1, "Expected temperature split is required"),
  ductLeakageReduction: z.string().min(1, "Duct leakage reduction is required"),
  powerDrawHeating: z.string().min(1, "Power draw for heating is required"),
  powerDrawCooling: z.string().min(1, "Power draw for cooling is required"),
  notes: z.string().optional(),
});

// Define the global form schema
const formSchema = z.object({
  equipment: equipmentSchema.optional().nullable(),
  installation: installationSchema.optional().nullable(),
  control: controlSystemSchema.optional().nullable(),
  safety: safetyComplianceSchema.optional().nullable(),
  performance: performanceSchema.optional().nullable(),
  completedSections: z.array(z.string()).default([]),
});

// Define the form data type
export type FormData = z.infer<typeof formSchema>;

// Define the context interface
interface FormContextType {
  getValues: () => FormData;
  setValue: <T extends keyof FormData>(name: T, value: FormData[T]) => void;
  updateEquipmentData: (data: EquipmentData) => void;
  updateInstallationData: (data: InstallationData) => void;
  updateControlData: (data: ControlSystemData) => void;
  updateSafetyData: (data: SafetyComplianceData) => void;
  updatePerformanceData: (data: PerformanceData) => void;
  clearAllData: () => void;
  completedSections: string[];
  formState: {
    errors: any;
    isDirty: boolean;
    isSubmitting: boolean;
    isValid: boolean;
  };
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize React Hook Form with the global schema
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipment: null,
      installation: null,
      control: null,
      safety: null,
      performance: null,
      completedSections: [],
    },
  });

  const { setValue, getValues, formState } = methods;

  // Get completed sections from form state
  const completedSections = getValues("completedSections") || [];

  // Update functions for each form section
  const updateEquipmentData = (data: EquipmentData) => {
    setValue("equipment", data);

    // Add to completed sections if not already there
    if (!completedSections.includes("equipment")) {
      const newCompletedSections = [...completedSections, "equipment"];
      setValue("completedSections", newCompletedSections);
    }
  };

  const updateInstallationData = (data: InstallationData) => {
    setValue("installation", data);

    if (!completedSections.includes("installation")) {
      const newCompletedSections = [...completedSections, "installation"];
      setValue("completedSections", newCompletedSections);
    }
  };

  const updateControlData = (data: ControlSystemData) => {
    setValue("control", data);

    if (!completedSections.includes("control")) {
      const newCompletedSections = [...completedSections, "control"];
      setValue("completedSections", newCompletedSections);
    }
  };

  const updateSafetyData = (data: SafetyComplianceData) => {
    setValue("safety", data);

    if (!completedSections.includes("safety")) {
      const newCompletedSections = [...completedSections, "safety"];
      setValue("completedSections", newCompletedSections);
    }
  };

  const updatePerformanceData = (data: PerformanceData) => {
    setValue("performance", data);

    if (!completedSections.includes("performance")) {
      const newCompletedSections = [...completedSections, "performance"];
      setValue("completedSections", newCompletedSections);
    }
  };

  const clearAllData = () => {
    // Reset form to default values
    methods.reset({
      equipment: null,
      installation: null,
      control: null,
      safety: null,
      performance: null,
      completedSections: [],
    });
  };

  return (
    <FormContext.Provider
      value={{
        getValues,
        setValue,
        updateEquipmentData,
        updateInstallationData,
        updateControlData,
        updateSafetyData,
        updatePerformanceData,
        clearAllData,
        completedSections,
        formState,
      }}
    >
      <RHFProvider {...methods}>{children}</RHFProvider>
    </FormContext.Provider>
  );
};

// Create a custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
