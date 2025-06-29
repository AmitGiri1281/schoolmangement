import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/AdminDashboard.css'; 
const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('classes');

  const sampleClasses = [
    { id: 1, name: 'Mathematics Grade 10', students: 32 },
    { id: 2, name: 'Physics Grade 11', students: 28 },
    { id: 3, name: 'Calculus Grade 12', students: 25 },
  ];

  return (
    <div className="teacher-dashboard">
      <div className="teacher-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome back, Mr. Johnson</p>
      </div>
      
      <div className="teacher-tabs">
        <button 
          className={activeTab === 'classes' ? 'active' : ''}
          onClick={() => setActiveTab('classes')}
        >
          My Classes
        </button>
        <button 
          className={activeTab === 'attendance' ? 'active' : ''}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </button>
        <button 
          className={activeTab === 'grades' ? 'active' : ''}
          onClick={() => setActiveTab('grades')}
        >
          Grades
        </button>
      </div>

      <div className="teacher-content">
        {activeTab === 'classes' && (
          <div className="classes-container">
            <h2>Your Classes</h2>
            <div className="class-cards">
              {sampleClasses.map(cls => (
                <div key={cls.id} className="class-card">
                  <h3>{cls.name}</h3>
                  <p>Students: {cls.students}</p>
                  <button className="view-btn">View Class</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'attendance' && (
          <div className="attendance-container">
            <h2>Attendance Management</h2>
            {/* Attendance content would go here */}
          </div>
        )}
        
        {activeTab === 'grades' && (
          <div className="grades-container">
            <h2>Grade Management</h2>
            {/* Grades content would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;