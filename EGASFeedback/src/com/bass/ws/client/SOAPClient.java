package com.bass.ws.client;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.logging.Logger;

import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPHeaderElement;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;

import com.bass.util.Util;

public class SOAPClient{
	
	//String gatewayUrl="http://appworks.bass.com.eg/home/system/com.eibus.web.soap.Gateway.wcp";
	String gatewayUrl=Util.getConfig().getProperty("gateway.url");
	String soapEndpointUrl;
	Logger logger = Logger.getLogger(SOAPClient.class.getName());
	
	/*public SOAPClient(String ticket)
	{
		super(ticket);
		soapEndpointUrl=gatewayUrl+"?SAMLart="+ticket;
	}*/
	
	public String getSoapEndpointUrl() {
		return soapEndpointUrl;
	}

	public void setSoapEndpointUrl(String soapEndpointUrl) {
		this.soapEndpointUrl = soapEndpointUrl;
	}
	
	
	
	public boolean ComplaintHasFeedback(boolean isOTDS, String ticket, String complaintId) throws Exception
	{
		
        String soapAction = "ReadComplaint";
        String booleanResult=null;
        
        //Call webservice
        SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
        SOAPConnection soapConnection = soapConnectionFactory.createConnection();
        
        //Create SOAP Request
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage();
        
        //if OTDS authentication, then add otdsticket to header
        if(isOTDS){
            soapMessage=addOTDSHeader(ticket, soapMessage);
        }
        
        //if(soapAction)
        //createApplicationMessage(soapMessage, processPath);
        ComplaintHasFeedbackMessage(soapMessage, complaintId);
        
        MimeHeaders headers = soapMessage.getMimeHeaders();
        headers.addHeader("SOAPAction", soapAction);
        
        soapMessage.saveChanges();

        /* Print the request message, just for debugging purposes */
        //System.out.println("Request SOAP Message:");
        //soapMessage.writeTo(System.out);
        //System.out.println("\n");
        logger.info("Request SOAP Message:");
        logger.info(Util.soapToString(soapMessage));
        
        // Send SOAP Message to SOAP Server
        if(isOTDS){
        	soapEndpointUrl=gatewayUrl;
        }
        else{
        	soapEndpointUrl=gatewayUrl+"?SAMLart="+ticket;
        }
        SOAPMessage soapResponse = soapConnection.call(soapMessage, soapEndpointUrl);

        // Print the SOAP Response
        //System.out.println("Response SOAP Message:");
        //soapResponse.writeTo(System.out);
        //System.out.println();
        logger.info("Response SOAP Message:");
        logger.info(Util.soapToString(soapResponse));
        
        booleanResult=soapResponse.getSOAPBody().getElementsByTagName("Feedback_Flag").item(0).getChildNodes().item(0).getNodeValue();
        soapConnection.close();
        
        return new Boolean(booleanResult);
	}
	
	public String createFeedback(boolean isOTDS, String ticket, HashMap<String,String> properties) throws Exception
	{
		
        String soapAction = "CreateFeedback";
        String itemId=null;
        
        //Call webservice
        SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
        SOAPConnection soapConnection = soapConnectionFactory.createConnection();
        
        //Create SOAP Request
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage();
        
        //if OTDS authentication, then add otdsticket to header
        if(isOTDS){
            soapMessage=addOTDSHeader(ticket, soapMessage);
        }
        
        //if(soapAction)
        //createApplicationMessage(soapMessage, processPath);
        createFeedbackMessage(soapMessage, properties);
        
        MimeHeaders headers = soapMessage.getMimeHeaders();
        headers.addHeader("SOAPAction", soapAction);
        
        soapMessage.saveChanges();

        /* Print the request message, just for debugging purposes */
        //System.out.println("Request SOAP Message:");
        //soapMessage.writeTo(System.out);
        //System.out.println("\n");
        logger.info("Request SOAP Message:");
        logger.info(Util.soapToString(soapMessage));
        
        // Send SOAP Message to SOAP Server
        if(isOTDS){
        	soapEndpointUrl=gatewayUrl;
        }
        else{
        	soapEndpointUrl=gatewayUrl+"?SAMLart="+ticket;
        }
        SOAPMessage soapResponse = soapConnection.call(soapMessage, soapEndpointUrl);

        // Print the SOAP Response
        //System.out.println("Response SOAP Message:");
        //soapResponse.writeTo(System.out);
        //System.out.println();
        logger.info("Response SOAP Message:");
        logger.info(Util.soapToString(soapResponse));
        
        itemId=soapResponse.getSOAPBody().getElementsByTagName("ItemId").item(0).getChildNodes().item(0).getNodeValue();
        soapConnection.close();
        
        return itemId;
	}
	
	
	private SOAPMessage addOTDSHeader(String ticket, SOAPMessage soapMessage)
			throws SOAPException {
		SOAPPart soapPart = soapMessage.getSOAPPart();
		
		String hdNamespace = "hdNamespace";
		String hdNamespaceURI = "urn:api.bpm.opentext.com";//urn:api.ecm.opentext.com
		// SOAP Envelope
		SOAPEnvelope envelope = soapPart.getEnvelope();
		envelope.addNamespaceDeclaration(hdNamespace, hdNamespaceURI);
		
		// Add Header
		SOAPHeader soapHeader = envelope.getHeader();
		if (soapHeader == null) {
			soapHeader = envelope.addHeader();
		  }
		SOAPElement soapHeaderElem = soapHeader.addChildElement("OTAuthentication",hdNamespace);
		SOAPElement soapHeaderElem1=soapHeaderElem.addChildElement("AuthenticationToken",hdNamespace);
		soapHeaderElem1.addTextNode(ticket);
		
		return soapMessage;
	}
	

