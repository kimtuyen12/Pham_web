package model.webUser;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

 public class DbMods {
          public static StringData logonFind(String email, String pw, DbConn dbc) {
            StringData foundData = new StringData();
            if ((email == null) || (pw == null)) {
                foundData.errorMsg = "Programmer error in model.webUser.DbMods.logonFind: email and pw must be both non-null.";
                return foundData;
            }
            try {
                String sql = "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, "
                        + "web_user.user_role_id, user_role_type "
                        + "FROM web_user, user_role "
                        + "WHERE web_user.user_role_id = user_role.user_role_id "
                        + "AND user_email = ? and user_password = ? ";
                PreparedStatement pStatement = dbc.getConn().prepareStatement(sql); // this compiles the SQL

                // Encode user supplied values into the ?s of the prepared statement.
                pStatement.setString(1, email); // replace 1st question mark
                pStatement.setString(2, pw);    // replace 2nd question mark

                ResultSet results = pStatement.executeQuery();  // Get the result set - expecting 1 or 0 records, 
                                                                // because user_email must be unique within the table.
                if (results.next()) {
                    // Record found in database, credentials are good.
                    return new StringData(results);
                } else {
                    // Returning null means that the username / pw were not found in the database
                    return null;
                }
            } catch (Exception e) {
                foundData.errorMsg = "Exception in model.webUser.DbMods.logonFind(): " + e.getMessage();
                System.out.println("******" + foundData.errorMsg);
                return foundData;
            }
        } // logonFind
    } // class
