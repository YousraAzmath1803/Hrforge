//package com.example.chatbot.Service;
//
//import com.example.chatbot.Entity.Conversation;
//import com.example.chatbot.Repository.ConversationRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.regex.Pattern;
//
//@Service
//public class ChatbotService {
//
//    private final Map<Pattern, String> responseMap;
//    private final ConversationRepository conversationRepository;
//    private final JavaMailSender mailSender;
//
//    @Autowired
//    public ChatbotService(ConversationRepository conversationRepository, JavaMailSender mailSender) {
//        this.conversationRepository = conversationRepository;
//        this.mailSender = mailSender;
//        responseMap = new HashMap<>();
//        initializeResponses();
//    }
//
//    private void initializeResponses() {
//        // General Responses
//        responseMap.put(Pattern.compile("\\b(hello|hi|hey)\\b", Pattern.CASE_INSENSITIVE), "Hello! How can I assist you today?");
//        responseMap.put(Pattern.compile("\\b(help|assist|support)\\b", Pattern.CASE_INSENSITIVE), "Sure! I'm here to assist you. What do you need help with?");
//        responseMap.put(Pattern.compile("\\b(thanks|thank you)\\b", Pattern.CASE_INSENSITIVE), "You're welcome!");
//        responseMap.put(Pattern.compile("\\b(bye|goodbye)\\b", Pattern.CASE_INSENSITIVE), "Goodbye! Have a great day!");
//        responseMap.put(Pattern.compile("\\b(name|who are you)\\b", Pattern.CASE_INSENSITIVE), "I'm your friendly AI assistant.");
//        responseMap.put(Pattern.compile("\\b(weather)\\b", Pattern.CASE_INSENSITIVE), "I can't provide weather updates right now. Please check a weather website.");
//        responseMap.put(Pattern.compile("\\b(support|contact)\\b", Pattern.CASE_INSENSITIVE), "For support, please contact support@example.com.");
//        responseMap.put(Pattern.compile("\\b(date|today's date)\\b", Pattern.CASE_INSENSITIVE), "Today's date is " + LocalDate.now() + ".");
//
//        // Organizational Responses
//        responseMap.put(Pattern.compile("\\b(update personal information)\\b", Pattern.CASE_INSENSITIVE), "You can update your personal information by going to the 'My Profile' section on the employee portal.");
//        responseMap.put(Pattern.compile("\\b(payroll)\\b", Pattern.CASE_INSENSITIVE), "The next payroll is scheduled for the 25th of this month.");
//        responseMap.put(Pattern.compile("\\b(apply leave)\\b", Pattern.CASE_INSENSITIVE), "To apply for leave, go to the 'Leave Management' section on the portal and submit your application.");
//        responseMap.put(Pattern.compile("\\b(supervisor)\\b", Pattern.CASE_INSENSITIVE), "Your supervisor is Alice Johnson from the Human Resources department.");
//        responseMap.put(Pattern.compile("\\b(training programs)\\b", Pattern.CASE_INSENSITIVE), "We offer 'Leadership Development', 'Project Management', and 'Technical Skills Enhancement' training programs.");
//        responseMap.put(Pattern.compile("\\b(performance review)\\b", Pattern.CASE_INSENSITIVE), "You can submit your performance review by logging into the performance management system under 'My Reviews'.");
//        responseMap.put(Pattern.compile("\\b(leave balance)\\b", Pattern.CASE_INSENSITIVE), "You have 8 days of annual leave remaining.");
//        responseMap.put(Pattern.compile("\\b(claim expenses)\\b", Pattern.CASE_INSENSITIVE), "To claim travel expenses, fill out the 'Expense Reimbursement' form in the finance portal.");
//        responseMap.put(Pattern.compile("\\b(holiday schedule)\\b", Pattern.CASE_INSENSITIVE), "You can view the company's holiday schedule in the 'HR Announcements' section.");
//        responseMap.put(Pattern.compile("\\b(bank account update)\\b", Pattern.CASE_INSENSITIVE), "You can update your bank account details in the 'Payroll' section of your profile.");
//
//        // Additional Questions
//        responseMap.put(Pattern.compile("\\b(reset password)\\b", Pattern.CASE_INSENSITIVE), "You can reset your password by clicking on 'Forgot Password' on the login page.");
//        responseMap.put(Pattern.compile("\\b(technical issue)\\b", Pattern.CASE_INSENSITIVE), "You can report technical issues by submitting a ticket through the IT Support portal or emailing ithelpdesk@example.com.");
//        responseMap.put(Pattern.compile("\\b(update email)\\b", Pattern.CASE_INSENSITIVE), "To update your email address, navigate to 'My Profile' and click on 'Edit Email'.");
//        responseMap.put(Pattern.compile("\\b(job title)\\b", Pattern.CASE_INSENSITIVE), "Your job title is 'HR Manager'. You can view more details in the 'My Profile' section.");
//        responseMap.put(Pattern.compile("\\b(emergency contact)\\b", Pattern.CASE_INSENSITIVE), "To update your emergency contact, go to the 'Personal Information' section and click on 'Edit Emergency Contact'.");
//        responseMap.put(Pattern.compile("\\b(company benefits)\\b", Pattern.CASE_INSENSITIVE), "The company offers health insurance, paid leave, retirement plans, and wellness programs. You can find more info in the 'Benefits' section.");
//        responseMap.put(Pattern.compile("\\b(submit timesheet)\\b", Pattern.CASE_INSENSITIVE), "Submit your timesheet through the 'Timesheet' section of the employee portal by Friday.");
//        responseMap.put(Pattern.compile("\\b(pay slips)\\b", Pattern.CASE_INSENSITIVE), "You can download your pay slips from the 'Payroll' section in your employee profile.");
//        responseMap.put(Pattern.compile("\\b(remote work)\\b", Pattern.CASE_INSENSITIVE), "Remote work is available based on department policy. Check with your supervisor or HR.");
//        responseMap.put(Pattern.compile("\\b(vpn access)\\b", Pattern.CASE_INSENSITIVE), "Download the VPN client from the IT support page and log in with your credentials.");
//        responseMap.put(Pattern.compile("\\b(employment contract)\\b", Pattern.CASE_INSENSITIVE), "Your employment contract is available in the 'Documents' section of your employee profile.");
//        responseMap.put(Pattern.compile("\\b(hr documents)\\b", Pattern.CASE_INSENSITIVE), "To request documents from HR, send an email to hr@example.com or use the 'Document Request' form.");
//        responseMap.put(Pattern.compile("\\b(core values)\\b", Pattern.CASE_INSENSITIVE), "Our core values are Integrity, Collaboration, Innovation, and Excellence.");
//        responseMap.put(Pattern.compile("\\b(meeting room booking)\\b", Pattern.CASE_INSENSITIVE), "You can book a meeting room through the 'Meeting Room Booking' system on the portal.");
//        responseMap.put(Pattern.compile("\\b(overtime policy)\\b", Pattern.CASE_INSENSITIVE), "Overtime must be pre-approved. Employees are compensated as per the company policy in 'HR Policies'.");
//
//        responseMap.put(Pattern.compile("\\b(update profile|edit profile)\\b", Pattern.CASE_INSENSITIVE),
//                "You can update your profile by navigating to the 'My Profile' section and clicking 'Edit Profile'. Ensure all necessary fields are completed before submitting.");
//        responseMap.put(Pattern.compile("\\b(change password)\\b", Pattern.CASE_INSENSITIVE),
//                "To change your password, go to the 'My Profile' section, click on 'Change Password', and follow the instructions.");
//        responseMap.put(Pattern.compile("\\b(update phone number|change phone number)\\b", Pattern.CASE_INSENSITIVE),
//                "You can update your phone number by navigating to 'My Profile', clicking 'Edit Contact Info', and entering your new number.");
//        responseMap.put(Pattern.compile("\\b(update address|change address)\\b", Pattern.CASE_INSENSITIVE),
//                "To update your address, go to the 'My Profile' section and click on 'Edit Address'. Please ensure your new address is accurate before saving.");
//        responseMap.put(Pattern.compile("\\b(update emergency contact|change emergency contact)\\b", Pattern.CASE_INSENSITIVE),
//                "You can update your emergency contact information by going to 'Personal Information' in the 'My Profile' section and clicking on 'Edit Emergency Contact'.");
//        responseMap.put(Pattern.compile("\\b(update email|change email)\\b", Pattern.CASE_INSENSITIVE),
//                "You can update your email by navigating to 'My Profile', clicking 'Edit Email', and providing your new email address.");
//
//        // Meeting-Related Questions
//        responseMap.put(Pattern.compile("\\b(schedule meeting|book meeting|set up meeting)\\b", Pattern.CASE_INSENSITIVE),
//                "To schedule a meeting, go to the 'Meeting Room Booking' system on the portal and select the time and room for your meeting.");
//        responseMap.put(Pattern.compile("\\b(view meeting schedule)\\b", Pattern.CASE_INSENSITIVE),
//                "You can view your upcoming meetings in the 'My Meetings' section of the portal, which shows the time, date, and room details.");
//        responseMap.put(Pattern.compile("\\b(cancel meeting|remove meeting)\\b", Pattern.CASE_INSENSITIVE),
//                "To cancel a meeting, go to the 'My Meetings' section and click on the 'Cancel Meeting' button next to the meeting you wish to cancel.");
//        responseMap.put(Pattern.compile("\\b(update meeting|reschedule meeting)\\b", Pattern.CASE_INSENSITIVE),
//                "You can update or reschedule a meeting by navigating to the 'My Meetings' section and selecting 'Reschedule' for the specific meeting. Choose the new date and time.");
//        responseMap.put(Pattern.compile("\\b(join virtual meeting|start virtual meeting)\\b", Pattern.CASE_INSENSITIVE),
//                "To join or start a virtual meeting, check your email for the meeting link or go to the 'Virtual Meetings' section on the portal.");
//        responseMap.put(Pattern.compile("\\b(virtual meeting platform)\\b", Pattern.CASE_INSENSITIVE),
//                "We use Zoom and Microsoft Teams for virtual meetings. Links will be provided via email or the 'Virtual Meetings' section.");
//
//        // Additional Organizational Responses
//        responseMap.put(Pattern.compile("\\b(company address)\\b", Pattern.CASE_INSENSITIVE), "Our company is located at 123 Corporate Avenue, City, Country.");
//        responseMap.put(Pattern.compile("\\b(company phone number|contact number)\\b", Pattern.CASE_INSENSITIVE), "You can reach us at +1 234-567-890 during office hours.");
//        responseMap.put(Pattern.compile("\\b(work from home policy)\\b", Pattern.CASE_INSENSITIVE), "The work-from-home policy is available in the HR policies section. It allows employees to work remotely based on the manager’s approval.");
//        responseMap.put(Pattern.compile("\\b(company vision)\\b", Pattern.CASE_INSENSITIVE), "Our company’s vision is to innovate and lead in our industry while maintaining integrity and collaboration at every step.");
//        responseMap.put(Pattern.compile("\\b(company mission)\\b", Pattern.CASE_INSENSITIVE), "Our mission is to provide the best services to our customers while fostering growth and innovation.");
//        responseMap.put(Pattern.compile("\\b(ceo name)\\b", Pattern.CASE_INSENSITIVE), "Our CEO is John Doe, who has been leading the company since 2010.");
//        responseMap.put(Pattern.compile("\\b(annual leave policy)\\b", Pattern.CASE_INSENSITIVE), "Employees are entitled to 20 days of annual leave each year. Please check the HR section for more details.");
//        responseMap.put(Pattern.compile("\\b(dress code policy)\\b", Pattern.CASE_INSENSITIVE), "The dress code is business casual on weekdays, and casual on Fridays.");
//        responseMap.put(Pattern.compile("\\b(company departments)\\b", Pattern.CASE_INSENSITIVE), "Our company has several departments including HR, Finance, IT, Marketing, and Sales.");
//        responseMap.put(Pattern.compile("\\b(working hours)\\b", Pattern.CASE_INSENSITIVE), "Our working hours are from 9 AM to 6 PM, Monday through Friday.");
//        responseMap.put(Pattern.compile("\\b(overtime payment)\\b", Pattern.CASE_INSENSITIVE), "Overtime is compensated at 1.5 times the regular hourly rate. Pre-approval is required from your manager.");
//        responseMap.put(Pattern.compile("\\b(company news)\\b", Pattern.CASE_INSENSITIVE), "You can find the latest company news and announcements in the 'Company News' section of the employee portal.");
//        responseMap.put(Pattern.compile("\\b(it help desk|it support)\\b", Pattern.CASE_INSENSITIVE), "For IT support, please contact the IT Help Desk at ithelpdesk@example.com or submit a ticket through the support portal.");
//        responseMap.put(Pattern.compile("\\b(employee handbook)\\b", Pattern.CASE_INSENSITIVE), "You can download the employee handbook from the 'HR Resources' section on the employee portal.");
//        responseMap.put(Pattern.compile("\\b(company policies)\\b", Pattern.CASE_INSENSITIVE), "Company policies are available in the 'HR Policies' section of the employee portal.");
//        responseMap.put(Pattern.compile("\\b(company events)\\b", Pattern.CASE_INSENSITIVE), "Upcoming company events are listed in the 'Events' section of the employee portal. Don't miss the annual company picnic!");
//        responseMap.put(Pattern.compile("\\b(health benefits|medical insurance)\\b", Pattern.CASE_INSENSITIVE), "We offer comprehensive health insurance plans, including medical, dental, and vision coverage. You can find more details in the 'Benefits' section.");
//        responseMap.put(Pattern.compile("\\b(employee referral program)\\b", Pattern.CASE_INSENSITIVE), "Our employee referral program offers a bonus for successful hires. Submit your referral through the 'Referral Program' on the portal.");
//    }
//
//
//
//    public String getChatbotResponse(String userMessage) {
//        String cleanedMessage = userMessage.trim().toLowerCase();
//
//        // Loop through regex patterns to find a match
//        for (Map.Entry<Pattern, String> entry : responseMap.entrySet()) {
//            if (entry.getKey().matcher(cleanedMessage).find()) {
//                String response = entry.getValue();
//
//                // Check if user needs help and trigger an email
//                if (entry.getKey().pattern().contains("help|assist|support")) {
//                    sendSupportEmail(userMessage);  // Send email to support team
//                }
//
//                // Save conversation
//                saveConversation(userMessage, response);
//                return response;
//            }
//        }
//
//        // Default response
//        String defaultResponse = "I'm sorry, I don't have an answer for that right now. Please contact support for further assistance.";
//        saveConversation(userMessage, defaultResponse);
//        return defaultResponse;
//    }
//
//    private void saveConversation(String userMessage, String aiResponse) {
//        Conversation conversation = new Conversation(userMessage, aiResponse, LocalDateTime.now());
//        conversationRepository.save(conversation);
//    }
//
//    public void sendSupportEmail(String userMessage) {
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//        mailMessage.setTo("gnaneshreddy850@gmail.com");  // Replace with actual support team email
//        mailMessage.setSubject("User Request for Assistance");
//        mailMessage.setText("A user has requested assistance with the following message:\n\n" + userMessage);
//        mailSender.send(mailMessage);
//    }
//    }
package com.example.chatbot.Service;