	public String requestSAML(String OTDSTicket,String username) throws Exception
	{
		
        String soapAction = "Request";
        String SAMLToken;
        
        //Call webservice
        SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
        SOAPConnection soapConnection = soapConnectionFactory.createConnection();
        
        //Create SOAP Request
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage();
        
        //if(soapAction)
        createSAMLRequestMessage(soapMessage, OTDSTicket, username);

        MimeHeaders headers = soapMessage.getMimeHeaders();
        headers.addHeader("SOAPAction", soapAction);

        soapMessage.saveChanges();

        /* Print the request message, just for debugging purposes */
        //System.out.println("Request SOAP Message:");
        //soapMessage.writeTo(System.out);
        //System.out.println("\n");
        logger.info("Request SOAP Message:");
        logger.info(Util.soapToString(soapMessage));
        
        // Send SOAP Message to SOAP Server
        //soapEndpointUrl=gatewayUrl+"?SAMLart="+ticket;
        SOAPMessage soapResponse = soapConnection.call(soapMessage, gatewayUrl);

        // Print the SOAP Response
        //System.out.println("Response SOAP Message:");
        //soapResponse.writeTo(System.out);
        //System.out.println();
        logger.info("Response SOAP Message:");
        logger.info(Util.soapToString(soapResponse));
        
        SAMLToken=soapResponse.getSOAPBody().getElementsByTagName("samlp:AssertionArtifact").item(0).getChildNodes().item(0).getNodeValue();
        soapConnection.close();
        
        return SAMLToken;
	}
	
