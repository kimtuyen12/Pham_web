package org.apache.jsp.webAPIs;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import dbUtils.*;
import model.webUser.*;
import view.WebUserView;
import com.google.gson.*;

public final class logonAPI_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("application/json; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write(" \n");
      out.write("\n");
      out.write("\n");
      out.write(" \n");
      out.write(" \n");
      out.write("\n");
      out.write("\n");

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData user = new StringData();
    String userEmail = request.getParameter("email");
    String userPassword = request.getParameter("password");
    
    if (userEmail == null || userPassword == null) {
        user.errorMsg = "Cannot search for user - email and password must be supplied.";
  
        
    } else {
        DbConn dbc = new DbConn();
        user.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.
        if (user.errorMsg.length() == 0) { // if got good DB connection,
            System.out.println("*** Ready to call logonAPI");
            StringData ret = DbMods.logonFind(userEmail,userPassword,dbc);
            
            if (ret == null) {
                
                user.errorMsg = "Invalid email or password. Try again!";
                
            } else {
                session.setAttribute ("webUser", ret);
                user = ret;
            }
            
        }
        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
         // make up whatever name you want for 2nd parameter 
    }
    
    Gson gson = new Gson();
    out.print(gson.toJson(user).trim());

      out.write("    ");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
