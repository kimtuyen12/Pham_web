package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.uniRole.*;

// classes in my project
import dbUtils.*;

public class RoleUniversityView {

    public static StringDataList getAllUniversityRoles(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email "+
                    "FROM web_user ORDER BY user_email ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in RoleUniversityView.allUniversityRolesAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}