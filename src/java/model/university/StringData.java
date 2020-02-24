package model.university;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String universityId = "";
    public String universityName = "";
    public String universityState = "";
    public String universityImage = "";
    public String tuition = "";
    public String establishment = "";
    public String universityRanking = "";
    public String webUserId = "";   // Foreign Key
    public String userEmail = ""; // getting it from joined web_user table.
    public String userPassword = ""; // getting it from joined web_user table.

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.universityId = FormatUtils.formatInteger(results.getObject("university_id"));
            this.universityName = FormatUtils.formatString(results.getObject("university_name"));
            this.universityState = FormatUtils.formatString(results.getObject("university_state"));
            this.universityImage = FormatUtils.formatString(results.getObject("university_image"));
            this.tuition = FormatUtils.formatDollar(results.getObject("tuition"));
            this.establishment = FormatUtils.formatDate(results.getObject("establishment"));
            this.universityRanking = FormatUtils.formatInteger(results.getObject("university_ranking"));
            this.webUserId = FormatUtils.formatInteger(results.getObject("university.web_user_id"));
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));
            this.userPassword = FormatUtils.formatString(results.getObject("user_password"));
            
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.universityId + this.universityName + this.universityState + this.universityImage
                + this.tuition + this.establishment + this.universityRanking + this.webUserId + this.userEmail + this.userPassword;
        return s.length();
    }

    public String toString() {
        return "University Id:" + this.universityId
                + ", University Name: " + this.universityName
                + ", University State: " + this.universityState
                + ", University Image: " + this.universityImage
                + ", Tuition: " + this.tuition
                + ", Establishment: " + this.establishment
                + ", University Ranking: " + this.universityRanking
                + ", Web User Id: " + this.webUserId
                + ", User Email: " + this.userEmail
                + ", User Password: " + this.userPassword;
    }
}
