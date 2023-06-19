import React, { Component } from 'react'

export default class AppointmentDangerMessage extends Component {
    render() {
        return (
            <div>
                
                <div className="alert alert-danger">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <strong>نوبت گیری موفقیت آمیز نبود</strong>
                <hr className="message-inner-separator" />
                <p>لطفا اول در سیستم ثبت نام نمایید و با استفاده از کد نوبت گیری دوباره کوش نمایید.</p>
                </div>

            </div>
        )
    }
}
