import { useState } from "react";
import type { PortfolioData } from "../types";

interface Props {
  data: PortfolioData;
  updateData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const EditorForm: React.FC<Props> = ({ data, updateData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      updateData({ ...data, skills: [...data.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    updateData({
      ...data,
      skills: data.skills.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleAddProject = () => {
    if (newProject.title.trim() !== "") {
      const projectEntry = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        techStack: newProject.techStack
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };
      updateData({ ...data, projects: [...data.projects, projectEntry] });
      setNewProject({ title: "", description: "", techStack: "" });
    }
  };

  const handleRemoveProject = (idToRemove: string) => {
    updateData({
      ...data,
      projects: data.projects.filter((p) => p.id !== idToRemove),
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-8 text-sm font-medium text-gray-400">
        <span className={currentStep === 1 ? "text-blue-600 font-bold" : ""}>
          1. Profile
        </span>
        <span className={currentStep === 2 ? "text-blue-600 font-bold" : ""}>
          2. Skills
        </span>
        <span className={currentStep === 3 ? "text-blue-600 font-bold" : ""}>
          3. Projects
        </span>
      </div>

      <div className="flex-grow">
        {/* Profile */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.profile.name}
                onChange={(e) =>
                  updateData({
                    ...data,
                    profile: { ...data.profile, name: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.profile.role}
                onChange={(e) =>
                  updateData({
                    ...data,
                    profile: { ...data.profile, role: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Biography
              </label>
              <textarea
                rows={4}
                placeholder="Tell us a little about yourself..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={data.profile.bio}
                onChange={(e) =>
                  updateData({
                    ...data,
                    profile: { ...data.profile, bio: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}

        {/* Skills */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Add a Skill
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. React.js"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="text-blue-500 hover:text-red-500 font-bold"
                  >
                    &times;
                  </button>
                </span>
              ))}
              {data.skills.length === 0 && (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
              <h3 className="font-semibold text-gray-700 text-sm">
                Add New Project
              </h3>
              <input
                type="text"
                placeholder="Project Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
              <textarea
                placeholder="Project Description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tech Stack (comma separated, e.g. React, Tailwind)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                value={newProject.techStack}
                onChange={(e) =>
                  setNewProject({ ...newProject, techStack: e.target.value })
                }
              />
              <button
                onClick={handleAddProject}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Save Project
              </button>
            </div>

            <div className="space-y-3 mt-6">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-gray-200 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-bold text-gray-800">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveProject(project.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === 3}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EditorForm;
