const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// GET /api/settings/public — Public: get public settings
router.get('/public', async (req, res) => {
  try {
    const phone = await Settings.findOne({ key: 'ownerPhone' });
    const hours = await Settings.findOne({ key: 'businessHours' });
    res.json({
      ownerPhone: phone?.value || '919999999999',
      businessHours: hours?.value || 'Subah 6 baje - Raat 10 baje',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/settings — Admin: get all settings
router.get('/', auth, async (req, res) => {
  try {
    const settings = await Settings.find();
    const obj = {};
    settings.forEach(s => { obj[s.key] = s.value; });
    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/settings — Admin: upsert a setting
router.post('/', auth, async (req, res) => {
  try {
    const { key, value } = req.body;
    const setting = await Settings.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
    res.json(setting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
