import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends Component {
  notify(){
    toast.error("No Gnomes found!", {
        position: toast.POSITION.TOP_CENTER
    });
 };

  render(){
    return (
      <div>
        {this.notify()}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default Notification;