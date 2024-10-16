import React from 'react'

function TimeAgo({ timestamp }) {
    const now = new Date();
    const then = new Date(timestamp);
    const difference = now - then;
  
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
  
    if (difference < minute) {
      return `${Math.floor(difference / second)} seconds ago`;
    } else if (difference < hour) {
      return `${Math.floor(difference / minute)} minutes ago`;
    } else if (difference < day) {
      return `${Math.floor(difference / hour)} hours ago`;
    } else if (difference < year) {
      const days = Math.floor(difference / day);
      return `${days} ${days === 1 ? 'day ago' : 'days ago'}`;
    } else {
      const years = Math.floor(difference / year);
      return `${years} ${years === 1 ? 'year ago' : 'years ago'}`;
    }
  }
  
  export default TimeAgo;