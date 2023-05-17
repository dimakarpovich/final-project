
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/SingleComicPage";
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
                        <Route component = {SingleComicPage} exact path ="/comics/:comicId"  />
                        <Route component = {Page404} path = "*"/>
                    </Switch>

                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;