	private void createSAMLRequestMessage(SOAPMessage soapMessage,
			String oTDSTicket, String username) throws SOAPException {
		//xxx;
		SOAPPart soapPart = soapMessage.getSOAPPart();
		
		String hdNamespace = "hdNamespace";
        String hdNamespaceURI = "urn:api.ecm.opentext.com";
		
        String wfNamespace = "wfNamespace";
        String wfNamespaceURI = "urn:oasis:names:tc:SAML:1.0:protocol";
        
        String samlNamespace = "saml";
        String samlNamespaceURI = "urn:oasis:names:tc:SAML:1.0:assertion";
        
        // SOAP Envelope
        SOAPEnvelope envelope = soapPart.getEnvelope();
        
        envelope.addNamespaceDeclaration(hdNamespace, hdNamespaceURI);
        envelope.addNamespaceDeclaration(wfNamespace, wfNamespaceURI);
        envelope.addNamespaceDeclaration(samlNamespace, samlNamespaceURI);
        
        // Add Header
        SOAPHeader soapHeader = envelope.getHeader();
        
        SOAPElement soapHeaderElem = soapHeader.addChildElement("OTAuthentication",hdNamespace);
        SOAPElement soapHeaderElem1=soapHeaderElem.addChildElement("AuthenticationToken",hdNamespace);
        soapHeaderElem1.addTextNode(oTDSTicket);
        
        // Add Body
        SOAPBody soapBody = envelope.getBody();
        
        SOAPElement soapBodyElem = soapBody.addChildElement("Request", wfNamespace);
        soapBodyElem.addAttribute(new QName("MajorVersion"), "1");
        soapBodyElem.addAttribute(new QName("RequestID"), "X123.45.678.90.12345678");
        soapBodyElem.addAttribute(new QName("MinorVersion"), "1");
        soapBodyElem.addAttribute(new QName("IssueInstant"), Util.formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
        SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("AuthenticationQuery", wfNamespace);
        //soapBodyElem1.addTextNode("definition");
        SOAPElement soapBodyElem2 = soapBodyElem1.addChildElement("Subject", samlNamespace);
        //process/doaaprocess - process/process Model - proj1/process1
        //soapBodyElem2.addTextNode(processPath);
        //<source>Run from Studio</source>
        SOAPElement soapBodyElem4 = soapBodyElem2.addChildElement("NameIdentifier", samlNamespace);
        soapBodyElem4.addTextNode(username);
        //
        
		
	}

	
	
	private  void ComplaintHasFeedbackMessage(SOAPMessage soapMessage, String complaintId) throws SOAPException {
        SOAPPart soapPart = soapMessage.getSOAPPart();

        String wfNamespace = "wfNamespace";
        String wfNamespaceURI = "http://schemas/BASSEGASHill/Complaint/operations";
        
        String msgNamespace = "def";
        String msgNamespaceURI = "http://schemas/BASSEGASHill/Complaint";
        
        // SOAP Envelope
        SOAPEnvelope envelope = soapPart.getEnvelope();
        envelope.addNamespaceDeclaration(wfNamespace, wfNamespaceURI);
        
        envelope.addNamespaceDeclaration(msgNamespace, msgNamespaceURI);
        
        SOAPBody soapBody = envelope.getBody();
        
        SOAPElement soapBodyElem = soapBody.addChildElement("ReadComplaint", wfNamespace);
        SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("Complaint-id", msgNamespace);
        
        SOAPElement elem = soapBodyElem1.addChildElement("ItemId", msgNamespace);
    	elem.addTextNode(complaintId);
        
        
    }
	
	private  void createFeedbackMessage(SOAPMessage soapMessage, HashMap<String,String> properties) throws SOAPException {
        SOAPPart soapPart = soapMessage.getSOAPPart();

        String wfNamespace = "wfNamespace";
        String wfNamespaceURI = "http://schemas/BASSEGASHill/Feedback/operations";
        
        String msgNamespace = "def";
        String msgNamespaceURI = "http://schemas/BASSEGASHill/Feedback";
        
        String complNamespace = "ns1";
        String complNamespaceURI = "http://schemas/BASSEGASHill/Complaint";
        
        String complaintId=null;
        
        // SOAP Envelope
        SOAPEnvelope envelope = soapPart.getEnvelope();
        envelope.addNamespaceDeclaration(wfNamespace, wfNamespaceURI);
        
        envelope.addNamespaceDeclaration(msgNamespace, msgNamespaceURI);
        
        envelope.addNamespaceDeclaration(complNamespace, complNamespaceURI);
        
        SOAPBody soapBody = envelope.getBody();
        
        SOAPElement soapBodyElem = soapBody.addChildElement("CreateFeedback", wfNamespace);
        SOAPElement soapBodyElem1 = soapBodyElem.addChildElement("Feedback-create", msgNamespace);
        
        Iterator<String> iter = properties.keySet().iterator();
        while(iter.hasNext())
        {
        	String key = iter.next();
        	if(!key.equalsIgnoreCase("id"))
        	{
	        	SOAPElement elem = soapBodyElem1.addChildElement(key, msgNamespace);
	        	elem.addTextNode(properties.get(key));
        	}
        	else {
        		complaintId=properties.get(key);
        	}
        }
        
        if(complaintId!=null) {
        	SOAPElement relationElem = soapBodyElem1.addChildElement("ToComplaint", msgNamespace);
        	SOAPElement idElem = relationElem.addChildElement("Complaint-id", complNamespace);
        	SOAPElement itemIdElem = idElem.addChildElement("ItemId", complNamespace);
        	itemIdElem.addTextNode(complaintId);
        }
        
    }
	
	

}
