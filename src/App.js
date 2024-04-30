import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Header'; // Main application header
import Footer from './Footer'; // Main application footer
import LoginHeader from './LoginHeader'; // Login specific header

import LoginPage from './LoginPage';
import DeanLogin from './DeanLogin';
import CourseList from './CourseList';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [courses, setCourses] = useState([]);
  const location = useLocation(); // Gets the current location

  useEffect(() => {
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Handlers for course and student status updates
  const handleApprove = (courseCode) => {
    fetch(`/api/courses/approve/${courseCode}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Update the state to reflect that the course has been approved
        setCourses(courses.map(course => 
          course.code === courseCode ? { ...course, approved: true } : course
        ));
      })
      .catch(error => console.error('Error approving course:', error));
  };

  const handleReject = (courseCode) => {
    console.log("Rejecting course with code:", courseCode); // This will show what code is being sent
    fetch(`/api/courses/reject/${courseCode}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data); // This will show what the server responded
            setCourses(prevCourses => prevCourses.filter(course => course.code !== courseCode));
        })
        .catch(error => console.error('Error rejecting course:', error));
};


  const handleStudentApprove = (courseId, studentId) => {
    fetch(`/api/courses/${courseId}/approve/student/${studentId}`, { method: 'POST' })
      .then(() => {
        setCourses(courses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              students: course.students.map(student => 
                student.id === studentId ? { ...student, approved: true } : student
              )
            };
          }
          return course;
        }));
      })
      .catch(error => console.error('Error approving student:', error));
  };

  const handleStudentReject = (courseId, studentId) => {
    fetch(`/api/courses/${courseId}/reject/student/${studentId}`, { method: 'POST' })
      .then(() => {
        setCourses(courses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              students: course.students.map(student => 
                student.id === studentId ? { ...student, approved: false } : student
              )
            };
          }
          return course;
        }));
      })
      .catch(error => console.error('Error rejecting student:', error));
  };

  // Check if the current path is one of the login pages
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/dean-login';

  return (
    <>
      {isLoginRoute ? <LoginHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dean-login" element={<DeanLogin />} />
        <Route path="/main" element={
          <main>
            <CourseList 
              courses={courses}
              onApprove={handleApprove}
              onReject={handleReject}
              onStudentApprove={handleStudentApprove}
              onStudentReject={handleStudentReject}
            />
          </main>
        } />
        {/* Additional routes for other parts of the application can be added here */}
      </Routes>
      {isLoginRoute ? <Footer /> : <Footer />}
    </>
  );
}

export default AppWrapper;
