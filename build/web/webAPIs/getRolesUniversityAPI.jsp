<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.uniRole.*" %>  
<%@page language="java" import="view.RoleUniversityView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList uniList = new StringDataList();

    DbConn dbc = new DbConn(); 
    uniList.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (uniList.dbError.length() == 0) { // if got good DB connection,

        System.out.println("*** Ready to call allUniversityRolesAPI");
        uniList = RoleUniversityView.getAllUniversityRoles(dbc);   
    } 

    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(uniList).trim()); 
%>