const prisma = require("../prisma");

// VALIDATION HELPER
const validateStudentData = ({ name, email, age, course }, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      errors.push("Name is required");
    }
  }

  if (!isUpdate || email !== undefined) {
    if (typeof email !== "string" || email.trim() === "") {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email format");
    }
  }

  if (!isUpdate || age !== undefined) {
    const numericAge = Number(age);

    if (age === "" || age === null || age === undefined || !Number.isInteger(numericAge)) {
      errors.push("Age must be a valid integer");
    } else if (numericAge < 1 || numericAge > 100) {
      errors.push("Age must be between 1 and 100");
    }
  }

  if (!isUpdate || course !== undefined) {
    if (typeof course !== "string" || course.trim() === "") {
      errors.push("Course is required");
    }
  }

  return errors;
};


// CREATE STUDENT
const createStudent = async (req, res, next) => {
  try {
    const { name, email, age, course } = req.body;

    const errors = validateStudentData({
      name,
      email,
      age,
      course
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }

    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        age: Number(age),
        course: course.trim()
      }
    });

    res.status(201).json(student);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    next(error);
  }
};


// GET ALL STUDENTS
const getStudents = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        id: "asc"
      }
    });

    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};


// GET STUDENT BY ID
const getStudentById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const student = await prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};


// UPDATE STUDENT
const updateStudent = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id }
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const { name, email, age, course } = req.body;

    if (
      name === undefined &&
      email === undefined &&
      age === undefined &&
      course === undefined
    ) {
      return res.status(400).json({
        message: "At least one field is required for update"
      });
    }

    const errors = validateStudentData(
      {
        name,
        email,
        age,
        course
      },
      true
    );

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors
      });
    }

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(email !== undefined && {
          email: email.trim().toLowerCase()
        }),
        ...(age !== undefined && {
          age: Number(age)
        }),
        ...(course !== undefined && {
          course: course.trim()
        })
      }
    });

    res.status(200).json(student);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    next(error);
  }
};


// DELETE STUDENT
const deleteStudent = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid student ID"
      });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id }
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    await prisma.student.delete({
      where: { id }
    });

    res.status(200).json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};