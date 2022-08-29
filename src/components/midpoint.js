const toRadians = (degrees) =>
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

const toDegrees = (x) => {
    var pi = Math.PI;
    return x * (180/pi)
}
const midpointTo = (point1, point2) => {
    // φm = atan2( sinφ1 + sinφ2, √( (cosφ1 + cosφ2⋅cosΔλ)² + cos²φ2⋅sin²Δλ ) )
    // λm = λ1 + atan2(cosφ2⋅sinΔλ, cosφ1 + cosφ2⋅cosΔλ)
    // midpoint2 is sum of vectors to two point2s: mathforum.org/library/drmath/view/51822.html

    const φ1 = toRadians(point1.lat)
    const λ1 = toRadians(point1.lon)
    const φ2 = toRadians(point2.lat);
    const Δλ = toRadians(point2.lon-point1.lon);

    // get cartesian coordinates for the two point2s
    const A = { x: Math.cos(φ1), y: 0, z: Math.sin(φ1) }; // place point2 A on prime meridian y=0
    const B = { x: Math.cos(φ2)*Math.cos(Δλ), y: Math.cos(φ2)*Math.sin(Δλ), z: Math.sin(φ2) };

    // vector to midpoint2 is sum of vectors to two point2s (no need to normalise)
    const C = { x: A.x + B.x, y: A.y + B.y, z: A.z + B.z };

    const φm = Math.atan2(C.z, Math.sqrt(C.x*C.x + C.y*C.y));
    const λm = λ1 + Math.atan2(C.y, C.x);

    const lat = toDegrees(φm);
    const lon = toDegrees(λm);

    const midpoint = {
        latitude: lat,
        longitude: lon
    }

    return midpoint
}

let pointA = {
    lat: 36,
    lon: -40
}

let pointB = {
    lat: -60,
    lon: 25
}

console.log(midpointTo(pointA, pointB))