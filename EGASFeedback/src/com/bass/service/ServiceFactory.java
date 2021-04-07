package com.bass.service;

public class ServiceFactory {
	
	public static final String AUTH_OTDS = "otds";
	public static final String AUTH_SAML = "saml";
	
	public static Service getService(String authType){
		Service service = null;
		if(authType!=null && authType.endsWith(AUTH_OTDS)){
			service = new OTDSService();
		}
		else if(authType!=null && authType.equals(AUTH_SAML))
		{
			service = new SAMLService();
		}
		return service;
	}

}
