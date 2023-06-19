import React, { Component } from 'react'
import axios from 'axios';
import Pagination from "react-js-pagination";
import queryString from 'query-string';
import { Link } from 'react-router-dom'

class DoctorsList extends Component {
    constructor (props) {
        super(props)
        this.state = {

          specializations_all:[],
          cities: [],
          doctors:[],
          activePage:1,
          itemsCountPerPage:1,
          totalItemsCount:1,
          city_id:'',
          specialization_id:'',
          message:0
        }

       this.onChange = this.onChange.bind(this)
       this.handlePageChange.bind(this);
       this.searchByCity.bind(this);
            }

            onChange (e) {
                this.setState({ [e.target.name]: e.target.value })
                }

    componentDidMount (){
/*
|--------------------------------------------------------------------------
| select all specializations in any where
|--------------------------------------------------------------------------
*/
        axios.get('/api/specializations_all')
          .then(res => {
            this.setState({
              specializations_all: res.data
            });
          })
          .catch((error) => {
           // console.log(error);
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
               // console.log(error);
            });
/*
|--------------------------------------------------------------------------
| select all doctors in doctor page
|--------------------------------------------------------------------------
*/
      let header_params = queryString.parse(location.search);
      var specialization_id = header_params['specialization_id'];
      if(specialization_id)
      {
        const search_data = 'city_id='+this.state.city_id+'&specialization_id='+specialization_id;
        let params = queryString.parse(search_data);
        console.log(params);
        axios.post('api/doctors_list_search', params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            //console.log(res.data);
            this.setState({
            doctors: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            activePage: res.data.current_page,
              })
              if(this.state.doctors.length <= 0){
                this.setState({
                  message: 1
                })
              }else
              {
                this.setState({
                  message: 0
                })
              }
          })
          .catch((error) => {
           // console.log(error);
          });
      }else
      {
        axios.get('/api/all_doctors_list')
        .then(res => {
          this.setState({
              doctors: res.data.data,
              itemsCountPerPage: res.data.per_page,
              totalItemsCount: res.data.total,
              activePage: res.data.current_page,
            });
            if(this.state.doctors.length <= 0){
              this.setState({
                message: 1
              })
            }else
            {
              this.setState({
                message: 0
              })
            } 
        })
        .catch((error) => {
         // console.log(error);
        });
      }
        

           }
/*
|--------------------------------------------------------------------------
| select doctors by pageination
|--------------------------------------------------------------------------
*/
    handlePageChange(pageNumber) {
      let header_params = queryString.parse(location.search);
      var specialization_id = header_params['specialization_id'];
      if(this.state.specialization_id)
      {
      var specialization_id = this.state.specialization_id;
      }else
      {
        var specialization_id = specialization_id;
      }
        const search_data = 'city_id='+this.state.city_id+'&specialization_id='+specialization_id;
        let params = queryString.parse(search_data);

        if(this.state.city_id != 0 || specialization_id != 0){

          axios.post('/api/doctors_list_search?page='+pageNumber, params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
           // console.log(res.data);
            this.setState({
              doctors: res.data.data,
              itemsCountPerPage: res.data.per_page,
              totalItemsCount: res.data.total,
              activePage: res.data.current_page,
            });
            if(this.state.doctors.length <= 0){
              this.setState({
                message: 1
              })
            }else
            {
              this.setState({
                message: 0
              })
            }
          })
          .catch((error) => {
           // console.log(error);
          });

        }else
        {
          axios.post('/api/doctors_list_search?page='+pageNumber)
        .then(res => {
          this.setState({
            doctors: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            activePage: res.data.current_page,
          });
          if(this.state.doctors.length <= 0){
            this.setState({
              message: 1
            })
          }else
          {
            this.setState({
              message: 0
            })
          }
        })
        .catch((error) => {
         // console.log(error);
        });
        }

      }
/*
|--------------------------------------------------------------------------
| search doctors by city
|--------------------------------------------------------------------------
*/
      searchByCity(){
      let header_params = queryString.parse(location.search);
      var specialization_id = header_params['specialization_id'];
      if(this.state.specialization_id)
      {
      var specialization_id = this.state.specialization_id;
      }else
      {
        var specialization_id = specialization_id;
      }
        const search_data = 'city_id='+this.state.city_id+'&specialization_id='+specialization_id;
        let params = queryString.parse(search_data);
        axios.post('api/doctors_list_search', params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({
            doctors: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            activePage: res.data.current_page,
              })
              if(this.state.doctors.length <= 0){
                this.setState({
                  message: 1
                })
              }else
              {
                this.setState({
                  message: 0
                })
              }
          })
          .catch((error) => {
           // console.log(error);
          });
        
    }
