const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <h3>total of {totalExercises} exercises</h3>
    </>
  );
};

function Course({ courses }) {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  ));
}

export default Course;
