'use strict';

const moment = require('moment');
const _ = {
  extend: require('lodash/extend'),
  pickBy: require('lodash/pickBy')
};

const searchConverter = module.exports = {
  toTripAppHotel(search) {
    return _.pickBy(_.extend({}, search, {
      hotel_stay_date: moment(search.outbound_date).subtract('days', 1).format('YYYY-MM-DD'),
      park_to: search.inbound_date,
      hotel_room_type: 'D20',
      product_type: 'hotel'
    }));
  },
  toTripAppLounge(search) {
    return _.pickBy(_.extend({}, search, {
      from: moment(search.outbound_date + ' ' + search.carpark_checkin_time).format('YYYY-MM-DD HH:mm'),
      product_type: 'lounge',
      adults: 2
    }));
  },
  toTripAppHotelLink(search) {
    const hotelSearch = searchConverter.toTripAppHotel(search);
    return {
      depart: hotelSearch.depart_airport_iata,
      terminal: hotelSearch.depart_airport_terminal,
      arrive: hotelSearch.arrive_airport_iata,
      flight: hotelSearch.outbound_flight_number,
      out: hotelSearch.outbound_date,
      in: hotelSearch.inbound_date,
      stay: hotelSearch.hotel_stay_date,
      room_1: hotelSearch.hotel_room_type,
      agent: hotelSearch.agent
    };
  },
  toTripAppLoungeLink(search) {
    const loungeSearch = searchConverter.toTripAppLounge(search);
    return {
      depart: loungeSearch.depart_airport_iata,
      terminal: loungeSearch.depart_airport_terminal,
      flight: loungeSearch.outbound_flight_number,
      from: loungeSearch.from,
      adults: loungeSearch.adults,
      children: 0,
      infants: 0,
      agent: loungeSearch.agent
    };
  },
  toSDKHotel(search) {
    const hotelSearch = searchConverter.toTripAppHotel(search);
    return {
      check_in: hotelSearch.hotel_stay_date,
      room_types: [hotelSearch.hotel_room_type],
      returning: hotelSearch.inbound_date,
      productType: 'hotels',
      agent: hotelSearch.agent,
      location: hotelSearch.depart_airport_iata,
      out_flight: hotelSearch.outbound_flight_number
    };
  },
  toSDKLounge(search) {
    const loungeSearch = searchConverter.toTripAppLounge(search);

    return {
      terminal: loungeSearch.depart_airport_terminal,
      out_flight: loungeSearch.outbound_flight_number,
      from: loungeSearch.from,
      adults: loungeSearch.adults,
      children: 0,
      infants: 0,
      productType: 'lounges',
      agent: loungeSearch.agent,
      location: loungeSearch.depart_airport_iata
    };
  }
};
