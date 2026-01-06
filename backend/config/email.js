import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);



// Send welcome email when user subscribes
export const sendWelcomeEmail = async (email, name, unsubscribeToken) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key not configured");
      return null;
    }
    if (!process.env.EMAIL_FROM) {
      console.error("EMAIL_FROM not configured");
      return null;
    }
    const allBlogsUrl = `${process.env.FRONTEND_URL}/blogs`;
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🎉 Welcome to Nitai's Blogs!",
    html: `
    <div style="background-color:#f4f6f8; padding:30px 0;">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border-radius:10px;
      overflow:hidden;
      font-family:Arial, Helvetica, sans-serif;
      box-shadow:0 4px 12px rgba(0,0,0,0.1);
    ">

      <!-- Header -->
      <div style="
        background:linear-gradient(135deg, #4f46e5, #6366f1);
        padding:24px;
        text-align:center;
        color:#ffffff;
      ">
        <h1 style="margin:0; font-size:24px;">🎉 Welcome to Nitai's Blogs</h1>
        <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
          Learn • Build • Grow
        </p>
      </div>

      <!-- Body -->
      <div style="padding:30px;">
        <h2 style="color:#111827; margin-top:0;">
          Hello ${name} 👋
        </h2>

        <p style="color:#374151; font-size:15px; line-height:1.6;">
          Thank you for subscribing to <strong>Nitai's Blogs</strong>!  
          I’m excited to have you on board 🚀
        </p>

        <p style="color:#374151; font-size:15px; line-height:1.6;">
          You’ll now receive:
        </p>

        <ul style="color:#374151; font-size:15px; line-height:1.6; padding-left:18px;">
          <li>📘 In-depth MERN & full-stack tutorials</li>
          <li>💡 Real project insights & best practices</li>
          <li>🛠 Practical solutions to real dev problems</li>
        </ul>

        <!-- CTA Button -->
        <div style="text-align:center; margin:30px 0;">
          <a href="${allBlogsUrl}"
             style="
               background:#4f46e5;
               color:#ffffff;
               text-decoration:none;
               padding:12px 24px;
               border-radius:6px;
               font-size:15px;
               font-weight:bold;
               display:inline-block;
             ">
            📖 Explore Latest Blogs
          </a>
        </div>

        <p style="color:#374151; font-size:14px; line-height:1.6;">
          Happy coding!  
          <br/><strong>— Nitai Dalal</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="
        background:#f8fafc;
        padding:20px;
        text-align:center;
        font-size:12px;
        color:#6b7280;
        border-top:1px solid #e5e7eb;
      ">
            <p style="margin:0 0 6px;">
            You’re receiving this email because you subscribed to <strong>Nitai’s Blogs</strong>.
            </p>

            <p style="margin:0 0 6px;">
            Want fewer emails? You can unsubscribe anytime. 
            </p>
            <div style="text-align:center; margin:20px 0;">
                <a href="${process.env.FRONTEND_URL}/unsubscribe?token=${unsubscribeToken}"
                style="
                display:inline-block;
                padding:10px 18px;
                background:#e5e7eb;
                color:#374151;
                text-decoration:none;
                font-size:13px;
                border-radius:6px;
                ">
                Unsubscribe
                </a>
            </div>
            <p style="margin:0;">
            © 2025 Nitai’s Blogs
            </p>
        </div>
    </div>
  </div>
      `,
  };

    const { data, error } = await resend.emails.send(mailOptions);
    
    if (error) {
      console.error("Resend API error for welcome email to", email, ":", error);
      return null;
    }
    
    console.log("Welcome email sent successfully to:", email, "Message ID:", data?.id);
    return data;
  } catch (error) {
    console.error("Failed to send welcome email to:", email, "Error:", error.message || error);
    return null;
  }
};

// Send new blog notification to all subscribers
export const sendNewBlogEmail = async (email, name, blogTitle, blogId, unsubscribeToken) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key not configured");
      return null;
    }
    if (!process.env.EMAIL_FROM) {
      console.error("EMAIL_FROM not configured");
      return null;
    }
  const blogUrl = `${process.env.FRONTEND_URL}/blog/${blogId}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `📰 New Blog Post: ${blogTitle}`,
    html: `
    <div style="background-color:#f4f6f8; padding:30px 0;">
      <div style="
        max-width:600px;
        margin:0 auto;
        background:#ffffff;
        border-radius:10px;
        overflow:hidden;
        font-family:Arial, Helvetica, sans-serif;
        box-shadow:0 4px 12px rgba(0,0,0,0.1);
      ">

        <!-- Header -->
        <div style="
          background:linear-gradient(135deg, #4f46e5, #6366f1);
          padding:24px;
          text-align:center;
          color:#ffffff;
        ">
          <h1 style="margin:0; font-size:24px;">📰 New Blog Post!</h1>
          <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
            Fresh content from Nitai's Blogs
          </p>
        </div>

        <!-- Body -->
        <div style="padding:30px;">
          <h2 style="color:#111827; margin-top:0;">
            Hi ${name} 👋
          </h2>

          <p style="color:#374151; font-size:15px; line-height:1.6;">
            We just published a new blog post that you might find interesting:
          </p>

          <!-- Blog Title Box -->
          <div style="
            background:#f8fafc;
            border-left:4px solid #4f46e5;
            padding:16px 20px;
            margin:20px 0;
            border-radius:4px;
          ">
            <h3 style="color:#111827; margin:0; font-size:18px; line-height:1.4;
            ">
              ${blogTitle}
            </h3>
          </div>

          <!-- CTA Button -->
          <div style="text-align:center; margin:30px 0;">
            <a href="${blogUrl}"
               style="
                 background:#4f46e5;
                 color:#ffffff;
                 text-decoration:none;
                 padding:14px 32px;
                 border-radius:6px;
                 font-size:15px;
                 font-weight:bold;
                 display:inline-block;
               ">
              📖 Read Full Article
            </a>
          </div>

          <p style="color:#374151; font-size:14px; line-height:1.6;">
            Happy reading!  
            <br/><strong>— Nitai Dalal</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background:#f8fafc;
          padding:20px;
          text-align:center;
          font-size:12px;
          color:#6b7280;
          border-top:1px solid #e5e7eb;
        ">
          <p style="margin:0 0 6px;">
            You're receiving this email because you subscribed to <strong>Nitai's Blogs</strong>.
          </p>

          <p style="margin:0 0 6px;">
            Want fewer emails? You can unsubscribe anytime. 
          </p>
          <div style="text-align:center; margin:20px 0;">
            <a href="${process.env.FRONTEND_URL}/unsubscribe?token=${unsubscribeToken}"
               style="
                 display:inline-block;
                 padding:10px 18px;
                 background:#e5e7eb;
                 color:#374151;
                 text-decoration:none;
                 font-size:13px;
                 border-radius:6px;
               ">
              Unsubscribe
            </a>
          </div>
          <p style="margin:0;">
            © 2025 Nitai's Blogs
          </p>
        </div>
      </div>
    </div>
    `,
  };

    const { data, error } = await resend.emails.send(mailOptions);
    
    if (error) {
      console.error("Resend API error for new blog email to", email, ":", error);
      return null;
    }
    
    console.log("New blog email sent successfully to:", email, "Message ID:", data?.id);
    return data;
  } catch (error) {
    console.error("Failed to send new blog email to:", email, "Error:", error.message || error);
    return null;
  }
};

