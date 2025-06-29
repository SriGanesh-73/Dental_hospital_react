// src/components/UserAppointments.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/UserAppointments.css';
import NavBar from '../components/NavBar.jsx';
import { useAuth } from '../context/Authcontext.jsx';

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor:
    status === 'confirmed' ? '#e8f5e9' :
    status === 'cancelled' ? '#ffebee' :
    status === 'completed' ? '#e3f2fd' : '#fff8e1',
  color:
    status === 'confirmed' ? '#2e7d32' :
    status === 'cancelled' ? '#c62828' :
    status === 'completed' ? '#1565c0' : '#f57f17',
  fontWeight: 'bold',
}));

const UserAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Getting the appointments linked with the user:",user);
        const response = await fetch(`http://localhost:5000/api/users/appointments/${user?._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log("Appointment details:",data.appointments);
        localStorage.setItem('appointmentForm',JSON.stringify(data.appointments)  );
        setAppointments(data.appointments); 
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/cancel/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const updated = await response.json();
        console.log('Cancelled:', updated);

        // Re-fetch appointments from backend
        const refreshed = await fetch(`http://localhost:5000/api/users/appointments`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await refreshed.json();
        setAppointments(prev =>
          prev.map(appt =>
            appt._id === appointmentId ? { ...appt, status: 'cancelled' } : appt
          )
        );
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
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
    <Box component='div' className="main">
      <NavBar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ color: '#2a7f8d', mb: 3, fontWeight: 'bold' }}>
          My Appointments
        </Typography>

        {Array.isArray(appointments) && appointments.length === 0 ? (
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#2a7f8d' }}>
              You don't have any appointments yet.
            </Typography>
            <Button 
              variant="contained" 
              sx={{ 
                mt: 2,
                backgroundColor: '#f3a712',
                '&:hover': {
                  backgroundColor: '#d18e0f'
                }
              }}
              onClick={() => navigate('/book-appointment')}
            >
              Book an Appointment
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {appointments.map((appointment) => (
              <Grid item xs={12} md={6} lg={4} key={appointment._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: `4px solid ${
                      appointment.status === 'confirmed' ? '#2a7f8d' :
                      appointment.status === 'cancelled' ? '#e74c3c' : '#f3a712'
                    }`,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: '#2a7f8d', mb: 1 }}>
                      {appointment.treatment}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
          
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Time:</strong> {appointment.time}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body1" sx={{ mr: 1 }}>
                        <strong>Status:</strong>
                      </Typography>
                      <StatusChip
                        label={appointment.status.toUpperCase()}
                        status={appointment.status}
                      />
                    </Box>
                    {appointment.message && (
                      <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                        "{appointment.message}"
                      </Typography>
                    )}
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    {appointment.status === 'pending' || appointment.status === 'confirmed' ? (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleCancel(appointment._id)}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#ffebee'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    ) : null}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default UserAppointments;