export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
  };
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    techStack: string[];
  }>;
}
