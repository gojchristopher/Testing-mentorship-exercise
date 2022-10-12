export type ContactUsInputProps = {
  name: string;
  email: string;
  description: string;
  category: Category;
  concernedProjects: ConcernedProjects;
};

export enum ConcernedProjects {
  ThreadSync = "ThreadySync",
  FinHQ = "FinHQ",
  UpWatch = "UpWatch",
}
export enum Category {
  Integration = "Integration",
  General = "General",
  HowTos = "How-to's",
}
