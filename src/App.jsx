import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Todo from "./Todo"





function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'element={<Todo/>}></Route>
          <Route path='/todo/:id'element={<Todo/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;