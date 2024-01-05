import React from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useGetordersQuery } from '../apiSlice';
import Spinner from './Spinner';

const paperStyle = {
    padding: '16px',
    margin: '16px',
    background: '#303030',
};

const cellTextStyle = {
    color: '#5e43f3',
    width: '40%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const OrdersTableHeader = () => (
    <TableHead>
        <TableRow>
            <TableCell align="center" style={{ color: '#5e43f3' }}>Order ID</TableCell>
            <TableCell align="center" style={cellTextStyle}>Games</TableCell>
            <TableCell align="center" style={cellTextStyle}>Amount Paid</TableCell>
            <TableCell align="center" style={{ color: '#5e43f3' }}>Date</TableCell>
        </TableRow>
    </TableHead>
);

const OrderRow = ({ order }) => (
    <TableRow>
        <TableCell align="center" style={{ color: '#5e43f3' }}>{order._id}</TableCell>
        <TableCell align="center" style={cellTextStyle}>
            {order.games.map(game => game.name).join(', ')}
        </TableCell>
        <TableCell align="center" style={cellTextStyle}>
            ${order.amount / 100}
        </TableCell>
        <TableCell align="center" style={{ color: '#5e43f3' }}>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
    </TableRow>
);

const OrdersList = () => {
    const { data: orders, isLoading, isError, error } = useGetordersQuery();

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <div style={{ margin: 'auto', width: 'fit-content', marginTop: '50px' }}>
                Sorry we encountered a {error.status} of status {error.originalStatus} with content of "{error.data}"
            </div>
        );
    }

    return (
        <Paper style={paperStyle} >
            <TableContainer>
                <Table>
                    <OrdersTableHeader />
                    <TableBody>
                        {orders.map(order => (
                            <OrderRow key={order._id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {orders.length ? "" : <Typography variant='h4' component="h3" textAlign={"center"} margin={5}>No orders has been done!</Typography>}
            <Typography variant='body1' component="h4" textAlign={"center"} margin={3}> Might Need a Minute for a New Order to Appear ! </Typography>
        </Paper>
    );
};

export default OrdersList;
