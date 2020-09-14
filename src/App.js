import React, { useState } from 'react';
import './App.scss';
import { ProjectsProvider , SelectedProjectsProvider} from './context';
import { AuthProvider } from './context';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/layout/Header';
import Content from './components/layout/Content';

function App({darkmodeDefault = false}) {
  const [darkmode, setDarkmode] = useState(darkmodeDefault);
  
  return (
    <Switch>
    <AuthProvider>
    <SelectedProjectsProvider>
    <ProjectsProvider>
    <main data-testid="application"
      className={darkmode ? 'darkmode':undefined}>
      <Header darkmode={darkmode} setDarkmode= {setDarkmode}/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register}/>
      <Route path="/" component={Content} />    
    </main>
    </ProjectsProvider>
    </SelectedProjectsProvider>
    </AuthProvider>
    </Switch>
  );
}

export default App;
