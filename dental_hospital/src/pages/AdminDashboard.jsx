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
  CardContent,
  TextField,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/AdminDashboard.css';
import NavBar from '../components/NavBar.jsx';

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
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersRes = await fetch('http://localhost:5000/api/admin/allusers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const usersData = await usersRes.json();
        setUsers(usersData);

        const apptRes = await fetch('http://localhost:5000/api/admin/appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const apptData = await apptRes.json();
        setAppointments(apptData.appointments);

        const timeRes = await fetch('http://localhost:5000/api/admin/settings/time',{
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const timeData = await timeRes.json();
        setStartTime(timeData.startTime || '');
        setEndTime(timeData.endTime || '');

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
    await fetch(`http://localhost:5000/api/admin/appointments/${appointmentId}`, {
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

  const handleSaveWorkingHours = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/admin/settings/updatetime', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ startTime: String(startTime), endTime: String(endTime) })
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Working Hours Updated: ${data.startTime} to ${data.endTime}`);
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || 'Failed to update working hours'}`);
      }
    } catch (err) {
      console.error("Save Error:", err);
      alert('Failed to update working hours due to network/server error');
    }
  };


  if (loading) return <Box className="loading-spinner"><CircularProgress /></Box>;

  return (
    <Box component='div' className="main">
      <NavBar />
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

        <Box className="working-hours-container admin-card">
        <Typography className="section-header">Global Working Hours</Typography>
        <Stack direction="row" spacing={2} alignItems="center" className="working-hours-stack">
          <TextField
            type="time"
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            className="working-hours-input"
          />
          <TextField
            type="time"
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            className="working-hours-input"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveWorkingHours}
            className="edit-button"
          >
            Save
          </Button>
        </Stack>
      </Box>


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
                    {Array.isArray(appointments) && appointments.length > 0 ? (
                      appointments.map((appt) => (
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography component="div">No appointments available at the moment</Typography>
                        </TableCell>
                      </TableRow>
                    )}

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
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user._id} className="table-row">
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell><Button className="edit-button">Edit</Button></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography component="div">Users not yet registered</Typography>
                        </TableCell>
                      </TableRow>
                    )}

                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
