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
    } else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lng1 - lng2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        let kms = (dist * 1.609344).toFixed(2); // to convet into KM
        return kms;
    }
};