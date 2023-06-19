import React, { Component } from 'react'
import queryString from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom'
import moment from 'jalali-moment'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    ViberShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    ViberIcon,
    WhatsappIcon,

  } from "react-share";
import AppointmentSucessMessage from './AppointmentSucessMessage';
import AppointmentDangerMessage from './AppointmentDangerMessage';

export default class DoctorProfile extends Component {

        constructor (props) {
            super(props)
            this.state = {
                md_users:[],
                md_doctors:[],
                md_doctor_specializations_main:[],
                md_doctor_specializations_sub:[],
                md_policlinics:[],
                md_timing_hours:[],
                day_date:'',
                md_timing_hour_id:'',
                appointment_code:'',
                number_of_patient:'',
                alert_message: '',
                md_educations:[],
                email:''
            }

            this.onChange = this.onChange.bind(this)
            this.onSubmit = this.onSubmit.bind(this)
            this.onSubmitEmail = this.onSubmitEmail.bind(this)
                }
               
                

                onChange (e) {
                    this.setState({ [e.target.name]: e.target.value })
                }

                onSubmit (e) {
                e.preventDefault()
                const appointment = {
                day_date: this.state.day_date,
                md_timing_hour_id: this.state.md_timing_hour_id,
                appointment_code: this.state.appointment_code,
                number_of_patient: this.state.number_of_patient,
                  }
             
                 axios.post('api/getappointment', appointment, {
                headers: { 'Content-Type': 'application/json' }
                }).then(res => {
                   // console.log(res);
                this.setState({
                    alert_message:"Success"
                })
                })
                .catch(err => {
                   // console.log(err);
                this.setState({
                    alert_message:"Danger"
                })
                })
        
                this.setState({
                appointment_code: '',
                number_of_patient:'',
                alert_message: '',
                });

              }

              onSubmitEmail (e) {
                e.preventDefault()
                const getAppointmentCode = {
                email: this.state.email
                  }
                  axios.post('api/getAppointmentCode', getAppointmentCode, {
                headers: { 'Content-Type': 'application/json' }
                }).then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        
                this.setState({
                email: '',
                });

              }

              hideModal()
              {
                  
                  $('#Comment').modal('hide');
                  $('#email').modal('show');
              }

      componentDidMount (){

/*
|--------------------------------------------------------------------------
| Select doctor informations
|--------------------------------------------------------------------------
*/
        let params = queryString.parse(location.search);

        axios.post('api/doctor_profile', params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({
                md_users: res.data.md_users,
                md_doctors: res.data.md_doctors,
                md_doctor_specializations_main: res.data.md_doctor_specializations_main,
                md_doctor_specializations_sub: res.data.md_doctor_specializations_sub
              })
          })
          .catch((error) => {
            console.log(error);
          });


