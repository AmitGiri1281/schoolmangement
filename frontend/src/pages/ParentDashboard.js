import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaClipboardCheck, FaChartLine, FaMoneyBillWave, FaBell, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import '../styles/ParentDashboard.css';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('children');
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Sample data
  const [children] = useState([
    { 
      id: 1, 
      name: 'Sarah Williams', 
      grade: 'Grade 11',
      attendance: { present: 45, absent: 2, percentage: 95.7 },
      grades: { average: 'A-', subjects: 6, improvement: '+2%' },
      upcomingEvents: ['Parent-Teacher Meeting - Jun 15', 'School Trip - Jun 20']
    },
    { 
      id: 2, 
      name: 'Michael Williams', 
      grade: 'Grade 8',
      attendance: { present: 42, absent: 5, percentage: 89.4 },
      grades: { average: 'B+', subjects: 5, improvement: '+5%' },
      upcomingEvents: ['Science Fair - Jun 18']
    }
  ]);

  const attendanceData = [
    { date: '2023-06-01', status: 'present', reason: '' },
    { date: '2023-05-30', status: 'absent', reason: 'Illness' },
    { date: '2023-05-28', status: 'present', reason: '' },
    { date: '2023-05-25', status: 'late', reason: 'Traffic' },
  ];

  const gradesData = [
    { subject: 'Mathematics', grade: 'A-', progress: 90, trend: 'up' },
    { subject: 'English', grade: 'B+', progress: 87, trend: 'up' },
    { subject: 'Science', grade: 'A', progress: 95, trend: 'stable' },
    { subject: 'History', grade: 'B', progress: 82, trend: 'down' },
  ];

  const feesData = [
    { description: 'Tuition Fee Q2', amount: 450, dueDate: '2023-06-15', status: 'paid' },
    { description: 'Activity Fee', amount: 120, dueDate: '2023-06-20', status: 'pending' },
    { description: 'Library Fee', amount: 30, dueDate: '2023-07-01', status: 'pending' },
  ];

  // Simulate fetching notifications
  useEffect(() => {
    const mockNotifications = [
      { id: 1, title: 'Report Card Available', message: 'Sarah\'s Q2 report card is now available', time: '2 hours ago', read: false },
      { id: 2, title: 'Fee Payment Reminder', message: 'Tuition fee due in 5 days', time: '1 day ago', read: false },
      { id: 3, title: 'Parent-Teacher Meeting', message: 'Scheduled for June 15th', time: '3 days ago', read: true },
    ];
    setNotifications(mockNotifications);
    setUnreadNotifications(mockNotifications.filter(n => !n.read).length);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const markNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadNotifications(0);
  };

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`parent-dashboard ${isMobile ? 'mobile' : ''}`}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Parent Dashboard</h1>
          <p>Welcome back, Mrs. Williams</p>
        </div>
        
        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search children..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="notification-bell">
            <FaBell className="bell-icon" />
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
          
          <div className="user-profile">
            <div className="avatar">MW</div>
            <span>Mrs. Williams</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Sidebar */}
        <nav className="sidebar">
          <button 
            className={`sidebar-item ${activeTab === 'children' ? 'active' : ''}`}
            onClick={() => setActiveTab('children')}
          >
            <FaUserGraduate className="sidebar-icon" />
            <span>My Children</span>
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <FaClipboardCheck className="sidebar-icon" />
            <span>Attendance</span>
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <FaChartLine className="sidebar-icon" />
            <span>Grades</span>
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            <FaMoneyBillWave className="sidebar-icon" />
            <span>Fee Payments</span>
          </button>
        </nav>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'children' && (
            <div className="children-container">
              <h2>
                <FaUserGraduate className="section-icon" />
                Your Children
              </h2>
              
              <div className="children-grid">
                {filteredChildren.map(child => (
                  <div key={child.id} className="child-card">
                    <div className="child-header">
                      <div className="child-avatar">
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="child-info">
                        <h3>{child.name}</h3>
                        <p>{child.grade}</p>
                      </div>
                    </div>
                    
                    <div className="child-stats">
                      <div className="stat-item">
                        <span className="stat-value">{child.attendance.percentage}%</span>
                        <span className="stat-label">Attendance</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">{child.grades.average}</span>
                        <span className="stat-label">Average Grade</span>
                      </div>
                    </div>
                    
                    <div className="child-events">
                      <h4>Upcoming Events</h4>
                      <ul>
                        {child.upcomingEvents.map((event, index) => (
                          <li key={index}>
                            <FaCalendarAlt className="event-icon" />
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="child-actions">
                      <button className="btn-primary">View Details</button>
                      <button className="btn-secondary">Message Teacher</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="attendance-container">
              <h2>
                <FaClipboardCheck className="section-icon" />
                Attendance Records
              </h2>
              
              <div className="attendance-overview">
                {children.map(child => (
                  <div key={child.id} className="attendance-card">
                    <h3>{child.name}</h3>
                    <div className="attendance-progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${child.attendance.percentage}%` }}
                      ></div>
                      <span>{child.attendance.percentage}%</span>
                    </div>
                    <div className="attendance-details">
                      <p><span className="present">{child.attendance.present}</span> Days Present</p>
                      <p><span className="absent">{child.attendance.absent}</span> Days Absent</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="attendance-details">
                <h3>Recent Attendance</h3>
                <div className="attendance-table">
                  <div className="table-header">
                    <div>Date</div>
                    <div>Status</div>
                    <div>Reason</div>
                  </div>
                  {attendanceData.map((record, index) => (
                    <div key={index} className={`table-row ${record.status}`}>
                      <div>{record.date}</div>
                      <div>
                        <span className={`status-badge ${record.status}`}>
                          {record.status}
                        </span>
                      </div>
                      <div>{record.reason || '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="grades-container">
              <h2>
                <FaChartLine className="section-icon" />
                Academic Performance
              </h2>
              
              <div className="grades-overview">
                {children.map(child => (
                  <div key={child.id} className="grade-summary-card">
                    <h3>{child.name}</h3>
                    <div className="grade-average">
                      <span className={`grade-badge ${child.grades.average.replace('+', '').replace('-', '')}`}>
                        {child.grades.average}
                      </span>
                      <span className="trend">
                        {child.grades.improvement} from last term
                      </span>
                    </div>
                    <p>{child.grades.subjects} subjects</p>
                  </div>
                ))}
              </div>
              
              <div className="grades-details">
                <h3>Subject-wise Grades</h3>
                <div className="grades-table">
                  <div className="table-header">
                    <div>Subject</div>
                    <div>Grade</div>
                    <div>Progress</div>
                    <div>Trend</div>
                  </div>
                  {gradesData.map((subject, index) => (
                    <div key={index} className="table-row">
                      <div>{subject.subject}</div>
                      <div>
                        <span className={`grade-badge ${subject.grade.replace('+', '').replace('-', '')}`}>
                          {subject.grade}
                        </span>
                      </div>
                      <div>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                          <span>{subject.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <span className={`trend-${subject.trend}`}>
                          {subject.trend === 'up' ? '↑ Improving' : 
                           subject.trend === 'down' ? '↓ Declining' : '→ Stable'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="fees-container">
              <h2>
                <FaMoneyBillWave className="section-icon" />
                Fee Payments
              </h2>
              
              <div className="fees-summary">
                <div className="summary-card">
                  <h3>Total Due</h3>
                  <p className="amount">$600.00</p>
                </div>
                <div className="summary-card">
                  <h3>Paid</h3>
                  <p className="amount paid">$450.00</p>
                </div>
                <div className="summary-card">
                  <h3>Pending</h3>
                  <p className="amount pending">$150.00</p>
                </div>
              </div>
              
              <div className="fees-details">
                <h3>Payment History</h3>
                <div className="fees-table">
                  <div className="table-header">
                    <div>Description</div>
                    <div>Amount</div>
                    <div>Due Date</div>
                    <div>Status</div>
                    <div>Action</div>
                  </div>
                  {feesData.map((fee, index) => (
                    <div key={index} className="table-row">
                      <div>{fee.description}</div>
                      <div>${fee.amount.toFixed(2)}</div>
                      <div>{fee.dueDate}</div>
                      <div>
                        <span className={`status-badge ${fee.status}`}>
                          {fee.status}
                        </span>
                      </div>
                      <div>
                        {fee.status === 'pending' ? (
                          <button className="btn-pay">Pay Now</button>
                        ) : (
                          <button className="btn-receipt">View Receipt</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;