import com.example.chatbot.Entity.Conversation;
import com.example.chatbot.Repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class ChatbotService {

    private final Map<Pattern, String> responseMap;
    private final Map<String, String> keywordResponseMap; // Map for keyword-based responses
    private final ConversationRepository conversationRepository;
    private final JavaMailSender mailSender;

    @Autowired
    public ChatbotService(ConversationRepository conversationRepository, JavaMailSender mailSender) {
        this.conversationRepository = conversationRepository;
        this.mailSender = mailSender;
        responseMap = new HashMap<>();
        keywordResponseMap = new HashMap<>(); // Initialize keyword response map
        initializeResponses();
    }

    private void initializeResponses() {
        // General Responses
        responseMap.put(Pattern.compile("\\b(hello|hi|hey)\\b", Pattern.CASE_INSENSITIVE), "Hello! How can I assist you today?");
        responseMap.put(Pattern.compile("\\b(thanks|thank you)\\b", Pattern.CASE_INSENSITIVE), "You're welcome!");
        responseMap.put(Pattern.compile("\\b(bye|goodbye)\\b", Pattern.CASE_INSENSITIVE), "Goodbye! Have a great day!");
        responseMap.put(Pattern.compile("\\b(name|who are you)\\b", Pattern.CASE_INSENSITIVE), "I'm your friendly AI assistant.");
        responseMap.put(Pattern.compile("\\b(weather)\\b", Pattern.CASE_INSENSITIVE), "I can't provide weather updates right now. Please check a weather website.");
        responseMap.put(Pattern.compile("\\b(support|contact)\\b", Pattern.CASE_INSENSITIVE), "For support, please contact support@example.com.");
        responseMap.put(Pattern.compile("\\b(date|today's date)\\b", Pattern.CASE_INSENSITIVE), "Today's date is " + LocalDate.now() + ".");

        // Add help/support/assist pattern
        responseMap.put(Pattern.compile("\\b(help|support|assist)\\b", Pattern.CASE_INSENSITIVE),
                "I'm here to help you! Please specify your issue, and I'll assist you.");

        // Organizational Responses
        responseMap.put(Pattern.compile("\\b(update personal information)\\b", Pattern.CASE_INSENSITIVE), "You can update your personal information by going to the 'My Profile' section on the employee portal.");
        responseMap.put(Pattern.compile("\\b(payroll)\\b", Pattern.CASE_INSENSITIVE), "The next payroll is scheduled for the 25th of this month.");
        responseMap.put(Pattern.compile("\\b(apply leave)\\b", Pattern.CASE_INSENSITIVE), "To apply for leave, go to the 'Leave Management' section on the portal and submit your application.");
        responseMap.put(Pattern.compile("\\b(supervisor)\\b", Pattern.CASE_INSENSITIVE), "Your supervisor is Alice Johnson from the Human Resources department.");
        responseMap.put(Pattern.compile("\\b(training programs)\\b", Pattern.CASE_INSENSITIVE), "We offer 'Leadership Development', 'Project Management', and 'Technical Skills Enhancement' training programs.");
        responseMap.put(Pattern.compile("\\b(performance review)\\b", Pattern.CASE_INSENSITIVE), "You can submit your performance review by logging into the performance management system under 'My Reviews'.");
        responseMap.put(Pattern.compile("\\b(leave balance)\\b", Pattern.CASE_INSENSITIVE), "You have 8 days of annual leave remaining.");
        responseMap.put(Pattern.compile("\\b(claim expenses)\\b", Pattern.CASE_INSENSITIVE), "To claim travel expenses, fill out the 'Expense Reimbursement' form in the finance portal.");
        responseMap.put(Pattern.compile("\\b(holidays schedule)\\b", Pattern.CASE_INSENSITIVE), "You can view the company's holiday schedule in the 'HR Announcements' section.");
        responseMap.put(Pattern.compile("\\b(bank account update)\\b", Pattern.CASE_INSENSITIVE), "You can update your bank account details in the 'Payroll' section of your profile.");

        // Additional Questions
        responseMap.put(Pattern.compile("\\b(reset password)\\b", Pattern.CASE_INSENSITIVE), "You can reset your password by clicking on 'Forgot Password' on the login page.");
        responseMap.put(Pattern.compile("\\b(technical issue)\\b", Pattern.CASE_INSENSITIVE), "You can report technical issues by submitting a ticket through the IT Support portal or emailing ithelpdesk@example.com.");
        responseMap.put(Pattern.compile("\\b(update email)\\b", Pattern.CASE_INSENSITIVE), "To update your email address, navigate to 'My Profile' and click on 'Edit Email'.");
        responseMap.put(Pattern.compile("\\b(job title)\\b", Pattern.CASE_INSENSITIVE), "Your job title is 'HR Manager'. You can view more details in the 'My Profile' section.");
        responseMap.put(Pattern.compile("\\b(emergency contact)\\b", Pattern.CASE_INSENSITIVE), "To update your emergency contact, go to the 'Personal Information' section and click on 'Edit Emergency Contact'.");
        responseMap.put(Pattern.compile("\\b(company benefits)\\b", Pattern.CASE_INSENSITIVE), "The company offers health insurance, paid leave, retirement plans, and wellness programs. You can find more info in the 'Benefits' section.");
        responseMap.put(Pattern.compile("\\b(submit timesheet)\\b", Pattern.CASE_INSENSITIVE), "Submit your timesheet through the 'Timesheet' section of the employee portal by Friday.");
        responseMap.put(Pattern.compile("\\b(pay slips)\\b", Pattern.CASE_INSENSITIVE), "You can download your pay slips from the 'Payroll' section in your employee profile.");
        responseMap.put(Pattern.compile("\\b(remote work)\\b", Pattern.CASE_INSENSITIVE), "Remote work is available based on department policy. Check with your supervisor or HR.");
        responseMap.put(Pattern.compile("\\b(vpn access)\\b", Pattern.CASE_INSENSITIVE), "Download the VPN client from the IT support page and log in with your credentials.");
        responseMap.put(Pattern.compile("\\b(employment contract)\\b", Pattern.CASE_INSENSITIVE), "Your employment contract is available in the 'Documents' section of your employee profile.");
        responseMap.put(Pattern.compile("\\b(hr documents)\\b", Pattern.CASE_INSENSITIVE), "To request documents from HR, send an email to hr@example.com or use the 'Document Request' form.");
        responseMap.put(Pattern.compile("\\b(core values)\\b", Pattern.CASE_INSENSITIVE), "Our core values are Integrity, Collaboration, Innovation, and Excellence.");
        responseMap.put(Pattern.compile("\\b(meeting room booking)\\b", Pattern.CASE_INSENSITIVE), "You can book a meeting room through the 'Meeting Room Booking' system on the portal.");
        responseMap.put(Pattern.compile("\\b(overtime policy)\\b", Pattern.CASE_INSENSITIVE), "Overtime must be pre-approved. Employees are compensated as per the company policy in 'HR Policies'.");

        // Keyword-Based Responses
        keywordResponseMap.put("update", "You can update your information in the 'My Profile' section. If you need specific help, feel free to ask!");
        keywordResponseMap.put("information", "You can find your information in the 'My Profile' section. Let me know if you need to change something!");
        keywordResponseMap.put("profile", "To edit your profile, go to 'My Profile' and click 'Edit Profile'.");
        keywordResponseMap.put("change", "To change your details, please go to 'My Profile' and choose the detail you want to change.");
        keywordResponseMap.put("email", "To update your email address, navigate to 'My Profile' and click on 'Edit Email'.");
        keywordResponseMap.put("phone", "You can update your phone number in the 'Contact Information' section of 'My Profile'.");
        keywordResponseMap.put("address", "To change your address, go to 'My Profile' and click 'Edit Address'.");

        // Additional Questions
        keywordResponseMap.put("update personal information", "You can update your personal information by going to the 'My Profile' section on the employee portal.");
        keywordResponseMap.put("payroll", "The next payroll is scheduled for the 25th of this month.");
        keywordResponseMap.put(" leave", "To apply for leave, go to the 'Leave Management' section on the portal and submit your application.");
        keywordResponseMap.put("supervisor", "Your supervisor is Alice Johnson from the Human Resources department.");
        keywordResponseMap.put("training ", "We offer 'Leadership Development', 'Project Management', and 'Technical Skills Enhancement' training programs.");
        keywordResponseMap.put("performance review", "You can submit your performance review by logging into the performance management system under 'My Reviews'.");
        keywordResponseMap.put("leave balance", "You have 8 days of annual leave remaining.");
        keywordResponseMap.put("claim expenses", "To claim travel expenses, fill out the 'Expense Reimbursement' form in the finance portal.");
        keywordResponseMap.put("holiday ", "You can view the company's holiday schedule in the 'HR Announcements' section.");
        keywordResponseMap.put("holidays ", "You can view the company's holiday schedule in the 'HR Announcements' section.");
        keywordResponseMap.put("bank account ", "You can update your bank account details in the 'Payroll' section of your profile.");

// Additional Questions
        keywordResponseMap.put("reset password", "You can reset your password by clicking on 'Forgot Password' on the login page.");
        keywordResponseMap.put("technical issue", "You can report technical issues by submitting a ticket through the IT Support portal or emailing ithelpdesk@example.com.");
        keywordResponseMap.put(" email", "To update your email address, navigate to 'My Profile' and click on 'Edit Email'.");
        keywordResponseMap.put("job title", "Your job title is 'HR Manager'. You can view more details in the 'My Profile' section.");
        keywordResponseMap.put("emergency contact", "To update your emergency contact, go to the 'Personal Information' section and click on 'Edit Emergency Contact'.");
        keywordResponseMap.put("company benefits", "The company offers health insurance, paid leave, retirement plans, and wellness programs. You can find more info in the 'Benefits' section.");
        keywordResponseMap.put(" timesheet", "Submit your timesheet through the 'Timesheet' section of the employee portal by Friday.");
        keywordResponseMap.put("pay slips", "You can download your pay slips from the 'Payroll' section in your employee profile.");
        keywordResponseMap.put("remote work", "Remote work is available based on department policy. Check with your supervisor or HR.");
        keywordResponseMap.put("vpn access", "Download the VPN client from the IT support page and log in with your credentials.");
        keywordResponseMap.put("employment contract", "Your employment contract is available in the 'Documents' section of your employee profile.");
        keywordResponseMap.put("hr documents", "To request documents from HR, send an email to hr@example.com or use the 'Document Request' form.");
        keywordResponseMap.put("core values", "Our core values are Integrity, Collaboration, Innovation, and Excellence.");
        keywordResponseMap.put("meeting room booking", "You can book a meeting room through the 'Meeting Room Booking' system on the portal.");
        keywordResponseMap.put("overtime policy", "Overtime must be pre-approved. Employees are compensated as per the company policy in 'HR Policies'.");

        // Organization-related Questions
        keywordResponseMap.put("company mission", "Our mission is to provide innovative solutions that enhance productivity and customer satisfaction.");
        keywordResponseMap.put("company vision", "Our vision is to be a global leader in our industry, fostering a culture of innovation and collaboration.");
        keywordResponseMap.put("organization structure", "Our organization is structured into several departments including HR, Finance, IT, Marketing, and Operations. You can view the full org chart in the 'Company Directory' section.");
        keywordResponseMap.put("company history", "Our company was founded in 2005 with the goal of transforming the industry through innovation and customer focus.");
        keywordResponseMap.put("leadership team", "Our leadership team consists of our CEO John Doe, CFO Jane Smith, and COO David Wilson. More details are available in the 'About Us' section.");
        keywordResponseMap.put("company goals", "Our current goals include expanding into new markets, increasing customer retention, and improving our sustainability practices.");
        keywordResponseMap.put("diversity and inclusion", "We are committed to fostering an inclusive workplace where diversity is valued and celebrated. Learn more in the 'Diversity & Inclusion' section.");
        keywordResponseMap.put("work culture", "Our work culture emphasizes teamwork, continuous learning, and work-life balance. We encourage open communication and collaboration across teams.");
        keywordResponseMap.put("corporate social responsibility", "We are dedicated to giving back to the community through various CSR initiatives including environmental conservation and education programs.");
        keywordResponseMap.put("company policies", "You can find our company policies regarding attendance, leave, code of conduct, and more in the 'HR Policies' section.");
        keywordResponseMap.put("business ethics", "We adhere to a strict code of business ethics that includes integrity, accountability, and transparency in all our operations.");
        keywordResponseMap.put("annual report", "The company's annual report is available in the 'Investor Relations' section. It covers financial performance, strategic goals, and future outlook.");
        keywordResponseMap.put("company milestones", "Some of our major milestones include reaching 1 million customers in 2018 and expanding to 10 countries by 2020. You can learn more in the 'Company Timeline' section.");
        keywordResponseMap.put("strategic initiatives", "Our current strategic initiatives include digital transformation, product innovation, and expanding partnerships with key stakeholders.");
        keywordResponseMap.put("company achievements", "We have been recognized as 'Best Employer' for three consecutive years and have received numerous industry awards for innovation.");
        keywordResponseMap.put("career development", "We offer various career development opportunities including mentorship programs, training sessions, and leadership development courses.");
        keywordResponseMap.put("new product launches", "We recently launched several new products including the XYZ software suite, designed to enhance business productivity.");
        keywordResponseMap.put("customer satisfaction", "We take customer satisfaction seriously and continuously measure it through surveys, feedback forms, and customer support interactions.");
        keywordResponseMap.put("sustainability efforts", "Our sustainability efforts include reducing carbon emissions, using renewable energy, and promoting eco-friendly products.");

        // ... Add more keywords and their responses as needed ...
    }

    public String getResponse(String userMessage) {
        // Check for keyword-based responses
        for (String keyword : keywordResponseMap.keySet()) {
            if (userMessage.toLowerCase().contains(keyword)) {
                String response = keywordResponseMap.get(keyword);

                // Save conversation without echoing user message
                saveConversation(userMessage, response);
                return response;
            }
        }

        // Check for predefined responses
        for (Map.Entry<Pattern, String> entry : responseMap.entrySet()) {
            if (entry.getKey().matcher(userMessage).find()) {
                String response = entry.getValue();

                // Trigger an email if user needs help
                if (entry.getKey().pattern().contains("help|support|assist")) {
                    sendSupportEmail(userMessage);  // Send email to support
                }

                // Save conversation
                saveConversation(userMessage, response);
                return response;
            }
        }

        // Default response if no matches found
        String defaultResponse = "I'm sorry, I don't have an answer for that right now. Please contact support for further assistance.";
        saveConversation(userMessage, defaultResponse);
        return defaultResponse;
    }

    private void saveConversation(String userMessage, String botResponse) {
        Conversation conversation = new Conversation();
        conversation.setUserMessage(userMessage);
        conversation.setBotResponse(botResponse);
        conversation.setTimestamp(LocalDateTime.now());
        conversationRepository.save(conversation);
    }
    public void sendSupportEmail(String userMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("gnaneshreddy850@gmail.com");
        message.setSubject("User Assistance Needed");
        message.setText("User has requested assistance with the following message: " + userMessage);
        mailSender.send(message);
    }
}
