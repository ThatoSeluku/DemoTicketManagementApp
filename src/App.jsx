import { useState, useEffect } from 'react';

// Responsive hook to detect mobile viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Industry-specific ticket templates
const industryTickets = {
  'Technology & Software': [
    {
      id: 1,
      title: 'Critical API endpoint returning 500 errors',
      category: 'Technical',
      status: 'Open',
      assignedTo: 'Sarah Chen',
      description: 'Production API endpoint /api/v2/payments is returning 500 errors for 15% of requests. Affecting customer transactions.',
      comments: [
        {
          id: 1,
          author: 'John Smith',
          text: 'Investigating database connection pool. May need to scale up instances.',
          timestamp: '2025-10-10 09:30'
        }
      ]
    },
    {
      id: 2,
      title: 'Request for additional AWS infrastructure',
      category: 'Request',
      status: 'In Progress',
      assignedTo: 'Michael Brown',
      description: 'Engineering team needs additional EC2 instances and RDS read replicas for Q1 scaling.',
      comments: []
    },
    {
      id: 3,
      title: 'Security vulnerability in authentication flow',
      category: 'Technical',
      status: 'Resolved',
      assignedTo: 'Sarah Chen',
      description: 'JWT tokens not properly validating expiration timestamps. Patched in v2.3.1.',
      comments: []
    }
  ],
  'Financial Services': [
    {
      id: 1,
      title: 'Trading platform experiencing latency issues',
      category: 'Technical',
      status: 'Open',
      assignedTo: 'Sarah Chen',
      description: 'Market data feed latency increased from 50ms to 300ms during market open. Traders reporting delayed execution.',
      comments: [
        {
          id: 1,
          author: 'John Smith',
          text: 'Network team investigating bandwidth constraints with data provider.',
          timestamp: '2025-10-10 09:30'
        }
      ]
    },
    {
      id: 2,
      title: 'Request for Bloomberg terminal licenses',
      category: 'Request',
      status: 'In Progress',
      assignedTo: 'Michael Brown',
      description: 'New analyst team requires 5 additional Bloomberg Professional licenses for Q1.',
      comments: []
    },
    {
      id: 3,
      title: 'Reconciliation discrepancy resolved',
      category: 'Technical',
      status: 'Resolved',
      assignedTo: 'Sarah Chen',
      description: 'Daily reconciliation showing $2.3M discrepancy. Root cause: timezone conversion error in batch job.',
      comments: []
    }
  ],
  'Healthcare & Medical': [
    {
      id: 1,
      title: 'MRI machine calibration error',
      category: 'Technical',
      status: 'Open',
      assignedTo: 'Sarah Chen',
      description: 'GE MRI unit in Building C showing calibration errors. Affecting diagnostic image quality.',
      comments: [
        {
          id: 1,
          author: 'John Smith',
          text: 'Vendor technician scheduled for tomorrow 8 AM. Machine offline until resolved.',
          timestamp: '2025-10-10 09:30'
        }
      ]
    },
    {
      id: 2,
      title: 'Request for additional EMR system licenses',
      category: 'Request',
      status: 'In Progress',
      assignedTo: 'Michael Brown',
      description: 'New nursing staff requires 15 Epic EMR licenses for oncology department.',
      comments: []
    },
    {
      id: 3,
      title: 'Lab equipment network connectivity restored',
      category: 'Technical',
      status: 'Resolved',
      assignedTo: 'Sarah Chen',
      description: 'Blood analyzer losing connection to LIMS. Network switch replaced.',
      comments: []
    }
  ],
  'Professional Services': [
    {
      id: 1,
      title: 'Client payment overdue - Enterprise contract',
      category: 'Request',
      status: 'Open',
      assignedTo: 'Sarah Chen',
      description: 'Fortune 500 client payment 45 days overdue on $250K strategic consulting engagement. Finance team needs escalation.',
      comments: [
        {
          id: 1,
          author: 'John Smith',
          text: 'Contacted client CFO office. Payment processing delayed due to vendor onboarding issue.',
          timestamp: '2025-10-10 09:30'
        }
      ]
    },
    {
      id: 2,
      title: 'Request for additional Salesforce licenses',
      category: 'Request',
      status: 'In Progress',
      assignedTo: 'Michael Brown',
      description: 'New business development team requires 10 Salesforce Sales Cloud licenses.',
      comments: []
    },
    {
      id: 3,
      title: 'Project portal access issue resolved',
      category: 'Technical',
      status: 'Resolved',
      assignedTo: 'Sarah Chen',
      description: 'Client unable to access secure project portal. SSO configuration updated.',
      comments: []
    }
  ],
  'Manufacturing & Industrial': [
    {
      id: 1,
      title: 'Production line PLC communication failure',
      category: 'Technical',
      status: 'Open',
      assignedTo: 'Sarah Chen',
      description: 'Assembly line 3 PLC losing communication with SCADA system. Production halted.',
      comments: [
        {
          id: 1,
          author: 'John Smith',
          text: 'Maintenance team checking fiber optic connections. Backup line operational.',
          timestamp: '2025-10-10 09:30'
        }
      ]
    },
    {
      id: 2,
      title: 'Request for quality inspection equipment',
      category: 'Request',
      status: 'In Progress',
      assignedTo: 'Michael Brown',
      description: 'QA department needs 3 new CMM machines for automotive parts inspection.',
      comments: []
    },
    {
      id: 3,
      title: 'ERP system inventory sync resolved',
      category: 'Technical',
      status: 'Resolved',
      assignedTo: 'Sarah Chen',
      description: 'SAP inventory module not syncing with warehouse management system. Middleware updated.',
      comments: []
    }
  ]
};

