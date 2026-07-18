<?php


header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Fixed: Added the forward slash right after __DIR__
require '../vendor/PHPMailer/src/Exception.php';
require  '../vendor/PHPMailer/src/PHPMailer.php';
require '../vendor/PHPMailer/src/SMTP.php';


try {

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Method not allowed');
    }

    $data = json_decode(file_get_contents("php://input"), true);

    $name        = trim($data['name'] ?? '');
    $email       = trim($data['email'] ?? '');
    $mobile      = trim($data['mobile'] ?? '');
    $requirement = trim($data['requirement'] ?? '');
    $message     = trim($data['message'] ?? '');
    $source      = trim($data['source'] ?? '');

    if (
        empty($name) ||
        empty($email) ||
        empty($mobile)
    ) {
        throw new Exception('Required fields missing');
    }

    // ==================================================
    // SMTP CONFIGURATION
    // ==================================================

    $smtpHost = 'mail.idealprinters.pk'; // update if different
    $smtpPort =  465;

    $smtpUser = 'info@idealprinters.pk';
    $smtpPass = 'ideal@PRINT123+';

    $adminEmail = 'idealprinter41@gmail.com';
    $Second_adminEmail = 'javedshahzadnns@gmail.com';

    $logoUrl = 'https://idealprinters.pk/images/ideal-printers-logo-horizontal.png';

    // ==================================================
    // ADMIN EMAIL TEMPLATE
    // ==================================================

    $adminHtml = '
    <!DOCTYPE html>
    <html>
    <body style="background:#f4f6f9;padding:20px;font-family:Arial">

    <table width="700" align="center" style="background:#ffffff;border-radius:10px">

        <tr>
            <td style="background:#f5f0eb;padding:25px;text-align:center">
                <img src="'.$logoUrl.'" width="320">
            </td>
        </tr>

        <tr>
            <td style="padding:30px">

                <h2 style="color:#0d3d78">
                    New Inquiry From Website
                </h2>

                <table width="100%" cellpadding="12" cellspacing="0">

                    <tr>
                        <td width="180" bgcolor="#f4f6f9"><b>Name</b></td>
                        <td>'.$name.'</td>
                    </tr>

                    <tr>
                        <td bgcolor="#f4f6f9"><b>Email</b></td>
                        <td>'.$email.'</td>
                    </tr>

                    <tr>
                        <td bgcolor="#f4f6f9"><b>Mobile</b></td>
                        <td>'.$mobile.'</td>
                    </tr>

                    <tr>
                        <td bgcolor="#f4f6f9"><b>Requirement</b></td>
                        <td>'.$requirement.'</td>
                    </tr>

                    <tr>
                        <td bgcolor="#f4f6f9"><b>Message</b></td>
                        <td>'.$message.'</td>
                    </tr>

                    <tr>
                        <td bgcolor="#f4f6f9"><b>Source</b></td>
                        <td>'.$source.'</td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

    </body>
    </html>';

    // ==================================================
    // CUSTOMER EMAIL TEMPLATE
    // ==================================================

    $customerHtml = '
    <!DOCTYPE html>
    <html>
    <body style="background:#f4f6f9;padding:20px;font-family:Arial">

    <table width="700" align="center" style="background:#ffffff;border-radius:10px">

        <tr>
            <td style="background:#f5f0eb;padding:25px;text-align:center">
                <img src="'.$logoUrl.'" width="320">
            </td>
        </tr>

        <tr>
            <td style="padding:35px">

                <h2 style="color:#0d3d78">
                    Thank You For Contacting Ideal Printers
                </h2>

                <p>Dear '.$name.',</p>

                <p>
                    Thank you for contacting Ideal Printers.
                    We have successfully received your inquiry.
                    One of our team members will get back to you shortly.
                </p>

                <div style="
                    background:#f8fafc;
                    border-left:4px solid #0d3d78;
                    padding:20px;
                    margin:20px 0;
                ">
                    <strong>Your Requirement</strong>
                    <br>
                    '.$requirement.'
                    <br><br>
                    <strong>Your Message To Ideal Printers</strong>
                    <br>
                    '.$message.'
                </div>

                <p>
                    We appreciate the opportunity to serve your printing
                    and branding needs.
                </p>

                <p>
                    Regards,<br>
                    <strong>Ideal Printers</strong>
                </p>

            </td>
        </tr>

    </table>

    </body>
    </html>';

    // ==================================================
    // SEND TO ADMIN
    // ==================================================

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $smtpPort;

    $mail->CharSet = 'UTF-8';

    $mail->setFrom($smtpUser, 'Ideal Printers');
    $mail->addAddress($adminEmail);

    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'Received a New Inquiry - ' . $name;
    $mail->Body    = $adminHtml;

    $mail->send();
    
    
    // ==================================================
    // SEND TO SECOND ADMIN
    // ==================================================

    $mail_second_admin = new PHPMailer(true);

    $mail_second_admin->isSMTP();
    $mail_second_admin->Host       = $smtpHost;
    $mail_second_admin->SMTPAuth   = true;
    $mail_second_admin->Username   = $smtpUser;
    $mail_second_admin->Password   = $smtpPass;
    $mail_second_admin->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail_second_admin->Port       = $smtpPort;

    $mail_second_admin->CharSet = 'UTF-8';

    $mail_second_admin->setFrom($smtpUser, 'Ideal Printers');
    $mail_second_admin->addAddress($Second_adminEmail);

    $mail_second_admin->addReplyTo($email, $name);

    $mail_second_admin->isHTML(true);
    $mail_second_admin->Subject = 'Received a New Inquiry - ' . $name;
    $mail_second_admin->Body    = $adminHtml;

    $mail_second_admin->send();

    // ==================================================
    // SEND TO CUSTOMER
    // ==================================================

    $mail2 = new PHPMailer(true);

    $mail2->isSMTP();
    $mail2->Host       = $smtpHost;
    $mail2->SMTPAuth   = true;
    $mail2->Username   = $smtpUser;
    $mail2->Password   = $smtpPass;
    $mail2->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail2->Port       = $smtpPort;

    $mail2->CharSet = 'UTF-8';

    $mail2->setFrom($smtpUser, 'Ideal Printers');
    $mail2->addAddress($email, $name);

    $mail2->isHTML(true);
    $mail2->Subject = 'Thank You For Contacting Ideal Printers';
    $mail2->Body    = $customerHtml;

    $mail2->send();

    echo json_encode([
        'success' => true,
        'message' => 'Your inquiry has been sent successfully.'
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}