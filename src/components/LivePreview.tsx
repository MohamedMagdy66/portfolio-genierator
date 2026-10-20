import type { PortfolioData } from "../types";

interface Props {
  data: PortfolioData;
}

const LivePreview: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-10">
      {/* Profile */}
      <header className="mb-10 text-center border-b border-gray-200 pb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          {data.profile.name || "Your Name"}
        </h1>
        <p className="text-xl text-blue-600 font-semibold mb-6">
          {data.profile.role || "Professional Title"}
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
          {data.profile.bio ||
            "Your professional biography will appear here. Write something that makes you stand out!"}
        </p>
      </header>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg text-sm border border-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
            Projects
          </h2>
          <div className="grid gap-6">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default LivePreview;
