import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* =========================
   __dirname fix (ESM me nahi hota)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// excel file ka path
const FILE_PATH = path.join(__dirname, "../data/admissions.xlsx");

/* =========================
   SUBMIT FORM (WRITE)
========================= */
export const submitAdmission = (req, res) => {
  try {
    const newData = req.body;
    let data = [];

    if (fs.existsSync(FILE_PATH)) {
      const workbook = XLSX.readFile(FILE_PATH);
      const sheet = workbook.Sheets["Sheet1"];
      data = XLSX.utils.sheet_to_json(sheet);
    }

    data.push({
      name: newData.name || "", // ✅ FIX: name field is required in frontend
      email: newData.email || "",
      phone: newData.phone || "",
      course: newData.course || "",
      extraInfo: newData.extraInfo || "", 
      createdAt: new Date().toISOString(), // ✅ FIX
    });



    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
    XLSX.writeFile(workbook, FILE_PATH);

    res.json({ success: true, message: "Data saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* =========================
   GET DATA (READ)
========================= */
export const getAdmissions = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!fs.existsSync(FILE_PATH)) {
      return res.json({
        data: [],
        total: 0,
        page,
        totalPages: 0,
      });
    }

    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets["Sheet1"];

    let data = XLSX.utils.sheet_to_json(sheet);

    // 🔥🔥 MOST IMPORTANT LINE 🔥🔥
    // NEWEST FIRST
    data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;

    const paginatedData = data.slice(startIndex, startIndex + limit);

    res.json({
      data: paginatedData,
      total,
      page,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllAdmissions = (req, res) => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return res.json({ data: [] });
    }

    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets["Sheet1"];
    let data = XLSX.utils.sheet_to_json(sheet);

    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};