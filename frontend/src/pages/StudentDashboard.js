import React, { useState, useEffect } from 'react';
import { FiCalendar, FiBook, FiClipboard, FiDownload, FiUser, FiBell, FiLogOut, FiHome, FiPieChart, FiClock } from 'react-icons/fi';
import '../styles/main.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Sample data
  const sampleSchedule = [
    { 
      day: 'Monday', 
      date: 'Jun 10',
      classes: [
        { name: 'Mathematics', time: '8:00 - 9:30', room: 'Room 302', teacher: 'Mr. Johnson' },
        { name: 'Physics', time: '9:45 - 11:15', room: 'Lab 101', teacher: 'Dr. Smith' },
        { name: 'English', time: '11:30 - 13:00', room: 'Room 205', teacher: 'Ms. Davis' },
        { name: 'History', time: '14:00 - 15:30', room: 'Room 110', teacher: 'Mr. Brown' }
      ] 
    },
    { 
      day: 'Tuesday', 
      date: 'Jun 11',
      classes: [
        { name: 'Chemistry', time: '8:00 - 9:30', room: 'Lab 102', teacher: 'Dr. Wilson' },
        { name: 'Mathematics', time: '9:45 - 11:15', room: 'Room 302', teacher: 'Mr. Johnson' },
        { name: 'Physical Education', time: '11:30 - 13:00', room: 'Gym', teacher: 'Coach Taylor' },
        { name: 'Art', time: '14:00 - 15:30', room: 'Art Studio', teacher: 'Ms. Rodriguez' }
      ] 
    },
    { 
      day: 'Wednesday', 
      date: 'Jun 12',
      classes: [
        { name: 'Physics', time: '8:00 - 9:30', room: 'Lab 101', teacher: 'Dr. Smith' },
        { name: 'English', time: '9:45 - 11:15', room: 'Room 205', teacher: 'Ms. Davis' },
        { name: 'Mathematics', time: '11:30 - 13:00', room: 'Room 302', teacher: 'Mr. Johnson' },
        { name: 'Music', time: '14:00 - 15:30', room: 'Music Hall', teacher: 'Mr. Williams' }
      ] 
    },
    { 
      day: 'Thursday', 
      date: 'Jun 13',
      classes: [
        { name: 'History', time: '8:00 - 9:30', room: 'Room 110', teacher: 'Mr. Brown' },
        { name: 'Chemistry', time: '9:45 - 11:15', room: 'Lab 102', teacher: 'Dr. Wilson' },
        { name: 'Physics', time: '11:30 - 13:00', room: 'Lab 101', teacher: 'Dr. Smith' },
        { name: 'Physical Education', time: '14:00 - 15:30', room: 'Gym', teacher: 'Coach Taylor' }
      ] 
    },
    { 
      day: 'Friday', 
      date: 'Jun 14',
      classes: [
        { name: 'English', time: '8:00 - 9:30', room: 'Room 205', teacher: 'Ms. Davis' },
        { name: 'Mathematics', time: '9:45 - 11:15', room: 'Room 302', teacher: 'Mr. Johnson' },
        { name: 'Art', time: '11:30 - 13:00', room: 'Art Studio', teacher: 'Ms. Rodriguez' },
        { name: 'Assembly', time: '14:00 - 15:30', room: 'Auditorium', teacher: 'Principal' }
      ] 
    },
  ];

  const gradesData = [
    { subject: 'Mathematics', grade: 'A', progress: 92, assignments: 12, completed: 11 },
    { subject: 'Physics', grade: 'B+', progress: 87, assignments: 10, completed: 9 },
    { subject: 'English', grade: 'A-', progress: 90, assignments: 8, completed: 8 },
    { subject: 'History', grade: 'B', progress: 83, assignments: 9, completed: 8 },
    { subject: 'Chemistry', grade: 'A-', progress: 91, assignments: 11, completed: 10 },
    { subject: 'Art', grade: 'A', progress: 95, assignments: 6, completed: 6 },
  ];

  const attendanceData = {
    totalClasses: 120,
    present: 112,
    absent: 8,
    percentage: 93.3,
    recentAbsences: [
      { date: 'May 15', subject: 'Chemistry', reason: 'Illness' },
      { date: 'April 22', subject: 'Physical Education', reason: 'Family event' },
      { date: 'March 8', subject: 'History', reason: 'Doctor appointment' },
    ]
  };

  const resourcesData = [
    { name: 'Mathematics Textbook', type: 'PDF', size: '12MB', subject: 'Math', date: 'Jun 1' },
    { name: 'Physics Lab Manual', type: 'PDF', size: '8MB', subject: 'Physics', date: 'May 28' },
    { name: 'English Essay Guide', type: 'DOC', size: '5MB', subject: 'English', date: 'Jun 5' },
    { name: 'History Timeline', type: 'PPT', size: '15MB', subject: 'History', date: 'May 20' },
    { name: 'Chemistry Formulas', type: 'PDF', size: '3MB', subject: 'Chemistry', date: 'Jun 8' },
  ];

  // Simulate fetching notifications
  useEffect(() => {
    const mockNotifications = [
      { id: 1, title: 'New assignment posted', message: 'Math homework due Friday', time: '2 hours ago', read: false },
      { id: 2, title: 'Grade updated', message: 'Physics test score available', time: '1 day ago', read: false },
      { id: 3, title: 'Class canceled', message: 'Chemistry lab canceled tomorrow', time: '3 days ago', read: true },
      { id: 4, title: 'School event', message: 'Parent-teacher conferences next week', time: '1 week ago', read: true },
    ];
    setNotifications(mockNotifications);
    setUnreadNotifications(mockNotifications.filter(n => !n.read).length);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const markNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadNotifications(0);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const getCurrentClass = () => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const today = sampleSchedule.find(day => day.day === formatDate(now).split(',')[0]);
    if (!today) return null;
    
    for (const cls of today.classes) {
      const [start, end] = cls.time.split(' - ');
      const [startHour, startMinute] = start.split(':').map(Number);
      const [endHour, endMinute] = end.split(':').map(Number);
      
      const classStart = new Date();
      classStart.setHours(startHour, startMinute, 0, 0);
      
      const classEnd = new Date();
      classEnd.setHours(endHour, endMinute, 0, 0);
      
      if (now >= classStart && now <= classEnd) {
        return cls;
      }
    }
    return null;
  };

  const currentClass = getCurrentClass();

  return (
    <div className={`student-dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>EduPortal</h2>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
        
        <div className="sidebar-profile">
          <div className="avatar">SW</div>
          {sidebarOpen && (
            <div className="profile-info">
              <h3>Sarah Williams</h3>
              <p>Grade 11 | Student ID: S2023157</p>
            </div>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome className="nav-icon" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <FiCalendar className="nav-icon" />
            {sidebarOpen && <span>Schedule</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <FiBook className="nav-icon" />
            {sidebarOpen && <span>Grades</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <FiClipboard className="nav-icon" />
            {sidebarOpen && <span>Attendance</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <FiDownload className="nav-icon" />
            {sidebarOpen && <span>Resources</span>}
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item">
            <FiUser className="nav-icon" />
            {sidebarOpen && <span>Profile</span>}
          </button>
          <button className="nav-item">
            <FiLogOut className="nav-icon" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <h1>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'schedule' && 'Class Schedule'}
              {activeTab === 'grades' && 'Grades & Progress'}
              {activeTab === 'attendance' && 'Attendance'}
              {activeTab === 'resources' && 'Learning Resources'}
            </h1>
            <div className="current-time">
              <FiClock className="time-icon" />
              <span>{formatDate(currentTime)}</span>
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          
          <div className="top-bar-right">
            <div className="notification-bell">
              <FiBell className="bell-icon" />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button onClick={markNotificationsAsRead}>Mark all as read</button>
                </div>
                {notifications.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="user-menu">
              <div className="user-avatar">SW</div>
              <span>Sarah Williams</span>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="content-area">
          {activeTab === 'dashboard' && (
            <div className="dashboard-container">
              <div className="dashboard-grid">
                <div className="dashboard-card current-class">
                  <h2>Current Class</h2>
                  {currentClass ? (
                    <div className="current-class-info">
                      <h3>{currentClass.name}</h3>
                      <p>Time: {currentClass.time}</p>
                      <p>Room: {currentClass.room}</p>
                      <p>Teacher: {currentClass.teacher}</p>
                    </div>
                  ) : (
                    <p>No class currently in session</p>
                  )}
                </div>
                
                <div className="dashboard-card grades-overview">
                  <h2>Grades Overview</h2>
                  <div className="grades-summary">
                    {gradesData.slice(0, 4).map(subject => (
                      <div key={subject.subject} className="grade-item">
                        <div className="grade-subject">
                          <span>{subject.subject}</span>
                          <span className={`grade-value ${subject.grade.includes('A') ? 'grade-a' : subject.grade.includes('B') ? 'grade-b' : 'grade-c'}`}>
                            {subject.grade}
                          </span>
                        </div>
                        <div className="grade-progress">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('grades')}
                  >
                    View All Grades
                  </button>
                </div>
                
                <div className="dashboard-card attendance-summary">
                  <h2>Attendance</h2>
                  <div className="attendance-stats">
                    <div className="attendance-percentage">
                      <FiPieChart className="attendance-icon" />
                      <span>{attendanceData.percentage}%</span>
                    </div>
                    <div className="attendance-details">
                      <p><span className="present">{attendanceData.present}</span> Present</p>
                      <p><span className="absent">{attendanceData.absent}</span> Absent</p>
                      <p><span className="total">{attendanceData.totalClasses}</span> Total Classes</p>
                    </div>
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('attendance')}
                  >
                    View Details
                  </button>
                </div>
                
                <div className="dashboard-card upcoming-assignments">
                  <h2>Upcoming Assignments</h2>
                  <div className="assignments-list">
                    <div className="assignment-item">
                      <div className="assignment-details">
                        <h3>Math Problem Set</h3>
                        <p>Due: Tomorrow, 8:00 AM</p>
                      </div>
                      <div className="assignment-status">
                        <span className="status-pending">Pending</span>
                      </div>
                    </div>
                    <div className="assignment-item">
                      <div className="assignment-details">
                        <h3>English Essay</h3>
                        <p>Due: Friday, 11:59 PM</p>
                      </div>
                      <div className="assignment-status">
                        <span className="status-in-progress">In Progress</span>
                      </div>
                    </div>
                    <div className="assignment-item">
                      <div className="assignment-details">
                        <h3>Physics Lab Report</h3>
                        <p>Due: Next Monday</p>
                      </div>
                      <div className="assignment-status">
                        <span className="status-not-started">Not Started</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div className="schedule-container">
              <div className="schedule-header">
                <h2>Weekly Schedule</h2>
                <div className="schedule-actions">
                  <button className="btn-primary">This Week</button>
                  <button className="btn-secondary">Next Week</button>
                  <button className="btn-icon">
                    <FiCalendar />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              <div className="schedule-grid">
                {sampleSchedule.map((day, index) => (
                  <div key={index} className="day-card">
                    <div className="day-header">
                      <h3>{day.day}</h3>
                      <span className="day-date">{day.date}</span>
                    </div>
                    <div className="classes-list">
                      {day.classes.map((cls, i) => (
                        <div key={i} className={`class-item ${currentClass?.name === cls.name && day.day === formatDate(currentTime).split(',')[0] ? 'current-class' : ''}`}>
                          <div className="class-time">{cls.time}</div>
                          <div className="class-details">
                            <h4>{cls.name}</h4>
                            <p>{cls.room} • {cls.teacher}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'grades' && (
            <div className="grades-container">
              <div className="grades-header">
                <h2>Grades & Progress</h2>
                <div className="grades-summary">
                  <div className="summary-card">
                    <h3>GPA</h3>
                    <p className="gpa-value">3.75</p>
                  </div>
                  <div className="summary-card">
                    <h3>Credits</h3>
                    <p className="credits-value">24/32</p>
                  </div>
                  <div className="summary-card">
                    <h3>Rank</h3>
                    <p className="rank-value">Top 15%</p>
                  </div>
                </div>
              </div>
              
              <div className="grades-table-container">
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Grade</th>
                      <th>Progress</th>
                      <th>Assignments</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradesData.map((subject, index) => (
                      <tr key={index}>
                        <td className="subject-cell">
                          <span className="subject-name">{subject.subject}</span>
                        </td>
                        <td>
                          <span className={`grade-badge ${subject.grade.includes('A') ? 'grade-a' : subject.grade.includes('B') ? 'grade-b' : 'grade-c'}`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td>
                          <div className="progress-container">
                            <div 
                              className="progress-bar" 
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                            <span className="progress-value">{subject.progress}%</span>
                          </div>
                        </td>
                        <td>
                          <span className="assignments-count">
                            {subject.completed}/{subject.assignments}
                          </span>
                        </td>
                        <td>
                          <button className="details-btn">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grades-chart-container">
                <h3>Performance Trend</h3>
                <div className="chart-placeholder">
                  {/* In a real app, this would be a chart component (e.g., Chart.js, Recharts) */}
                  <p>Performance chart visualization would appear here</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'attendance' && (
            <div className="attendance-container">
              <div className="attendance-header">
                <h2>Attendance Record</h2>
                <div className="attendance-summary-card">
                  <div className="attendance-percentage-circle">
                    <div className="circle-progress" style={{ '--percentage': attendanceData.percentage }}>
                      <span>{attendanceData.percentage}%</span>
                    </div>
                  </div>
                  <div className="attendance-stats">
                    <div className="stat-item">
                      <span className="stat-value present">{attendanceData.present}</span>
                      <span className="stat-label">Present</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value absent">{attendanceData.absent}</span>
                      <span className="stat-label">Absent</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value total">{attendanceData.totalClasses}</span>
                      <span className="stat-label">Total Classes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="attendance-details">
                <div className="recent-absences">
                  <h3>Recent Absences</h3>
                  <div className="absences-list">
                    {attendanceData.recentAbsences.map((absence, index) => (
                      <div key={index} className="absence-item">
                        <div className="absence-date">
                          <span>{absence.date}</span>
                        </div>
                        <div className="absence-details">
                          <h4>{absence.subject}</h4>
                          <p>{absence.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="attendance-calendar">
                  <h3>Monthly Overview</h3>
                  <div className="calendar-placeholder">
                    {/* In a real app, this would be a calendar component */}
                    <p>Attendance calendar visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="resources-container">
              <div className="resources-header">
                <h2>Learning Resources</h2>
                <div className="resources-actions">
                  <div className="search-bar">
                    <input type="text" placeholder="Search resources..." />
                  </div>
                  <div className="filter-options">
                    <select>
                      <option value="all">All Subjects</option>
                      <option value="math">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="english">English</option>
                      <option value="history">History</option>
                      <option value="chemistry">Chemistry</option>
                    </select>
                    <select>
                      <option value="recent">Most Recent</option>
                      <option value="oldest">Oldest</option>
                      <option value="name">By Name</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="resources-list">
                {resourcesData.map((resource, index) => (
                  <div key={index} className="resource-item">
                    <div className="resource-icon">
                      {resource.type === 'PDF' && <span className="pdf-icon">PDF</span>}
                      {resource.type === 'DOC' && <span className="doc-icon">DOC</span>}
                      {resource.type === 'PPT' && <span className="ppt-icon">PPT</span>}
                    </div>
                    <div className="resource-details">
                      <h3>{resource.name}</h3>
                      <div className="resource-meta">
                        <span className="resource-subject">{resource.subject}</span>
                        <span className="resource-size">{resource.size}</span>
                        <span className="resource-date">Uploaded: {resource.date}</span>
                      </div>
                    </div>
                    <div className="resource-actions">
                      <button className="download-btn">Download</button>
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="upload-section">
                <h3>Upload Your Work</h3>
                <div className="upload-area">
                  <div className="upload-prompt">
                    <p>Drag and drop files here or</p>
                    <button className="browse-btn">Browse Files</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;