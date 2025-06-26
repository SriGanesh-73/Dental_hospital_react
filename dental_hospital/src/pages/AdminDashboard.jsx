// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/AdminDashboard.css'

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#f3a712',
  },
});

const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: '#2a7f8d',
    fontWeight: 'bold',
  },
});

const StatusSelect = ({ appointmentId, currentStatus, onChange }) => (
  <FormControl size="small" variant="outlined">
    <Select
      value={currentStatus}
      onChange={(e) => onChange(appointmentId, e.target.value)}
      className={`status-select status-select-${currentStatus}`}
    >
      <MenuItem value="pending">Pending</MenuItem>
      <MenuItem value="confirmed">Confirmed</MenuItem>
      <MenuItem value="cancelled">Cancelled</MenuItem>
      <MenuItem value="completed">Completed</MenuItem>
    </Select>
  </FormControl>
);

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersRes = await fetch('http://localhost:3000/api/admin/allusers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const usersData = await usersRes.json();
        setUsers(usersData);

        const apptRes = await fetch('http://localhost:3000/api/admin/appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const apptData = await apptRes.json();
        setAppointments(apptData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/admin/appointments/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    setAppointments(prev => prev.map(appt =>
      appt._id === appointmentId ? { ...appt, status: newStatus } : appt
    ));
  };

  if (loading) return <Box className="loading-spinner"><CircularProgress /></Box>;

  return (
    <Box className="admin-dashboard-container">
      <Typography className="admin-header">Admin Dashboard</Typography>

      <Card className="admin-card">
        <CardContent>
          <StyledTabs className="admin-tabs" value={activeTab} onChange={(e, v) => setActiveTab(v)}>
            <StyledTab className="admin-tab" label="Appointments" />
            <StyledTab className="admin-tab" label="Users" />
          </StyledTabs>
        </CardContent>
      </Card>

      {activeTab === 0 && (
        <Card className="admin-card">
          <CardContent>
            <Typography className="section-header">Appointment Requests</Typography>
            <TableContainer component={Paper} className="admin-table-container">
              <Table className="admin-table">
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell className="table-header-cell">Patient</TableCell>
                    <TableCell className="table-header-cell">Email</TableCell>
                    <TableCell className="table-header-cell">Date</TableCell>
                    <TableCell className="table-header-cell">Time</TableCell>
                    <TableCell className="table-header-cell">Treatment</TableCell>
                    <TableCell className="table-header-cell">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appt) => (
                    <TableRow key={appt._id} className="table-row">
                      <TableCell>{appt.name}</TableCell>
                      <TableCell>{appt.email}</TableCell>
                      <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.treatment}</TableCell>
                      <TableCell>
                        <StatusSelect
                          appointmentId={appt._id}
                          currentStatus={appt.status}
                          onChange={handleStatusChange}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Card className="admin-card">
          <CardContent>
            <Typography className="section-header">User Management</Typography>
            <TableContainer component={Paper} className="admin-table-container">
              <Table className="admin-table">
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell className="table-header-cell">Name</TableCell>
                    <TableCell className="table-header-cell">Email</TableCell>
                    <TableCell className="table-header-cell">Phone</TableCell>
                    <TableCell className="table-header-cell">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id} className="table-row">
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Button className="edit-button">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};


export default AdminDashboard;