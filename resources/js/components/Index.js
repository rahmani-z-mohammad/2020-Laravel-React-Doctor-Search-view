import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Homepage from './Homepage'
import Header from './Header'
import Footer from './Footer';
import DoctorsList from './DoctorsList';
import ClinicsHospitalsList from './ClinicsHospitalsList';
import FreeConsultation from './FreeConsultation';
import UserRegister from './UserRegister';
import DoctorRegister from './DoctorRegister';
import ClinicHospitalRegister from './ClinicHospitalRegister';
import HomeSerachResult from './HomeSerachResult';
import DoctorProfile from './DoctorProfile';
import ClinicsProfile from './ClinicsProfile';
import About from './About';
import PrivacyPolicy from './PrivacyPolicy';
import Contact from './Contact';

function Index() {
    return (
        <Router>
            <div className="Index">


            <Header />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/doctors" component={DoctorsList} />
            <Route exact path="/clinics-hospitals" component={ClinicsHospitalsList} />
            <Route exact path="/free-consultation" component={FreeConsultation} />
            <Route exact path="/user-register" component={UserRegister} />
            <Route exact path="/doctor-register" component={DoctorRegister} />
            <Route exact path="/clinic-hospital-register" component={ClinicHospitalRegister} />
            <Route exact path="/home-search-result" component={HomeSerachResult} />
            <Route exact path="/doctor-profile" component={DoctorProfile} />
            <Route exact path="/clinic-profile" component={ClinicsProfile} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            
            <Footer />

            </div>
        </Router>
    );
}

export default Index;

if (document.getElementById('app-root')) {
    ReactDOM.render(<Index />, document.getElementById('app-root'));
}
