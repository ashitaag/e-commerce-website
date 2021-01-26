package com.ecommerce.ecommerce.controller;
import org.springframework.web.bind.annotation.PathVariable;
import com.ecommerce.ecommerce.Repository.ProductRepository;
import com.ecommerce.ecommerce.model.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("Products")
    public List<Products> getProducts(){
          System.out.println("Hi");
//          return "HomePage";
            return this.productRepository.findAll();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("Products/{uniq_id}")
    public Optional<Products> getProduct(@PathVariable String uniq_id){
        System.out.println("prod"+this.productRepository.findById(uniq_id));
        return this.productRepository.findById(uniq_id);

    }
}
