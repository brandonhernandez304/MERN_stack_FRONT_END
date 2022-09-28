import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

  const [people, setPeople] = useState(null)

  //const URL = "http://localhost:4000/people/";

  const URL = "https://mern-stack-bhern34.herokuapp.com/people/"


  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  }

  const createPeople = async (person) => {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    // update list of people
    getPeople()
  }

  //update people route
  const updatePeople = async (person, id) => {
    //make a put request to make some people
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    getPeople()
  }
  // does not need (id) since it's the only parameter
  const deletePeople = async (id) => {
    await fetch(URL + id, {
      method: "DELETE",

    })
    getPeople();
  }

  useEffect(() => { getPeople() }, []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index
            people={people}
            createPeople={createPeople}
          />
        </Route>
        <Route
          path="/people/:id"
          render={rp => (
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;