/*
|--------------------------------------------------------------------------
| search doctors by city specialization
|--------------------------------------------------------------------------
*/
    searchBySpecialization(){
      let header_params = queryString.parse(location.search);
      var specialization_id = header_params['specialization_id'];
      if(this.state.specialization_id)
      {
      var specialization_id = this.state.specialization_id;
      }else
      {
        var specialization_id = specialization_id;
      }
        const search_data = 'city_id='+this.state.city_id+'&specialization_id='+specialization_id;
        let params = queryString.parse(search_data);
       // console.log(params);
        axios.post('api/doctors_list_search', params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            //console.log(res.data);
            this.setState({
            doctors: res.data.data,
            itemsCountPerPage: res.data.per_page,
            totalItemsCount: res.data.total,
            activePage: res.data.current_page,
              })
              if(this.state.doctors.length <= 0){
                this.setState({
                  message: 1
                })
              }else
              {
                this.setState({
                  message: 0
                })
              }
          })
          .catch((error) => {
           // console.log(error);
          });
        
    }

    render() {
        return (
            <div>

        {/*Breadcrumb*/}
        <section>
            <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
            <div className="header-text mb-0">
                <div className="container">
                <div className="text-center text-white ">
                    <ol className="breadcrumb text-center">
                    <li className="breadcrumb-item"><Link to="/">صفحه اصلی</Link> </li>
                    <li className="breadcrumb-item"><Link to="/doctors">داکتران</Link></li>
                    </ol>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/*/Breadcrumb*/}
        {/*Add listing*/}
        <section className="sptb">
            <div className="container">
            <div className="row">
                {/*Left Side Content*/}
                <div className="col-xl-3 col-lg-4 col-md-12">
                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">ولایت</h3>
                    </div>
                    <div className="card-body">
                    <div className="form-group">
                        <select onChange={this.onChange} onClick={this.searchByCity.bind(this)} name="city_id" id="city_id" className="form-control custom-select border-bottom-0 w-100" data-placeholder="ولایت">
                        <option value='0'>ولایت - همه</option>
                      {
                      this.state.cities.map(city=>{
                        return ( 
                          <option key={city.id} value={city.id}>{city.name}</option>
                        )
                      })
                      } 
                        </select>
                    </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">تخصص ها</h3>
                    </div>
                    <div className="card-body">
                    <div className="form-group">
                        <select onChange={this.onChange} onClick={this.searchBySpecialization.bind(this)} name="specialization_id" id="specialization_id" className="form-control custom-select border-bottom-0 w-100" data-placeholder="تخصص">
                        <option  value='0'>تخصص - همه</option>
                        
                      {
                      this.state.specializations_all.map(specialization_all=>{
                        let header_params = queryString.parse(location.search);
                        var specialization_id = header_params['specialization_id'];
                        return ( 
                          <option key={specialization_all.id} value={`${specialization_all.id}`} selected={specialization_id == specialization_all.id}>{specialization_all.name}</option>
                        )
                      })
                      } 
                        </select>
                    </div>
                    </div>
                </div>
						
                </div>
                {/*Left Side Content*/}
                <div className="col-xl-9 col-lg-8 col-md-12">
                <div style={this.state.message ? {} : {display:'none'}} className="alert alert-warning" role="alert"><button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>اطلاعات یافت نشد!</div>
                {/*Add lists*/}
                <div className="card mb-0">
                    <div className="card-body">
                    <div className="item2-gl ">
                        <div className="row">
                        {
                        this.state.doctors.map(doctor=>{
                            return ( 
                        <div className="col-lg-6 col-md-12 col-xl-4" key={doctor.user_id}>
                            <div className="card overflow-hidden">
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
                        )
                        })
                        } 
                        </div>
                    </div>

                    <div className="center-block text-center">
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}

                    onChange={this.handlePageChange.bind(this)}
                    itemClass='page-item'
                    linkClass='page-link'
                    prevPageText='قبلی'
                    nextPageText='بغدی'
                    firstPageText='اول'
                    lastPageText='آخر'
                    />
                    </div>

                    </div>
                </div>
                {/*Add lists*/}
                </div>
            </div>
            </div>
        </section>
        {/*Add Listing*/}
   
            </div>
        )
    }
}

export default DoctorsList