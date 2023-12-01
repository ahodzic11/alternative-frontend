import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/AllProjects";
import Statut from "./pages/Statut";
import RealAboutUs from "./pages/RealAboutUs";
import Admin from "./pages/AdminPage";
import AdminPanel from "./pages/AdminPanel";
import AddWorkshopPage from "./pages/AddWorkshopPage";
import AddActivityPage from "./pages/AddActivityPage";
import AddProjectPage from "./pages/AddProjectPage";
import AddNewsPage from "./pages/AddNewsPage";
import Workshops from "./pages/Workshops";
import ChooseImage from "./pages/ChooseImage";
import ReadWorkshops from "./pages/ReadWorkshops";
import EditWorkshops from "./pages/EditWorkshops";
import WorkshopList from "./pages/WorkshopList";
import WorkshopDetailed from "./components/WorkshopDetailed";
import AllWorkshops from "./pages/AllWorkshops";
import WorkshopInformation from "./components/WorkshopInformation";
import Treneri from "./components/Treneri";
import ProjectsMainPage from "./pages/ProjectsMainPage";
import EditProjects from "./pages/EditProjects";
import ReadProjects from "./pages/ReadProjects";
import ProjectDetailed from "./components/ProjectDetailed";
import ProjectInformation from "./components/ProjectInformation";
import AllActivities from "./pages/AllActivities";
import ActivityDetailed from "./components/ActivityDetailed";
import ActivityInformation from "./components/ActivityInformation";
import AllNews from "./pages/AllNews";
import NewsDetailed from "./components/NewsDetailed";
import NewsInformation from "./components/NewsInformation";
import ReadActivities from "./pages/ReadActivities";
import EditActivities from "./pages/EditActivities";
import ReadNews from "./pages/ReadNews";
import EditNews from "./pages/EditNews";
import Historijat from "./pages/Historijat";
import AddDonatorPage from "./pages/AddDonatorPage";
import ReadDonators from "./pages/ReadDonators";
import EditDonators from "./pages/EditDonators";
import AllDonators from "./pages/AllDonators";
import Statements from "./pages/Statements";
import AddOfferPage from "./pages/AddOfferPage";
import ReadOffers from "./pages/ReadOffers";
import EditOffers from "./pages/EditOffers";
import SingleOffer from "./pages/SingleOffer";
import AddArticlePage from "./pages/AddArticlePage";
import ReadArticles from "./pages/ReadArticles";
import EditArticles from "./pages/EditArticles";
import AllArticles from "./pages/AllArticles";
import "./App.css";
import ReadApplications from "./pages/ReadApplications";
import ReadReservations from "./pages/ReadReservations";
import ReadQuestions from "./pages/ReadQuestions";
import Galerija from "./pages/Galerija";
import EditGallery from "./pages/EditGallery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nastim" element={<AboutUs />} />
          <Route path="/projects" element={<ProjectsMainPage />} />
          <Route path="/statut" element={<Statut />} />
          <Route path="/onama" element={<RealAboutUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/dodajradionicu" element={<AddWorkshopPage />} />
          <Route path="/dodajaktivnost" element={<AddActivityPage />} />
          <Route path="/dodajprojekat" element={<AddProjectPage />} />
          <Route path="/dodajvijest" element={<AddNewsPage />} />
          <Route path="/dodajdonatora" element={<AddDonatorPage />} />
          <Route path="/dodajponudu" element={<AddOfferPage />} />
          <Route path="/dodajclanak" element={<AddArticlePage />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/projekti" element={<Projects />} />
          <Route path="/aktivnosti" element={<AllActivities />} />
          <Route path="/vijesti" element={<AllNews />} />
          <Route path="/chooseimage/:type/:name" element={<ChooseImage />} />
          <Route path="/readworkshops" element={<ReadWorkshops />} />
          <Route path="/readprojects" element={<ReadProjects />} />
          <Route path="/readactivities" element={<ReadActivities />} />
          <Route path="/readnews" element={<ReadNews />} />
          <Route path="/readdonators" element={<ReadDonators />} />
          <Route path="/readoffers" element={<ReadOffers />} />
          <Route path="/readarticles" element={<ReadArticles />} />
          <Route path="/readapplications" element={<ReadApplications />} />
          <Route path="/readreservations" element={<ReadReservations />} />
          <Route path="/readquestions" element={<ReadQuestions />} />
          <Route path="/editworkshop/:name" element={<EditWorkshops />} />
          <Route path="/editproject/:name" element={<EditProjects />} />
          <Route path="/editactivity/:name" element={<EditActivities />} />
          <Route path="/editnews/:name" element={<EditNews />} />
          <Route path="/editdonator/:name" element={<EditDonators />} />
          <Route path="/editoffer/:name" element={<EditOffers />} />
          <Route path="/editarticle/:name" element={<EditArticles />} />
          <Route path="/editgallery" element={<EditGallery />} />
          <Route path="/workshops/:area" element={<WorkshopList />} />
          <Route path="/workshops/details/:name" element={<WorkshopDetailed />} />
          <Route path="/projects/details/:name" element={<ProjectDetailed />} />
          <Route path="/activities/details/:name" element={<ActivityDetailed />} />
          <Route path="/news/details/:name" element={<NewsDetailed />} />
          <Route path="/offers/:name" element={<SingleOffer />} />
          <Route path="/workshops/workshopdetails/:name" element={<WorkshopInformation />} />
          <Route path="/projects/projectdetails/:name" element={<ProjectInformation />} />
          <Route path="/activities/activitydetails/:name" element={<ActivityInformation />} />
          <Route path="/news/newsdetails/:name" element={<NewsInformation />} />
          <Route path="/allworkshops" element={<AllWorkshops />} />
          <Route path="/donatori" element={<AllDonators />} />
          <Route path="/treneri" element={<Treneri />} />
          <Route path="/historijat" element={<Historijat />} />
          <Route path="/izjave" element={<Statements />} />
          <Route path="/clanci" element={<AllArticles />} />
          <Route path="/galerija" element={<Galerija />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
