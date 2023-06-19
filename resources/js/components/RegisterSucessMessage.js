import React, { Component } from 'react'

export default class RegisterSucessMessage extends Component {
    render() {
        return (
            <div>
            
            <div className="alert alert-success">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <strong>ثبت نام با موفقیت انجام شد</strong>
                <hr className="message-inner-separator" />
                <p>لطفا جهت تایید حساب تان ایمیل خود را چک نموده و بر روی لینک ارسالی ما کلیک کنید</p>
            </div>

            </div>
        )
    }
}
