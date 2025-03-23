import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema for form validation
const safetyComplianceSchema = z.object({
  csaCompliance: z.boolean(),
  documentationComplete: z.boolean(),
  installerName: z.string().min(1, "Installer name is required"),
  installerLicense: z.string().min(1, "Installer license is required"),
  installationDate: z.string().min(1, "Installation date is required"),
  signOffDate: z.string().min(1, "Sign-off date is required"),
  additionalNotes: z.string().optional(),
});

// Infer the type from the schema
export type SafetyComplianceData = z.infer<typeof safetyComplianceSchema>;

interface SafetyComplianceProps {
  onSave: (data: SafetyComplianceData) => void;
  initialData?: SafetyComplianceData | null;
  onNext?: (nextSection: string) => void;
}

const SafetyCompliance: React.FC<SafetyComplianceProps> = ({
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
  } = useForm<SafetyComplianceData>({
    resolver: zodResolver(safetyComplianceSchema),
    defaultValues: {
      csaCompliance: false,
      documentationComplete: false,
      installerName: "",
      installerLicense: "",
      installationDate: "",
      signOffDate: "",
      additionalNotes: "",
    },
  });

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Form submission handler
  const onSubmit = (data: SafetyComplianceData) => {
    onSave(data);
    // Navigate to the next section if onNext is provided
    if (onNext) {
      onNext("performance");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Safety & Compliance
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="csaCompliance"
              {...register("csaCompliance")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="csaCompliance"
              className="ml-2 block text-sm text-gray-700"
            >
              Complies with CAN/CSA C273.5 standards
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="documentationComplete"
              {...register("documentationComplete")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="documentationComplete"
              className="ml-2 block text-sm text-gray-700"
            >
              All test results and system parameters documented
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Installer Name
            </label>
            <input
              type="text"
              {...register("installerName")}
              className="form-input"
            />
            {errors.installerName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.installerName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Installer License Number
            </label>
            <input
              type="text"
              {...register("installerLicense")}
              className="form-input"
            />
            {errors.installerLicense && (
              <p className="mt-1 text-sm text-red-600">
                {errors.installerLicense.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Installation Date
            </label>
            <input
              type="date"
              {...register("installationDate")}
              className="form-input"
            />
            {errors.installationDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.installationDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sign-Off Date
            </label>
            <input
              type="date"
              {...register("signOffDate")}
              className="form-input"
            />
            {errors.signOffDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.signOffDate.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              {...register("additionalNotes")}
              rows={4}
              className="form-input"
            />
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

export default SafetyCompliance;
