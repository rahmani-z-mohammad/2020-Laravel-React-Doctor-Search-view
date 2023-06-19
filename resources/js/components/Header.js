import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'


class Header extends Component {

  render() {
    return (
      <div>
        {/*Topbar*/}

	<div className="header-main">
  <div className="top-bar">
    <div className="container">
      <div className="row">
        <div className="col-xl-8 col-lg-8 col-sm-4 col-7">
          <div className="top-bar-right  d-flex">
            <div className="clearfix">
              <ul className="socials">
                <li>
                  <a className="social-icon text-dark" href="#"><i className="fa fa-facebook" /></a>
                </li>
                <li>
                  <a className="social-icon text-dark" href="#"><i className="fa fa-twitter" /></a>
                </li>
                <li>
                  <a className="social-icon text-dark" href="#"><i className="fa fa-linkedin" /></a>
                </li>
                <li>
                  <a className="social-icon text-dark" href="#">دری</a>
                  <span> | </span>
                  <a className="social-icon text-dark" href="#">پشتو</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-sm-8 col-5">
          <div className="top-bar-left">
            <ul className="custom">
              <li>
                <a href="http://panel.nccis.org/" className="text-dark"><i className="fa fa-sign-in ml-1" /> <span>ورود به سیستم</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Mobile Header */}
  <div className="sticky">
    <div className="horizontal-header clearfix ">
      <div className="container">
        <a id="horizontal-navtoggle" className="animated-arrow"><span /></a>
        <span className="smllogo"><img src="../assets/images/brand/logo1.png" width={120} alt="logo" /></span>
        <a href="tel:245-6325-3256" className="callusbtn"><i className="fa fa-phone" aria-hidden="true" /></a>
      </div>
    </div>
  </div>
  {/* Mobile Header */}
  <div className="sticky">
    <div className="horizontal-main clearfix">
      <div className="horizontal-mainwrapper container clearfix">
        <div className="desktoplogo">
          <a href="index.html"><img src="../assets/images/brand/logo1.png" alt="logo" /></a>
        </div>
        {/*Nav*/}
        <nav className="horizontalMenu clearfix d-md-flex">
          <ul className="horizontalMenu-list">
            <li aria-haspopup="true">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
            صفحه اصلی
          </NavLink>
              </li>
            <li aria-haspopup="true">
            <NavLink exact to="/doctors" className="nav-link" activeClassName="active">
              داکتران
          </NavLink>
            </li>
            <li aria-haspopup="true">
              <NavLink exact to="/clinics-hospitals" className="nav-link" activeClassName="active">
                  کلینیک - شفاخانه ها
                 </NavLink>
              </li>
            <li aria-haspopup="true">
              <NavLink exact to="/free-consultation" className="nav-link" activeClassName="active">
              مشاوره رایگان
          </NavLink>
              </li>
            <li aria-haspopup="true" className="bloglist">
              <NavLink exact to="doctor-register" activeClassName="active">
              ثبت نام 
              </NavLink>
              <span className="fa fa-caret-down m-0" />
              <ul className="sub-menu">
                <li aria-haspopup="true">
                  <NavLink exact to="/doctor-register" className="nav-link" activeClassName="active">
                    ثبت نام داکتر
                   </NavLink>
                  </li>
                <li aria-haspopup="true">
                  <NavLink exact to="/clinic-hospital-register" className="nav-link" activeClassName="active">
                  ثبت نام کلینیک/شفاخانه
                 </NavLink>
                  </li>
                <li aria-haspopup="true">
                  <NavLink exact to="/user-register" className="nav-link" activeClassName="active">
                  ثبت نام کاربر
                 </NavLink>
                  </li>
              </ul>
            </li>
            <li aria-haspopup="true">
            <NavLink exact to="/about" className="nav-link" activeClassName="active">
              درباره ما
                 </NavLink>
              </li>
            <li aria-haspopup="true">
            <NavLink exact to="/contact" className="nav-link" activeClassName="active">
             تماس باما
                 </NavLink>
              </li>
            <li aria-haspopup="true" className="d-lg-none mt-5 pb-5 mt-lg-0">
              <span>
                <NavLink exact to="/doctors" className="btn btn-secondary" activeClassName="active">
                  نوبت گیری آنلاین
                 </NavLink>
                </span>
            </li>
          </ul>
          <ul className="mb-0">
            <li aria-haspopup="true" className="mt-5 d-none d-lg-block ">
            <span>
                <NavLink exact to="/doctors" className="btn btn-secondary" activeClassName="active">
                  نوبت گیری آنلاین
                 </NavLink>
                </span>
            </li>
          </ul>
        </nav>
        {/*Nav*/}
      </div>
    </div>
  </div>
</div>


      </div>
    )
  }
}


export default withRouter(Header)