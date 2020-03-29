package model.university;

import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

 public class DbMods {
    
    public static StringDataList findById(DbConn dbc, String id) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT university_id, university_name, university_state, university_image, tuition, establishment, "
                    + "university_ranking, university.web_user_id, user_email, user_password  "+
                    "FROM university, web_user WHERE university.web_user_id = web_user.web_user_id  " + 
                    "AND university_id = ?";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in UniversityView.getUniversityById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById
    
     /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
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
         */
        // Validation
        errorMsgs.universityName = ValidationUtils.stringValidationMsg(inputData.universityName, 45, true);
        errorMsgs.universityState = ValidationUtils.stringValidationMsg(inputData.universityState, 45, true);
        errorMsgs.universityImage = ValidationUtils.stringValidationMsg(inputData.universityImage, 300, true);
        errorMsgs.tuition = ValidationUtils.decimalValidationMsg(inputData.tuition, false);
        errorMsgs.establishment = ValidationUtils.dateValidationMsg(inputData.establishment, false);
        errorMsgs.universityRanking = ValidationUtils.integerValidationMsg(inputData.universityRanking, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate
    
    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO university (university_name, university_state, university_image, tuition, establishment, university_ranking, web_user_id) "
                    + "values (?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.universityName); // string type is simple
            pStatement.setString(2, inputData.universityState);
            pStatement.setString(3, inputData.universityImage);
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.tuition));
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.establishment));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.universityRanking));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
} // class
