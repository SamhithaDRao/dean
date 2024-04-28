const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware to handle request bodies
app.use(express.json());

// Mock data for demonstration with students added
let courses = [
  { 
    id: 1, 
    code: '20CS3CSJP', 
    name: 'Introduction to Java Programming', 
    approved: false,
    students: [
      { id: 1, usn: '1BM20CS112', name: 'Prathvi Puthran', approved: false },
      { id: 2, usn: '1BM20CS161', name: 'Spoorthi Udupa', approved: false },
    ]
  },
  { 
    id: 2, 
    code: '20CS3CSDS', 
    name: 'Data Science', 
    approved: false,
    students: [
      { id: 1, usn: '1BM20CS141', name: 'Samhitha D', approved: false },
      { id: 2, usn: '1BM20CS160', name: 'Siri Prahlad', approved: false },
    ]
  },
  // Add more courses as needed
];

app.get('/', (req, res) => {
    res.send('Express Server is running');
});

// Endpoint to get the list of courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Endpoint to approve a course
app.post('/api/courses/approve/:id', (req, res) => {
  const { id } = req.params;
  courses = courses.map(course => course.id === parseInt(id) ? { ...course, approved: true } : course);
  res.json({ message: `Course with ID ${id} approved` });
});

// Endpoint to reject a course
app.post('/api/courses/reject/:id', (req, res) => {
  const { id } = req.params;
  courses = courses.map(course => course.id === parseInt(id) ? { ...course, approved: false } : course);
  res.json({ message: `Course with ID ${id} rejected` });
});

// Endpoint to approve a student in a course
app.post('/api/courses/:courseId/approve/student/:studentId', (req, res) => {
  const { courseId, studentId } = req.params;
  courses = courses.map(course => {
    if (course.id === parseInt(courseId)) {
      course.students = course.students.map(student => 
        student.id === parseInt(studentId) ? { ...student, approved: true } : student);
    }
    return course;
  });
  res.json({ message: `Student with ID ${studentId} in course ID ${courseId} approved` });
});

// Endpoint to reject a student in a course
app.post('/api/courses/:courseId/reject/student/:studentId', (req, res) => {
  const { courseId, studentId } = req.params;
  courses = courses.map(course => {
    if (course.id === parseInt(courseId)) {
      course.students = course.students.map(student => 
        student.id === parseInt(studentId) ? { ...student, approved: false } : student);
    }
    return course;
  });
  res.json({ message: `Student with ID ${studentId} in course ID ${courseId} rejected` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
