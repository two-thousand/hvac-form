import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Heat Pump System Commissioning</h1>
        <p className="text-sm mt-1">Documentation and Verification Tool</p>
      </div>
    </header>
  );
};

export default Header;
