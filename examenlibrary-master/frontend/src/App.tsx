import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.tsx';
import Create from './components/Create.tsx';
import Read from './components/Read.tsx';
import Update from './components/Update.tsx';
import Delete from './components/Delete.tsx';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
		<BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
		<Route path='/create' element={<Create/>}/>
		<Route path='/read/:id' element={<Read/>}/>
		<Route path='/update/:id' element={<Update/>}/>
		<Route path='/delete/:id' element={<Delete/>}/>
            </Routes>
		</BrowserRouter>
	);

}

export default App
