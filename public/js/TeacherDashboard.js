'use strict';

const menuBtn = document.querySelector('#menu_btn');
const sidebar = document.querySelector('.sidebar');

// *Nav btns
const navBtnArr = document.querySelectorAll('.navBtn');

// *Nav Divs
const mainDiconstr = document.querySelectorAll('.main_div');

const annouceNewBtn = document.querySelector('.announceNewBtn');
const announceAddBtn = document.querySelector('.announceAddBtn');
const announceCancelBtn = document.querySelector('.announceCancelBtn');
const announceDiv = document.querySelector('.announceDiv');

if (menuBtn) {
  menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('active');
  });
}

if (annouceNewBtn) {
  annouceNewBtn.addEventListener('click', function () {
    announceDiv.classList.remove('d-none');
  });
}

if (announceCancelBtn) {
  announceCancelBtn.addEventListener('click', function () {
    announceDiv.classList.add('d-none');
  });
}

const enterMarksBtn = document.querySelector('.enterMarksBtn');
const cancelMarksBtn = document.querySelector('.cancelMarksBtn');
const addMarksDiv = document.querySelector('.addMarksDiv');
if (enterMarksBtn) {
  enterMarksBtn.addEventListener('click', function () {
    addMarksDiv.classList.remove('d-none');
    enterMarksBtn.classList.add('d-none');
  });
}
if (cancelMarksBtn) {
  cancelMarksBtn.addEventListener('click', function () {
    addMarksDiv.classList.add('d-none');
    enterMarksBtn.classList.remove('d-none');
  });
}

// *convert simple text to links
// const convertLinks = (input) => {
//   let text = input;
//   const linksFound = text.match(/(?:www|https?)[^\s]+/g);
//   const aLink = [];

//   if (linksFound != null) {
//     for (let i = 0; i < linksFound.length; i++) {
//       let replace = linksFound[i];
//       if (!linksFound[i].match(/(http(s?)):\/\//)) {
//         replace = 'http://' + linksFound[i];
//       }
//       let linkText = replace.split('/')[2];
//       if (linkText.substring(0, 3) == 'www') {
//         linkText = linkText.replace('www.', '');
//       }
//       if (linkText.match(/youtu/)) {
//         let youtubeID = replace.split('/').slice(-1)[0];
//         aLink.push(
//           '<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/' +
//             youtubeID +
//             '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
//         );
//       } else if (linkText.match(/vimeo/)) {
//         let vimeoID = replace.split('/').slice(-1)[0];
//         aLink.push(
//           '<div class="video-wrapper"><iframe src="https://player.vimeo.com/video/' +
//             vimeoID +
//             '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>'
//         );
//       } else {
//         aLink.push(
//           '<a href="' + replace + '" target="_blank">' + linkText + '</a>'
//         );
//       }
//       text = text
//         .split(linksFound[i])
//         .map((item) => {
//           return aLink[i].includes('iframe') ? item.trim() : item;
//         })
//         .join(aLink[i]);
//     }
//     return text;
//   } else {
//     return input;
//   }
// };
// module.exports = convertLinks;

//@ google charts script
// const express = require('express');
// const router = express.Router();
// const stuMarks = require('../../models/stuMarks');

// const stuMark = await stuMarks.findOne({});
// console.log(stuMark);
// console.log('marks from js: ', stuMark.submarks);
// console.log('mark from js: ', stuMark.submarks[0]);

// const { MongoClient } = require('mongodb');
// async function main() {
//   const uri =
//     'mongodb+srv://vin:<password>@cluster0.oau3jje.mongodb.net/?retryWrites=true&w=majority';
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// // }
// import express, { Router } from 'express';
// const router = Router();
// const app = express();
// import path from 'path';
// import mongoose from 'mongoose';
// import { stuMarks } from '../../routes/teacherdash';
// const stuMarks = require('../../routes/teacherdash.js');
google.charts.load('current', {
  packages: ['corechart', 'bar'],
});
google.charts.setOnLoadCallback(drawBasic);
function drawBasic() {
  const lolcity = ['LA', 'new york'];
  const lolded = [8175000, 2695000];
  const data = google.visualization.arrayToDataTable([
    ['City', '2010 Population'],
    // ['New York City, NY', 8175000],
    // ['Los Angeles, CA', 3792000],
    // ['Chicago, IL', 2695000],
    // ['Houston, TX', 2099000],
    // ['Philadelphia, PA', 1526000],
    [lolcity[0], lolded[0]],
    [lolcity[1], lolded[1]],
  ]);

  const options = {
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
  };

  const chart = new google.visualization.BarChart(
    document.getElementById('chart_div')
  );

  chart.draw(data, options);
}
