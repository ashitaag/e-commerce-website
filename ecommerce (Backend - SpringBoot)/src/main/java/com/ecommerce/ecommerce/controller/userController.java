package com.ecommerce.ecommerce.controller;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PathVariable;
import com.ecommerce.ecommerce.Repository.ProductRepository;
import com.ecommerce.ecommerce.Repository.UserRepository;
import com.ecommerce.ecommerce.model.Products;
import com.ecommerce.ecommerce.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "user/", method = RequestMethod.POST)
public class userController {
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private ProductRepository ProductRepository;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("info")
    public List<User> getUser(){
        return this.UserRepository.findAll();
    }
    @GetMapping("insert")
    @CrossOrigin(origins = "http://localhost:3000")
    public User getUser(@RequestBody User user){
        System.out.println("Hi"+ user);
        if (this.UserRepository.findById(user.getEmail()).isPresent()){
            System.out.println("We found that its there");
            return null;
        }
        return this.UserRepository.save(user);
    }
    @GetMapping("validate/{email}" )
    @CrossOrigin(origins = "http://localhost:3000")

    public Optional<User> getUser(@PathVariable String email) {
        System.out.println("user" + this.UserRepository.findById(email));
        return this.UserRepository.findById(email);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("getCart/{email}"  )
    public String getCart(@PathVariable String email)  {
        JSONObject cart1;
//        System.out.println("user" + this.UserRepository.findById(email));
        String cart =  this.UserRepository.findById(email).get().getCart();
        System.out.println("cart" + cart);
        List<JSONObject> list=new ArrayList<JSONObject>();
        try{
            cart1 = new JSONObject(cart);
            Iterator<String> iterator = cart1.keys();
            while(iterator.hasNext()){
                String id = iterator.next();
                System.out.println("id" + id );
                System.out.println("product rep: "+ this.ProductRepository);
                Products prod  = this.ProductRepository.findById(id).get();
                JSONObject temp = new JSONObject();
                temp.put("name",prod.getProduct_name());
                temp.put("image",prod.getImage());
                temp.put("price",prod.getRetail_price());
                temp.put("quantity", cart1.getInt(id));
                list.add(temp);

            }

        }
        catch(Exception e){
            e.printStackTrace();
        }
        System.out.println("list is" + list);
        JSONArray jsonArray = new JSONArray(list);
        return jsonArray.toString();
    }
    @GetMapping("addToCart"  )
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean addToCart(@RequestBody String obj ) {
//        System.out.println("AddToCart"+ email);
        try {
            JSONObject jsonobj = new JSONObject(obj);

            String email = jsonobj.getString("email");
            String uniq_id = jsonobj.getString("uniq_id");
            System.out.println("user" + this.UserRepository.findById(email));
            User user = this.UserRepository.findById(email).get();
            String cart =  user.getCart();
            if (cart == "" || cart == null){
                cart = "{}";
            }
            JSONObject cartObj;
            try {
                System.out.println("Cart Value is: "+cart);
                cartObj = new JSONObject(cart);
                if (cartObj.has(uniq_id)){
                    cartObj.put(uniq_id, cartObj.getInt(uniq_id)+1);
                }else{
                    cartObj.put(uniq_id, 1);
                }
                cart = cartObj.toString();
                user.setCart(cart);
                this.UserRepository.save(user);
                return true;
            }catch (Exception e){
                e.printStackTrace();
                return false;
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }


}