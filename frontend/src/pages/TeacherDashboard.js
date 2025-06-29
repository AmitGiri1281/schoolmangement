import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, FiBook, FiClipboard, FiDownload, 
  FiUser, FiBell, FiLogOut, FiHome, 
  FiPieChart, FiClock, FiUsers, FiBarChart2,
  FiMessageSquare, FiSettings, FiUpload, FiSearch
} from 'react-icons/fi';
import '../styles/teacherdashboard.css';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const teachingSchedule = [
    { 
      day: 'Monday', 
      date: 'Jun 10',
      classes: [
        { name: 'Mathematics', time: '8:00 - 9:30', room: 'Room 302', section: 'Grade 11-A', students: 28 },
        { name: 'Advanced Math', time: '10:00 - 11:30', room: 'Room 305', section: 'Grade 12-B', students: 24 },
        { name: 'Calculus', time: '13:00 - 14:30', room: 'Room 310', section: 'Grade 12-A', students: 20 }
      ] 
    },
    { 
      day: 'Tuesday', 
      date: 'Jun 11',
      classes: [
        { name: 'Mathematics', time: '9:00 - 10:30', room: 'Room 302', section: 'Grade 11-B', students: 26 },
        { name: 'Statistics', time: '11:00 - 12:30', room: 'Lab 101', section: 'Grade 11-C', students: 22 }
      ] 
    },
    { 
      day: 'Wednesday', 
      date: 'Jun 12',
      classes: [
        { name: 'Mathematics', time: '8:00 - 9:30', room: 'Room 302', section: 'Grade 11-A', students: 28 },
        { name: 'Advanced Math', time: '10:00 - 11:30', room: 'Room 305', section: 'Grade 12-B', students: 24 }
      ] 
    },
    { 
      day: 'Thursday', 
      date: 'Jun 13',
      classes: [
        { name: 'Calculus', time: '13:00 - 14:30', room: 'Room 310', section: 'Grade 12-A', students: 20 },
        { name: 'Statistics', time: '15:00 - 16:30', room: 'Lab 101', section: 'Grade 11-C', students: 22 }
      ] 
    },
    { 
      day: 'Friday', 
      date: 'Jun 14',
      classes: [
        { name: 'Mathematics', time: '9:00 - 10:30', room: 'Room 302', section: 'Grade 11-B', students: 26 },
        { name: 'Faculty Meeting', time: '11:00 - 12:30', room: 'Conference Room', section: 'All Staff', students: 0 }
      ] 
    },
  ];

  const classesTaught = [
    { name: 'Mathematics', sections: ['11-A', '11-B'], totalStudents: 54, assignments: 8 },
    { name: 'Advanced Math', sections: ['12-B'], totalStudents: 24, assignments: 6 },
    { name: 'Calculus', sections: ['12-A'], totalStudents: 20, assignments: 5 },
    { name: 'Statistics', sections: ['11-C'], totalStudents: 22, assignments: 4 }
  ];

  const upcomingAssignments = [
    { title: 'Algebra Quiz', class: 'Mathematics 11-A', dueDate: 'Tomorrow, 8:00 AM', submissions: '12/28' },
    { title: 'Calculus Test', class: 'Calculus 12-A', dueDate: 'Friday, 10:00 AM', submissions: '5/20' },
    { title: 'Statistics Project', class: 'Statistics 11-C', dueDate: 'Next Monday', submissions: '0/22' }
  ];

  const studentPerformance = [
    { name: 'Mathematics 11-A', average: 85, high: 98, low: 62 },
    { name: 'Advanced Math 12-B', average: 78, high: 95, low: 55 },
    { name: 'Calculus 12-A', average: 82, high: 100, low: 65 },
    { name: 'Statistics 11-C', average: 88, high: 100, low: 72 }
  ];

  const recentMessages = [
    { sender: 'John Smith (Parent)', message: 'Regarding upcoming parent-teacher conference...', time: '2 hours ago' },
    { sender: 'Sarah Johnson (Student)', message: 'Question about problem set #3...', time: '1 day ago' },
    { sender: 'Department Head', message: 'Curriculum meeting reminder...', time: '3 days ago' }
  ];

  const teachingResources = [
    { name: 'Mathematics Curriculum', type: 'PDF', size: '15MB', subject: 'Math', date: 'Jun 1' },
    { name: 'Lesson Plan Template', type: 'DOC', size: '2MB', subject: 'All', date: 'May 28' },
    { name: 'Assessment Guidelines', type: 'PDF', size: '8MB', subject: 'All', date: 'Jun 5' },
    { name: 'STEM Resources', type: 'PPT', size: '25MB', subject: 'Math/Science', date: 'May 20' },
  ];

  // Simulate fetching notifications
  useEffect(() => {
    const mockNotifications = [
      { id: 1, title: 'New submission received', message: 'Algebra Quiz from Michael Brown', time: '1 hour ago', read: false },
      { id: 2, title: 'Meeting reminder', message: 'Department meeting at 3:00 PM', time: '3 hours ago', read: false },
      { id: 3, title: 'Grade approval', message: 'Final grades need approval', time: '1 day ago', read: true },
      { id: 4, title: 'Professional development', message: 'Upcoming workshop registration', time: '2 days ago', read: true },
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
    const today = teachingSchedule.find(day => day.day === formatDate(now).split(',')[0]);
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

  const filteredResources = teachingResources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`teacher-dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'} ${isMobile ? 'mobile-view' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>EduPortal</h2>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
        
        <div className="sidebar-profile">
          <div className="avatar">TJ</div>
          {sidebarOpen && (
            <div className="profile-info">
              <h3>Thomas Johnson</h3>
              <p>Mathematics Department</p>
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
            className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <FiUsers className="nav-icon" />
            {sidebarOpen && <span>My Classes</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <FiBook className="nav-icon" />
            {sidebarOpen && <span>Assignments</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <FiBarChart2 className="nav-icon" />
            {sidebarOpen && <span>Grades</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <FiDownload className="nav-icon" />
            {sidebarOpen && <span>Resources</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare className="nav-icon" />
            {sidebarOpen && <span>Messages</span>}
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item">
            <FiSettings className="nav-icon" />
            {sidebarOpen && <span>Settings</span>}
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
              {activeTab === 'dashboard' && 'Teacher Dashboard'}
              {activeTab === 'schedule' && 'Teaching Schedule'}
              {activeTab === 'classes' && 'My Classes'}
              {activeTab === 'assignments' && 'Assignments'}
              {activeTab === 'grades' && 'Grades & Analytics'}
              {activeTab === 'resources' && 'Teaching Resources'}
              {activeTab === 'messages' && 'Messages'}
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
              <div className="user-avatar">TJ</div>
              {!isMobile && <span>Thomas Johnson</span>}
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
                      <h3>{currentClass.name} - {currentClass.section}</h3>
                      <p>Time: {currentClass.time}</p>
                      <p>Room: {currentClass.room}</p>
                      <p>Students: {currentClass.students}</p>
                      {currentClass.name !== 'Faculty Meeting' && (
                        <button className="view-class-btn">View Class</button>
                      )}
                    </div>
                  ) : (
                    <div className="no-class">
                      <p>No class currently in session</p>
                      <button className="prep-materials-btn">Prepare Materials</button>
                    </div>
                  )}
                </div>
                
                <div className="dashboard-card classes-summary">
                  <h2>Classes Summary</h2>
                  <div className="classes-stats">
                    {classesTaught.slice(0, 3).map(cls => (
                      <div key={cls.name} className="class-stat-item">
                        <h3>{cls.name}</h3>
                        <div className="class-stat-details">
                          <span>Sections: {cls.sections.join(', ')}</span>
                          <span>Students: {cls.totalStudents}</span>
                          <span>Assignments: {cls.assignments}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('classes')}
                  >
                    View All Classes
                  </button>
                </div>
                
                <div className="dashboard-card assignments-overview">
                  <h2>Assignments Overview</h2>
                  <div className="assignments-list">
                    {upcomingAssignments.map((assignment, index) => (
                      <div key={index} className="assignment-item">
                        <div className="assignment-details">
                          <h3>{assignment.title}</h3>
                          <p>{assignment.class}</p>
                          <p>Due: {assignment.dueDate}</p>
                        </div>
                        <div className="assignment-submissions">
                          <div className="submission-progress">
                            <div 
                              className="progress-bar" 
                              style={{ 
                                width: `${(
                                  parseInt(assignment.submissions.split('/')[0]) / 
                                  parseInt(assignment.submissions.split('/')[1])
                                ) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span>{assignment.submissions} submitted</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('assignments')}
                  >
                    View All Assignments
                  </button>
                </div>
                
                <div className="dashboard-card performance-summary">
                  <h2>Class Performance</h2>
                  <div className="performance-stats">
                    {studentPerformance.map((classPerf, index) => (
                      <div key={index} className="performance-item">
                        <h3>{classPerf.name}</h3>
                        <div className="performance-metrics">
                          <div className="metric">
                            <span>Average</span>
                            <span className="metric-value">{classPerf.average}%</span>
                          </div>
                          <div className="metric">
                            <span>High</span>
                            <span className="metric-value high">{classPerf.high}%</span>
                          </div>
                          <div className="metric">
                            <span>Low</span>
                            <span className="metric-value low">{classPerf.low}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('grades')}
                  >
                    View Detailed Analytics
                  </button>
                </div>
              </div>
              
              <div className="dashboard-row">
                <div className="dashboard-card recent-messages">
                  <h2>Recent Messages</h2>
                  <div className="messages-list">
                    {recentMessages.map((message, index) => (
                      <div key={index} className="message-item">
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-content">
                          <p>{message.message}</p>
                          <span className="message-time">{message.time}</span>
                        </div>
                        <button className="reply-btn">Reply</button>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('messages')}
                  >
                    View All Messages
                  </button>
                </div>
                
                <div className="dashboard-card quick-actions">
                  <h2>Quick Actions</h2>
                  <div className="actions-grid">
                    <button className="action-btn">
                      <FiUpload className="action-icon" />
                      <span>Post Assignment</span>
                    </button>
                    <button className="action-btn">
                      <FiBook className="action-icon" />
                      <span>Record Grades</span>
                    </button>
                    <button className="action-btn">
                      <FiCalendar className="action-icon" />
                      <span>Schedule Event</span>
                    </button>
                    <button className="action-btn">
                      <FiMessageSquare className="action-icon" />
                      <span>Send Announcement</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div className="schedule-container">
              <div className="schedule-header">
                <h2>Weekly Teaching Schedule</h2>
                <div className="schedule-actions">
                  <button className="btn-primary">This Week</button>
                  <button className="btn-secondary">Next Week</button>
                  <button className="btn-icon">
                    <FiCalendar />
                    <span>Export Schedule</span>
                  </button>
                </div>
              </div>
              
              <div className="schedule-grid">
                {teachingSchedule.map((day, index) => (
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
                            <h4>{cls.name} {cls.section !== 'All Staff' && `- ${cls.section}`}</h4>
                            <p>{cls.room} • {cls.students} {cls.students !== 0 ? 'students' : ''}</p>
                          </div>
                          {cls.name !== 'Faculty Meeting' && (
                            <button className="class-action-btn">View</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'classes' && (
            <div className="classes-container">
              <div className="classes-header">
                <h2>My Classes</h2>
                <div className="classes-summary-stats">
                  <div className="summary-stat">
                    <span className="stat-value">{classesTaught.length}</span>
                    <span className="stat-label">Classes</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-value">{classesTaught.reduce((acc, cls) => acc + cls.totalStudents, 0)}</span>
                    <span className="stat-label">Total Students</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-value">{classesTaught.reduce((acc, cls) => acc + cls.assignments, 0)}</span>
                    <span className="stat-label">Assignments</span>
                  </div>
                </div>
              </div>
              
              <div className="classes-grid">
                {classesTaught.map((cls, index) => (
                  <div key={index} className="class-card">
                    <div className="class-card-header">
                      <h3>{cls.name}</h3>
                      <span className="class-sections">{cls.sections.join(', ')}</span>
                    </div>
                    <div className="class-card-body">
                      <div className="class-stat">
                        <span className="stat-value">{cls.totalStudents}</span>
                        <span className="stat-label">Students</span>
                      </div>
                      <div className="class-stat">
                        <span className="stat-value">{cls.assignments}</span>
                        <span className="stat-label">Assignments</span>
                      </div>
                    </div>
                    <div className="class-card-actions">
                      <button className="btn-outline">View Roster</button>
                      <button className="btn-primary">Manage Class</button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="performance-section">
                <h3>Class Performance Overview</h3>
                <div className="performance-chart-container">
                  {/* This would be a chart component in a real app */}
                  <div className="chart-placeholder">
                    <p>Performance chart showing grades distribution across classes</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'assignments' && (
            <div className="assignments-container">
              <div className="assignments-header">
                <h2>Assignments</h2>
                <div className="assignments-actions">
                  <button className="btn-primary">
                    <FiUpload className="btn-icon" />
                    Create New Assignment
                  </button>
                  <div className="filter-options">
                    <select>
                      <option value="all">All Classes</option>
                      {classesTaught.map(cls => (
                        <option key={cls.name} value={cls.name.toLowerCase()}>{cls.name}</option>
                      ))}
                    </select>
                    <select>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                      <option value="ungraded">Ungraded</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="assignments-tabs">
                <button className="tab-btn active">Active (5)</button>
                <button className="tab-btn">Upcoming (3)</button>
                <button className="tab-btn">Completed (12)</button>
              </div>
              
              <div className="assignments-list">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="assignment-card">
                    <div className="assignment-info">
                      <h3>{assignment.title}</h3>
                      <p className="assignment-class">{assignment.class}</p>
                      <p className="assignment-due">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="assignment-stats">
                      <div className="submission-stats">
                        <div className="progress-container">
                          {/* <div
                            className="progress-bar"
                            style={{
                              width: `${(
                                parseInt(assignment.submissions.split('/')[0]) /
                                parseInt(assignment.submissions.split('/')[1])
                                * 100}%`
                            }}
                          ></div> */}
                        </div>
                        <span>{assignment.submissions} submitted</span>
                      </div>
                      <div className="assignment-actions">
                        <button className="btn-outline">View Submissions</button>
                        <button className="btn-primary">Grade</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'grades' && (
            <div className="grades-container">
              <div className="grades-header">
                <h2>Grades & Analytics</h2>
                <div className="grades-actions">
                  <button className="btn-primary">Enter Grades</button>
                  <button className="btn-secondary">Generate Reports</button>
                </div>
              </div>
              
              <div className="grades-tabs">
                <button className="tab-btn active">By Class</button>
                <button className="tab-btn">By Student</button>
                <button className="tab-btn">By Assignment</button>
              </div>
              
              <div className="grades-overview">
                <div className="grades-summary">
                  {studentPerformance.map((classPerf, index) => (
                    <div key={index} className="grade-summary-card">
                      <h3>{classPerf.name}</h3>
                      <div className="grade-stats">
                        <div className="grade-stat">
                          <span className="stat-label">Average</span>
                          <span className="stat-value">{classPerf.average}%</span>
                        </div>
                        <div className="grade-stat">
                          <span className="stat-label">High</span>
                          <span className="stat-value high">{classPerf.high}%</span>
                        </div>
                        <div className="grade-stat">
                          <span className="stat-label">Low</span>
                          <span className="stat-value low">{classPerf.low}%</span>
                        </div>
                      </div>
                      <button className="view-details-btn">View Details</button>
                    </div>
                  ))}
                </div>
                
                <div className="grades-chart-container">
                  <h3>Performance Trends</h3>
                  <div className="chart-placeholder">
                    <p>Interactive chart showing grade trends over time would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="resources-container">
              <div className="resources-header">
                <h2>Teaching Resources</h2>
                <div className="resources-actions">
                  <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search resources..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="btn-primary">
                    <FiUpload className="btn-icon" />
                    Upload Resource
                  </button>
                </div>
              </div>
              
              <div className="resources-filter">
                <div className="filter-tabs">
                  <button className="tab-btn active">All Resources</button>
                  <button className="tab-btn">My Uploads</button>
                  <button className="tab-btn">Shared with Me</button>
                </div>
                <div className="filter-options">
                  <select>
                    <option value="all">All Subjects</option>
                    {Array.from(new Set(teachingResources.map(r => r.subject))).map(subject => (
                      <option key={subject} value={subject.toLowerCase()}>{subject}</option>
                    ))}
                  </select>
                  <select>
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="name">By Name</option>
                  </select>
                </div>
              </div>
              
              <div className="resources-list">
                {filteredResources.map((resource, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-icon">
                      {resource.type === 'PDF' && <span className="pdf-icon">PDF</span>}
                      {resource.type === 'DOC' && <span className="doc-icon">DOC</span>}
                      {resource.type === 'PPT' && <span className="ppt-icon">PPT</span>}
                    </div>
                    <div className="resource-info">
                      <h3>{resource.name}</h3>
                      <div className="resource-meta">
                        <span className="resource-subject">{resource.subject}</span>
                        <span className="resource-size">{resource.size}</span>
                        <span className="resource-date">Uploaded: {resource.date}</span>
                      </div>
                    </div>
                    <div className="resource-actions">
                      <button className="btn-outline">Preview</button>
                      <button className="btn-primary">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="messages-container">
              <div className="messages-header">
                <h2>Messages</h2>
                <div className="messages-actions">
                  <button className="btn-primary">New Message</button>
                  <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search messages..." />
                  </div>
                </div>
              </div>
              
              <div className="messages-grid">
                <div className="messages-sidebar">
                  <div className="message-folders">
                    <button className="folder-btn active">Inbox (3)</button>
                    <button className="folder-btn">Sent</button>
                    <button className="folder-btn">Archived</button>
                  </div>
                  
                  <div className="messages-list">
                    {recentMessages.map((message, index) => (
                      <div key={index} className="message-preview">
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-excerpt">
                          {message.message.substring(0, 60)}...
                        </div>
                        <div className="message-time">{message.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="message-content">
                  <div className="message-header">
                    <h3>Regarding upcoming parent-teacher conference</h3>
                    <div className="message-sender-info">
                      <span className="sender-name">John Smith (Parent)</span>
                      <span className="sender-email">john.smith@email.com</span>
                    </div>
                    <div className="message-time">2 hours ago</div>
                  </div>
                  
                  <div className="message-body">
                    <p>Dear Mr. Johnson,</p>
                    <p>
                      I hope this message finds you well. I wanted to follow up regarding the upcoming 
                      parent-teacher conference scheduled for next week. Would it be possible to move 
                      our appointment to Thursday afternoon instead of Wednesday morning?
                    </p>
                    <p>
                      My daughter Sarah has been really enjoying your math class this semester, and 
                      I'm looking forward to discussing her progress.
                    </p>
                    <p>Best regards,<br />John Smith</p>
                  </div>
                  
                  <div className="message-reply">
                    <textarea placeholder="Type your reply here..."></textarea>
                    <div className="reply-actions">
                      <button className="btn-secondary">Attach File</button>
                      <button className="btn-primary">Send Reply</button>
                    </div>
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

export default TeacherDashboard;