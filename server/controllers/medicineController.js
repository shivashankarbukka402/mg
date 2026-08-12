const Medicine = require('../models/Medicine');

// @route GET /api/medicines?category=&search=&sort=&page=&limit=
const getMedicines = async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 12, minPrice, maxPrice } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'priceLowHigh') sortOption = { price: 1 };
    if (sort === 'priceHighLow') sortOption = { price: -1 };
    if (sort === 'popularity') sortOption = { reviewCount: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [medicines, total] = await Promise.all([
      Medicine.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
      Medicine.countDocuments(query),
    ]);

    res.json({ medicines, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/medicines/:id
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route POST /api/medicines (admin)
const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route PUT /api/medicines/:id (admin)
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @route DELETE /api/medicines/:id (admin)
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMedicines, getMedicineById, createMedicine, updateMedicine, deleteMedicine };
