import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema for form validation
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

// Infer the type from the schema
export type PerformanceData = z.infer<typeof performanceSchema>;

interface PerformanceMetricsProps {
  onSave: (data: PerformanceData) => void;
  initialData?: PerformanceData | null;
  onNext?: (nextSection: string) => void;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
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
  } = useForm<PerformanceData>({
    resolver: zodResolver(performanceSchema),
    defaultValues: {
      thermalBalancePoint: "",
      temperatureSplitActual: "",
      temperatureSplitExpected: "",
      ductLeakageReduction: "",
      powerDrawHeating: "",
      powerDrawCooling: "",
      notes: "",
    },
  });

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Form submission handler
  const onSubmit = (data: PerformanceData) => {
    onSave(data);
    // Navigate to the summary section if onNext is provided
    if (onNext) {
      onNext("summary");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Performance Metrics
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thermal Balance Point (°C)
            </label>
            <input
              type="text"
              {...register("thermalBalancePoint")}
              className="form-input"
            />
            {errors.thermalBalancePoint && (
              <p className="mt-1 text-sm text-red-600">
                {errors.thermalBalancePoint.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature Split - Actual (°C)
              </label>
              <input
                type="text"
                {...register("temperatureSplitActual")}
                className="form-input"
              />
              {errors.temperatureSplitActual && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.temperatureSplitActual.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature Split - Expected (°C)
              </label>
              <input
                type="text"
                {...register("temperatureSplitExpected")}
                className="form-input"
              />
              {errors.temperatureSplitExpected && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.temperatureSplitExpected.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duct Leakage Reduction (%)
            </label>
            <input
              type="text"
              {...register("ductLeakageReduction")}
              className="form-input"
            />
            {errors.ductLeakageReduction && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ductLeakageReduction.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Power Draw - Heating Mode (kW)
            </label>
            <input
              type="text"
              {...register("powerDrawHeating")}
              className="form-input"
            />
            {errors.powerDrawHeating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.powerDrawHeating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Power Draw - Cooling Mode (kW)
            </label>
            <input
              type="text"
              {...register("powerDrawCooling")}
              className="form-input"
            />
            {errors.powerDrawCooling && (
              <p className="mt-1 text-sm text-red-600">
                {errors.powerDrawCooling.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Performance Notes
            </label>
            <textarea {...register("notes")} rows={4} className="form-input" />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerformanceMetrics;
