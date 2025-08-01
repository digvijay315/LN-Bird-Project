const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  bannerTitle: { type: String},
  bannerLink: { type: String },
  sliderBannerImage: { type: Array }, // URL from Cloudinary
  productBannerImage: { type: Array }, // URL from Cloudinary
}, { timestamps: true });

const banner = mongoose.model('Banner', bannerSchema);
module.exports = banner