// Initial sample data
const initialUsers = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Support Engineer' },
  { id: 2, name: 'Michael Brown', email: 'michael.brown@company.com', role: 'Senior Engineer' },
  { id: 3, name: 'John Smith', email: 'john.smith@company.com', role: 'Support Specialist' }
];

const initialTickets = [
  {
    id: 1,
    title: 'Website login not working',
    category: 'Technical',
    status: 'Open',
    assignedTo: 'Sarah Chen',
    description: 'Users are unable to log in to the portal. Error message: "Invalid credentials" even with correct password.',
    comments: [
      {
        id: 1,
        author: 'John Smith',
        text: 'Investigating the authentication service.',
        timestamp: '2025-10-10 09:30'
      }
    ]
  },
  {
    id: 2,
    title: 'Request new software license',
    category: 'Request',
    status: 'In Progress',
    assignedTo: 'Michael Brown',
    description: 'Need additional license for Adobe Creative Cloud for the design team.',
    comments: []
  },
  {
    id: 3,
    title: 'Printer offline in Building B',
    category: 'Technical',
    status: 'Resolved',
    assignedTo: 'Sarah Chen',
    description: 'Network printer on floor 3 is showing offline status.',
    comments: []
  }
];

function App() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState('welcome');
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);
  const [personalizationStep, setPersonalizationStep] = useState(1); // 1: name, 2: welcome, 3: video, 4: company
  const [companyName, setCompanyName] = useState('Volhard');
  const [userName, setUserName] = useState('');
  const [tempCompanyName, setTempCompanyName] = useState('');
  const [tempUserName, setTempUserName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  // User management states
  const [users, setUsers] = useState(initialUsers);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Support Specialist'
  });

  // Form states
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: 'Technical',
    status: 'Open',
    assignedTo: 'Sarah Chen',
    description: ''
  });

  const [newComment, setNewComment] = useState({
    author: '',
    text: ''
  });

  // Error states
  const [errors, setErrors] = useState({
    ticket: {},
    comment: {},
    user: {},
    personalization: {}
  });

  const statusColors = {
    'Open': {
      background: 'rgba(96, 165, 250, 0.2)',
      color: '#bfdbfe',
      border: '1px solid rgba(96, 165, 250, 0.35)'
    },
    'In Progress': {
      background: 'rgba(253, 224, 71, 0.2)',
      color: '#fef08a',
      border: '1px solid rgba(253, 224, 71, 0.35)'
    },
    'Resolved': {
      background: 'rgba(74, 222, 128, 0.2)',
      color: '#bbf7d0',
      border: '1px solid rgba(74, 222, 128, 0.35)'
    }
  };

  const handleAddTicket = () => {
    const newErrors = {};

    if (!newTicket.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!newTicket.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ticket: newErrors });
      return;
    }

    const ticket = {
      id: Math.max(...tickets.map(t => t.id), 0) + 1,
      ...newTicket,
      comments: []
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({
      title: '',
      category: 'Technical',
      status: 'Open',
      assignedTo: users[0]?.name || 'Sarah Chen',
      description: ''
    });
    setErrors({ ...errors, ticket: {} });
    setShowAddModal(false);
  };

  const handleAddComment = () => {
    const newErrors = {};

    if (!newComment.author.trim()) {
      newErrors.author = 'Name is required';
    }
    if (!newComment.text.trim()) {
      newErrors.text = 'Comment text is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, comment: newErrors });
      return;
    }

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const comment = {
      id: selectedTicket.comments.length + 1,
      author: newComment.author,
      text: newComment.text,
      timestamp
    };

    const updatedTickets = tickets.map(t =>
      t.id === selectedTicket.id
        ? { ...t, comments: [...t.comments, comment] }
        : t
    );

    setTickets(updatedTickets);
    setSelectedTicket({ ...selectedTicket, comments: [...selectedTicket.comments, comment] });
    setNewComment({ author: userName, text: '' });
    setErrors({ ...errors, comment: {} });
    setShowCommentModal(false);
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter(t => t.id !== id));
    setCurrentPage('tickets');
  };

  const handleStartDemo = () => {
    setPersonalizationStep(1);
    setShowPersonalizationModal(true);
  };

  const handleNameSubmit = () => {
    if (!tempUserName.trim()) {
      setErrors({ ...errors, personalization: { name: 'Please enter your name' } });
      return;
    }
    setUserName(tempUserName.trim());
    setNewComment({ ...newComment, author: tempUserName.trim() });
    setErrors({ ...errors, personalization: {} });
    setPersonalizationStep(2);
  };

  const handleWelcomeContinue = () => {
    setPersonalizationStep(3); // Go to video step
  };

  const handleVideoSkip = () => {
    setPersonalizationStep(4); // Skip to company step
  };

  const handleCompanySubmit = () => {
    const newErrors = {};

    if (!tempCompanyName.trim()) {
      newErrors.company = 'Please enter your company name';
    }
    if (!selectedIndustry) {
      newErrors.industry = 'Please select your industry';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, personalization: newErrors });
      return;
    }

    setCompanyName(tempCompanyName.trim());

    // Initialize tickets with industry-specific data
    if (selectedIndustry && industryTickets[selectedIndustry]) {
      setTickets(industryTickets[selectedIndustry]);
    }

    setShowPersonalizationModal(false);
    setPersonalizationStep(1);
    setErrors({ ...errors, personalization: {} });
    setCurrentPage('tickets');
  };

  const handleSkipPersonalization = () => {
    setShowPersonalizationModal(false);
    setPersonalizationStep(1);
    setCurrentPage('tickets');
  };

  const handleBackToDemo = () => {
    // Reset all state to initial values
    setCurrentPage('welcome');
    setTickets(initialTickets);
    setSelectedTicket(null);
    setSearchTerm('');
    setFilterStatus('All');
    setShowAddModal(false);
    setShowCommentModal(false);
    setShowPersonalizationModal(false);
    setPersonalizationStep(1);
    setCompanyName('Volhard');
    setUserName('');
    setTempCompanyName('');
    setTempUserName('');
    setSelectedIndustry('');
    setUsers(initialUsers);
    setShowUsersModal(false);
    setShowAddUserModal(false);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'Support Specialist'
    });
    setNewTicket({
      title: '',
      category: 'Technical',
      status: 'Open',
      assignedTo: 'Sarah Chen',
      description: ''
    });
    setNewComment({
      author: '',
      text: ''
    });
    setErrors({
      ticket: {},
      comment: {},
      user: {},
      personalization: {}
    });
  };

  // User CRUD handlers
  const handleAddUser = () => {
    const newErrors = {};

    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, user: newErrors });
      return;
    }

    const user = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      ...newUser
    };

    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      role: 'Support Specialist'
    });
    setErrors({ ...errors, user: {} });
    setShowAddUserModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setErrors({ ...errors, user: {} });
    setShowAddUserModal(true);
  };

  const handleUpdateUser = () => {
    const newErrors = {};

    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, user: newErrors });
      return;
    }

    const updatedUsers = users.map(u =>
      u.id === editingUser.id
        ? { ...u, name: newUser.name, email: newUser.email, role: newUser.role }
        : u
    );

    setUsers(updatedUsers);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'Support Specialist'
    });
    setErrors({ ...errors, user: {} });
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (id) => {
    if (users.length <= 1) {
      return; // Silently prevent deletion of last user
    }

    setUsers(users.filter(u => u.id !== id));
  };

  const handleCancelUserEdit = () => {
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'Support Specialist'
    });
    setErrors({ ...errors, user: {} });
    setShowAddUserModal(false);
  };

  const updateTicket = (ticketId, field, value) => {
    const updatedTickets = tickets.map(t => 
      t.id === ticketId ? { ...t, [field]: value } : t
    );
    setTickets(updatedTickets);
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, [field]: value });
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Get responsive styles
  const styles = getStyles(isMobile);

  // Welcome Page
  if (currentPage === 'welcome') {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.welcomeContainer}>
          <div style={{...styles.glassCard, ...styles.welcomeCard}}>
            <h1 style={styles.welcomeTitle}>Chaos to Clarity</h1>
            <p style={styles.welcomeSubtitle}>Log it. Track it. Close it. </p>
            {/* <p style={styles.welcomeDescription}>Try our demo before reaching out.
            </p> */}
            <button 
              style={styles.btnPrimary}
              onClick={handleStartDemo}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Start Demo
            </button>
            <p style={styles.welcomeFooter}>by Volhard Consulting</p>
          </div>
        </div>

        {showPersonalizationModal && (
          <div style={styles.modalOverlay}>
            <div
              style={{
                ...styles.glassCard,
                ...styles.modalContent,
                ...(personalizationStep === 3 ? styles.videoModalContent : {})
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {personalizationStep === 1 && (
                <>
                  <h3 style={styles.modalTitle}>Let's personalize your experience</h3>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>What's your name?</label>
                    <input
                      type="text"
                      style={{
                        ...styles.formInput,
                        ...(errors.personalization.name ? styles.formInputError : {})
                      }}
                      placeholder="Enter your name"
                      value={tempUserName}
                      onChange={(e) => {
                        setTempUserName(e.target.value);
                        if (errors.personalization.name) {
                          setErrors({ ...errors, personalization: {} });
                        }
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                    />
                    {errors.personalization.name && (
                      <span style={styles.errorMessage}>{errors.personalization.name}</span>
                    )}
                  </div>
                  <div style={styles.modalActions}>
                    <button style={styles.btnSecondary} onClick={handleSkipPersonalization}>
                      Skip
                    </button>
                    <button style={styles.btnPrimary} onClick={handleNameSubmit}>
                      Continue
                    </button>
                  </div>
                </>
              )}

              {personalizationStep === 2 && (
                <>
                  <h3 style={{...styles.modalTitle, fontSize: isMobile ? '24px' : '32px', marginBottom: '20px'}}>
                    Welcome, {userName}!
                  </h3>

                  <div style={styles.infoCard}>
                    <h4 style={styles.infoCardTitle}>These Aren't Concert Tickets!</h4>
                    <p style={styles.infoCardText}>
                      A ticket management system helps teams track and resolve work requests,
                      technical issues, and customer support inquiries. Think of it as a central
                      hub where problems get reported, assigned to the right people, and tracked
                      until they're solved. No backstage passes required!
                    </p>
                  </div>

                  <div style={styles.modalActions}>
                    <button style={styles.btnPrimary} onClick={handleWelcomeContinue}>
                      Got it, let's continue
                    </button>
                  </div>
                </>
              )}

              {personalizationStep === 3 && (
                <>
                  <h3 style={{...styles.modalTitle, fontSize: isMobile ? '20px' : '24px', marginBottom: '16px'}}>
                    For the Visual Learners (We See You!)
                  </h3>
                  <p style={{...styles.infoCardText, marginBottom: '20px', textAlign: 'center'}}>
                    Sometimes it's easier to watch than read. Here's a quick tour of how this all works:
                  </p>

                  <div style={styles.videoContainer}>
                    <iframe
                      src="https://player.vimeo.com/video/1127658492?h=b8e3f4d8e7&title=0&byline=0&portrait=0"
                      style={styles.videoIframe}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title="Ticket Management System Demo"
                    />
                  </div>

                  <div style={styles.modalActions}>
                    <button style={styles.btnSecondary} onClick={handleVideoSkip}>
                      Skip Video
                    </button>
                    <button style={styles.btnPrimary} onClick={handleVideoSkip}>
                      Continue
                    </button>
                  </div>
                </>
              )}

              {personalizationStep === 4 && (
                <>
                  <h3 style={styles.modalTitle}>One more thing...</h3>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>What's the name of your company?</label>
                    <input
                      type="text"
                      style={{
                        ...styles.formInput,
                        ...(errors.personalization.company ? styles.formInputError : {})
                      }}
                      placeholder="Enter company name"
                      value={tempCompanyName}
                      onChange={(e) => {
                        setTempCompanyName(e.target.value);
                        if (errors.personalization.company) {
                          setErrors({ ...errors, personalization: { ...errors.personalization, company: undefined } });
                        }
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleCompanySubmit()}
                    />
                    {errors.personalization.company && (
                      <span style={styles.errorMessage}>{errors.personalization.company}</span>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>What industry are you in?</label>
                    <p style={{...styles.infoCardText, fontSize: isMobile ? '13px' : '14px', marginBottom: '16px', color: 'rgba(255, 255, 255, 0.6)'}}>
                      We'll customize your demo tickets to match your industry
                    </p>
                    <div style={styles.industryGrid}>
                      {Object.keys(industryTickets).map((industry) => (
                        <div
                          key={industry}
                          style={{
                            ...styles.industryCard,
                            ...(selectedIndustry === industry ? styles.industryCardSelected : {})
                          }}
                          onClick={() => {
                            setSelectedIndustry(industry);
                            if (errors.personalization.industry) {
                              setErrors({ ...errors, personalization: { ...errors.personalization, industry: undefined } });
                            }
                          }}
                        >
                          <span style={styles.industryCardText}>{industry}</span>
                          {selectedIndustry === industry && (
                            <span style={styles.industryCheckmark}>✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.personalization.industry && (
                      <span style={styles.errorMessage}>{errors.personalization.industry}</span>
                    )}
                  </div>

                  <div style={styles.modalActions}>
                    <button style={styles.btnSecondary} onClick={handleSkipPersonalization}>
                      Skip
                    </button>
                    <button style={styles.btnPrimary} onClick={handleCompanySubmit}>
                      Start Demo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // All Tickets Page
  if (currentPage === 'tickets') {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.ticketsContainer}>
          <header style={styles.header}>
            <h2 style={styles.headerTitle}>{companyName} Tickets</h2>
            <div style={styles.headerActions}>
              <button
                style={styles.btnSecondary}
                onClick={() => setShowUsersModal(true)}
              >
                + Users
              </button>
              <button
                style={styles.btnPrimary}
                onClick={() => setShowAddModal(true)}
              >
                + Add Ticket
              </button>
            </div>
          </header>

          <div style={styles.controlsRow}>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              style={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          {isMobile ? (
            // Mobile: Card-based layout
            <div style={styles.ticketCardsContainer}>
              {filteredTickets.map(ticket => (
                <div
                  key={ticket.id}
                  style={styles.ticketCard}
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setCurrentPage('detail');
                  }}
                >
                  <div style={styles.ticketCardHeader}>
                    <span style={styles.ticketCardId}>#{ticket.id}</span>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background: statusColors[ticket.status].background,
                        color: statusColors[ticket.status].color,
                        border: statusColors[ticket.status].border
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <h3 style={styles.ticketCardTitle}>{ticket.title}</h3>
                  <div style={styles.ticketCardMeta}>
                    <span style={styles.ticketCardCategory}>{ticket.category}</span>
                    <span style={styles.ticketCardDivider}>•</span>
                    <span style={styles.ticketCardAssigned}>{ticket.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop: Table layout
            <div style={{...styles.glassCard, ...styles.tableCard}}>
              <table style={styles.ticketsTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>TITLE</th>
                    <th style={styles.th}>CATEGORY</th>
                    <th style={styles.th}>STATUS</th>
                    <th style={styles.th}>ASSIGNED TO</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map(ticket => (
                    <tr
                      key={ticket.id}
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setCurrentPage('detail');
                      }}
                      style={styles.ticketRow}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={styles.td}>#{ticket.id}</td>
                      <td style={styles.td}>{ticket.title}</td>
                      <td style={styles.td}>{ticket.category}</td>
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            background: statusColors[ticket.status].background,
                            color: statusColors[ticket.status].color,
                            border: statusColors[ticket.status].border
                          }}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td style={styles.td}>{ticket.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showAddModal && (
          <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
            <div style={{...styles.glassCard, ...styles.modalContent}} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Add New Ticket</h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  style={{
                    ...styles.formInput,
                    ...(errors.ticket.title ? styles.formInputError : {})
                  }}
                  value={newTicket.title}
                  onChange={(e) => {
                    setNewTicket({ ...newTicket, title: e.target.value });
                    if (errors.ticket.title) {
                      setErrors({ ...errors, ticket: { ...errors.ticket, title: undefined } });
                    }
                  }}
                />
                {errors.ticket.title && (
                  <span style={styles.errorMessage}>{errors.ticket.title}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select
                  style={styles.formSelect}
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                >
                  <option>Technical</option>
                  <option>Request</option>
                  <option>General</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select
                  style={styles.formSelect}
                  value={newTicket.status}
                  onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Assigned To</label>
                <select
                  style={styles.formSelect}
                  value={newTicket.assignedTo}
                  onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={{
                    ...styles.formTextarea,
                    ...(errors.ticket.description ? styles.formInputError : {})
                  }}
                  value={newTicket.description}
                  onChange={(e) => {
                    setNewTicket({ ...newTicket, description: e.target.value });
                    if (errors.ticket.description) {
                      setErrors({ ...errors, ticket: { ...errors.ticket, description: undefined } });
                    }
                  }}
                  rows="4"
                />
                {errors.ticket.description && (
                  <span style={styles.errorMessage}>{errors.ticket.description}</span>
                )}
              </div>
              <div style={styles.modalActions}>
                <button style={styles.btnSecondary} onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button style={styles.btnPrimary} onClick={handleAddTicket}>
                  Add Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {showUsersModal && (
          <div style={styles.modalOverlay} onClick={() => setShowUsersModal(false)}>
            <div style={{...styles.glassCard, ...styles.modalContent, ...styles.usersModalContent}} onClick={(e) => e.stopPropagation()}>
              {isMobile && (
                <div style={styles.mobileModalHeader}>
                  <h3 style={styles.mobileModalTitle}>Manage Users</h3>
                  <button
                    style={styles.btnClose}
                    onClick={() => setShowUsersModal(false)}
                  >
                    ✕
                  </button>
                </div>
              )}
              <div style={styles.usersModalHeader}>
                {!isMobile && <h3 style={styles.modalTitle}>Manage Users</h3>}
                <button
                  style={styles.btnPrimary}
                  onClick={() => setShowAddUserModal(true)}
                >
                  + Add User
                </button>
              </div>

              <div style={styles.usersList}>
                {users.map(user => (
                  <div key={user.id} style={styles.userCard}>
                    <div style={styles.userCardContent}>
                      <div style={styles.userInfo}>
                        <h4 style={styles.userName}>{user.name}</h4>
                        <p style={styles.userEmail}>{user.email}</p>
                        <p style={styles.userRole}>{user.role}</p>
                      </div>
                      <div style={styles.userActions}>
                        <button
                          style={styles.btnEdit}
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.btnDelete}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showAddUserModal && (
          <div style={styles.modalOverlay} onClick={handleCancelUserEdit}>
            <div style={{...styles.glassCard, ...styles.modalContent}} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  style={{
                    ...styles.formInput,
                    ...(errors.user.name ? styles.formInputError : {})
                  }}
                  value={newUser.name}
                  onChange={(e) => {
                    setNewUser({ ...newUser, name: e.target.value });
                    if (errors.user.name) {
                      setErrors({ ...errors, user: { ...errors.user, name: undefined } });
                    }
                  }}
                  placeholder="Enter full name"
                />
                {errors.user.name && (
                  <span style={styles.errorMessage}>{errors.user.name}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  style={{
                    ...styles.formInput,
                    ...(errors.user.email ? styles.formInputError : {})
                  }}
                  value={newUser.email}
                  onChange={(e) => {
                    setNewUser({ ...newUser, email: e.target.value });
                    if (errors.user.email) {
                      setErrors({ ...errors, user: { ...errors.user, email: undefined } });
                    }
                  }}
                  placeholder="Enter email address"
                />
                {errors.user.email && (
                  <span style={styles.errorMessage}>{errors.user.email}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Role</label>
                <select
                  style={styles.formSelect}
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option>Support Specialist</option>
                  <option>Support Engineer</option>
                  <option>Senior Engineer</option>
                  <option>Team Lead</option>
                  <option>Manager</option>
                </select>
              </div>
              <div style={styles.modalActions}>
                <button style={styles.btnSecondary} onClick={handleCancelUserEdit}>
                  Cancel
                </button>
                <button style={styles.btnPrimary} onClick={editingUser ? handleUpdateUser : handleAddUser}>
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Ticket Detail Page
  if (currentPage === 'detail' && selectedTicket) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.detailContainer}>
          <header style={styles.header}>
            <h2 style={styles.headerTitle}>{companyName} Tickets</h2>
            <button 
              style={styles.btnPrimary}
              onClick={() => setCurrentPage('tickets')}
            >
              ← Back to All Tickets
            </button>
          </header>

          <div style={{...styles.glassCard, ...styles.detailCard}}>
            <div style={styles.detailHeader}>
              <div>
                <h1 style={styles.detailTitle}>#{selectedTicket.id} - {selectedTicket.title}</h1>
                <span 
                  style={{
                    ...styles.statusBadge,
                    background: statusColors[selectedTicket.status].background,
                    color: statusColors[selectedTicket.status].color,
                    border: statusColors[selectedTicket.status].border,
                    marginTop: '12px',
                    display: 'inline-block'
                  }}
                >
                  {selectedTicket.status}
                </span>
              </div>
              <button 
                style={styles.btnDanger}
                onClick={() => handleDeleteTicket(selectedTicket.id)}
              >
                Delete
              </button>
            </div>

            <div style={styles.detailFields}>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Category:</label>
                <select 
                  style={{...styles.formSelect, ...styles.inlineSelect}}
                  value={selectedTicket.category}
                  onChange={(e) => updateTicket(selectedTicket.id, 'category', e.target.value)}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(29, 42, 66, 0.8)';
                    e.target.style.borderColor = '#6677ee';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 119, 238, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(29, 42, 66, 0.6)';
                    e.target.style.borderColor = 'rgba(102, 119, 234, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option>Technical</option>
                  <option>Request</option>
                  <option>General</option>
                </select>
              </div>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Status:</label>
                <select 
                  style={{...styles.formSelect, ...styles.inlineSelect}}
                  value={selectedTicket.status}
                  onChange={(e) => updateTicket(selectedTicket.id, 'status', e.target.value)}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(29, 42, 66, 0.8)';
                    e.target.style.borderColor = '#6677ee';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 119, 238, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(29, 42, 66, 0.6)';
                    e.target.style.borderColor = 'rgba(102, 119, 234, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Assigned To:</label>
                <select
                  style={{...styles.formSelect, ...styles.inlineSelect}}
                  value={selectedTicket.assignedTo}
                  onChange={(e) => updateTicket(selectedTicket.id, 'assignedTo', e.target.value)}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(29, 42, 66, 0.8)';
                    e.target.style.borderColor = '#6677ee';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 119, 238, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(29, 42, 66, 0.6)';
                    e.target.style.borderColor = 'rgba(102, 119, 234, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.descriptionSection}>
              <label style={styles.label}>Description:</label>
              <p style={styles.descriptionText}>{selectedTicket.description}</p>
            </div>

            <div style={styles.commentsSection}>
              <div style={styles.commentsHeader}>
                <h3 style={styles.commentsTitle}>Comments ({selectedTicket.comments.length})</h3>
                <button 
                  style={styles.btnPrimary}
                  onClick={() => setShowCommentModal(true)}
                >
                  + Add Comment
                </button>
              </div>
              <div style={styles.commentsList}>
                {selectedTicket.comments.map(comment => (
                  <div key={comment.id} style={{...styles.glassCard, ...styles.commentCard}}>
                    <div style={styles.commentHeader}>
                      <strong>{comment.author}</strong>
                      <span style={styles.commentTimestamp}>{comment.timestamp}</span>
                    </div>
                    <p style={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showCommentModal && (
          <div style={styles.modalOverlay} onClick={() => setShowCommentModal(false)}>
            <div style={{...styles.glassCard, ...styles.modalContent}} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Add Comment</h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  type="text"
                  style={{
                    ...styles.formInput,
                    ...(errors.comment.author ? styles.formInputError : {})
                  }}
                  value={newComment.author}
                  onChange={(e) => {
                    setNewComment({ ...newComment, author: e.target.value });
                    if (errors.comment.author) {
                      setErrors({ ...errors, comment: { ...errors.comment, author: undefined } });
                    }
                  }}
                  placeholder="Enter your name"
                />
                {errors.comment.author && (
                  <span style={styles.errorMessage}>{errors.comment.author}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Comment</label>
                <textarea
                  style={{
                    ...styles.formTextarea,
                    ...(errors.comment.text ? styles.formInputError : {})
                  }}
                  value={newComment.text}
                  onChange={(e) => {
                    setNewComment({ ...newComment, text: e.target.value });
                    if (errors.comment.text) {
                      setErrors({ ...errors, comment: { ...errors.comment, text: undefined } });
                    }
                  }}
                  rows="4"
                />
                {errors.comment.text && (
                  <span style={styles.errorMessage}>{errors.comment.text}</span>
                )}
              </div>
              <div style={styles.modalActions}>
                <button style={styles.btnSecondary} onClick={() => setShowCommentModal(false)}>
                  Cancel
                </button>
                <button style={styles.btnPrimary} onClick={handleAddComment}>
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// Get responsive styles
const getStyles = (isMobile) => ({
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    padding: isMobile ? '12px' : '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: isMobile ? '20px 12px' : '40px 20px'
  },
  welcomeCard: {
    maxWidth: '700px',
    width: '100%',
    padding: isMobile ? '32px 20px' : '60px 40px',
    textAlign: 'center'
  },
  welcomeTitle: {
    fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : '48px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
    lineHeight: '1.2'
  },
  welcomeSubtitle: {
    fontSize: isMobile ? 'clamp(16px, 5vw, 24px)' : '24px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: isMobile ? '20px' : '32px',
    fontWeight: '300'
  },
  welcomeDescription: {
    fontSize: isMobile ? '16px' : '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.6',
    marginBottom: isMobile ? '28px' : '40px',
    maxWidth: '600px',
    margin: isMobile ? '0 auto 28px' : '0 auto 40px'
  },
  welcomeFooter: {
    marginTop: '40px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)'
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: isMobile ? 'blur(8px)' : 'blur(10px)',
    borderRadius: isMobile ? '12px' : '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.25)' : '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  ticketsContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isMobile ? '20px' : '30px',
    flexWrap: 'wrap',
    gap: isMobile ? '12px' : '20px'
  },
  headerTitle: {
    fontSize: isMobile ? 'clamp(20px, 6vw, 32px)' : '32px',
    color: '#ffffff',
    fontWeight: '600',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: isMobile ? '8px' : '12px',
    width: isMobile ? '100%' : 'auto'
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)',
    color: '#ffffff',
    border: 'none',
    padding: isMobile ? '14px 20px' : '12px 24px',
    borderRadius: '8px',
    fontSize: isMobile ? '15px' : '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(129, 140, 248, 0.3)',
    minHeight: '44px',
    flex: isMobile ? '1' : 'initial',
    whiteSpace: 'nowrap'
  },
  btnSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: isMobile ? '14px 20px' : '12px 24px',
    borderRadius: '8px',
    fontSize: isMobile ? '15px' : '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minHeight: '44px',
    flex: isMobile ? '1' : 'initial',
    whiteSpace: 'nowrap'
  },
  btnDanger: {
    background: 'rgba(248, 113, 113, 0.25)',
    color: '#fecaca',
    border: '1px solid rgba(248, 113, 113, 0.4)',
    padding: isMobile ? '12px 18px' : '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '44px'
  },
  userIcon: {
    fontSize: '18px'
  },
  controlsRow: {
    display: 'flex',
    gap: isMobile ? '12px' : '16px',
    marginBottom: isMobile ? '16px' : '24px',
    flexWrap: 'wrap'
  },
  searchInput: {
    flex: '1',
    minWidth: isMobile ? '100%' : '250px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: isMobile ? '14px 16px' : '12px 16px',
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none',
    minHeight: '44px',
    boxSizing: 'border-box'
  },
  filterSelect: {
    minWidth: isMobile ? '100%' : '150px',
    background: 'rgba(29, 42, 66, 0.6)',
    backdropFilter: isMobile ? 'blur(12px)' : 'blur(20px)',
    border: '1px solid rgba(102, 119, 234, 0.3)',
    borderRadius: '8px',
    padding: isMobile ? '14px 16px' : '10px 14px',
    fontSize: '14px',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    appearance: 'none',
    minHeight: '44px',
    boxSizing: 'border-box'
  },
  tableCard: {
    padding: '0',
    overflow: 'hidden'
  },
  ticketsTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '16px 20px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    textTransform: 'uppercase'
  },
  td: {
    padding: '16px 20px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '15px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  ticketRow: {
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
    textAlign: 'center'
  },
  // Mobile ticket cards
  ticketCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  ticketCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px'
  },
  ticketCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  ticketCardId: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  ticketCardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '12px',
    lineHeight: '1.4',
    margin: '0 0 12px 0'
  },
  ticketCardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  ticketCardCategory: {
    fontWeight: '500'
  },
  ticketCardDivider: {
    color: 'rgba(255, 255, 255, 0.3)'
  },
  ticketCardAssigned: {
    fontWeight: '400'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: isMobile ? 'flex-end' : 'center',
    justifyContent: 'center',
    padding: isMobile ? '0' : '20px',
    zIndex: 1000
  },
  modalContent: {
    maxWidth: isMobile ? '100%' : '500px',
    width: '100%',
    padding: isMobile ? '24px 20px' : '32px',
    maxHeight: isMobile ? '85vh' : '90vh',
    overflowY: 'auto',
    borderRadius: isMobile ? '20px 20px 0 0' : '12px',
    WebkitOverflowScrolling: 'touch'
  },
  videoModalContent: {
    maxWidth: isMobile ? '100%' : '800px',
    padding: isMobile ? '24px 20px' : '40px'
  },
  modalTitle: {
    fontSize: isMobile ? '20px' : '24px',
    color: '#ffffff',
    marginBottom: isMobile ? '20px' : '24px',
    fontWeight: '600'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '8px',
    fontWeight: '500'
  },
  formInput: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: isMobile ? '14px 16px' : '12px 16px',
    fontSize: isMobile ? '16px' : '15px',
    color: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
    minHeight: '44px'
  },
  formSelect: {
    width: '100%',
    background: 'rgba(29, 42, 66, 0.6)',
    backdropFilter: isMobile ? 'blur(12px)' : 'blur(20px)',
    border: '1px solid rgba(102, 119, 234, 0.3)',
    borderRadius: '8px',
    padding: isMobile ? '14px 16px' : '10px 14px',
    fontSize: isMobile ? '16px' : '14px',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    appearance: 'none',
    minHeight: '44px'
  },
  inlineSelect: {
    cursor: 'pointer'
  },
  formTextarea: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: isMobile ? '14px 16px' : '12px 16px',
    fontSize: isMobile ? '16px' : '15px',
    color: '#ffffff',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    minHeight: '100px'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: isMobile ? 'stretch' : 'flex-end',
    marginTop: isMobile ? '20px' : '24px',
    flexDirection: isMobile ? 'column-reverse' : 'row'
  },
  detailContainer: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  detailCard: {
    padding: isMobile ? '20px 16px' : '40px'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: isMobile ? '24px' : '32px',
    paddingBottom: isMobile ? '16px' : '24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    flexWrap: 'wrap',
    gap: isMobile ? '16px' : '20px'
  },
  detailTitle: {
    fontSize: isMobile ? 'clamp(18px, 5vw, 28px)' : '28px',
    color: '#ffffff',
    marginBottom: '12px',
    fontWeight: '600',
    wordBreak: 'break-word'
  },
  detailFields: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: isMobile ? '16px' : '20px',
    marginBottom: isMobile ? '24px' : '32px'
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  descriptionSection: {
    marginBottom: isMobile ? '24px' : '32px'
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '15px',
    lineHeight: '1.6',
    marginTop: '8px',
    wordBreak: 'break-word'
  },
  commentsSection: {
    marginTop: isMobile ? '32px' : '40px'
  },
  commentsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isMobile ? '16px' : '20px',
    flexWrap: 'wrap',
    gap: isMobile ? '12px' : '16px'
  },
  commentsTitle: {
    fontSize: isMobile ? '18px' : '20px',
    color: '#ffffff',
    fontWeight: '600',
    margin: 0
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  commentCard: {
    padding: isMobile ? '16px' : '20px'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    color: '#ffffff',
    flexWrap: 'wrap',
    gap: '8px'
  },
  commentTimestamp: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.5)'
  },
  commentText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0
  },
  // User management styles
  usersModalContent: {
    maxWidth: isMobile ? '100%' : '700px',
    position: 'relative'
  },
  mobileModalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  mobileModalTitle: {
    fontSize: '20px',
    color: '#ffffff',
    fontWeight: '600',
    margin: 0
  },
  usersModalHeader: {
    display: 'flex',
    justifyContent: isMobile ? 'stretch' : 'space-between',
    alignItems: 'center',
    marginBottom: isMobile ? '20px' : '24px',
    gap: '16px',
    flexWrap: 'wrap'
  },
  usersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: isMobile ? '12px' : '16px'
  },
  userCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: isMobile ? '16px' : '20px',
    transition: 'all 0.2s ease'
  },
  userCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    gap: '16px',
    flexDirection: isMobile ? 'column' : 'row'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 8px 0'
  },
  userEmail: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0 0 4px 0'
  },
  userRole: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0
  },
  userActions: {
    display: 'flex',
    gap: '8px',
    width: isMobile ? '100%' : 'auto'
  },
  btnEdit: {
    background: 'rgba(129, 140, 248, 0.18)',
    color: '#c7d2fe',
    border: '1px solid rgba(129, 140, 248, 0.35)',
    padding: isMobile ? '12px 20px' : '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    flex: isMobile ? '1' : 'initial',
    whiteSpace: 'nowrap'
  },
  btnDelete: {
    background: 'rgba(248, 113, 113, 0.18)',
    color: '#fecaca',
    border: '1px solid rgba(248, 113, 113, 0.35)',
    padding: isMobile ? '12px 20px' : '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    flex: isMobile ? '1' : 'initial',
    whiteSpace: 'nowrap'
  },
  btnClose: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    width: '44px',
    height: '44px',
    fontSize: '20px',
    fontWeight: '300',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  // Info card for onboarding
  infoCard: {
    background: 'rgba(102, 126, 234, 0.15)',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    borderRadius: '12px',
    padding: isMobile ? '20px' : '24px',
    marginBottom: isMobile ? '24px' : '32px'
  },
  infoCardTitle: {
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: '600',
    color: '#a0c4ff',
    marginBottom: '12px',
    margin: '0 0 12px 0'
  },
  infoCardText: {
    fontSize: isMobile ? '15px' : '16px',
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: '1.6',
    margin: 0
  },
  // Error styles
  formInputError: {
    borderColor: '#f87171',
    borderWidth: '2px'
  },
  errorMessage: {
    display: 'block',
    color: '#fca5a5',
    fontSize: '13px',
    marginTop: '6px',
    fontWeight: '500'
  },
  // Video embed styles
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
    borderRadius: '12px',
    marginBottom: isMobile ? '20px' : '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  videoIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  },
  // Industry selection styles
  industryGrid: {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? '12px' : '16px',
    marginTop: '12px'
  },
  industryCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: isMobile ? '16px' : '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '44px',
    boxSizing: 'border-box'
  },
  industryCardSelected: {
    background: 'rgba(129, 140, 248, 0.2)',
    border: '2px solid rgba(129, 140, 248, 0.6)',
    boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.15)'
  },
  industryCardText: {
    fontSize: isMobile ? '14px' : '15px',
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: '1.4',
    flex: 1
  },
  industryCheckmark: {
    fontSize: '20px',
    color: '#a78bfa',
    fontWeight: 'bold',
    marginLeft: '12px'
  }
});

export default App;