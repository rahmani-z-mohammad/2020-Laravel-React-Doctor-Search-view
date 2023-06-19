import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
        <div>
           
           {/*Footer Section*/}
<section>
  <footer className="bg-dark text-white">
    <div className="footer-main">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-12">
            <h6>صفحات کاربران</h6>
            <ul className="list-unstyled mb-0">
              <li>
              <NavLink exact to="/doctors">
                  نوبت گیری 
                </NavLink>
                </li>								
              <li>
                <NavLink exact to="/free-consultation">
                 مشاوره رایگان 
                </NavLink>
                </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-12">
            <h6>ثبت نام</h6>
            <ul className="list-unstyled mb-0">
              <li>
              <NavLink exact to="/doctor-register">
               ثبت داکتران
                </NavLink>
                </li>
                <li>
              <NavLink exact to="/clinic-hospital-register">
               ثبت کلینیک - شفاخانه ها
                </NavLink>
                </li>
                <li>
              <NavLink exact to="/user-register">
               ثبت کاربران
                </NavLink>
                </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12">
            <h6>جستجوی آسان</h6>
            <ul className="list-unstyled mb-0">
              <li>
              <NavLink exact to="/">
              جستجو براساس ولایت و نام داکتر
                </NavLink>
                </li>
              <li>
              <NavLink exact to="/doctors">
              جستجو براساس ولایت و تخصص داکتر
                </NavLink>
                </li>
              <li>
              <NavLink exact to="/clinics-hospitals">
                جستجوی کلینیک ها
                </NavLink>
                </li>
              <li>
              <NavLink exact to="/clinics-hospitals">
              جستجوی شفاخانه ها
                </NavLink>
                </li>
            </ul>
          </div>          
          <div className="col-lg-2 col-md-12">
            <h6>منابع</h6>
            <ul className="list-unstyled mb-0">
              <li>
              <NavLink exact to="/about">
              درباره ما
                </NavLink>
                </li>
                <li>
              <NavLink exact to="/contact">
              تماس و پشتیبانی
                </NavLink>
                </li>
              <li>
              <NavLink exact to="/privacy-policy">
               قوانین و مقررات
                </NavLink>
                </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-12">
            <h6 className="mb-2">اشتراک</h6>
            <div className="input-group">
              <input type="text" className="form-control br-tl-7 br-bl-7" placeholder="Email" />
              <div className="input-group-append ">
                <button type="button" className="btn btn-primary br-tr-7 br-br-7">
                  اشتراک
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-dark text-white p-0">
      <div className="container">
        <div className="row d-flex">
          <div className="col-lg-8 col-sm-12  mt-2 mb-2 text-right ">
            Copyright © 2020 <a href="#" className="fs-14 text-primary">My Doctor</a>. Developed by <a href="#" className="fs-14 text-primary">Bitpardaz</a> All rights reserved
          </div>
          <div className="col-lg-4 col-sm-12 ml-auto mb-2 mt-2">
            <ul className="social mb-0">
              <li>
                <a className="social-icon" href="#"><i className="fa fa-facebook" /></a>
              </li>
              <li>
                <a className="social-icon" href="#"><i className="fa fa-twitter" /></a>
              </li>
              <li>
                <a className="social-icon" href="#"><i className="fa fa-linkedin" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-dark text-white p-0 border-top">
      <div className="container">
        <div className="p-2 text-center footer-links">
        <NavLink exact to="/privacy-policy" className="btn btn-link">
               قوانین و مقررات
                </NavLink>
                <NavLink exact to="/about" className="btn btn-link">
                درباره ما
                </NavLink>
                <NavLink exact to="/contact" className="btn btn-link">
                تماس باما
                </NavLink>
        </div>
      </div>
    </div>
  </footer>
</section>
{/*Footer Section*/}

        </div>
        
        )
    }
}

export default withRouter(Footer)
