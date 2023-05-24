
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/SingleComicPage";
import SingleCharPage from "../pages/SingleCharPage";
import Page404 from "../pages/Page404";



const App = () => {
   
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />

                <main>
                    <Switch>
                        <Route component = {MainPage} exact path="/" />
                        <Route component = {ComicsPage} exact path="/comics"  />
                        <Route component = {SingleCharPage}  path ="/characters/:charId"  />
                        <Route component = {SingleComicPage}  path ="/comics/:comicId"  />
                        <Route component = {Page404} path = "*"/>
                    </Switch>

                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;