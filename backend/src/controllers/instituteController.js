

import Institute from "../models/Institute.js";

const safeNum = (val) => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};


/* ======================================================
   CREATE INSTITUTE (ADMIN)
====================================================== */
export const createInstitute = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      type,
      stream,
      courseGroup,
      examsAccepted,
      totalCourses,
      ranking,
      applyLink,
      imageUrl,
      brochureUrl,
      slug,
      shortDescription,
      estYear,
      syllabusPdfUrl,
      aboutUniversity,
      keyHighlights,
      placementRate,
      totalRecruiters,
      dedicatedPlacementTeam,
      topRecruiters,
      placementHighlights,
      faqs,
      gallery,
      HighestPackage,
      AveragePackage,
      collegeLogoUrl,
    } = req.body;

    if (
      !name ||
      !city ||
      !state ||
      !type ||
      !stream ||
      !courseGroup ||
      !imageUrl ||
      !brochureUrl
    ) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }


    const institute = await Institute.create({
      name,
      slug,
      shortDescription,
      city,
      state,
      type,
      AveragePackage: safeNum(AveragePackage),
      HighestPackage: safeNum(HighestPackage),
      stream: Array.isArray(stream) ? stream : stream.split(","),
      courseGroup: Array.isArray(courseGroup)
        ? courseGroup
        : courseGroup.split(","),
      examsAccepted: examsAccepted
        ? Array.isArray(examsAccepted)
          ? examsAccepted
          : examsAccepted.split(",")
        : [],
      totalCourses: safeNum(totalCourses),
      ranking,
      estYear: safeNum(estYear),
      aboutUniversity,
      keyHighlights: Array.isArray(keyHighlights)
        ? keyHighlights
        : keyHighlights
          ? keyHighlights.split("|")
          : [],
      placementRate: safeNum(placementRate),
      totalRecruiters: safeNum(totalRecruiters),
      dedicatedPlacementTeam:
        typeof dedicatedPlacementTeam === "boolean"
          ? dedicatedPlacementTeam
          : dedicatedPlacementTeam === "Yes",
      topRecruiters: Array.isArray(topRecruiters)
        ? topRecruiters
        : topRecruiters
          ? topRecruiters.split(",")
          : [],
      placementHighlights: Array.isArray(placementHighlights)
        ? placementHighlights
        : placementHighlights
          ? placementHighlights.split("|")
          : [],
      faqs: Array.isArray(faqs) ? faqs : faqs ? JSON.parse(faqs) : [],
      image: { url: imageUrl },
      collegeLogo: { url: collegeLogoUrl },
      brochure: { url: brochureUrl },
      syllabusPdf: syllabusPdfUrl ? { url: syllabusPdfUrl } : undefined,
      gallery: Array.isArray(gallery)
        ? gallery
        : gallery
          ? JSON.parse(gallery)
          : [],
      applyLink,
    });

    res.status(201).json(institute);
  } catch (error) {
    console.error("CREATE INSTITUTE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   GET ALL INSTITUTES (FILTER + SEARCH) ✅ examsAccepted filter added
====================================================== */
export const getInstitutes = async (req, res) => {
  try {
    const { stream, state, search, type, courseGroup, examsAccepted,city, } =
      req.query;

    let filters = [];

    // STATE FILTER
    if (state && state !== "All India") {
      filters.push({
        state: { $regex: new RegExp(state.trim(), "i") },
      });
    }

    // CITY FILTER
    if (city && city !== "All Cities") {
      filters.push({
        city: { $regex: new RegExp(city.trim(), "i") },
      });
    }

    // TYPE FILTER
    if (type) {
      const types = type.split(",").map((t) => t.trim());
      filters.push({
        type: { $in: types },
      });
    }

    // STREAM FILTER
    if (stream) {
      filters.push({
        stream: {
          $in: stream.split(",").map((s) => new RegExp(s.trim(), "i")),
        },
      });
    }

    // COURSE FILTER
    if (courseGroup) {
      filters.push({
        courseGroup: {
          $in: courseGroup.split(",").map((c) => new RegExp(c.trim(), "i")),
        },
      });
    }

    // ✅ EXAMS ACCEPTED FILTER (NEW — ExamDetails page ke liye)
    if (examsAccepted) {
      filters.push({
        examsAccepted: {
          $in: examsAccepted.split(",").map((e) => new RegExp(e.trim(), "i")),
        },
      });
    }

    // GLOBAL SEARCH
    // GLOBAL SEARCH
    if (search && search.trim() !== "") {
      const words = search
        .trim()
        .split(" ")
        .filter((w) => w.length > 1); // single letter ignore

      const searchConditions = [];

      words.forEach((word) => {
        searchConditions.push(
          { name: { $regex: word, $options: "i" } },
          { city: { $regex: word, $options: "i" } },
          { state: { $regex: word, $options: "i" } },
          { stream: { $elemMatch: { $regex: word, $options: "i" } } },
          { courseGroup: { $elemMatch: { $regex: word, $options: "i" } } },
        );
      });

      filters.push({ $or: searchConditions });
    }
    const query = filters.length ? { $and: filters } : {};

    //  console.log("📊 Query Filters:", JSON.stringify(query, null, 2));  Debug log

    const institutes = await Institute.find(query)
      .select(
        "name city state type ranking image collegeLogo HighestPackage AveragePackage examsAccepted stream courseGroup slug  totalCourses brochure",
      )
      .sort({ createdAt: -1 });

    // console.log(`✅ Found ${institutes.length} institutes`);  Debug log

    res.status(200).json({
      total: institutes.length,
      institutes,
    });
  } catch (error) {
    console.error("❌ GET INSTITUTES ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ======================================================
   GET SINGLE INSTITUTE (EDIT PAGE)
====================================================== */
export const getInstituteById = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.status(200).json(institute);
  } catch (error) {
    console.error("GET INSTITUTE BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   UPDATE INSTITUTE (ADMIN)
====================================================== */



export const updateInstitute = async (req, res) => {
  try {
    const {
      imageUrl,
      brochureUrl,
      collegeLogoUrl,
      syllabusPdfUrl,
      ...rest
    } = req.body;


    const updateData = {
      ...rest,
      estYear: safeNum(rest.estYear),
      totalCourses: safeNum(rest.totalCourses),
      AveragePackage: safeNum(rest.AveragePackage),
      HighestPackage: safeNum(rest.HighestPackage),
      placementRate: safeNum(rest.placementRate),
      totalRecruiters: safeNum(rest.totalRecruiters),

      stream: req.body.stream ? req.body.stream.split(",") : undefined,
      courseGroup: req.body.courseGroup
        ? req.body.courseGroup.split(",")
        : undefined,
      examsAccepted: req.body.examsAccepted
        ? req.body.examsAccepted.split(",")
        : undefined,
      keyHighlights: req.body.keyHighlights
        ? req.body.keyHighlights.split("|")
        : undefined,
      placementHighlights: req.body.placementHighlights
        ? req.body.placementHighlights.split("|")
        : undefined,
      topRecruiters: Array.isArray(req.body.topRecruiters)
        ? req.body.topRecruiters
        : req.body.topRecruiters
          ? JSON.parse(req.body.topRecruiters)
          : undefined,
      faqs: Array.isArray(req.body.faqs)
        ? req.body.faqs
        : req.body.faqs
          ? JSON.parse(req.body.faqs)
          : undefined,
      gallery: Array.isArray(req.body.gallery)
        ? req.body.gallery
        : req.body.gallery
          ? JSON.parse(req.body.gallery)
          : undefined,
    };

    // ✅ Proper nested media update
    if (imageUrl) updateData.image = { url: imageUrl };
    if (collegeLogoUrl) updateData.collegeLogo = { url: collegeLogoUrl };
    if (brochureUrl) updateData.brochure = { url: brochureUrl };
    if (syllabusPdfUrl)
      updateData.syllabusPdf = { url: syllabusPdfUrl };

    const updated = await Institute.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("UPDATE INSTITUTE ERROR:", error);
    res.status(500).json({ 
      message: "Update failed", 
      error: error.message,
      details: error.errors // Validation errors logic
    });
  }
};

/* ======================================================
   DELETE INSTITUTE (ADMIN)
====================================================== */
export const deleteInstitute = async (req, res) => {
  try {
    const institute = await Institute.findByIdAndDelete(req.params.id);

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.status(200).json({ message: "Institute deleted successfully" });
  } catch (error) {
    console.error("DELETE INSTITUTE ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

// getinstitebyslug

export const getInstituteBySlug = async (req, res) => {
  try {
    const institute = await Institute.findOne({
      slug: req.params.slug,
    });

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    res.status(200).json(institute);
  } catch (error) {
    console.error("GET INSTITUTE BY SLUG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   DOWNLOAD INSTITUTE PDF
====================================================== */
export const downloadInstitutePDF = async (req, res) => {
  try {
    const institute = await Institute.findById(req.params.id);

    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    const PDFDocument = (await import("pdfkit")).default;

    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${institute.name.replace(/[^a-z0-9]/gi, "_")}_Details.pdf"`,
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .fillColor("#DC2626")
      .text("MyCollege.", { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(20)
      .fillColor("#0B1C33")
      .text(institute.name, { align: "center" })
      .moveDown(0.3);

    doc
      .fontSize(12)
      .fillColor("#64748b")
      .text(`${institute.city}, ${institute.state}`, { align: "center" })
      .moveDown(2);

    doc
      .strokeColor("#e2e8f0")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke()
      .moveDown();

    doc
      .fontSize(16)
      .fillColor("#0B1C33")
      .text("Basic Information", { underline: true })
      .moveDown(0.5);

    doc.fontSize(11).fillColor("#475569");

    const basicInfo = [
      ["Institute Type:", institute.type || "N/A"],
      ["Location:", `${institute.city}, ${institute.state}`],
      ["Established:", institute.estYear || "N/A"],
      ["Ranking:", institute.ranking || "N/A"],
      ["Total Courses:", institute.totalCourses || "N/A"],
    ];

    basicInfo.forEach(([label, value]) => {
      doc
        .text(label, 50, doc.y, { continued: true, width: 150 })
        .fillColor("#0B1C33")
        .text(value, { width: 350 })
        .fillColor("#475569")
        .moveDown(0.3);
    });

    doc.moveDown();

    doc
      .fontSize(16)
      .fillColor("#0B1C33")
      .text("Placement Statistics", { underline: true })
      .moveDown(0.5);

    doc.fontSize(11).fillColor("#475569");

    const placementInfo = [
      ["Average Package:", `₹ ${institute.AveragePackage || 0} LPA`],
      ["Highest Package:", `₹ ${institute.HighestPackage || 0} LPA`],
      ["Placement Rate:", `${institute.placementRate || 0}%`],
      ["Total Recruiters:", institute.totalRecruiters || "N/A"],
    ];

    placementInfo.forEach(([label, value]) => {
      doc
        .text(label, 50, doc.y, { continued: true, width: 150 })
        .fillColor("#0B1C33")
        .text(value, { width: 350 })
        .fillColor("#475569")
        .moveDown(0.3);
    });

    if (institute.topRecruiters && institute.topRecruiters.length > 0) {
      doc.moveDown(0.5);
      doc
        .fillColor("#475569")
        .text("Top Recruiters:", 50, doc.y, { continued: true, width: 150 })
        .fillColor("#0B1C33")
        .text(institute.topRecruiters.join(", "), { width: 350 })
        .fillColor("#475569");
    }

    doc.moveDown();

    doc
      .fontSize(16)
      .fillColor("#0B1C33")
      .text("Courses & Programs", { underline: true })
      .moveDown(0.5);

    doc.fontSize(11).fillColor("#475569");

    if (institute.stream && institute.stream.length > 0) {
      doc
        .text("Streams:", 50, doc.y, { continued: true, width: 150 })
        .fillColor("#0B1C33")
        .text(institute.stream.join(", "), { width: 350 })
        .fillColor("#475569")
        .moveDown(0.3);
    }

    if (institute.courseGroup && institute.courseGroup.length > 0) {
      doc
        .text("Course Groups:", 50, doc.y, { continued: true, width: 150 })
        .fillColor("#0B1C33")
        .text(institute.courseGroup.join(", "), { width: 350 })
        .fillColor("#475569")
        .moveDown(0.3);
    }

    doc.moveDown();

    doc
      .fontSize(16)
      .fillColor("#0B1C33")
      .text("Admission Information", { underline: true })
      .moveDown(0.5);

    doc.fontSize(11).fillColor("#475569");

    if (institute.examsAccepted && institute.examsAccepted.length > 0) {
      doc
        .text("Exams Accepted:", 50, doc.y, { continued: true, width: 150 })
        .fillColor("#0B1C33")
        .text(institute.examsAccepted.join(", "), { width: 350 })
        .fillColor("#475569")
        .moveDown(0.3);
    }

    if (institute.applyLink) {
      doc
        .text("Apply Link:", 50, doc.y, { continued: true, width: 150 })
        .fillColor("#DC2626")
        .text(institute.applyLink, { width: 350, link: institute.applyLink })
        .fillColor("#475569");
    }

    doc.moveDown(2);

    doc
      .fontSize(10)
      .fillColor("#94a3b8")
      .text("This document is generated by MyCollege platform", {
        align: "center",
      })
      .moveDown(0.3);

    doc
      .fontSize(8)
      .text(`Generated on: ${new Date().toLocaleDateString("en-IN")}`, {
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.error("❌ PDF DOWNLOAD ERROR:", error);
    res.status(500).json({
      message: "Error generating PDF",
      error: error.message,
    });
  }
};
