import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema for form validation
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

// Infer the type from the schema
export type InstallationData = z.infer<typeof installationSchema>;

interface InstallationCommissioningProps {
  onSave: (data: InstallationData) => void;
  initialData?: InstallationData | null;
  onNext?: (nextSection: string) => void;
}

const InstallationCommissioning: React.FC<InstallationCommissioningProps> = ({
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
  } = useForm<InstallationData>({
    resolver: zodResolver(installationSchema),
    defaultValues: {
      externalStaticPressure: "",
      airflowMeasurement: "",
      airflowMethod: "",
      refrigerantChargeHeating: "",
      refrigerantChargeCooling: "",
      ductLeakageBefore: "",
      ductLeakageAfter: "",
      ductLeakageUnit: "cfm",
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
  const onSubmit = (data: InstallationData) => {
    onSave(data);
    // Navigate to the next section if onNext is provided
    if (onNext) {
      onNext("control");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Installation & Commissioning
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              External Static Pressure (inches WC)
            </label>
            <input
              type="text"
              {...register("externalStaticPressure")}
              className="form-input"
            />
            {errors.externalStaticPressure && (
              <p className="mt-1 text-sm text-red-600">
                {errors.externalStaticPressure.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Airflow Measurement (CFM)
            </label>
            <input
              type="text"
              {...register("airflowMeasurement")}
              className="form-input"
            />
            {errors.airflowMeasurement && (
              <p className="mt-1 text-sm text-red-600">
                {errors.airflowMeasurement.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Airflow Measurement Method
            </label>
            <select {...register("airflowMethod")} className="form-input">
              <option value="">Select Method</option>
              <option value="trueflow">TrueFlow</option>
              <option value="fanCurve">Fan Curve</option>
              <option value="tempSplit">Temperature Split</option>
              <option value="other">Other</option>
            </select>
            {errors.airflowMethod && (
              <p className="mt-1 text-sm text-red-600">
                {errors.airflowMethod.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Refrigerant Charge - Heating Mode
            </label>
            <input
              type="text"
              {...register("refrigerantChargeHeating")}
              className="form-input"
            />
            {errors.refrigerantChargeHeating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.refrigerantChargeHeating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Refrigerant Charge - Cooling Mode
            </label>
            <input
              type="text"
              {...register("refrigerantChargeCooling")}
              className="form-input"
            />
            {errors.refrigerantChargeCooling && (
              <p className="mt-1 text-sm text-red-600">
                {errors.refrigerantChargeCooling.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duct Leakage Before
              </label>
              <input
                type="text"
                {...register("ductLeakageBefore")}
                className="form-input"
              />
              {errors.ductLeakageBefore && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ductLeakageBefore.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duct Leakage After
              </label>
              <input
                type="text"
                {...register("ductLeakageAfter")}
                className="form-input"
              />
              {errors.ductLeakageAfter && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ductLeakageAfter.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duct Leakage Unit
              </label>
              <select {...register("ductLeakageUnit")} className="form-input">
                <option value="cfm">CFM</option>
                <option value="percentage">Percentage</option>
              </select>
              {errors.ductLeakageUnit && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ductLeakageUnit.message}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Installation Notes
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

export default InstallationCommissioning;
