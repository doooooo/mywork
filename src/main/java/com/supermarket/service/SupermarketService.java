package com.supermarket.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.supermarket.model.Supermarket;
import com.supermarket.repository.SupermarketRepository;

@Service
public class SupermarketService {

	@Autowired
	SupermarketRepository repository;

	public Supermarket save(@Valid Supermarket market) {
		return repository.save(market);
		
	}

	public void delete(Supermarket market) {
		repository.delete(market);
		
	}

	public Optional<Supermarket> findById(long id) {
		return repository.findById(id);
	}

	public List<Supermarket> findAll() {
		// TODO Auto-generated method stub
		return (List<Supermarket>) repository.findAll();
	}

	public Supermarket update(Supermarket market) {
		repository.save(market);
		return market;
	}
	
}
