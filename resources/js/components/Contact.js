import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Contact extends Component {
    render() {
        return (
            <div>
        <section>
            <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
            <div className="header-text mb-0">
                <div className="container">
                <div className="text-center text-white ">
                    <ol className="breadcrumb text-center">
                    <li className="breadcrumb-item"><Link to="/">صفحه اصلی</Link> </li>
                    <li className="breadcrumb-item"><Link to="/contact">تماس باما</Link></li>
                    </ol>
                </div>
                </div>
            </div>
            </div>
        </section>

  {/*Statistics*/}
  <section className="sptb bg-white">
    <div className="container">
      <div className="section-title center-block text-center">
        <h1>تماس و پشتیبانی</h1>
        <p>پشتیبانی سیستم داکترمن فقط برای امور وب اپلیکشن داکترمن میباشد و هیچ گونه ارتباطی به مراکزصحی و داکتران عضو اپلیکشن ندارد. برای تماس با داکتران و مراکزصحی فقط با شماره و راه های موجود در پروفایل آن ها تماس بگیرید.</p>
      </div>
      <div className="support">
        <div className="row text-white">
          <div className="col-xl-6 col-lg-12 col-md-12">
            <div className="support-service bg-primary br-2 mb-4 mb-xl-0">
              <i className="fa fa-phone" />
              <h6>0731000799</h6>
              <p>شماره تماس</p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12  col-md-12">
            <div className="support-service bg-secondary br-2">
              <i className="fa fa-envelope-o" />
              <h6>info@mydoctor.af</h6>
              <p>ایمیل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*/Statistics*/}

  {/*Contact*/}
  <div className="sptb">
    <div className="container">
      <div className="row">
        <div className="col-lg-4  col-md-12 mx-auto d-block">
          <div className="card mb-0">
            <div className="card-body">
              <div className="form-group">
                <input type="text" className="form-control" id="name1" placeholder="نام" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="ایمیل آدرس" />
              </div>
              <div className="form-group">
                <textarea className="form-control" name="example-textarea-input" rows={6} placeholder="پیام تان" defaultValue={""} />
              </div>
              <a href="#" className="btn btn-primary">ارسال پیام</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*Contact*/}

            </div>
        )
    }
}
