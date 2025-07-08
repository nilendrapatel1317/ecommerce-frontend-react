import React from "react";
import { Box, Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

function getFallbackPaymentId(order) {
  // Use order.id and a short random string for uniqueness
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `pay_${order.id || 'X'}_${rand}`;
}

const statusColor = (status) => {
  switch ((status || '').toUpperCase()) {
    case 'PAID': return '#43a047'; // green
    case 'CANCELLED': return '#e53935'; // red
    case 'RETURNED': return '#1e88e5'; // blue
    case 'PENDING': return '#ff9800'; // orange
    case 'CONFIRMED': return '#8e24aa'; // purple
    case 'SHIPPED': return '#00897b'; // teal
    case 'DELIVERED': return '#388e3c'; // deep green
    default: return '#616161'; // grey
  }
};

const MyOrders = ({ user }) => {
  const orders = (user?.orders || []).slice().sort((a, b) => (b.id || 0) - (a.id || 0));
  // console.log(orders)
  return (
    <Box sx={{padding:3}}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>My Orders</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        There {orders.length === 1 ? 'is' : 'are'} <span style={{ color: '#e53935', fontWeight: 600 }}>{orders.length}</span> order{orders.length === 1 ? '' : 's'}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1100 }}>
          <TableHead sx={{ bgcolor: '#3a4250' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ORDER ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PAYMENT ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>NAME</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>EMAIL</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PHONE NUMBER</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ADDRESS</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PINCODE</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>TOTAL AMOUNT</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PAYMENT MODE</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ORDER STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ color: '#888', fontWeight: 600 }}>
                  No orders
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order, idx) => (
                <TableRow key={order.id || idx}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.payment?.transactionId || getFallbackPaymentId(order)}</TableCell>
                  <TableCell>{order.user?.fullName || '-'}</TableCell>
                  <TableCell>{order.user?.email || '-'}</TableCell>
                  <TableCell>{order.user?.phone || '-'}</TableCell>
                  <TableCell>{order.address?.addressLine || '-'}</TableCell>
                  <TableCell>{order.address?.zipCode || '-'}</TableCell>
                  <TableCell>₹{order.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '-'}</TableCell>
                  <TableCell>{order?.paymentMode || '-'}</TableCell>
                  <TableCell sx={{ color: statusColor(order.orderStatus), fontWeight: 700 }}>
                    {order.orderStatus || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default MyOrders; 