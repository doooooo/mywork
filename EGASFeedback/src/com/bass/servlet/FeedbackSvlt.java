package com.bass.servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bass.service.Service;
import com.bass.service.ServiceFactory;

/**
 * Servlet implementation class FeedbackSvlt
 */
@WebServlet("/FeedbackSvlt")
public class FeedbackSvlt extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public FeedbackSvlt() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		try {
			
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
	        response.setCharacterEncoding("UTF-8");
			
			String complaintId=request.getParameter("id");
			System.out.println(complaintId);
			
			String comment=request.getParameter("Comment");
			System.out.println(comment);
			
			if(complaintId!=null) {
				Service service=ServiceFactory.getService(ServiceFactory.AUTH_SAML);
				String ticket=service.authenticate();
				
				boolean hasFeedback=service.ComplaintHasFeedback(ticket, complaintId);
				if(!hasFeedback) {
					
					HashMap<String, String> properties=new HashMap<String,String>();
					
					Map<String, String[]> params = request.getParameterMap();
					  for (String parameterName : params.keySet()) {
						  
					    String[] values = params.get(parameterName);
					    if (values != null && values.length > 0) {
					    	properties.put(parameterName, values[0]);
					    } 
					  }
					  
					  service.createFeedback(ticket, properties); 
					  RequestDispatcher view = request.getRequestDispatcher("Confirm.html");
					  view.forward(request, response);
				}
				else {
					//redirect to already exists
					RequestDispatcher view = request.getRequestDispatcher("Duplicate.html");
					view.forward(request, response);
				}
			}
		}
		catch(Exception e) {
			//redirect to error
			RequestDispatcher view = request.getRequestDispatcher("Error.html");
			view.forward(request, response);
			
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
