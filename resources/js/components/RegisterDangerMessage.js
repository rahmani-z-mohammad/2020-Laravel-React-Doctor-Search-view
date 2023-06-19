import React, { Component } from 'react'

export default class RegisterDangerMessage extends Component {
    render() {
        return (
            <div>
                
                <div className="alert alert-danger">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                <strong>ثبت نام موفقیت آمیز نبود</strong>
                <hr className="message-inner-separator" />
                <p>ثبت نام تان با مشکل مواجه شده است، لطفا بعدا کوشش کنید</p>
                </div>

            </div>
        )
    }
}
