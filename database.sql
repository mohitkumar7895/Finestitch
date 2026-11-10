-- Database Initialization Script for Fine Stitch Uniforms
-- Database: artisan

CREATE DATABASE IF NOT EXISTS `artisan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `artisan`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT,
  `image_url` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `short_description` VARCHAR(500),
  `description` TEXT,
  `price` DECIMAL(10, 2) DEFAULT NULL,
  `available_sizes` VARCHAR(255) DEFAULT 'S, M, L, XL, XXL, 3XL',
  `available_colors` VARCHAR(255) DEFAULT 'Navy Blue, White, Black, Grey, Sky Blue',
  `customization_details` TEXT,
  `image_url` VARCHAR(500) NOT NULL,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Product Images Table (Multi-image support)
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255),
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Gallery Table
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT 'General',
  `image_url` VARCHAR(500) NOT NULL,
  `description` TEXT,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `mobile` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `product_name` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Site Settings Table
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(150) NOT NULL,
  `company_name` VARCHAR(150),
  `role` VARCHAR(100),
  `rating` INT DEFAULT 5,
  `feedback` TEXT NOT NULL,
  `image_url` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- SEED DATA
-- ==========================================

-- Default Admin (Password: Admin@123)
-- bcrypt hash for 'Admin@123'
INSERT INTO `admins` (`id`, `username`, `email`, `password_hash`, `role`) VALUES
(1, 'admin', 'sayyedaadil35@yahoo.com', '$2a$10$wE3/nB2iZz85xVp1Xn0BLeV7kPqvQeMsn82QnK/8h5z1U.Y8KGy/W', 'superadmin')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `sort_order`) VALUES
(1, 'Corporate Uniforms', 'corporate-uniforms', 'Premium formal shirts, blazers, trousers, and custom executive attire designed for business elegance and brand prestige.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 1),
(2, 'School Uniforms', 'school-uniforms', 'Durable, skin-friendly, high-grade school shirts, skirts, pinafores, trousers, blazers, and ties tailored for daily comfort.', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', 2),
(3, 'Industrial Uniforms', 'industrial-uniforms', 'Heavy-duty coveralls, boiler suits, reflective safety jackets, and rugged workwear built for factory and construction safety.', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 3),
(4, 'Hospital & Healthcare Uniforms', 'hospital-uniforms', 'Anti-microbial doctor coats, patient gowns, nurse tunics, and comfortable ergonomic surgical scrubs.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 4),
(5, 'Hotel & Hospitality Uniforms', 'hotel-uniforms', 'Sophisticated front-desk suits, chef jackets, housekeeping attire, and steward uniforms elevating guest experience.', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', 5),
(6, 'Restaurant & Cafe Uniforms', 'restaurant-uniforms', 'Modern waiter shirts, custom bistro aprons, chef coats, and barista t-shirts offering stylish utility.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', 6),
(7, 'Security Uniforms', 'security-uniforms', 'Authoritative guard shirts, tactical trousers, lanyards, caps, and weather-resistant heavy duty security jackets.', 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80', 7),
(8, 'Customized T-Shirts & Polos', 'customized-t-shirts', 'Premium 100% cotton and dry-fit collar t-shirts with computerized embroidery and screen/vinyl printing.', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 8),
(9, 'Promotional Apparel', 'promotional-apparel', 'Branded caps, hoodies, event jackets, and promotional merchandise tailored for brand campaigns and exhibitions.', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', 9)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- Products
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `short_description`, `description`, `price`, `available_sizes`, `available_colors`, `customization_details`, `image_url`, `is_featured`, `is_active`) VALUES
(1, 1, 'Executive Corporate Formal Shirt', 'executive-corporate-formal-shirt', 'Wrinkle-resistant luxury cotton-blend formal shirts tailored for business professionals.', 'Crafted with fine Egyptian cotton and poly-blend fabric, our Executive Corporate Shirts offer unmatched comfort and sharp creases throughout the workday. Engineered for corporate teams, banks, consulting firms, and modern offices.', 850.00, 'S, M, L, XL, XXL, 3XL', 'Crisp White, Sky Blue, Navy Blue, Steel Grey, Light Pink', 'Custom chest pocket embroidery with company logo, engraved brand buttons, contrast inner collar bands.', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 1, 1),
(2, 1, 'Premium Corporate Blazer Suit', 'premium-corporate-blazer-suit', 'Tailored two-piece executive blazers built with premium lining and enduring silhouette.', 'Designed for boardrooms and client interactions, this structured corporate blazer offers breathable fabrics, padded shoulders, and premium satin lining for ultimate executive presence.', 2650.00, '36, 38, 40, 42, 44, 46', 'Midnight Navy, Charcoal Grey, Jet Black, Royal Blue', 'Inner lapel custom crest, branded metal/horn buttons, custom monogrammed pocket squares.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 1, 1),
(3, 2, 'Classic School Uniform Set (Shirt & Shorts/Trouser)', 'classic-school-uniform-set', 'Tear-resistant, colorfast uniform set designed to withstand everyday school activity.', 'Crafted from high-tensile breathable poly-cotton fabric with anti-pilling properties. Includes reinforced seam stitching at stress points and stain-resistant fabric treatment for longevity.', 720.00, '22, 24, 26, 28, 30, 32, 34, 36', 'White & Navy, Light Blue & Grey, Check Pattern, Beige', 'School crest embroidery on chest pocket, custom school ties, belts, and house color shoulder epaulets.', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', 1, 1),
(4, 3, 'Heavy Duty Industrial Boiler Suit / Coverall', 'heavy-duty-industrial-boiler-suit', '100% cotton drill industrial coverall with 3M reflective safety tape and tool pockets.', 'Engineered for factories, offshore platforms, warehouses, and automotive plants. Built with heavy-duty two-way brass zippers, elasticated waistband, and double-needle reinforced stitching.', 1250.00, 'M, L, XL, XXL, 3XL', 'Safety Orange, Industrial Navy, Petrol Blue, High-Vis Yellow', 'Company name screen printed on back, embroidered safety badge on chest, customized pen & radio loops.', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 1, 1),
(5, 4, 'Ergonomic Medical Scrub Suit Set', 'ergonomic-medical-scrub-suit-set', 'Ultra-soft, 4-way stretch scrub top and cargo jogger pants for doctors and nursing staff.', 'Treated with antimicrobial and fluid-barrier finish. Featuring 6 functional pockets including zippered utility compartments, breathable mesh panels, and wrinkle-resistant fabric for 14-hour hospital shifts.', 1100.00, 'XS, S, M, L, XL, XXL', 'Ceil Blue, Hunter Green, Burgundy, Royal Blue, Teal', 'Doctor name and hospital department embroidery, custom caduceus badge.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', 1, 1),
(6, 5, 'Master Chef Coat with Mesh Ventilation', 'master-chef-coat-mesh-ventilation', 'Double-breasted executive chef jacket with Cool-Vent back panel and thermometer pocket.', 'Fabricated with premium stain-release poly-cotton twill. Features reversible double-breast front, hand-rolled fabric buttons, and moisture-wicking back mesh to keep chefs cool in hot kitchen environments.', 980.00, 'S, M, L, XL, XXL', 'Classic White with Black Piping, Solid Black, Charcoal Grey', 'Chef name embroidery, hotel logo, country flag embroidery on collar.', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', 1, 1),
(7, 7, 'Tactical Security Officer Uniform Set', 'tactical-security-officer-uniform-set', 'Heavyweight command shirts and 6-pocket cargo tactical trousers for security agencies.', 'Designed to deliver an authoritative and disciplined look. Built with permanent crease stitching, epaulets for badges, reinforced badge tabs, and heavy-duty belt loops.', 1150.00, '30, 32, 34, 36, 38, 40, 42', 'Khaki, Navy Blue, Raven Black, Military Green', 'Security agency embroidered shoulder patches, embroidered security text on back, brass button options.', 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80', 1, 1),
(8, 8, 'Custom Corporate Polo T-Shirt (Matty / Honeycomb)', 'custom-corporate-polo-t-shirt', '240 GSM combed cotton-rich honeycomb polo t-shirt with bio-wash finish.', 'Our best-selling corporate polo combines refined casual elegance with long-lasting shape retention. Features ribbed collar, 3-button placket, and side vents for all-day comfort.', 480.00, 'S, M, L, XL, XXL, 3XL', 'Navy Blue, Royal Blue, Jet Black, Maroon, White, Heather Grey', 'High-density 3D embroidery, chest logo, sleeve printing, collar tipping customization.', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 1, 1),
(9, 6, 'Custom Bistro Canvas Apron with Leather Accents', 'custom-bistro-canvas-apron', 'Heavy-duty 12oz washed canvas apron with cross-back adjustable straps and brass rivets.', 'Ideal for baristas, restaurant servers, bartenders, and gourmet chefs. Includes reinforced kangaroo pockets, towel loop, and split front hem for easy walking mobility.', 550.00, 'Universal Adjustable', 'Coffee Brown, Charcoal Grey, Olive Green, Black Canvas', 'Laser engraved leather logo patch or direct embroidery, custom metal hardware.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', 1, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- Gallery Items
INSERT INTO `gallery` (`id`, `title`, `category`, `image_url`, `description`, `sort_order`) VALUES
(1, 'Custom T-Shirts', 'Custom T-Shirts', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', 'Corporate events and brand merchandising solutions.', 1),
(2, 'Staff Uniforms', 'Staff Uniforms', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80', 'Professional institutional and office wear.', 2),
(3, 'Premium Hoodies', 'Custom Hoodies', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', 'Team wear with high-quality embroidery.', 3),
(4, 'Corporate Gifting', 'Corporate Gifts', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', 'Impactful gifts for employees and clients.', 4),
(5, 'Branded Caps', 'Branded Caps', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80', 'Promotional headwear for campaigns.', 5),
(6, 'Corporate Jackets', 'Custom Jackets', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', 'Weatherproof jackets and corporate outer layers.', 6)
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `image_url`=VALUES(`image_url`), `description`=VALUES(`description`);

-- Site Settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('business_name', 'Fine Stitch Uniforms'),
('owner_name', 'Aadil Moinuddin Sayyed'),
('phone', '+91 9619585005'),
('email', 'sayyedaadil35@yahoo.com'),
('address', 'Malwani, Malad West'),
('city', 'Mumbai'),
('state', 'Maharashtra'),
('pincode', '400095'),
('country', 'India'),
('domain', 'finestitchuniforms.com'),
('about_hero_title', 'Crafting Excellence in Every Stitch'),
('about_description', 'Fine Stitch Uniforms is dedicated to providing high-quality customized uniforms and apparel solutions for businesses, institutions, organizations, and individuals. We focus on delivering comfortable, durable, and professionally designed uniforms that represent your brand identity. Our commitment is to quality craftsmanship, reliable service, and customer satisfaction.'),
('about_goal', 'Our goal is to provide customized apparel solutions that combine style, comfort, quality, and affordability.'),
('experience_years', '15+'),
('happy_clients', '1200+'),
('uniforms_delivered', '500,000+'),
('homepage_headline', 'Premium Uniforms & Custom Apparel Tailored For Perfection'),
('homepage_subheadline', 'Mumbai’s leading manufacturer and wholesale supplier of corporate, school, industrial, hospitality, and healthcare uniforms. Precision stitching, durable fabrics, and bespoke branding.')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

-- Testimonials
INSERT INTO `testimonials` (`id`, `client_name`, `company_name`, `role`, `rating`, `feedback`, `image_url`, `sort_order`, `is_active`) VALUES
(1, 'Marketing Director', 'Tech Solutions Corp', 'Marketing Director', 5, 'Fine Stitch Uniforms has been our go-to partner for corporate hoodies and T-shirts. Their attention to brand consistency and fabric quality is exceptional. Highly recommended for any professional organization.', 'building', 1, 1),
(2, 'Founder & CEO', 'Eco-Drive Startups', 'Founder & CEO', 5, 'As a startup, we needed a partner who understood scalability. Fine Stitch Uniforms provided us with premium customized merchandise that truly helped our brand identity stand out in the market.', 'rocket', 2, 1),
(3, 'Admin Head', 'Mumbai Global Institute', 'Admin Head', 5, 'The team uniforms provided by Fine Stitch Uniforms were durable and perfectly stitched. Their end-to-end service from design concept to final delivery was stress-free and very reliable.', 'graduation-cap', 3, 1)
ON DUPLICATE KEY UPDATE `feedback`=VALUES(`feedback`);
(3, 'Vikram Oberoi', 'The Grand Imperial Hotel', 'General Manager', 5, 'The hospitality uniforms created by Fine Stitch Uniforms elevated our front-of-house presence instantly. The chef jackets with Cool-Vent panels are a massive hit with our culinary staff.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', 3, 1),
(4, 'Farhan Qureshi', 'TechSpark Digital Media', 'HR Head', 5, 'Our custom embroidered polo t-shirts came out fantastic! The embroidery detail on our 3D logo is crisp and colors are vibrant. Highly recommended for corporate apparel in Mumbai.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', 4, 1)
ON DUPLICATE KEY UPDATE `client_name`=VALUES(`client_name`);

