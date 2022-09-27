import React from 'react'

const Show = (props) => {
  const id = props.match.params.id
  const people = props.people
  const person= people.find(p => p._id === id)
  return (
    <div className="person">
      <h1>{person.name}</h1>
      <h1>{person.title}</h1>
      <img src={person.image} alt={person.name} />
    </div>
  )
}

export default Show