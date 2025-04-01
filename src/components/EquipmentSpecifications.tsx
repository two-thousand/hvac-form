import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the schema for form validation
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

// Infer the type from the schema
export type EquipmentData = z.infer<typeof equipmentSchema>;

interface EquipmentSpecificationsProps {
  onSave: (data: EquipmentData) => void;
  initialData?: EquipmentData | null;
  onNext?: (nextSection: string) => void;
}

const EquipmentSpecifications: React.FC<EquipmentSpecificationsProps> = ({
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
  } = useForm<EquipmentData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      modelNumber: "",
      serialNumber: "",
      compressorType: "",
      heatingCapacity: "",
      coolingCapacity: "",
      hspfRating: "",
      eerRating: "",
      seerRating: "",
      replacementType: "",
    },
  });

  // Load initial data if provided
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // Form submission handler
  const onSubmit = (data: EquipmentData) => {
    onSave(data);
    // Navigate to the next section if onNext is provided
    if (onNext) {
      onNext("installation");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Equipment Specifications
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model Number
            </label>
            <input
              type="text"
              {...register("modelNumber")}
              className="form-input"
            />
            {errors.modelNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.modelNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number
            </label>
            <input
              type="text"
              {...register("serialNumber")}
              className="form-input"
            />
            {errors.serialNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.serialNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compressor Type
            </label>
            <select {...register("compressorType")} className="form-input">
              <option value="">Select Compressor Type</option>
              <option value="variable">Variable Speed</option>
              <option value="single">Single Speed</option>
              <option value="dual">Dual Stage</option>
            </select>
            {errors.compressorType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.compressorType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heating Capacity (BTU/h)
            </label>
            <input
              type="text"
              {...register("heatingCapacity")}
              className="form-input"
            />
            {errors.heatingCapacity && (
              <p className="mt-1 text-sm text-red-600">
                {errors.heatingCapacity.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cooling Capacity (BTU/h)
            </label>
            <input
              type="text"
              {...register("coolingCapacity")}
              className="form-input"
            />
            {errors.coolingCapacity && (
              <p className="mt-1 text-sm text-red-600">
                {errors.coolingCapacity.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HSPF Rating
            </label>
            <input
              type="text"
              {...register("hspfRating")}
              className="form-input"
            />
            {errors.hspfRating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.hspfRating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EER Rating
            </label>
            <input
              type="text"
              {...register("eerRating")}
              className="form-input"
            />
            {errors.eerRating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.eerRating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEER Rating
            </label>
            <input
              type="text"
              {...register("seerRating")}
              className="form-input"
            />
            {errors.seerRating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.seerRating.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Replacement Type
            </label>
            <select {...register("replacementType")} className="form-input">
              <option value="">Select Replacement Type</option>
              <option value="electric">Electric System</option>
              <option value="gas">Gas System</option>
              <option value="oil">Oil System</option>
              <option value="other">Other</option>
            </select>
            {errors.replacementType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.replacementType.message}
              </p>
            )}
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

export default EquipmentSpecifications;
