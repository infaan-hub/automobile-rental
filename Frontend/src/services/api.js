const VEHICLES = [
  {
    id: 1,
    name: "Lamborghini Huracán EVO",
    brand: "Lamborghini",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58d6?w=800&q=80",
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&q=80",
    ],
    price: 1200,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 2,
    year: 2024,
    mileage: "500 km",
    rating: 4.9,
    description: "Experience raw power and Italian craftsmanship with the Lamborghini Huracán EVO. A masterpiece of engineering that delivers an exhilarating drive.",
    features: ["Carbon Ceramic Brakes", "Adaptive Suspension", "Launch Control", "Sports Exhaust", "Apple CarPlay"],
    reviews: [
      { id: 1, name: "Alex M.", avatar: null, rating: 5, date: "2025-06-15", comment: "Absolutely incredible machine. Worth every penny!" },
      { id: 2, name: "Sarah K.", avatar: null, rating: 5, date: "2025-05-28", comment: "The sound of this V10 is unforgettable." },
      { id: 3, name: "James R.", avatar: null, rating: 4, date: "2025-05-10", comment: "Superb condition and amazing performance." },
    ],
  },
  {
    id: 2,
    name: "Rolls-Royce Ghost",
    brand: "Rolls-Royce",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9b7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9b7?w=800&q=80",
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    ],
    price: 2500,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    year: 2024,
    mileage: "200 km",
    rating: 4.9,
    description: "The pinnacle of luxury motoring. The Rolls-Royce Ghost offers unparalleled comfort and prestige.",
    features: ["Starlight Headliner", "Massage Seats", "Champagne Cooler", "Power Closure Doors", "Bespoke Audio"],
    reviews: [
      { id: 1, name: "David L.", avatar: null, rating: 5, date: "2025-06-20", comment: "Pure elegance on wheels." },
      { id: 2, name: "Emma W.", avatar: null, rating: 5, date: "2025-06-01", comment: "The quietest ride I have ever experienced." },
    ],
  },
  {
    id: 3,
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    ],
    price: 1500,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 4,
    year: 2024,
    mileage: "300 km",
    rating: 4.8,
    description: "Iconic performance meets everyday usability. The 911 Turbo S is a legend reborn.",
    features: ["PDK Transmission", "Active Suspension", "Sport Chrono Package", "Carbon Fiber Roof", "Bose Surround Sound"],
    reviews: [
      { id: 1, name: "Michael T.", avatar: null, rating: 5, date: "2025-06-18", comment: "The benchmark for sports cars." },
      { id: 2, name: "Rachel G.", avatar: null, rating: 4, date: "2025-05-22", comment: "Incredible grip and acceleration." },
      { id: 3, name: "Chris B.", avatar: null, rating: 5, date: "2025-04-30", comment: "A dream to drive on any road." },
    ],
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1631295868223-63265b40d9b7?w=800&q=80",
    ],
    price: 800,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    year: 2024,
    mileage: "1000 km",
    rating: 4.7,
    description: "The pinnacle of German engineering. The S-Class sets the standard for luxury sedans.",
    features: ["MBUX Infotainment", "Executive Seats", "Air Suspension", "Ambient Lighting", "Burmester 3D Audio"],
    reviews: [
      { id: 1, name: "Oliver H.", avatar: null, rating: 5, date: "2025-06-10", comment: "Like driving a first-class lounge." },
      { id: 2, name: "Sophia L.", avatar: null, rating: 4, date: "2025-05-15", comment: "Impeccably comfortable and quiet." },
    ],
  },
  {
    id: 5,
    name: "Ferrari SF90 Stradale",
    brand: "Ferrari",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    ],
    price: 3000,
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 2,
    year: 2024,
    mileage: "150 km",
    rating: 5.0,
    description: "Ferrari's first hybrid supercar. 986 horsepower of pure adrenaline.",
    features: ["Hybrid V8", "E-Drive Mode", "Carbon Fiber Body", "F1 Gearbox", "Assetto Fiorano Package"],
    reviews: [
      { id: 1, name: "Luca R.", avatar: null, rating: 5, date: "2025-06-25", comment: "A technological marvel." },
      { id: 2, name: "Anna P.", avatar: null, rating: 5, date: "2025-06-05", comment: "The acceleration is mind-blowing!" },
      { id: 3, name: "Marco S.", avatar: null, rating: 5, date: "2025-05-20", comment: "Worth every penny for the experience." },
    ],
  },
  {
    id: 6,
    name: "Range Rover Velar",
    brand: "Range Rover",
    type: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58d6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58d6?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    ],
    price: 600,
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    year: 2023,
    mileage: "2500 km",
    rating: 4.6,
    description: "British sophistication meets off-road capability. The Velar is a masterpiece of design.",
    features: ["Terrain Response 2", "Panoramic Roof", "Meridian Sound", "Heated Seats", "Air Suspension"],
    reviews: [
      { id: 1, name: "Tom W.", avatar: null, rating: 4, date: "2025-06-12", comment: "Beautiful design and comfortable ride." },
      { id: 2, name: "Diana K.", avatar: null, rating: 5, date: "2025-05-08", comment: "Perfect for weekend getaways." },
    ],
  },
  {
    id: 7,
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    type: "Electric",
    image: "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58d6?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    ],
    price: 900,
    transmission: "Automatic",
    fuel: "Electric",
    seats: 5,
    year: 2024,
    mileage: "800 km",
    rating: 4.7,
    description: "The fastest production sedan in the world. Electric performance redefined.",
    features: ["Plaid Powertrain", "Autopilot", "Yoke Steering", "17" Display", "Glass Roof"],
    reviews: [
      { id: 1, name: "Ethan S.", avatar: null, rating: 5, date: "2025-06-22", comment: "Insane acceleration. The future is here." },
      { id: 2, name: "Mia J.", avatar: null, rating: 4, date: "2025-06-02", comment: "Technology packed and super fast." },
      { id: 3, name: "Noah P.", avatar: null, rating: 5, date: "2025-05-12", comment: "Best EV experience bar none." },
    ],
  },
  {
    id: 8,
    name: "BMW M8 Competition",
    brand: "BMW",
    type: "Sports",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=800&q=80",
    ],
    price: 1100,
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 4,
    year: 2024,
    mileage: "400 km",
    rating: 4.8,
    description: "The ultimate grand tourer. 617 horsepower of refined aggression.",
    features: ["M xDrive", "M Sport Exhaust", "Carbon Fiber Trim", "Harman Kardon Sound", "Laser headlights"],
    reviews: [
      { id: 1, name: "Ryan D.", avatar: null, rating: 5, date: "2025-06-14", comment: "Brutal power with luxury comfort." },
      { id: 2, name: "Laura M.", avatar: null, rating: 4, date: "2025-05-30", comment: "Handles like a dream on twisty roads." },
    ],
  },
];

export function fetchVehicles(filters = {}) {
  let result = [...VEHICLES];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q)
    );
  }

  if (filters.brand) {
    result = result.filter((v) => v.brand.toLowerCase() === filters.brand.toLowerCase());
  }

  if (filters.fuel) {
    result = result.filter((v) => v.fuel.toLowerCase() === filters.fuel.toLowerCase());
  }

  if (filters.transmission) {
    result = result.filter((v) => v.transmission.toLowerCase() === filters.transmission.toLowerCase());
  }

  if (filters.minPrice) {
    result = result.filter((v) => v.price >= Number(filters.minPrice));
  }

  if (filters.maxPrice) {
    result = result.filter((v) => v.price <= Number(filters.maxPrice));
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return { data: result, total: result.length };
}

export function fetchVehicleById(id) {
  const vehicle = VEHICLES.find((v) => v.id === Number(id));
  if (!vehicle) throw new Error("Vehicle not found");
  return { data: vehicle };
}

export function fetchSimilarVehicles(vehicle) {
  const similar = VEHICLES.filter(
    (v) => v.id !== vehicle.id && (v.type === vehicle.type || v.brand === vehicle.brand)
  ).slice(0, 3);
  return { data: similar };
}
