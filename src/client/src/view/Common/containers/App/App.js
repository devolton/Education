import {BrowserRouter, Routes, Route} from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import Footer from "../Footer/Footer";
import GalleryPage from "../../../Gallery/page/GalleryPage/GalleryPage";
import AboutPage from "../../../About/page/AboutPage/AboutPage";
import EventsPage from "../../../Events/page/EventsPage/EventsPage";
import ContactPage from "../../../Contact/page/ContactPage/ContactPage";
import BlogPage from "../../../Blog/page/BlogPage/BlogPage";
import CoursesPage from "../../../Courses/page/CoursesPage/CoursesPage";
import SingleBlogPage from "../../../SingleBlog/page/SingleBlogPage/SingleBlogPage";
import SingleEventPage from "../../../SingleEvent/page/SingleEventPage";
import SingleCoursePage from "../../../SingleCourse/page/SingleCoursePage";
import NotFoundPage from "../../../PageNotFound/page/NotFoundPage";
import {AuthProvider, useAuth} from "../../../../contexts/AuthContext";
import LoginPage from "../../../Authorization/page/LoginPage";
import SingInPage from "../../../Authorization/page/SingInPage";
import MainPage from '../../../Main/page/MainPage/MainPage'

function App() {



    return (
        <BrowserRouter>
            <AuthProvider>
                <HeaderContainer/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/gallery' element={<GalleryPage/>}/>
                        <Route path='/about' element={<AboutPage/>}/>
                        <Route path='/blog' element={<BlogPage/>}/>
                        <Route path='/courses' element={<CoursesPage/>}/>
                        <Route path='/events' element={<EventsPage/>}/>
                        <Route path='/contact' element={<ContactPage/>}/>
                        <Route path='/blog/:slug' element={<SingleBlogPage/>}/>
                        <Route path='/events/:slug' element={<SingleEventPage/>}/>
                        <Route path='/courses/:slug' element={<SingleCoursePage/>}/>
                        <Route path='/auth/login' element={<LoginPage/>}/>
                        <Route path='/auth/sign-in' element={<SingInPage/>}/>
                        <Route path='/*' element={<NotFoundPage/>}/>
                    </Routes>
                </main>
                <Footer/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
