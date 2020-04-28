const logger = require('tracer').colorConsole();


exports.getEta = (distance) => {
    return Math.round(((60 * distance) / 20));
}

exports.getDistance = (lat1, lng1, lat2, lng2) => {
    lat1 = parseFloat(lat1);
    lat2 = parseFloat(lat2);
    lng1 = parseFloat(lng1);
    lng2 = parseFloat(lng2);


    if ((lat1 == lat2) && (lng1 == lng2)) {
        return 0;
    }
    else {
        let deg2rad = (deg) => deg * (Math.PI / 180);

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);
        let dLong = deg2rad(lng2 - lng1);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = Math.round(R * c); // Distance in km
        return d;
    }
};