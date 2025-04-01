import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import EquipmentSpecifications, {
  EquipmentData,
} from "./components/EquipmentSpecifications";
import InstallationCommissioning, {
  InstallationData,
} from "./components/InstallationCommissioning";
import ControlSystems, { ControlSystemData } from "./components/ControlSystems";
import SafetyCompliance, {
  SafetyComplianceData,
} from "./components/SafetyCompliance";
import PerformanceMetrics, {
  PerformanceData,
} from "./components/PerformanceMetrics";
import Summary from "./components/Summary";
import { FormProvider, useFormContext } from "./context/FormContext";

// Main App component that wraps everything with the FormProvider
function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

// AppContent component that uses the form context
function AppContent() {
  const [activeSection, setActiveSection] = useState("equipment");
  const [showSummary, setShowSummary] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);

  const {
    updateEquipmentData,
    updateInstallationData,
    updateControlData,
    updateSafetyData,
    updatePerformanceData,
    clearAllData,
    completedSections,
    getValues,
  } = useFormContext();

  const handleSectionChange = (section: string) => {
    // Save current form data before navigating away
    const formData = getValues();
    const currentSectionData = formData[activeSection as keyof typeof formData];

    if (currentSectionData) {
      // Call the appropriate update function based on the active section
      switch (activeSection) {
        case "equipment":
          updateEquipmentData(currentSectionData as EquipmentData);
          break;
        case "installation":
          updateInstallationData(currentSectionData as InstallationData);
          break;
        case "control":
          updateControlData(currentSectionData as ControlSystemData);
          break;
        case "safety":
          updateSafetyData(currentSectionData as SafetyComplianceData);
          break;
        case "performance":
          updatePerformanceData(currentSectionData as PerformanceData);
          break;
      }
    }

    if (section === "summary") {
      setShowSummary(true);
      setShowTestForm(false);
    } else {
      setActiveSection(section);
      setShowSummary(false);
      setShowTestForm(false);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const renderActiveSection = () => {
    // Get form data from context
    const formData = getValues();

    if (showSummary) {
      return (
        <Summary
          equipmentData={formData.equipment || null}
          installationData={formData.installation || null}
          controlData={formData.control || null}
          safetyData={formData.safety || null}
          performanceData={formData.performance || null}
          onPrint={handlePrintReport}
        />
      );
    }

    switch (activeSection) {
      case "equipment":
        return (
          <EquipmentSpecifications
            onSave={updateEquipmentData}
            initialData={formData.equipment || null}
            onNext={handleSectionChange}
          />
        );
      case "installation":
        return (
          <InstallationCommissioning
            onSave={updateInstallationData}
            initialData={formData.installation || null}
            onNext={handleSectionChange}
          />
        );
      case "control":
        return (
          <ControlSystems
            onSave={updateControlData}
            initialData={formData.control || null}
            onNext={handleSectionChange}
          />
        );
      case "safety":
        return (
          <SafetyCompliance
            onSave={updateSafetyData}
            initialData={formData.safety || null}
            onNext={handleSectionChange}
          />
        );
      case "performance":
        return (
          <PerformanceMetrics
            onSave={updatePerformanceData}
            initialData={formData.performance || null}
            onNext={handleSectionChange}
          />
        );
      default:
        return (
          <EquipmentSpecifications
            onSave={updateEquipmentData}
            initialData={formData.equipment || null}
            onNext={handleSectionChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Heat Pump Commissioning Form
          </h2>
          <div className="space-x-2">
            <button
              onClick={clearAllData}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear All Data
            </button>
            <button
              onClick={() => {
                setShowTestForm(!showTestForm);
                setShowSummary(false);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {showTestForm ? "Hide Test Form" : "Show Test Form"}
            </button>
            <button
              onClick={() => {
                // Save current form data before showing summary
                const formData = getValues();
                const currentSectionData =
                  formData[activeSection as keyof typeof formData];

                if (currentSectionData) {
                  // Call the appropriate update function based on the active section
                  switch (activeSection) {
                    case "equipment":
                      updateEquipmentData(currentSectionData as EquipmentData);
                      break;
                    case "installation":
                      updateInstallationData(
                        currentSectionData as InstallationData
                      );
                      break;
                    case "control":
                      updateControlData(
                        currentSectionData as ControlSystemData
                      );
                      break;
                    case "safety":
                      updateSafetyData(
                        currentSectionData as SafetyComplianceData
                      );
                      break;
                    case "performance":
                      updatePerformanceData(
                        currentSectionData as PerformanceData
                      );
                      break;
                  }
                }

                setShowSummary(!showSummary);
                setShowTestForm(false);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {showSummary ? "Back to Form" : "View Summary"}
            </button>
          </div>
        </div>

        {!showSummary && !showTestForm && (
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            completedSections={completedSections}
          />
        )}

        {renderActiveSection()}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            Heat Pump System Commissioning Tool - Compliant with CAN/CSA C273.5
            standards
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
