package com.supermarket.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.supermarket.model.Supermarket;
import com.supermarket.service.SupermarketService;

@RestController
public class SupermarketController {
	
	@Autowired
	SupermarketService service;

	@PostMapping("/addmarket")
    public Supermarket addMarket(@Valid Supermarket market, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return null;
        }
        
        return service.save(market);
    }
	
	@PostMapping("/update/{id}")
	public Supermarket updateMarket(@PathVariable("id") long id, @Valid Supermarket market, 
	  BindingResult result, Model model) {
	    if (result.hasErrors()) {
	        market.setId(id);
	        return market;
	    }
	        
	    return service.save(market);
	}
	
	@PostMapping("/activate/{id}")
	public Supermarket activateMarket(@PathVariable("id") long id, @Valid Supermarket market, 
	  BindingResult result, Model model) {

		market.setActive(new Boolean(true));
		    
	    return service.update(market);
	}
	
	@PostMapping("/deactivate/{id}")
	public Supermarket deactivateMarket(@PathVariable("id") long id, @Valid Supermarket market, 
	  BindingResult result, Model model) {
	    
		market.setActive(false);
		
	    return service.update(market);
	}
	    
	@GetMapping("/delete/{id}")
	public Supermarket deleteMarket(@PathVariable("id") long id, Model model) {
	    Supermarket market = service.findById(id)
	      .orElseThrow(() -> new IllegalArgumentException("Invalid market Id:" + id));
	    service.delete(market);
	    return market;
	}
	
	@GetMapping("/listallmarkets")
	public List<Supermarket> showUserList(Model model) {
	    return service.findAll();
	}
	
}
