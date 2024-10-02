CREATE TABLE cars (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Auto-incrementing integer for unique ID
  make VARCHAR(255) NOT NULL,        -- Make of the car (e.g., Toyota)
  model VARCHAR(255) NOT NULL,       -- Model of the car (e.g., Premio)
  year INT NOT NULL,                   -- Year of manufacture
  engine_capacity VARCHAR(20) NOT NULL,  -- Engine capacity (e.g., 1500cc)
  fuel_type VARCHAR(50) NOT NULL,       -- Fuel type (e.g., Petrol)
  transmission VARCHAR(50) NOT NULL,   -- Transmission type (e.g., Automatic)
  mileage INT,                         -- Mileage of the car
  features JSON DEFAULT NULL,          -- JSON array holding car features
  condition VARCHAR(50) NOT NULL,       -- Car's condition (e.g., Accident-Free)
  location VARCHAR(255) NOT NULL,       -- Car's location (e.g., Nairobi)
  price DECIMAL(10,2) NOT NULL,         -- Price of the car
  seller_id INT NOT NULL,              -- Foreign key referencing seller table
  FOREIGN KEY (seller_id) REFERENCES sellers(id) -- Link to seller table
);

CREATE TABLE car_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  car_id INT NOT NULL,
  image_url TEXT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars(id) -- Link to cars table
);

CREATE TABLE sellers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  account_type VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  place VARCHAR(255) NOT NULL,
  has_financing BOOLEAN DEFAULT TRUE,
  accepts_trade_in BOOLEAN DEFAULT TRUE
);

CREATE TABLE cars (
  id INT PRIMARY KEY AUTO_INCREMENT,  
  make VARCHAR(255) NOT NULL,        
  model VARCHAR(255) NOT NULL,       
  dom INT NOT NULL,                  
  engine_capacity VARCHAR(20) NOT NULL, 
  fuel_type VARCHAR(50) NOT NULL,       
  transmission VARCHAR(50) NOT NULL,   
  mileage INT,                         
  features JSON DEFAULT NULL,          
  nature VARCHAR(50) NOT NULL,      
  place VARCHAR(255) NOT NULL,       
  price DECIMAL(10,2) NOT NULL,        
  seller_id INT NOT NULL,              
  FOREIGN KEY (seller_id) REFERENCES sellers(id) 
);

CREATE TABLE car_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  car_id INT NOT NULL,
  image_url TEXT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars(id) 
);