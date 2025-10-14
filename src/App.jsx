import { useState } from 'react';

// Initial sample data
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
  const [currentPage, setCurrentPage] = useState('welcome');
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

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

  const statusColors = {
    'Open': '#4A90E2',
    'In Progress': '#F5A623',
    'Resolved': '#7ED321'
  };

  const handleAddTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      alert('Please fill in all required fields');
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
      assignedTo: 'Sarah Chen',
      description: ''
    });
    setShowAddModal(false);
  };

  const handleAddComment = () => {
    if (!newComment.author.trim() || !newComment.text.trim()) {
      alert('Please fill in all fields');
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
    setNewComment({ author: '', text: '' });
    setShowCommentModal(false);
  };

  const handleDeleteTicket = (id) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      setTickets(tickets.filter(t => t.id !== id));
      setCurrentPage('tickets');
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Welcome Page
  if (currentPage === 'welcome') {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.welcomeContainer}>
          <div style={{...styles.glassCard, ...styles.welcomeCard}}>
            <h1 style={styles.welcomeTitle}>Ticket Management System</h1>
            <p style={styles.welcomeSubtitle}>Beautiful and Useful</p>
            <p style={styles.welcomeDescription}>
              Experience a ServiceNow-style ticketing system that's affordable,
              customizable, and built on Microsoft Power Platform. Try our
              demo before reaching out.
            </p>
            <button 
              style={styles.btnPrimary}
              onClick={() => setCurrentPage('tickets')}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Start Demo
            </button>
            <p style={styles.welcomeFooter}>by Volhard Consulting</p>
          </div>
        </div>
      </div>
    );
  }

  // All Tickets Page
  if (currentPage === 'tickets') {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.ticketsContainer}>
          <header style={styles.header}>
            <h2 style={styles.headerTitle}>Volhard Tickets</h2>
            <div style={styles.headerActions}>
              <button style={styles.btnSecondary}>
                <span style={styles.userIcon}>👤</span>
                Users
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
                          backgroundColor: statusColors[ticket.status]
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
        </div>

        {showAddModal && (
          <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
            <div style={{...styles.glassCard, ...styles.modalContent}} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Add New Ticket</h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  style={styles.formInput}
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                />
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
                  <option>Sarah Chen</option>
                  <option>Michael Brown</option>
                  <option>John Smith</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.formTextarea}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows="4"
                />
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
      </div>
    );
  }

  // Ticket Detail Page
  if (currentPage === 'detail' && selectedTicket) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.detailContainer}>
          <header style={styles.header}>
            <h2 style={styles.headerTitle}>Volhard Tickets</h2>
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
                    backgroundColor: statusColors[selectedTicket.status],
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
                <select style={styles.formSelect} value={selectedTicket.category} readOnly>
                  <option>{selectedTicket.category}</option>
                </select>
              </div>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Status:</label>
                <select style={styles.formSelect} value={selectedTicket.status} readOnly>
                  <option>{selectedTicket.status}</option>
                </select>
              </div>
              <div style={styles.fieldRow}>
                <label style={styles.label}>Assigned To:</label>
                <select style={styles.formSelect} value={selectedTicket.assignedTo} readOnly>
                  <option>{selectedTicket.assignedTo}</option>
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
                  style={styles.formInput}
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Comment</label>
                <textarea
                  style={styles.formTextarea}
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  rows="4"
                />
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

// Inline styles
const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  welcomeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '40px 20px'
  },
  welcomeCard: {
    maxWidth: '700px',
    width: '100%',
    padding: '60px 40px',
    textAlign: 'center'
  },
  welcomeTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
    lineHeight: '1.2'
  },
  welcomeSubtitle: {
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '32px',
    fontWeight: '300'
  },
  welcomeDescription: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.6',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px'
  },
  welcomeFooter: {
    marginTop: '40px',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)'
  },
  glassCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  ticketsContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerTitle: {
    fontSize: '32px',
    color: '#ffffff',
    fontWeight: '600',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  btnSecondary: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  btnDanger: {
    background: 'rgba(220, 38, 38, 0.8)',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  userIcon: {
    fontSize: '18px'
  },
  controlsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  searchInput: {
    flex: '1',
    minWidth: '250px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none'
  },
  filterSelect: {
    minWidth: '150px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer'
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
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 1000
  },
  modalContent: {
    maxWidth: '500px',
    width: '100%',
    padding: '32px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalTitle: {
    fontSize: '24px',
    color: '#ffffff',
    marginBottom: '24px',
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
    padding: '12px 16px',
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box'
  },
  formSelect: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  formTextarea: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#ffffff',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px'
  },
  detailContainer: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  detailCard: {
    padding: '40px'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    flexWrap: 'wrap',
    gap: '20px'
  },
  detailTitle: {
    fontSize: '28px',
    color: '#ffffff',
    marginBottom: '12px',
    fontWeight: '600'
  },
  detailFields: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  descriptionSection: {
    marginBottom: '32px'
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '15px',
    lineHeight: '1.6',
    marginTop: '8px'
  },
  commentsSection: {
    marginTop: '40px'
  },
  commentsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  commentsTitle: {
    fontSize: '20px',
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
    padding: '20px'
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
  }
};

export default App;