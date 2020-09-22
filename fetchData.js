'use strict';

const axios = require('axios');

const getClubsList = () => {
  return axios.get('https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.clubs.json')
      .then(res => res.data.clubs.sort((a, b) => {
        // Alphabetical sort
        return ( a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1 )
      }))
      .then(sortedClubs => {
        // Tag id to each club
        return sortedClubs.map((club, i) => {
          club.id = i + 1;
          return club;
        })
      })
}

module.exports = getClubsList;
