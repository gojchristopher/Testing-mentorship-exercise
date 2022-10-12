import { ConcernedProjects, Category } from "src/types/contact-types";

const CONCERNED_PROJECTS = Object.entries(ConcernedProjects).map(
  ([label, value]) => ({
    label,
    value,
  })
);

const CATEGORIES = Object.entries(Category).map(([label, value]) => ({
  label,
  value,
}));

const constants = {
  CONCERNED_PROJECTS,
  CATEGORIES,
};

export default constants;
