package com.bass.ws.client;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.simple.JSONObject;

import com.bass.util.Util;

public class RESTClient{
	//String baseUrl="http://localhost:8080/BPMService/";//v1/login";
	String baseUrl=Util.getConfig().getProperty("restful.url");
	Logger logger = Logger.getLogger(RESTClient.class.getName());
	
	/**
	 * AWP authentication using SAML (AWP user/password)
	 * @param userid
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public String authenticateSAML(String userid, String password) throws Exception
	{
		String url=baseUrl+"v1/login";
		HashMap header=new HashMap();
		//header.put("Content-Type", "text/plain");
		header.put("user_id", userid);
		header.put("password", password);
		String ticket=httpPost(url, null,  header);
		System.out.println(ticket);
		if(ticket.contains("Exception"))
		{
			throw new Exception("User unauthenticated");
		}
		return ticket;
	}
	
	/**
	 * AWP authentication using otdsticket (unused method)
	 * @param userid
	 * @param otdsticket ticket retrieved from otds rest service
	 * @return
	 * @throws Exception
	 */
	public String authenticateOTDS(String userid, String otdsticket) throws Exception
	{
		String url=baseUrl+"v1/login";
		HashMap header=new HashMap();
		//header.put("Content-Type", "text/plain");
		header.put("user_id", userid);
		header.put("otdsticket", otdsticket);
		String ticket=httpPost(url, null,  header);
		System.out.println(ticket);
		if(ticket.contains("Exception"))
		{
			throw new Exception("User unauthenticated");
		}
		return ticket;
	}
	
	/**
	 * OTDS authentication, retrieve OTAuthentication ticket
	 * @param userid
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public String getOTDSTicket(String userid, String password) throws Exception
	{
		try {
			String resourceId=Util.getConfig().getProperty("otds.resource");
			String body="{\"user_name\":\""+userid+"\",\"password\":\""+password+"\",\"source_resource_id\":\""+resourceId+"\"" +
					",\"target_resource_id\":\""+resourceId+"\"}";
			String otdsUrl=Util.getConfig().getProperty("otds.url");
			System.out.println(body);
			String json=httpPost(otdsUrl, body, null);
			logger.info("otds json: "+json);
			String ticket=Util.readJsonProperty("ticket",json);
			return ticket;
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			throw e;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			throw e;
		}
	}

	
	private String httpPost(String url, String payload, Map header) throws ClientProtocolException, IOException
	{
		String json=null;
		HttpPost post = new HttpPost(url);
		//post.addHeader("Content-Type", "application/xml");
		if(header!=null){
			Set keys=header.keySet();
			Iterator iter=keys.iterator();
			while(iter.hasNext())
			{
				String key=(String)iter.next();
				post.addHeader(key, (String)header.get(key));
			}
		}
		if(payload!=null){
			StringEntity body = new StringEntity(
					payload,
	    		    ContentType.APPLICATION_JSON);
	    	post.setEntity(body);
		}
    	
		DefaultHttpClient client = new DefaultHttpClient();
		HttpResponse response = null;
		int code = -1;
		response = client.execute(post);
		
		HttpEntity entity = response.getEntity(); // Setting the HttpEntity to the Http Response object
        if (entity != null) {
            InputStream ios = entity.getContent();
            json = Util.convertStreamToString(ios);
        }
        return json;
	}
	
	public String httpGet(String url) throws ClientProtocolException, IOException
	{
		String json=null;
		HttpGet get = new HttpGet(url);
		get.addHeader("Content-Type", "application/xml");
		DefaultHttpClient client = new DefaultHttpClient();
		HttpResponse response = null;
		int code = -1;
		response = client.execute(get);
		HttpEntity entity = response.getEntity(); // Setting the HttpEntity to the Http Response object
        if (entity != null) {
            InputStream ios = entity.getContent();
            json = Util.convertStreamToString(ios);
        }
        return json;
	}
}
