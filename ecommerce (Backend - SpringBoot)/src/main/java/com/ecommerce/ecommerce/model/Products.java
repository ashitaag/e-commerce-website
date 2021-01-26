package com.ecommerce.ecommerce.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="product")
public class Products {
    @Id
    private String uniq_id;
    private String product_url;
    private String product_name;
    private String product_category_tree;
    private String pid;
    private String retail_price;
    private String discounted_price;
    private String image;
    private String description;
    private String product_rating;
    private String brand;
    private String product_specification;

    public String getUniq_id() {
        return uniq_id;
    }

    public String getProduct_url() {
        return product_url;
    }

    public String getProduct_name() {
        return product_name;
    }

    public String getProduct_category_tree() {
        return product_category_tree;
    }
    public String getPid() {
        return pid;
    }

    public String getRetail_price() {
        return retail_price;
    }

    public String getDiscounted_price() {
        return discounted_price;
    }

    public String getImage() {
        return image;
    }

    public String getDescription() {
        return description;
    }

    public String getProduct_rating() {
        return product_rating;
    }

    public String getBrand() {
        return brand;
    }

    public String getProduct_specification() {
        return product_specification;
    }

}
