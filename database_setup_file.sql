-- database_setup.sql

-- 1. Create Restaurants Table
-- Fix: Removed trailing comma and fixed spelling (restaurents -> restaurants)
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255)
);

-- 2. Create Menu Items Table
-- Fix: This table was missing in your previous code!
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_item_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- 4. Insert Data
INSERT INTO restaurants (name, city) VALUES 
('Hyderabadi Spice House', 'Hyderabad'),
('Taste of India', 'Mumbai'),
('Biryani Blues', 'Delhi'),
('Spicy Villa', 'Bangalore'),
('Royal Kitchen', 'Chennai');

INSERT INTO menu_items (restaurant_id, name, price) VALUES 
(1, 'Chicken Biryani', 220.00), 
(1, 'Veg Biryani', 180.00),      
(2, 'Chicken Biryani', 280.00), 
(2, 'Mutton Biryani', 450.00),   
(3, 'Chicken Biryani', 160.00), 
(3, 'Paneer Tikka', 200.00),
(4, 'Chicken Biryani', 290.00), 
(5, 'Special Biryani', 140.00);

INSERT INTO orders (menu_item_id) VALUES (1), (1), (1), (1), (1);
INSERT INTO orders (menu_item_id) VALUES (3), (3), (3);
INSERT INTO orders (menu_item_id) VALUES (5), (5), (5), (5), (5), (5), (5), (5);
INSERT INTO orders (menu_item_id) VALUES (7), (7);