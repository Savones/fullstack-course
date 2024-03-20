const Header = (props) => {
    return (
        <h2>{props.name}</h2>
    )
}

const Content = (props) => {
    return (
        <>
            <Part name={props.name} exercises={props.exercises} />
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            {course.parts.map(part =>
                <Content key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <Total parts={course.parts} />
        </>
    )
}

const Total = ({ parts }) => {
    const i = 0
    const total =
        parts.reduce((s, p) => s + p.exercises, i)
    return (
        <>
            Total of {total} exercises.
        </>
    )
}

export default Course