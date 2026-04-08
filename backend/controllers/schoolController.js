const db = require("../config/db");
const calculateDistance = require("../utils/haversine");

exports.addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: "Valid name is required" });
    }
    if (!address || typeof address !== 'string' || address.trim() === '') {
      return res.status(400).json({ success: false, message: "Valid address is required" });
    }
    if (latitude === undefined || latitude === null || isNaN(latitude)) {
      return res.status(400).json({ success: false, message: "Latitude must be a valid number" });
    }
    if (longitude === undefined || longitude === null || isNaN(longitude)) {
      return res.status(400).json({ success: false, message: "Longitude must be a valid number" });
    }

    const sql = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]);

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    });

  } catch (err) {
    next(err);
  }
};

exports.listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: "Valid user latitude and longitude are required as query parameters"
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const [schools] = await db.query("SELECT * FROM schools");

    const sortedSchools = schools.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distanceVal: distance, 
        distance: distance.toFixed(2) + " km" 
      };
    });

    sortedSchools.sort((a, b) => a.distanceVal - b.distanceVal);

    const polishedSchools = sortedSchools.map(({ distanceVal, ...rest }) => rest);

    res.json({
      success: true,
      message: "Schools retrieved successfully",
      data: polishedSchools
    });

  } catch (err) {
    next(err);
  }
};