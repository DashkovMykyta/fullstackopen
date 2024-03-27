export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

export interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBase {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