          axios.post('api/doctor_md_policlinics', params, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            this.setState({
                md_policlinics: res.data.md_policlinics,
                md_timing_hours: res.data.md_timing_hours
              })
          })
          .catch((error) => {
            console.log(error);
          });

    }

    render() {
        return (
            <div>
                
        {/*Add listing*/}
        <section className="sptb">
        <div className="container">
            <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-12">
                {/*Jobs Description*/}
                    {
                    this.state.md_users.map(md_user=>{
                    return ( 
                <div className="card overflow-hidden" key={md_user.user_id}>
                <div className="ribbon ribbon-top-left text-danger"><span className="bg-danger">جدید</span></div>
                <div className="card-body  item-user">
                    <div className="profile-pic mb-0">
                    <div className="d-md-flex">
                    <img src={`http://panel.nccis.org/profiles/${md_user.profile_photo}`} alt="img" className="w-150 h-150 br-2" />
                        <div className="mr-4">
                        <Link to={`/doctor-profile?id=${md_user.user_id}`} className="text-dark">
                                  <h4 className="mt-3 mb-1 font-weight-bold">{md_user.fullname}</h4>
                        </Link> 
                             {
                        this.state.md_doctor_specializations_main.map(md_doctor_specialization_main=>{
                        return (                       
                        <span className="text-gray" key={md_doctor_specialization_main.id}>متخصص: {md_doctor_specialization_main.name}</span>
                            )
                            })
                            } 
                        <br />
                        <span className="text-muted">
                                         عضو از سال               
                              {moment(md_user.created_at_year, 'YYYY/MM/DD').locale('fa').format('YYYY')}
                            
                            </span>
                            {
                        this.state.md_doctors.map(md_doctor=>{
                        return (  
                        <h6 className="mt-2 mb-0" key={md_doctor.id}><a href="#" className="btn btn-primary btn-sm">بازدید {md_doctor.num_views}</a></h6>
                            )
                            })
                            } 
                        </div>
                    </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="item-det">
                    <div className="mb-2 mt-3">
                        <a href="#" className="icons"><i className="si si-envelope text-muted ml-1" /> {md_user.email}</a>
                    </div>
                    <div className="mb-2 mt-3">
                    به اشتراک بگذارید: 
                <FacebookShareButton
                    url={`https://www.mydoctor.af/doctor-profile?id=${md_user.user_id}`}
                    title={md_user.fullname}
                    >
                    <FacebookIcon
                    size={30}
                    round />
                </FacebookShareButton>
                <LinkedinShareButton
                    url={`https://www.mydoctor.af/doctor-profile?id=${md_user.user_id}`}
                    title={md_user.fullname}
                    >
                    <LinkedinIcon
                    size={30}
                    round />
                </LinkedinShareButton>
                <TwitterShareButton
                    url={`https://www.mydoctor.af/doctor-profile?id=${md_user.user_id}`}
                    title={md_user.fullname}
                    >
                    <TwitterIcon
                    size={30}
                    round />
                </TwitterShareButton>
                <TelegramShareButton
                    url={`https://www.mydoctor.af/doctor-profile?id=${md_user.user_id}`}
                    title={md_user.fullname}
                    >
                    <TelegramIcon
                    size={30}
                    round />
                </TelegramShareButton>
                <WhatsappShareButton
                    url={`https://www.mydoctor.af/doctor-profile?id=${md_user.user_id}`}
                    title={md_user.fullname}
                    >
                    <WhatsappIcon
                    size={30}
                    round />
                </WhatsappShareButton>
                <ViberShareButton
                    url={`https://www.mydoctor.af/doctor-profile?id=${md_user.user_id}`}
                    title={md_user.fullname}
                    >
                    <ViberIcon
                    size={30}
                    round />
                </ViberShareButton>
                    </div>
                    </div>
                </div>
                <div className="card-body border-top">
                    <h4 className="mb-4 font-weight-semibold">بیوگرافی تخصصی</h4>
                    <div className="mb-4">
                    {
                        this.state.md_doctors.map(md_doctor=>{
                        return (  
                        <p key={md_doctor.id}>بازدید {md_doctor.biography}</p>
                            )
                            })
                            } 
                    </div>
                    <h4 className="mb-4 font-weight-semibold">تخصص های فرعی</h4>
                    <div className="row">
                    <div className="col-xl-12 col-md-12">
                        <div className="table-responsive">
                        <table className="table row table-borderless w-100 m-0 text-nowrap ">
                            <tbody className="col-lg-12 col-xl-12 p-0">
                            {
                    this.state.md_doctor_specializations_sub.map(md_doctor_specialization_sub=>{
                    return (    
                            <tr key={md_doctor_specialization_sub.id}>
                                <td><span ><i className="fa fa-caret-left  ml-2" /> {md_doctor_specialization_sub.name}</span></td>
                            </tr>
                            )
                            })
                            } 
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                </div>
                   )
                })
                } 
                {/*Details Description*/}
                {/*Comments*/}
         
                {/*Comments*/}
            </div>
            {/*Right Side Content*/}
            <div className="col-xl-5 col-lg-5 col-md-12">
                <div className="card mb-0">
                <div className="card-header">
                    <h3 className="card-title">نوبت بگیرید</h3>
                </div>
                {
                this.state.md_policlinics.map(md_policlinic=>{
                return (   
                <div className="card-body"  key={md_policlinic.id}>
                    <div className="list-id">
                    <h3 className="card-title">{md_policlinic.title}</h3>
                    <div className="item-det">					
                        <div className="mb-2 mt-3">
                        <a href="#" className="icons">
                            <i className="si si-location-pin text-muted ml-1" /> {md_policlinic.address}</a>
                        </div>
                        <div className="mb-2 mt-3">
                        <a href="#" className="icons"><i className="si si-phone text-muted ml-1" />معاینه خانه: {md_policlinic.assistant_phone_number}</a>
                        </div>
                        <div className="mb-2 mt-3">
                        <a href="#" className="icons"><i className="si si-phone text-muted ml-1" />دواخانه: {md_policlinic.pharmacy_phone_number}</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-md-12">
                        <div className="table-responsive">
                            <table className="table table-bordered border-top mb-0">
                            <thead>
                                <tr>
                                <th>روز</th>
                                <th>ساعت کاری</th>
                                <th>نوبت گیری</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.md_timing_hours.map(md_timing_hour=>{
                             if(md_policlinic.id == md_timing_hour.policlinic_id){
                                 if(md_timing_hour.day == "شنبه")
                                 {
                                                                                       
                                    var a = moment().day(6).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(6+7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(6).locale('fa').format("dddd: DD-MM-YYYY");
                                    } 
                                                                                                  

                                 }else if(md_timing_hour.day == "یک شنبه")
                                 {
                                    var a = moment().day(0).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(0).locale('fa').format("dddd: DD-MM-YYYY");
                                    }                                    

                                 }else if(md_timing_hour.day == "دو شنبه")
                                 {

                                    var a = moment().day(1).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(1+7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(1).locale('fa').format("dddd: DD-MM-YYYY");
                                    }  
                                    

                                 }else if(md_timing_hour.day == "سه شنبه")
                                 {
                                 
                               
                                    var a = moment().day(2).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(2+7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(2).locale('fa').format("dddd: DD-MM-YYYY");
                                    }  
                                 

                                 }else if(md_timing_hour.day == "چهار شنبه")
                                 {
                                 
                               
                                    var a = moment().day(3).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(3+7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(3).locale('fa').format("dddd: DD-MM-YYYY");
                                    }  
                                     

                                 }else if(md_timing_hour.day == "پنج شنبه")
                                 {

                                  
                                    var a = moment().day(4).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(4+7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(4).locale('fa').format("dddd: DD-MM-YYYY");
                                    }  
                                    

                                 }else if(md_timing_hour.day == "جمعه")
                                 {
                                 
                                
                                    var a = moment().day(5).locale('fa').format("DD-MM-YYYY");
                                    var b = moment().locale('fa').format("DD-MM-YYYY");
                            
                                    if(moment(a).isBefore(b))
                                    {                               
                                    var day_date = moment().day(5+7).locale('fa').format("dddd: DD-MM-YYYY");
                                    }else
                                    {
                                        var day_date = moment().day(5).locale('fa').format("dddd: DD-MM-YYYY");
                                    }  
                                     

                                 }
                             var md_timing_hour_id = md_timing_hour.id;
                             return ( 
                                <tr key={md_timing_hour.id}>
                                <td>{day_date}</td>
                                <td>از ساعت {md_timing_hour.from_hour} الی {md_timing_hour.to_hour}</td>
                                <td>
                                <a href="#" onClick={() => {
                                  this.setState({
                                      day_date:day_date,
                                      md_timing_hour_id:md_timing_hour.id})
                                  }} className="btn btn-success" data-toggle="modal" data-target="#Comment">نوبت بگیرید</a>
                                </td>
                                </tr>
                                )
                                    }
                                })
                                } 
                            </tbody>
                            </table>
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
            {/*/Right Side Content*/}
            </div>
        </div>
        </section>
        {/*/Add listing*/}

      <div className="modal fade" id="Comment" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">کد نوبت گیری خود را وارد کنید</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="modal-body">
            {this.state.alert_message=="Success"?<AppointmentSucessMessage />:null}
            {this.state.alert_message=="Danger"?<AppointmentDangerMessage />:null}
                <div className="form-group">
                <input type="text" name="appointment_code"
                value={this.state.appointment_code} 
                onChange={this.onChange}
                className="form-control"  placeholder="کد نوبت گیری" />
                </div>
                <div className="form-group">
                <input type="number" name="number_of_patient"
                value={this.state.number_of_patient} 
                onChange={this.onChange}
                className="form-control"  placeholder="تعداد مریض" />
                </div>
            </div>
            <div className="modal-body">
                <div className="form-group">
                <a onClick={this.hideModal}>کد نویت گیری را فراموش کرده اید؟</a>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-success">ارسال</button>
            </div>
            </form>
            </div>
        </div>
        </div>

        <div className="modal fade" id="email" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">جهت دریافت مجدد کد نوبت گیری ایمیل خود را وارد کنید</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <form>
            <div className="modal-body">
                <div className="form-group">
                <input type="text" name="email"
                value={this.state.email} 
                onChange={this.onChange}
                className="form-control"  placeholder="ایمیل خود را وارد کنید" />
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" onClick={this.onSubmitEmail} className="btn btn-success">ارسال</button>
            </div>
            </form>
            </div>
        </div>
        </div>


            </div>
        )
    }
}

