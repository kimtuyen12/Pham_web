package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.university.*;

// classes in my project
import dbUtils.*;

public class universityView {

    public static StringDataList allUniversityAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT university_id, university_name, university_state, university_image, tuition, establishment, "
                    + "university_ranking, university.web_user_id, user_email, user_password  "+
                    "FROM university, web_user where university.web_user_id = web_user.web_user_id  " + 
                    "ORDER BY university_id";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in universityView.allUniversityAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}