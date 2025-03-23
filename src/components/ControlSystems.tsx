import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema for form validation
const controlSystemSchema = z.object({
  controlSystemType: z.string().min(1, "Control system type is required"),
  lowAmbientLockout: z.string().min(1, "Low ambient lockout is required"),
  auxiliaryHeatLockout: z.string().min(1, "Auxiliary heat lockout is required"),
  performanceMonitoring: z.boolean(),
  temperatureDifferential: z.string().optional(),
  pressureReadings: z.string().optional(),
  notes: z.string().optional(),
});

// Infer the type from the schema
export type ControlSystemData = z.infer<typeof controlSystemSchema>;

interface ControlSystemsProps {
  onSave: (data: ControlSystemData) => void;
  initialData?: ControlSystemData | null;
  onNext?: (nextSection: string) => void;
}

const ControlSystems: React.FC<ControlSystemsProps> = ({
  onSave,
  initialData,
  onNext,
}) => {
  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ControlSystemData>({
    resolver: zodResolver(controlSystemSchema),
    defaultValues: {
      controlSystemType: "",
      lowAmbientLockout: "",
      auxiliaryHeatLockout: "",
      performanceMonitoring: false,
      temperatureDifferential: "",
      pressureReadings: "",
      notes: "",
    },
  });

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Watch the performanceMonitoring field to conditionally render fields
  const performanceMonitoring = watch("performanceMonitoring");

  // Form submission handler
  const onSubmit = (data: ControlSystemData) => {
    onSave(data);
    // Navigate to the next section if onNext is provided
    if (onNext) {
      onNext("safety");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Control Systems
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Control System Type
            </label>
            <select {...register("controlSystemType")} className="form-input">
              <option value="">Select Control System Type</option>
              <option value="integrated">Integrated Control System</option>
              <option value="standalone">Standalone Control System</option>
              <option value="smart">Smart Thermostat</option>
              <option value="other">Other</option>
            </select>
            {errors.controlSystemType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.controlSystemType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Low Ambient Lockout (°C)
            </label>
            <input
              type="number"
              {...register("lowAmbientLockout")}
              max="3"
              step="0.1"
              placeholder="≤ 3°C"
              className="form-input"
            />
            <p className="text-xs text-gray-500 mt-1">Must be ≤ 3°C</p>
            {errors.lowAmbientLockout && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lowAmbientLockout.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Auxiliary Heat Lockout (°C)
            </label>
            <input
              type="number"
              {...register("auxiliaryHeatLockout")}
              max="2"
              step="0.1"
              placeholder="≤ 2°C"
              className="form-input"
            />
            <p className="text-xs text-gray-500 mt-1">Must be ≤ 2°C</p>
            {errors.auxiliaryHeatLockout && (
              <p className="mt-1 text-sm text-red-600">
                {errors.auxiliaryHeatLockout.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="performanceMonitoring"
              {...register("performanceMonitoring")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="performanceMonitoring"
              className="ml-2 block text-sm text-gray-700"
            >
              Performance Monitoring Enabled
            </label>
          </div>

          <div
            className={
              performanceMonitoring ? "" : "opacity-50 pointer-events-none"
            }
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature Differential
            </label>
            <input
              type="text"
              {...register("temperatureDifferential")}
              className="form-input"
              disabled={!performanceMonitoring}
            />
          </div>

          <div
            className={
              performanceMonitoring ? "" : "opacity-50 pointer-events-none"
            }
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pressure Readings
            </label>
            <input
              type="text"
              {...register("pressureReadings")}
              className="form-input"
              disabled={!performanceMonitoring}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Control System Notes
            </label>
            <textarea {...register("notes")} rows={4} className="form-input" />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ControlSystems;
