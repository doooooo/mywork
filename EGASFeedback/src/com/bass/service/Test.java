package com.bass.service;

import java.util.HashMap;

import com.bass.util.Util;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			
			//use AUTH_OTDS when running on OTDS
			Service service=ServiceFactory.getService(ServiceFactory.AUTH_SAML);
			String ticket=service.authenticate();
			
			System.out.println();
			
			HashMap<String, String> properties=new HashMap<String,String>();
			properties.put("id", "000C29F4D700A1EB8478E9967AEB0378.4915209");////
			properties.put("Clear_data", "1");
			properties.put("Ease", "4");
			properties.put("Employee", "3");
			properties.put("Quality", "2");
			properties.put("Technical", "1");
			properties.put("Time", "2");///// yyyy-mm-dd
			properties.put("Comment", "My Feedback");
			
			
			
			String feedbackId=service.createFeedback(ticket, properties);
			
			String complaintId = "000C29F4D700A1EB8478E9967AEB0378.4915209";
			boolean result=service.ComplaintHasFeedback(ticket, complaintId);
			
			System.out.println("Feedback ID "+feedbackId);
			System.out.println("Complaint has feedback "+result);
			
			//System.out.println("appl-id: "+appId);
			//System.out.println("complaint-id "+complaintId);
			
			//service.deleteApplication(ticket,appId );
			//service.deleteComplaint(ticket, complaintId);
			
			//attach to application
			//ftp://ex:amf@192.168.1.181/working/LCD00101/F001101-1300000013_201025_121212/1300000013.pdf
			//file://///C:/contracts/template_contract.docx
			//service.uploadDocument(ticket, appId, "pdf.pdf", "file://///C:/contracts/template_contract.docx", "/PDF");
			
			//attach to complaint
			//service.uploadDocument(ticket, complaintId, "data.docx", "file://///C:/contracts/template_contract.docx", "/PDF");
			
			/*
			WSInterface.uploadDocument(itemId, "data.docx", "file://///otaw166.bass.com.eg/C$/contracts/template_contract.docx");
			file://///D:/Work/EGAS/Backups/configurations/contracts/template_contract.docx
			*/
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
