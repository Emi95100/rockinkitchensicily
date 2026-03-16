/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  // Only send email if booking status is confirmed
  if (e.record.get("bookingStatus") !== "confirmed") {
    e.next();
    return;
  }

  // Get tour details
  const tourId = e.record.get("tourId");
  const tour = $app.findRecordById("tours", tourId);
  
  if (!tour) {
    e.next();
    return;
  }

  // Build email content
  const tourName = tour.get("tourName");
  const tourLocation = tour.get("location");
  const startTime = tour.get("startTime");
  const endTime = tour.get("endTime");
  const price = tour.get("price");
  const depositAmount = tour.get("depositAmount");
  
  const bookingRef = e.record.get("bookingReference") || e.record.id;
  const participantName = e.record.get("participantName");
  const numberOfParticipants = e.record.get("numberOfParticipants");
  const bookingDate = e.record.get("bookingDate");
  const totalAmount = e.record.get("totalAmount") || (price * numberOfParticipants);
  const depositPaid = e.record.get("depositPaid") || 0;
  const paymentStatus = e.record.get("paymentStatus") || "unpaid";
  
  const emailContent = `
    <h2>Booking Confirmation</h2>
    <p>Dear ${participantName},</p>
    <p>Thank you for booking with us! Your tour booking has been confirmed.</p>
    
    <h3>Tour Details</h3>
    <ul>
      <li><strong>Tour:</strong> ${tourName}</li>
      <li><strong>Location:</strong> ${tourLocation}</li>
      <li><strong>Date:</strong> ${bookingDate}</li>
      <li><strong>Time:</strong> ${startTime} - ${endTime}</li>
      <li><strong>Number of Participants:</strong> ${numberOfParticipants}</li>
    </ul>
    
    <h3>Booking Reference</h3>
    <p><strong>${bookingRef}</strong></p>
    
    <h3>Payment Information</h3>
    <ul>
      <li><strong>Total Amount:</strong> €${totalAmount}</li>
      <li><strong>Deposit Amount:</strong> €${depositAmount || 0}</li>
      <li><strong>Amount Paid:</strong> €${depositPaid}</li>
      <li><strong>Payment Status:</strong> ${paymentStatus}</li>
    </ul>
    
    <h3>Payment Instructions</h3>
    <p>If you have not yet completed payment, please proceed with the payment using the link provided in your booking confirmation email or contact us for payment options.</p>
    
    <p>If you have any questions, please don't hesitate to contact us.</p>
    <p>Best regards,<br>The Tour Team</p>
  `;
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "Booking Confirmation - " + bookingRef,
    html: emailContent
  });
  
  $app.newMailClient().send(message);
  e.next();
}, "bookings");