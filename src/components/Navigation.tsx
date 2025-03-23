import React from "react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  completedSections: string[];
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSectionChange,
  completedSections,
}) => {
  const sections = [
    { id: "equipment", label: "Equipment Specifications" },
    { id: "installation", label: "Installation & Commissioning" },
    { id: "control", label: "Control Systems" },
    { id: "safety", label: "Safety & Compliance" },
    { id: "performance", label: "Performance Metrics" },
  ];

  return (
    <nav className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
      <ul className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <li key={section.id} className="relative">
            <button
              onClick={() => onSectionChange(section.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {section.label}
              {completedSections.includes(section.id) && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-white"></span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
