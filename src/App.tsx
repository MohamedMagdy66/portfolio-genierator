import { useState } from "react";
import type { PortfolioData } from "./types";
import EditorForm from "./components/EditorForm";
import LivePreview from "./components/LivePreview";

const App = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    profile: { name: "", role: "", bio: "" },
    skills: [],
    projects: [],
  });

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-gray-200 bg-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          PortfolioGenie Editor
        </h1>
        <EditorForm data={portfolioData} updateData={setPortfolioData} />
      </div>

      <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Live Preview
        </h2>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden min-h-[80vh]">
          <LivePreview data={portfolioData} />
        </div>
      </div>
    </div>
  );
};

export default App;
