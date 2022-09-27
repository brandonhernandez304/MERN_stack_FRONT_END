import {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [people, setPeople] = useState(null)

    //const URL = "http://localhost:4000/people";

    const URL = "https://mern-stack-bhern34.herokuapp.com/people/"


    const getPeople = async () => {
        const response = await fetch(URL)
        const data = await response.json();
        setPeople(data)
    }

    const createPeople = async (person) => {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(person)
        })
        // updateList of people
        getPeople()
    }

    useEffect(()=> {
        getPeople()
    }, [])

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
          render={(rp) => (
            <Show
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;