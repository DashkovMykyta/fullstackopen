import { CoursePart } from "../types";
import Part from "./Part";

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part key={i} coursePart={part} />
      ))}
    </>
  );
}

export default Content;
