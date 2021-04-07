package com.bass.service;

import java.util.HashMap;

import com.bass.util.Util;
import com.bass.ws.client.RESTClient;
import com.bass.ws.client.SOAPClient;

public abstract class Service {
	
	/**
	 * Authenticate using either OTDS or SAML, based on factory service
	 * @return ticket
	 * @throws Exception
	 */
	public abstract String authenticate() throws Exception;
	
	/**
	 * Check whether complaint entity instance has feedback
	 * @param ticket
	 * @param complaintId
	 * @throws Exception
	 */
	public abstract boolean ComplaintHasFeedback(String ticket, String complaintId) throws Exception;
	
	/**
	 * Create Feedback entity instance
	 * @param ticket
	 * @param properties
	 * @return
	 * @throws Exception
	 */
	public abstract String createFeedback(String ticket, HashMap<String,String> properties) throws Exception;
	
}
