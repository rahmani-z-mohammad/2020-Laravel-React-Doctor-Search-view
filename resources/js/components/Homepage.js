import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

class Homepage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      specializations_more_search:[],
      specializations_all:[],
      doctors:[],
      cities: [],
      doctor:'',
      doctor_id_error: "",
      city_id:'',
      city_id_error:'',
      specialization_id:'',
      specialization_id_error:'',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
        }
      onChange (e) {
      this.setState({ [e.target.name]: e.target.value })
      }
/*
|--------------------------------------------------------------------------
| send search params through the url
|--------------------------------------------------------------------------
*/
validate(){
  let doctor_id_error = "";
  let city_id_error = "";
  let specialization_id_error = "";

  if(this.state.doctor == ""){
    doctor_id_error = 1;
  }

  if(this.state.city_id == ""){
    city_id_error = 1;
  }

  if(this.state.specialization_id == ""){
    specialization_id_error = 1;
  }

  if(doctor_id_error || city_id_error || specialization_id_error){
    this.setState({
      doctor_id_error: doctor_id_error,
      city_id_error: city_id_error,
      specialization_id_error: specialization_id_error,
    });
    return false;
  }
  return true;
}

      onSubmit (e) {
        e.preventDefault()

        const isValid = this.validate();
        if(isValid){
        this.props.history.push(`/home-search-result?doctor=${this.state.doctor}&city_id=${this.state.city_id}&specialization_id=${this.state.specialization_id}`)
        this.clearFields();
      }
      }

      clearFields(){
        this.setState({
          doctor: "",
          doctor_id_error: "",
          city_id: "",
          city_id_error: "",
          specialization_id: "",
          specialization_id_error: "",
        });
      }

    
  componentDidMount (){

/*
|--------------------------------------------------------------------------
| append some JS file that dont work properly in mainpage
|--------------------------------------------------------------------------
*/
    const script1 = document.createElement("script");  
    script1.src = 'assets/js/showmore.js';
    script1.async = true;
    document.body.appendChild(script1);

/*
|--------------------------------------------------------------------------
| select those specializations that search more by users in Homepage
|--------------------------------------------------------------------------
*/
           axios.get('/api/specializations_more_search')
          .then(res => {
            this.setState({
              specializations_more_search: res.data
            });
          })
          .catch((error) => {
            console.log(error);
          });
/*
|--------------------------------------------------------------------------
| select all specializations in Homepage
|--------------------------------------------------------------------------
*/
          axios.get('/api/specializations_all')
          .then(res => {
            this.setState({
              specializations_all: res.data
            });
          })
          .catch((error) => {
            console.log(error);
          });
/*
|--------------------------------------------------------------------------
| select all cities any where
|--------------------------------------------------------------------------
*/
          axios.get('/api/cities').then(res => {
            this.setState({
              cities: res.data
            });
            }).catch((error) => {
                console.log(error);
            });
/*
|--------------------------------------------------------------------------
| select the latest stored doctors
|--------------------------------------------------------------------------
*/
          axios.get('/api/latest_doctors_home')
          .then(res => {
            //console.log(res)
            this.setState({
              doctors: res.data
            });
          })
          .catch((error) => {
            console.log(error);
          });

  }

  render() {
    return (
<div>
  {/*Sliders Section*/}
  <section>
    <div className="banner-1 cover-image sptb-2 bg-background2" data-image-src="../assets/images/banners/doctor.jpg">
      <div className="header-text mb-0">
        <div className="container">
          <div className="text-center text-white ">
            <h1>داکـتـر من، سلامت من</h1>
            <p>داکتر مورد نظر خودرا جستجو کنید و نوبت بگیرید</p>
          </div>
          <div className="row">
            <div className="col-xl-9 col-lg-12 col-md-12 d-block mx-auto">
              <div className=" search-background">
              <form onSubmit={this.onSubmit}>
                <div className="form row no-gutters">
                  <div className="form-group  col-xl-4 col-lg-4 col-md-12 mb-0">
                    <input type="text" onChange={this.onChange} className="form-control input-lg " name="doctor" id="doctor" placeholder="نام یا تخلص داکتر" style = {this.state.doctor_id_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}
                    />
                  </div>
                  <div className="form-group col-xl-3 col-lg-3 select2-lg  col-md-12 mb-0">
                    <select onChange={this.onChange} className="form-control custom-select input-lg" name="city_id" id="city_id" data-placeholder="ولایت"
                    style = {this.state.city_id_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}
                    >               
                      <option value="">ولایت</option>
                      {
                      this.state.cities.map(city=>{
                        return ( 
                          <option key={city.id} value={`${city.id}`}>{city.name}</option>
                        )
                      })
                      } 
                    </select>
                  </div>
                  <div className="form-group col-xl-3 col-lg-3 select2-lg  col-md-12 mb-0">
                    <select onChange={this.onChange} className="form-control custom-select input-lg" name="specialization_id" id="specialization_id" data-placeholder="تخصص"
                    style = {this.state.specialization_id_error ? {borderWidth: 1.5, borderColor: '#FF1493'} : null}
                    >
                        <option value="">تخصص</option>
                        {
                      this.state.specializations_all.map(specialization_all=>{
                        return ( 
                        <option  key={specialization_all.id} value={specialization_all.id}>{specialization_all.name}</option>
                        )
                      })
                      }
                    </select>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 mb-0">
                    <button className="btn btn-lg btn-block btn-secondary">جستجو</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>{/* /header-text */}
    </div>
  </section>
  {/*/Sliders Section*/}
  {/*Categories*/}
  <section className="sptb bg-white">
    <div className="container">
      <div className="section-title center-block text-center">
        <h1>بهترین داکتر ها</h1>
        <p>براساس بیشترین جستجوی تخصص</p>
      </div>
      <div className="row text-center">
      {
       this.state.specializations_more_search.map(specialization_more_search=>{
         return (          
          <div className="col-lg-2 col-sl-2 col-md-4 item-all-cat" key={specialization_more_search.id}>
            <br/>
        <div className="item" >
          <div className="card mb-0">
            <div className="card-body">
              <div className="cat-item text-center">
              <Link to={`/doctors?specialization_id=${specialization_more_search.id}`} className="nav-link">
              </Link>
                <div className="cat-img">
                <img src={`/specializations/${specialization_more_search.icon}`} alt="specialization" />
                </div>
                <div className="item-all-text mt-5">
							<h5 className="text-body font-weight-bold">{specialization_more_search.name}</h5>
							<span className="badge badge-pill badge-primary">{specialization_more_search.total_specialization}</span>
						</div>
              </div>
            </div>
          </div>
        </div>
        </div>
         )
        })
        }    
    </div>
    </div>
  </section>
  {/*/Categories*/}
  {/*Categories*/}
  <section className="sptb">
    <div className="container">
      <div className="section-title center-block text-center">
        <h1>تخصص ها</h1>
        <p>بهترین داکتر هارا براساس تخصص های بیشتر مشاهده کنید</p>
      </div>
      <div className="item-all-cat center-block text-center doctor-categories" id="container2">
        <div className="row">
        {
       this.state.specializations_all.map(specialization_all=>{
         return ( 
          <div className="col-xl-3 col-lg-4 col-md-6" key={specialization_all.id}>
            <div className="item-all-card text-dark text-center p-4 bg-white">
            <Link to={`/doctors?specialization_id=${specialization_all.id}`} className="nav-link">
              </Link>
              <div className="item-all-text">
                <h5 className="mb-0 text-body font-weight-bold">{specialization_all.name} <span className="badge badge-pill badge-primary">{specialization_all.total_specialization}</span></h5>
              </div>
            </div>
          </div>
					)
        })
        }
        </div>
      </div>
    </div>
  </section>
  {/*/Categories*/}
  {/*Domain Seller*/}
  <section className="sptb cover-image bg-background-color" data-image-src="../assets/images/banners/banner2.jpg">
    <div className="container content-text">
      <div className="section-title center-block text-center">
        <h1 className="text-white">براساس ولایت و تخصص داکتر مورد نظر خودرا جتسجو کنید</h1>
        <p className="text-white">داکتر من، سلامت من</p>
      </div>
      <div className="text-center">
        <Link to="/doctors" className="btn btn-secondary">
              جستجوی داکتران
          </Link>
      </div>
    </div>
  </section>
  {/*/Domain Seller*/}
  {/*Featured Doctors*/}
  <section className="sptb">
    <div className="container">
      <div className="section-title center-block text-center">
        <h1>ثبت نام های جدید</h1>
        <p>جدیدترین داکتر های ثبت شده در سیستم</p>
      </div>
      <div className="row text-center">
  {
       this.state.doctors.map(doctor=>{
         return ( 
  <div className="col-lg-3 col-md-4 item-all-cat" key={doctor.user_id}>
    <br/>
    <div className="item">
          <div className="card mb-0 overflow-hidden">
            <div className="item-card9-imgs">
            <Link to={`/doctor-profile?id=${doctor.user_id}`} ></Link>  
              <img src={`http://panel.nccis.org/profiles/${doctor.profile_photo}`} alt="img" className="w-100" />
            </div>
            <div className="card-body">
              <div className="item-card2">
                <div className="item-card2-desc text-center">
                  <div className="item-card2-text">
                    <Link to={`/doctor-profile?id=${doctor.user_id}`} className="text-dark">
                      <h4 className="font-weight-bold mb-1">{doctor.fullname}</h4>
                      </Link>  
                  </div>
                  <p className="fs-16">متخصص: {doctor.name}</p>
                  <Link to={`/doctor-profile?id=${doctor.user_id}`} className="btn btn-primary btn-sm ">
                                    نمایش پروفایل و گرفتن نوبت
                  </Link>  
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="product-filter-desc">
                <div className="product-filter-icons text-center">
                  <a href={`${doctor.facebook}`} className="border text-primary p-0"><i className="fa fa-facebook" /></a>
                  <a href={`${doctor.twitter}`} className="border text-primary p-0"><i className="fa fa-twitter" /></a>
                  <a href={`${doctor.linkedin}`} className="border text-primary p-0"><i className="fa fa-linkedin" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
 )
})
}  
</div>
 </div>
  </section>

</div>

    )
  }
}

export default Homepage
