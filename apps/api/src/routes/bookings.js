import express from 'express';
import pb from '../utils/pocketbase.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Helper function to escape CSV values
const escapeCSV = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

// Export bookings as CSV
router.post('/export-csv', async (req, res) => {
  const { filters = {} } = req.body;
  const { status, dateFrom, dateTo } = filters;

  // Build filter query
  let filterQuery = '';
  const filterParts = [];

  if (status) {
    filterParts.push(`status = "${status}"`);
  }

  if (dateFrom) {
    filterParts.push(`date >= "${dateFrom}"`);
  }

  if (dateTo) {
    filterParts.push(`date <= "${dateTo}"`);
  }

  if (filterParts.length > 0) {
    filterQuery = filterParts.join(' && ');
  }

  logger.info(`Exporting bookings with filters: ${filterQuery || 'none'}`);

  // Query bookings from PocketBase
  const bookings = await pb.collection('bookings').getList(1, 5000, {
    filter: filterQuery,
    sort: '-created',
  });

  // CSV headers
  const headers = [
    'Booking ID',
    'Tour Name',
    'Date',
    'Participants',
    'Deposit Paid (€)',
    'Total (€)',
    'Status',
    'Email',
    'Phone',
    'Special Requirements',
  ];

  // Build CSV rows
  const rows = bookings.items.map((booking) => [
    escapeCSV(booking.id),
    escapeCSV(booking.tourName),
    formatDate(booking.date),
    escapeCSV(booking.participants),
    escapeCSV(booking.depositPaid),
    escapeCSV(booking.total),
    escapeCSV(booking.status),
    escapeCSV(booking.email),
    escapeCSV(booking.phone),
    escapeCSV(booking.specialRequirements),
  ]);

  // Create CSV content
  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Set response headers
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="bookings_export.csv"');

  res.send(csvContent);
});

export default router;
