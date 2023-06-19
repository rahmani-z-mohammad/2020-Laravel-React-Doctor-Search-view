import React, { Component } from 'react'
import queryString from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class HomeSerachResult extends Component {
    constructor (props) {
        super(props)
        this.state = {
          doctors:[],
          message:0
        }
            }

    componentDidMount (){
 
/*
|--------------------------------------------------------------------------
| Search those doctors that search by users from homepage
|--------------------------------------------------------------------------
*/
        let params = queryString.parse(location.search);
        axios.post('api/HomeSerachResult', params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
          console.log(res.data)
            this.setState({
                doctors: res.data
              })
              if(this.state.doctors.length <= 0){
                this.setState({
                  message: 1
                })
              }
          })
          .catch((error) => {
            console.log(error);
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
                    <li className="breadcrumb-item"><Link to={`/home-search-result${location.search}`}>نتیجه جستجو</Link></li>
                    </ol>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/*/Breadcrumb*/}
        <section className="sptb">
  <div className="container">
  <div style={this.state.message ? {} : {display:'none'}} className="alert alert-warning" role="alert"><button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>اطلاعات یافت نشد! <Link to="/doctors" class="alert-link">برای جستجوی پیشرفته اینجا کلیک کنید.</Link></div>
  {
    this.state.doctors.map(doctor=>{
      return ( 
    <div className="row" key={doctor.user_id}>
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <div className="wideget-user">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="wideget-user-desc">
                    <div className="wideget-user-img">
                      <img src={`http://panel.nccis.org/profiles/${doctor.profile_photo}`} alt="img" style={{height: "110px", width: "128px"}} />
                      <div className="wideget-user-info text-center">
                    <div className="wideget-user-icons">
                    <a href={`${doctor.facebook}`} className="border text-primary p-0"><i className="fa fa-facebook" /></a>
                    <a href={`${doctor.twitter}`} className="border text-primary p-0"><i className="fa fa-twitter" /></a>
                    <a href={`${doctor.linkedin}`} className="border text-primary p-0"><i className="fa fa-linkedin" /></a>
                    </div>
                  </div>
                    </div>
                    <div className="user-wrap">
                        <h4>{doctor.fullname}</h4>
                      <h6 className="text-muted mb-3">متخصص: {doctor.name}</h6>
                      <div className="item-det">
                        <div className="mb-2 mt-3">
                          <a href="#" className="icons"><i className="si si-envelope text-muted ml-1" /> {doctor.email}</a>
                        </div>
                      </div>
                      <Link to={`/doctor-profile?id=${doctor.user_id}`} className="btn btn-primary btn-sm ">
                                    نمایش پروفایل و گرفتن نوبت
                       </Link>  
                    </div>
                  </div>
                </div>
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
  </section>
</div>

           

        )
    }
}
