const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

function Course({ course }) {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  );
}

export default Course;
