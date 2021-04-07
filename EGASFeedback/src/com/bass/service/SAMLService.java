package com.bass.service;

import java.util.HashMap;

import com.bass.util.Util;
import com.bass.ws.client.RESTClient;
import com.bass.ws.client.SOAPClient;

public class SAMLService extends Service {

	RESTClient rest;
	SOAPClient soap;
	
	public SAMLService() {
		rest = new RESTClient();
		soap = new SOAPClient();
	}
	
	@Override
	public String authenticate() throws Exception {
		// TODO Auto-generated method stub
		String user=Util.getConfig().getProperty("username");
		String password=Util.getConfig().getProperty("password");
		
		return rest.authenticateSAML(user, password);
	}

	@Override
	public String createFeedback(String ticket,
			HashMap<String, String> properties) throws Exception {
		String itemId=soap.createFeedback(false, ticket, properties);
		return itemId;
	}

	@Override
	public boolean ComplaintHasFeedback(String ticket, String complaintId) throws Exception {
		boolean hasFeedback=soap.ComplaintHasFeedback(false, ticket, complaintId);
		return hasFeedback;
	}

}
