// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(`http://localhost:3000/api/users/appointments/${user?._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <Box className="loading-spinner">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="user-dashboard-container">
      <Typography className="user-header">
        My Appointments
      </Typography>

      <Card className="user-card">
        <CardContent>
          <Typography className="section-header">
            Appointment Status
          </Typography>
          <TableContainer component={Paper} className="user-table-container">
            <Table className="user-table">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell className="table-header-cell">Date</TableCell>
                  <TableCell className="table-header-cell">Time</TableCell>
                  <TableCell className="table-header-cell">Treatment</TableCell>
                  <TableCell className="table-header-cell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt._id} className="table-row">
                    <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                    <TableCell>{appt.time}</TableCell>
                    <TableCell>{appt.treatment}</TableCell>
                    <TableCell>{appt.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDashboard;
