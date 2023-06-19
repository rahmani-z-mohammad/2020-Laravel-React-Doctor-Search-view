import React, { Component } from 'react'

export default class AppointmentSucessMessage extends Component {
    render() {
        return (
            <div>
                
                <div className="alert alert-success">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <strong>نوبیت گیری با موفقیت انجام شد</strong>
                <hr className="message-inner-separator" />
                <p>تاییدی به ایمیل شما ارسال می گردد</p>
               </div>

            </div>
        )
    }
}
