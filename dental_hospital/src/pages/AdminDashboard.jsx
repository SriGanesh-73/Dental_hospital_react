    // src/components/AdminDashboard.jsx
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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#f3a712',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color: '#2a7f8d',
    fontWeight: 'bold',
  },
}));

const StatusSelect = ({ appointmentId, currentStatus, onChange }) => {
  return (
    <FormControl size="small" variant="outlined">
      <Select
        value={currentStatus}
        onChange={(e) => onChange(appointmentId, e.target.value)}
        sx={{
          minWidth: 120,
          backgroundColor: 
            currentStatus === 'confirmed' ? '#e8f5e9' : 
            currentStatus === 'cancelled' ? '#ffebee' : '#fff8e1',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2a7f8d',
          },
        }}
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="confirmed">Confirmed</MenuItem>
        <MenuItem value="cancelled">Cancelled</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch users
        const usersResponse = await fetch('http://localhost:3000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch appointments
        const appointmentsResponse = await fetch('/api/admin/appointments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setAppointments(appointments.map(appt => 
          appt._id === appointmentId ? { ...appt, status: newStatus } : appt
        ));
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: '#2a7f8d' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: '#2a7f8d', mb: 3, fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <StyledTabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <StyledTab label="Appointments" />
            <StyledTab label="Users" />
          </StyledTabs>
        </CardContent>
      </Card>

      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#2a7f8d', mb: 2 }}>
              Appointment Requests
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#d8f0f3' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Treatment</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment._id}>
                      <TableCell>{appointment.name}</TableCell>
                      <TableCell>{appointment.email}</TableCell>
                      <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.treatment}</TableCell>
                      <TableCell>
                        <StatusSelect
                          appointmentId={appointment._id}
                          currentStatus={appointment.status}
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
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ color: '#2a7f8d', mb: 2 }}>
              User Management
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#d8f0f3' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          size="small"
                          sx={{ 
                            color: '#2a7f8d',
                            borderColor: '#2a7f8d',
                            '&:hover': {
                              backgroundColor: '#f0f8fa',
                              borderColor: '#f3a712'
                            }
                          }}
                        >
                          Edit
                        </Button>
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