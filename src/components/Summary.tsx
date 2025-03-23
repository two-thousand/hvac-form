import React from "react";
import { EquipmentData } from "./EquipmentSpecifications";
import { InstallationData } from "./InstallationCommissioning";
import { ControlSystemData } from "./ControlSystems";
import { SafetyComplianceData } from "./SafetyCompliance";
import { PerformanceData } from "./PerformanceMetrics";

interface SummaryProps {
  equipmentData: EquipmentData | null;
  installationData: InstallationData | null;
  controlData: ControlSystemData | null;
  safetyData: SafetyComplianceData | null;
  performanceData: PerformanceData | null;
  onPrint: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  equipmentData,
  installationData,
  controlData,
  safetyData,
  performanceData,
  onPrint,
}) => {
  const allDataComplete =
    equipmentData &&
    installationData &&
    controlData &&
    safetyData &&
    performanceData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Heat Pump System Summary
        </h2>
        <button
          onClick={onPrint}
          disabled={!allDataComplete}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            allDataComplete
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Generate Report
        </button>
      </div>

      {!allDataComplete && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please complete all sections to generate a full report.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Equipment Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Equipment Specifications
          </h3>
          {equipmentData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Model Number:</span>{" "}
                {equipmentData.modelNumber}
              </div>
              <div>
                <span className="font-medium">Serial Number:</span>{" "}
                {equipmentData.serialNumber}
              </div>
              <div>
                <span className="font-medium">Compressor Type:</span>{" "}
                {equipmentData.compressorType}
              </div>
              <div>
                <span className="font-medium">Heating Capacity:</span>{" "}
                {equipmentData.heatingCapacity} BTU/h
              </div>
              <div>
                <span className="font-medium">Cooling Capacity:</span>{" "}
                {equipmentData.coolingCapacity} BTU/h
              </div>
              <div>
                <span className="font-medium">HSPF Rating:</span>{" "}
                {equipmentData.hspfRating}
              </div>
              <div>
                <span className="font-medium">EER Rating:</span>{" "}
                {equipmentData.eerRating}
              </div>
              <div>
                <span className="font-medium">SEER Rating:</span>{" "}
                {equipmentData.seerRating}
              </div>
              <div>
                <span className="font-medium">Replacement Type:</span>{" "}
                {equipmentData.replacementType}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No equipment data provided yet.
            </p>
          )}
        </div>

        {/* Installation Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Installation & Commissioning
          </h3>
          {installationData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">External Static Pressure:</span>{" "}
                {installationData.externalStaticPressure} inches WC
              </div>
              <div>
                <span className="font-medium">Airflow Measurement:</span>{" "}
                {installationData.airflowMeasurement} CFM
              </div>
              <div>
                <span className="font-medium">Airflow Method:</span>{" "}
                {installationData.airflowMethod}
              </div>
              <div>
                <span className="font-medium">
                  Refrigerant Charge (Heating):
                </span>{" "}
                {installationData.refrigerantChargeHeating}
              </div>
              <div>
                <span className="font-medium">
                  Refrigerant Charge (Cooling):
                </span>{" "}
                {installationData.refrigerantChargeCooling}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Duct Leakage:</span>{" "}
                {installationData.ductLeakageBefore} →{" "}
                {installationData.ductLeakageAfter}{" "}
                {installationData.ductLeakageUnit}
              </div>
              {installationData.notes && (
                <div className="md:col-span-2">
                  <span className="font-medium">Notes:</span>{" "}
                  {installationData.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No installation data provided yet.
            </p>
          )}
        </div>

        {/* Control Systems Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Control Systems
          </h3>
          {controlData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Control System Type:</span>{" "}
                {controlData.controlSystemType}
              </div>
              <div>
                <span className="font-medium">Low Ambient Lockout:</span>{" "}
                {controlData.lowAmbientLockout}°C
              </div>
              <div>
                <span className="font-medium">Auxiliary Heat Lockout:</span>{" "}
                {controlData.auxiliaryHeatLockout}°C
              </div>
              <div>
                <span className="font-medium">Performance Monitoring:</span>{" "}
                {controlData.performanceMonitoring ? "Enabled" : "Disabled"}
              </div>
              {controlData.performanceMonitoring && (
                <>
                  <div>
                    <span className="font-medium">
                      Temperature Differential:
                    </span>{" "}
                    {controlData.temperatureDifferential}
                  </div>
                  <div>
                    <span className="font-medium">Pressure Readings:</span>{" "}
                    {controlData.pressureReadings}
                  </div>
                </>
              )}
              {controlData.notes && (
                <div className="md:col-span-2">
                  <span className="font-medium">Notes:</span>{" "}
                  {controlData.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No control system data provided yet.
            </p>
          )}
        </div>

        {/* Safety & Compliance Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Safety & Compliance
          </h3>
          {safetyData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">CSA Compliance:</span>{" "}
                {safetyData.csaCompliance ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Documentation Complete:</span>{" "}
                {safetyData.documentationComplete ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Installer Name:</span>{" "}
                {safetyData.installerName}
              </div>
              <div>
                <span className="font-medium">Installer License:</span>{" "}
                {safetyData.installerLicense}
              </div>
              <div>
                <span className="font-medium">Installation Date:</span>{" "}
                {safetyData.installationDate}
              </div>
              <div>
                <span className="font-medium">Sign-Off Date:</span>{" "}
                {safetyData.signOffDate}
              </div>
              {safetyData.additionalNotes && (
                <div className="md:col-span-2">
                  <span className="font-medium">Additional Notes:</span>{" "}
                  {safetyData.additionalNotes}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No safety & compliance data provided yet.
            </p>
          )}
        </div>

        {/* Performance Metrics Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Performance Metrics
          </h3>
          {performanceData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <span className="font-medium">Thermal Balance Point:</span>{" "}
                {performanceData.thermalBalancePoint}°C
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Temperature Split:</span>{" "}
                {performanceData.temperatureSplitActual}°C (Actual) vs{" "}
                {performanceData.temperatureSplitExpected}°C (Expected)
              </div>
              <div>
                <span className="font-medium">Duct Leakage Reduction:</span>{" "}
                {performanceData.ductLeakageReduction}%
              </div>
              <div>
                <span className="font-medium">Power Draw (Heating):</span>{" "}
                {performanceData.powerDrawHeating} kW
              </div>
              <div>
                <span className="font-medium">Power Draw (Cooling):</span>{" "}
                {performanceData.powerDrawCooling} kW
              </div>
              {performanceData.notes && (
                <div className="md:col-span-2">
                  <span className="font-medium">Notes:</span>{" "}
                  {performanceData.notes}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No performance metrics provided yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
