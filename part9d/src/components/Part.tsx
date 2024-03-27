import { CoursePart } from "../types";

function Part({ coursePart }: { coursePart: CoursePart }) {
  const renderPart = () => {
    switch (coursePart.kind) {
      case "basic":
        return (
          <div>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>{coursePart.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>project exercises {coursePart.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>{coursePart.description}</p>
            <a href={coursePart.backgroundMaterial}>Background material</a>
          </div>
        );
      case "special":
        return (
          <div>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>{coursePart.description}</p>
            <p>required skills: {coursePart.requirements.join(", ")}</p>
          </div>
        );
    }
  };

  return <div>{renderPart()}</div>;
}

export default Part;
